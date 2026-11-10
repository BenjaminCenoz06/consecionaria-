"use client";

import { useIdioma } from "@/lib/idioma";

/** Enlace para saltar la barra con el teclado. Vive aparte porque el
    layout es un componente de servidor y no puede leer el idioma. */
export default function SaltarAlContenido() {
  const { t } = useIdioma();

  return (
    <a
      href="#contenido"
      className="bg-rojo text-white type-normal sr-only text-sm font-semibold uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-3 focus:py-2"
    >
      {t("Saltar al contenido")}
    </a>
  );
}
