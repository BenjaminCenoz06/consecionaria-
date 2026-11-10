"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Container from "./Container";
import Plano3D from "./Plano3D";
import { useIdioma } from "@/lib/idioma";

const TEXTO =
  "Compra, venta y consignación. 0 km multimarcas y usados seleccionados, con financiación exclusiva.";

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

  const { t } = useIdioma();
  const palabras = t(TEXTO).split(" ");

  return (
    <section className="bg-ink py-10 lg:py-32">
      <Container>
        <Plano3D inclinacion={9}>
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
        </Plano3D>
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
