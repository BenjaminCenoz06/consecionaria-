"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

/**
 * `true` si la persona pidió reducir el movimiento en su sistema.
 *
 * Reemplaza a `useReducedMotion` de motion: ese hook lee la preferencia
 * ya en el primer render del cliente, pero el servidor no la conoce y
 * renderiza el HTML con movimiento. Quien tiene "reducir movimiento"
 * activado provocaba así un error de hidratación (#418) y React tiraba
 * el HTML del servidor. Acá el servidor y la hidratación usan `false` y
 * el valor real entra justo después, sin diferencias.
 */
export function useSinMovimiento() {
  return useSyncExternalStore(
    (avisar) => {
      const m = window.matchMedia(CONSULTA);
      m.addEventListener("change", avisar);
      return () => m.removeEventListener("change", avisar);
    },
    () => window.matchMedia(CONSULTA).matches,
    () => false,
  );
}
