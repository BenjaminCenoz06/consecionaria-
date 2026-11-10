"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const CURVA = [0.22, 1, 0.36, 1] as const;

/**
 * El único patrón de reveal del sitio.
 *
 * Un solo componente reutilizado en todas las secciones: la repetición
 * es lo que lee como sistema. Variantes por sección leen como ruido.
 * Sube 32px y aparece en 700ms. Se dispara una sola vez.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const sinMovimiento = useReducedMotion();
  const Etiqueta = motion[as];

  return (
    <Etiqueta
      className={className}
      /* El desenfoque es lo que separa un "aparece" de un "entra en
         foco". Son 6px, no 20: a partir de ahí se lee como pantalla
         sucia y el texto se vuelve ilegible mientras dura. */
      initial={
        sinMovimiento
          ? { opacity: 0 }
          : { opacity: 0, y: 32, filter: "blur(6px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: CURVA }}
    >
      {children}
    </Etiqueta>
  );
}
