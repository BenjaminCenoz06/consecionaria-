"use client";

import { useRef, type PointerEvent as EventoPuntero, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSinMovimiento } from "@/lib/sinMovimiento";

/**
 * Efecto "imán": el botón se acerca al puntero cuando está cerca, y se
 * suelta con un resorte al alejarse. Sólo con mouse: en pantallas
 * táctiles no hay puntero flotando y el efecto no se activa. Con
 * "reducir movimiento" no se mueve.
 */
export default function Magnetico({
  children,
  fuerza = 0.35,
  className = "inline-flex",
}: {
  children: ReactNode;
  /** Qué fracción de la distancia al puntero se acerca. */
  fuerza?: number;
  className?: string;
}) {
  const caja = useRef<HTMLSpanElement>(null);
  const sinMovimiento = useSinMovimiento();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const mover = (e: EventoPuntero) => {
    if (sinMovimiento || e.pointerType !== "mouse") return;
    const r = caja.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza);
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza);
  };
  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={caja}
      onPointerMove={mover}
      onPointerLeave={soltar}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
