"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * La pieza que la referencia no tiene.
 * Lamborghini usa scroll nativo; acá agregamos inercia real.
 *
 * Se desactiva por completo bajo `prefers-reduced-motion`: en ese caso
 * el navegador vuelve a su scroll normal en vez de uno interpolado.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefiereMenosMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefiereMenosMovimiento.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Exponencial de salida: arranca rápido y frena largo.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      anchors: true,
    });

    let frame = 0;
    const loop = (tiempo: number) => {
      lenis.raf(tiempo);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
