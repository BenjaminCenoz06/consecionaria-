"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import MenuPanel from "./MenuPanel";

const CURVA = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  /* Sobre el hero la barra es transparente: flota encima del video.
     Cuando el hero termina de pasar bajo la barra, toma un velo oscuro
     con desenfoque, lo justo para leerse sobre las secciones claras sin
     dejar de sentirse de vidrio. Se observa el hero con un
     IntersectionObserver (nada de listeners de scroll): el margen
     superior de -80px es el alto aproximado de la barra. */
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      /* Páginas sin hero: el velo aparece apenas se baja un poco. */
      const alScroll = () => setConFondo(window.scrollY > 24);
      alScroll();
      window.addEventListener("scroll", alScroll, { passive: true });
      return () => window.removeEventListener("scroll", alScroll);
    }

    const observador = new IntersectionObserver(
      ([entrada]) => setConFondo(!entrada.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    observador.observe(hero);
    return () => observador.disconnect();
  }, []);

  /* Bloquea el scroll de fondo mientras el panel está abierto. */
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barra a todo el ancho, sin caja ni borde: tres columnas (menú,
          logo centrado, acción). Detrás, un velo que nace del borde
          superior y se desvanece hacia abajo, así que nunca hay una
          línea donde "termina" la barra. Siempre hay un velo leve, para
          que se lea sobre fotos claras; al pasar el hero se refuerza. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className={`ease-premium pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/90 via-black/55 to-transparent transition-opacity duration-700 ${
          conFondo ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative grid h-[68px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:h-[76px] lg:px-[5vw]">
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="panel-menu"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className="group flex h-10 items-center gap-3 justify-self-start"
        >
          {/* Las dos líneas se transforman en X, no se reemplazan. */}
          <span className="relative block h-4 w-5">
            <motion.span
              className="bg-bone absolute left-0 block h-px w-5"
              animate={abierto ? { top: 8, rotate: 45 } : { top: 3, rotate: 0 }}
              transition={{ duration: 0.5, ease: CURVA }}
            />
            <motion.span
              className="bg-bone absolute left-0 block h-px w-5"
              animate={abierto ? { top: 8, rotate: -45 } : { top: 12, rotate: 0 }}
              transition={{ duration: 0.5, ease: CURVA }}
            />
          </span>
          <span className="type-normal text-bone over-media text-sm font-semibold transition-opacity duration-300 group-hover:opacity-70">
            Menú
          </span>
        </button>

        <a
          href="#top"
          className="type-condensed text-bone over-media pl-[0.34em] text-[1.45rem] font-bold tracking-[0.34em] uppercase transition-opacity duration-300 hover:opacity-80 lg:text-[1.75rem]"
          aria-label="Vértice, inicio"
        >
          Vértice
        </a>

        <a
          href="#reservar"
          className="border-bone/70 text-bone over-media type-normal hover:bg-bone hover:text-ink hidden justify-self-end border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 sm:inline-block"
        >
          Reservar prueba
        </a>
      </div>

      {/* Panel de navegación: lista de secciones + tarjetas con imagen. */}
      <MenuPanel abierto={abierto} onCerrar={() => setAbierto(false)} />
    </header>
  );
}
