"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { useIdioma, type Idioma } from "@/lib/idioma";

const CURVA = [0.22, 1, 0.36, 1] as const;

/**
 * Banderas en SVG propio: los emojis de bandera no se dibujan en Windows
 * (salen como "AR" y "GB"), y un ícono de tamaño fijo evita cargar nada
 * extra. Todas caben en el mismo círculo de 24px.
 */
function BanderaArgentina() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full">
      <rect width="24" height="24" fill="#74acdf" />
      <rect y="8" width="24" height="8" fill="#fff" />
      <circle cx="12" cy="12" r="2.1" fill="#f6b40e" />
      <circle cx="12" cy="12" r="1.2" fill="#f6b40e" stroke="#85340a" strokeWidth="0.25" />
    </svg>
  );
}

function BanderaReinoUnido() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full">
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="4.2" />
      <path d="M0 0 24 24M24 0 0 24" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7" />
      <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="4" />
    </svg>
  );
}

const IDIOMAS: {
  id: Idioma;
  /** Se muestra en su propio idioma: quien no lee español tiene que
      poder encontrar "English". */
  nombre: string;
  Bandera: () => React.JSX.Element;
}[] = [
  { id: "es", nombre: "Español (Argentina)", Bandera: BanderaArgentina },
  { id: "en", nombre: "English", Bandera: BanderaReinoUnido },
];

/**
 * Botón con la bandera del idioma actual. Abre una lista corta debajo;
 * elegir uno cambia todo el sitio al instante.
 */
export default function SelectorIdioma() {
  const { idioma, setIdioma, t } = useIdioma();
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  /* Cierra con Esc o con un clic afuera. */
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    const alClicAfuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);
    window.addEventListener("pointerdown", alClicAfuera);
    return () => {
      window.removeEventListener("keydown", alTeclear);
      window.removeEventListener("pointerdown", alClicAfuera);
    };
  }, [abierto]);

  const actual = IDIOMAS.find((i) => i.id === idioma) ?? IDIOMAS[0];

  return (
    <div ref={caja} className="relative justify-self-end">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-label={`${t("Idioma")}: ${actual.nombre}`}
        className="ease-premium flex size-10 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span className="block size-6 overflow-hidden rounded-full ring-1 ring-white/30">
          <actual.Bandera />
        </span>
      </button>

      <AnimatePresence>
        {abierto && (
          <motion.ul
            role="listbox"
            aria-label={t("Elegir idioma")}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: CURVA }}
            style={{ transformOrigin: "top right" }}
            className="absolute top-full right-0 mt-2 w-64 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_20px_48px_-12px_rgb(0_0_0/0.45)]"
          >
            {IDIOMAS.map(({ id, nombre, Bandera }) => {
              const elegido = id === idioma;
              return (
                <li key={id} role="option" aria-selected={elegido}>
                  <button
                    type="button"
                    onClick={() => {
                      setIdioma(id);
                      setAbierto(false);
                    }}
                    className={`text-near flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                      elegido ? "bg-[#ececef]" : "hover:bg-[#f4f4f6]"
                    }`}
                  >
                    <span className="block size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-black/15">
                      <Bandera />
                    </span>
                    <span className="flex-1">{nombre}</span>
                    {elegido && <Check size={16} weight="bold" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
