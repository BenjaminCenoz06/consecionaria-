"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const CURVA = [0.22, 1, 0.36, 1] as const;

const ENLACES = [
  { href: "#stock", etiqueta: "Stock" },
  { href: "#como-funciona", etiqueta: "Cómo funciona" },
  { href: "#showroom", etiqueta: "Showroom" },
  { href: "#preguntas", etiqueta: "Preguntas" },
] as const;

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState<string>("");
  const sinMovimiento = useReducedMotion();

  /* Scroll-spy: marca en el menú la sección que se está mirando.
     IntersectionObserver, nunca un listener de scroll sin throttle. */
  useEffect(() => {
    const secciones = ENLACES.map((e) =>
      document.querySelector(e.href),
    ).filter((n): n is Element => n !== null);

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActivo("#" + visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    secciones.forEach((s) => observador.observe(s));
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
    <header className="fixed top-4 right-0 left-0 z-50">
      <div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1320px] items-center justify-between border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl">
        <a
          href="#top"
          className="type-condensed text-bone text-xl font-bold uppercase"
          aria-label="Vértice, inicio"
        >
          Vértice
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {ENLACES.map((enlace) => {
            const esActivo = activo === enlace.href;
            return (
              <a
                key={enlace.href}
                href={enlace.href}
                aria-current={esActivo ? "true" : undefined}
                className={`type-normal relative text-sm font-semibold uppercase transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  esActivo ? "text-bone" : "text-graphite hover:text-bone"
                }`}
              >
                {enlace.etiqueta}
                {esActivo && (
                  <motion.span
                    layoutId="nav-activo"
                    className="bg-brass absolute -bottom-1.5 left-0 h-px w-full"
                    transition={{ duration: 0.5, ease: CURVA }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reservar"
            className="bg-bone text-ink type-normal hidden px-3 py-2 text-sm font-semibold uppercase transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.98] sm:inline-block"
          >
            Reservar prueba
          </a>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="panel-menu"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            {/* Las dos líneas se transforman en X, no se reemplazan. */}
            <span className="relative block h-4 w-6">
              <motion.span
                className="bg-bone absolute left-0 block h-0.5 w-6"
                animate={
                  abierto ? { top: 7, rotate: 45 } : { top: 2, rotate: 0 }
                }
                transition={{ duration: 0.5, ease: CURVA }}
              />
              <motion.span
                className="bg-bone absolute left-0 block h-0.5 w-6"
                animate={
                  abierto ? { top: 7, rotate: -45 } : { top: 12, rotate: 0 }
                }
                transition={{ duration: 0.5, ease: CURVA }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="panel-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: CURVA }}
            className="fixed inset-0 -z-10 h-dvh bg-black/95 px-6 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Menú móvil" className="flex flex-col">
              {[...ENLACES, { href: "#reservar", etiqueta: "Reservar prueba" }].map(
                (enlace, i) => (
                  <motion.a
                    key={enlace.href}
                    href={enlace.href}
                    onClick={() => setAbierto(false)}
                    initial={
                      sinMovimiento ? { opacity: 0 } : { opacity: 0, y: 24 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      /* 60ms por ítem, tope de 400ms en total. */
                      delay: Math.min(i * 0.06, 0.4),
                      ease: CURVA,
                    }}
                    className="display-tight text-bone border-hairline border-b py-5 text-4xl"
                  >
                    {enlace.etiqueta}
                  </motion.a>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
