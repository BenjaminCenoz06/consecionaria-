"use client";

import { Fragment, useRef, type RefObject } from "react";
import { motion, useInView } from "motion/react";
import { useIdioma } from "@/lib/idioma";
import { useSinMovimiento } from "@/lib/sinMovimiento";

const CURVA = [0.22, 1, 0.36, 1] as const;

/**
 * Título que se revela palabra por palabra.
 *
 * Cada palabra sube desde una máscara (su propia caja con
 * `overflow-hidden`), una detrás de otra, al entrar el título en pantalla.
 * Es el gesto de los sitios de marca: el texto no "aparece", se descubre.
 * El texto va en español y se traduce con `t()`; `\n` fuerza un salto de
 * línea. Los lectores de pantalla reciben el título entero en un
 * `sr-only`; las palabras animadas están ocultas para ellos.
 */
export default function TituloAnimado({
  texto,
  as = "h2",
  id,
  className,
  retardo = 0,
}: {
  texto: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  retardo?: number;
}) {
  const { t } = useIdioma();
  const sinMovimiento = useSinMovimiento();
  const Etiqueta = as;
  /* Se observa el título entero, no cada palabra: una palabra escondida
     bajo su máscara cuenta como "fuera de pantalla" y nunca arrancaría. */
  const referencia = useRef<HTMLElement>(null);
  const visible = useInView(referencia, { once: true, amount: 0.6 });
  /* Se traduce línea por línea: así «Reservá tu\nprueba» usa las dos
     entradas que ya existen en el diccionario. */
  const lineas = texto.split("\n").map((linea) => t(linea));
  const completo = lineas.join(" ");

  if (sinMovimiento) {
    return (
      <Etiqueta id={id} className={className}>
        {lineas.map((linea, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {linea}
          </Fragment>
        ))}
      </Etiqueta>
    );
  }

  let n = 0;
  return (
    <Etiqueta
      id={id}
      className={className}
      ref={referencia as RefObject<never>}
    >
      <span className="sr-only">{completo}</span>
      <span aria-hidden="true">
        {lineas.map((linea, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {linea.split(" ").map((palabra) => {
              const i = n++;
              return (
                <span
                  key={`${palabra}-${i}`}
                  className="mr-[0.25em] inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "115%", rotate: 4 }}
                    animate={
                      visible ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 4 }
                    }
                    transition={{
                      duration: 0.95,
                      delay: retardo + i * 0.07,
                      ease: CURVA,
                    }}
                    style={{ transformOrigin: "0% 100%" }}
                  >
                    {palabra}
                  </motion.span>
                </span>
              );
            })}
          </Fragment>
        ))}
      </span>
    </Etiqueta>
  );
}
