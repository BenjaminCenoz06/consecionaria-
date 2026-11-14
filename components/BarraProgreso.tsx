"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useSinMovimiento } from "@/lib/sinMovimiento";

/**
 * Línea roja fija arriba de todo que crece con el scroll de la página.
 * Con el resorte suave se siente como un hilo que se estira, no como un
 * indicador mecánico. Con "reducir movimiento" sigue al scroll sin resorte.
 */
export default function BarraProgreso() {
  const sinMovimiento = useSinMovimiento();
  const { scrollYProgress } = useScroll();
  const suave = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="bg-rojo pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left shadow-[0_0_12px_rgb(216_31_38/0.7)]"
      style={{ scaleX: sinMovimiento ? scrollYProgress : suave }}
    />
  );
}
