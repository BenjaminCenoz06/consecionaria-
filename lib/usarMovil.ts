"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(max-width: 767px)";

/**
 * `true` en pantallas de celular.
 *
 * Sirve para quitar lo que en un celular pesa y no se nota: desenfoques
 * animados, giros 3D de bloques grandes, resortes largos. En el servidor
 * devuelve `false` (se renderiza como escritorio) y se corrige al montar,
 * sin parpadeos porque las animaciones de entrada arrancan después.
 */
export function useMovil() {
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
