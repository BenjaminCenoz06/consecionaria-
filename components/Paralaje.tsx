"use client";

import { useSinMovimiento } from "@/lib/sinMovimiento";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Capa de fondo que se mueve más lento que la página.
 *
 * Para fotos a sangre: la banda del showroom, y cualquier otra que
 * venga después. El recorrido es corto a propósito — si la foto se
 * desplaza mucho, el ojo la lee como una segunda página scrolleando
 * adentro de la primera.
 *
 * El hijo va escalado un 15% y anclado a `inset-0`: sin ese margen, el
 * desplazamiento dejaría ver el borde de la foto contra el fondo.
 */
export default function Paralaje({
  children,
  distancia = 48,
  className = "",
}: {
  children: ReactNode;
  /** Píxeles que recorre, de un extremo al otro de la pantalla. */
  distancia?: number;
  className?: string;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const sinMovimiento = useSinMovimiento();

  const { scrollYProgress } = useScroll({
    target: caja,
    offset: ["start end", "end start"],
  });
  const mover = useTransform(scrollYProgress, [0, 1], [-distancia, distancia]);

  return (
    <div ref={caja} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        style={sinMovimiento ? undefined : { y: mover }}
        className="absolute inset-0 scale-115"
      >
        {children}
      </motion.div>
    </div>
  );
}
