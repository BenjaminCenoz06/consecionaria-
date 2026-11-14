"use client";

import { useSinMovimiento } from "@/lib/sinMovimiento";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMovil } from "@/lib/usarMovil";

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
  const sinMovimiento = useSinMovimiento();
  const movil = useMovil();
  const Etiqueta = motion[as];

  /* En celular la entrada es más simple: sube y aparece. Sin desenfoque
     animado ni giro 3D, que en un teléfono cuestan cuadros y no se
     aprecian. Dura menos y casi no retrasa a los hermanos. */
  const inicio = sinMovimiento
    ? { opacity: 0 }
    : movil
      ? { opacity: 0, y: 22 }
      : {
          opacity: 0,
          y: 40,
          z: -60,
          rotateX: 14,
          /* El desenfoque es lo que separa un "aparece" de un "entra en
             foco". Son 6px, no 20: a partir de ahí se lee como pantalla
             sucia y el texto se vuelve ilegible mientras dura. */
          filter: "blur(6px)",
        };

  /* El destino lleva SIEMPRE todas las claves: en el primer render (el
     de hidratación) todavía no se sabe si es celular y arranca con la
     entrada de escritorio; si el destino no las nombrara, un
     `blur(6px)` quedaría pegado para siempre. */
  const fin = { opacity: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)" };

  return (
    <Etiqueta
      className={className}
      /* Entra en perspectiva: arranca echado hacia atrás y se pone de
         pie. 14° y 60px de fondo bastan; más y el texto se deforma
         mientras se lee. `transformPerspective` va en el propio
         elemento para que no dependa de un padre con `perspective`. */
      style={
        movil
          ? undefined
          : { transformPerspective: 1200, transformOrigin: "50% 100%" }
      }
      initial={inicio}
      whileInView={fin}
      viewport={{ once: true, amount: movil ? 0.1 : 0.2 }}
      transition={{
        duration: movil ? 0.6 : 0.9,
        delay: movil ? Math.min(delay, 0.12) : delay,
        ease: CURVA,
      }}
    >
      {children}
    </Etiqueta>
  );
}
