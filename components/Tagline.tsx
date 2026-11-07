"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "./Container";

const TEXTO =
  "Cada unidad pasa 180 puntos de control. Si uno solo falla, no entra al showroom.";

/**
 * El momento tipográfico de la página.
 *
 * Las palabras se encienden de a una a medida que cruzan la línea de
 * disparo, no el bloque entero de golpe. Va montado sobre `useScroll`
 * de Motion, que corre en requestAnimationFrame: nunca un listener de
 * scroll sin throttle.
 */
export default function Tagline() {
  const referencia = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start 0.85", "end 0.55"],
  });

  const palabras = TEXTO.split(" ");

  return (
    <section className="bg-ink py-24 lg:py-32">
      <Container>
        <p
          ref={referencia}
          className="type-condensed text-bone max-w-[980px] text-4xl leading-[1.05] font-bold uppercase md:text-5xl lg:text-6xl"
        >
          {palabras.map((palabra, i) => (
            <Palabra
              key={`${palabra}-${i}`}
              progreso={scrollYProgress}
              rango={[i / palabras.length, (i + 1) / palabras.length]}
            >
              {palabra}
            </Palabra>
          ))}
        </p>
      </Container>
    </section>
  );
}

function Palabra({
  children,
  progreso,
  rango,
}: {
  children: string;
  progreso: MotionValue<number>;
  rango: [number, number];
}) {
  const opacidad = useTransform(progreso, rango, [0.3, 1]);

  /* El gap va por margen, no por un espacio literal: un espacio al
     final de un inline-block se colapsa y las palabras se pegan. */
  return (
    <motion.span
      className="mr-[0.25em] inline-block"
      style={{ opacity: opacidad }}
    >
      {children}
    </motion.span>
  );
}
