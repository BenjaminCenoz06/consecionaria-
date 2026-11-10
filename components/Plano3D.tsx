"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { usarMovil } from "@/lib/usarMovil";

/**
 * Plano que se endereza con el scroll.
 *
 * Entra inclinado hacia atrás desde abajo, queda de frente mientras se
 * lee y se recuesta apenas al salir por arriba: el bloque se siente como
 * una lámina en el espacio, no como una franja pegada a la pantalla.
 * Complementa a `Tilt3D` (puntero) y a `Reveal` (entrada): este es el
 * eje del scroll continuo.
 *
 * Los ángulos son chicos a propósito. El resorte suaviza el salto que
 * deja la rueda del mouse; sin él el bloque tiembla en cada tick.
 */
export default function Plano3D({
  children,
  className = "",
  inclinacion = 12,
  perspectiva = 1400,
}: {
  children: ReactNode;
  className?: string;
  /** Grados de giro al entrar. Al salir gira la mitad. */
  inclinacion?: number;
  perspectiva?: number;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const sinMovimiento = useReducedMotion();
  /* En celular el giro de bloques enteros con el scroll es lo que más
     tironea: se apaga y el bloque queda quieto y de frente. */
  const movil = usarMovil();

  const { scrollYProgress } = useScroll({
    target: caja,
    offset: ["start end", "end start"],
  });

  const girar = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.72, 1],
      [inclinacion, 0, 0, -inclinacion / 2],
    ),
    { stiffness: 120, damping: 24, mass: 0.5 },
  );
  const escala = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.72, 1], [0.95, 1, 1, 0.98]),
    { stiffness: 120, damping: 24, mass: 0.5 },
  );

  return (
    <div ref={caja} className={className}>
      <motion.div
        style={
          sinMovimiento || movil
            ? undefined
            : {
                rotateX: girar,
                scale: escala,
                transformPerspective: perspectiva,
                transformOrigin: "50% 100%",
                willChange: "transform",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
