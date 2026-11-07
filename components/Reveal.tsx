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
      initial={sinMovimiento ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: CURVA }}
    >
      {children}
    </Etiqueta>
  );
}
