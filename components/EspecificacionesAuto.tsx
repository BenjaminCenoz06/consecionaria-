"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { useIdioma } from "@/lib/idioma";
import type { Auto } from "@/lib/catalogo";

const CURVA = [0.22, 1, 0.36, 1] as const;

/** Cuenta de 0 al valor cuando entra en pantalla. Con movimiento
    reducido muestra el valor final de entrada. */
function Contador({
  valor,
  decimales = 0,
  idioma,
}: {
  valor: number;
  decimales?: number;
  idioma: "es" | "en";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const sinMovimiento = useReducedMotion();
  const [actual, setActual] = useState(sinMovimiento ? valor : 0);

  useEffect(() => {
    if (!visible || sinMovimiento) return;
    const control = animate(0, valor, {
      duration: 1.8,
      ease: CURVA,
      onUpdate: (v) => setActual(v),
    });
    return () => control.stop();
  }, [visible, valor, sinMovimiento]);

  const texto =
    decimales > 0
      ? actual.toLocaleString(idioma === "en" ? "en-US" : "es-AR", {
          minimumFractionDigits: decimales,
          maximumFractionDigits: decimales,
        })
      : Math.round(actual).toLocaleString(idioma === "en" ? "en-US" : "es-AR");

  return <span ref={ref}>{texto}</span>;
}

/**
 * Las tres cifras que venden un auto: aceleración, potencia y velocidad
 * máxima, en grande y en latón sobre el color del auto, con la cuenta
 * animada. A la derecha, el auto en 3D.
 */
export default function EspecificacionesAuto({ auto }: { auto: Auto }) {
  const { idioma, t } = useIdioma();

  const cifras = [
    {
      grande: <Contador valor={auto.aceleracion} decimales={1} idioma={idioma} />,
      unidad: "s",
      rotulo: t("Aceleración 0 – 100 km/h"),
    },
    {
      grande: (
        <>
          <Contador valor={auto.kw} idioma={idioma} />
          <span className="mx-2 text-[0.5em] font-normal">kW</span>
          <span className="text-[0.6em] font-light">/</span>{" "}
          <Contador valor={auto.cv} idioma={idioma} />
        </>
      ),
      unidad: "CV",
      rotulo: t("Potencia (kW / CV)"),
    },
    {
      grande: <Contador valor={auto.vmax} idioma={idioma} />,
      unidad: "km/h",
      rotulo: t("Velocidad máxima"),
    },
  ];

  return (
    <section
      style={{ backgroundColor: auto.tono }}
      className="relative overflow-hidden py-9 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_75%_50%,rgba(255,255,255,0.09),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-8">
          <dl className="space-y-6 lg:col-span-5 lg:space-y-14">
            {cifras.map((c, i) => (
              <Reveal key={c.rotulo} delay={i * 0.1}>
                <dd className="type-normal text-rojo text-5xl leading-none font-light md:text-7xl">
                  {c.grande}
                  <span className="ml-2 text-[0.38em] font-normal">{c.unidad}</span>
                </dd>
                <dt className="text-bone/60 mt-2 text-sm">{c.rotulo}</dt>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <a
                href="#comprar"
                className="type-normal inline-flex h-12 items-center rounded-xl bg-white/15 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
              >
                {t("Ver cómo comprarlo")}
              </a>
            </Reveal>
          </dl>

          <motion.div
            className="relative h-[180px] sm:h-[360px] lg:col-span-7 lg:h-[480px]"
            initial={{ opacity: 0, scale: 0.9, rotateY: -18 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: CURVA }}
            style={{ transformPerspective: 1200 }}
          >
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[8%] h-10 w-[84%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_70%)]"
            />
            <Tilt3D className="h-full w-full" grados={11} escala={1.04} brillo={false}>
              <Image
                src={auto.foto}
                alt={t(auto.alt)}
                fill
                sizes="(min-width: 1024px) 58vw, 92vw"
                quality={90}
                draggable={false}
                className="object-contain object-center"
              />
            </Tilt3D>
          </motion.div>
        </div>

        <p className="text-bone/50 mt-6 lg:mt-14 max-w-[70ch] text-xs leading-relaxed">
          {t(
            "Cifras de fábrica de referencia para este modelo. La versión exacta de la unidad se informa por nuestros asesores.",
          )}
        </p>
      </Container>
    </section>
  );
}
