"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { MODELOS } from "@/lib/modelos";
import { DESTACADOS } from "@/lib/destacados";

/** La curva del sitio. El panel y las tarjetas usan la misma. */
const CURVA = [0.22, 1, 0.36, 1] as const;

type Tarjeta = {
  titulo: string;
  subtitulo?: string;
  imagen: string;
  alt: string;
  href: string;
  /** Recorte con alfa (autos): lleva fondo de estudio. Foto: llena. */
  recorte: boolean;
};

type Enlace = { etiqueta: string; href: string };

type Seccion = {
  id: string;
  etiqueta: string;
  /** Enlace principal de la sección ("Visión general"). */
  href: string;
  tarjetas?: Tarjeta[];
  enlaces?: Enlace[];
};

const SECCIONES: Seccion[] = [
  {
    id: "modelos",
    etiqueta: "Modelos",
    href: "#modelos",
    tarjetas: MODELOS.slice(0, 4).map((m) => ({
      titulo: `${m.marca} ${m.nombre}.`,
      subtitulo: m.lema,
      imagen: m.foto,
      alt: m.alt,
      href: "#modelos",
      recorte: true,
    })),
    enlaces: [{ etiqueta: "Reservar una prueba de manejo", href: "#reservar" }],
  },
  {
    id: "destacados",
    etiqueta: "Selección de la semana",
    href: "#destacados",
    tarjetas: DESTACADOS.slice(0, 3).map((d) => ({
      titulo: `${d.marca} ${d.nombre}.`,
      imagen: d.foto,
      alt: d.alt,
      href: "#destacados",
      recorte: true,
    })),
  },
  {
    id: "como-funciona",
    etiqueta: "Cómo funciona",
    href: "#como-funciona",
    enlaces: [
      { etiqueta: "Elegís la unidad", href: "#como-funciona" },
      { etiqueta: "La probás 40 minutos", href: "#como-funciona" },
      { etiqueta: "Te la llevás en 48 horas", href: "#como-funciona" },
    ],
  },
  {
    id: "showroom",
    etiqueta: "Showroom",
    href: "#ubicacion",
    tarjetas: [
      {
        titulo: "Visitá el showroom.",
        subtitulo: "Núñez, Buenos Aires",
        imagen: "/showroom/showroom.webp",
        alt: "Interior del showroom de Vértice Automotores",
        href: "#ubicacion",
        recorte: false,
      },
    ],
    enlaces: [{ etiqueta: "Cómo llegar y horarios", href: "#ubicacion" }],
  },
  {
    id: "preguntas",
    etiqueta: "Preguntas",
    href: "#preguntas",
    enlaces: [
      { etiqueta: "¿Qué cubre la garantía?", href: "#preguntas" },
      { etiqueta: "Permuta y financiación", href: "#preguntas" },
      { etiqueta: "¿Necesito turno?", href: "#preguntas" },
    ],
  },
];

export default function MenuPanel({
  abierto,
  onCerrar,
}: {
  abierto: boolean;
  onCerrar: () => void;
}) {
  const sinMovimiento = useReducedMotion();
  const [activo, setActivo] = useState(SECCIONES[0].id);
  /* En pantallas chicas es un "drill-down": lista → detalle. */
  const [detalleMovil, setDetalleMovil] = useState(false);
  const botonCerrar = useRef<HTMLButtonElement>(null);

  const seccion = SECCIONES.find((s) => s.id === activo) ?? SECCIONES[0];

  useEffect(() => {
    if (!abierto) return;
    setDetalleMovil(false);
    botonCerrar.current?.focus();
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto, onCerrar]);

  const duracion = sinMovimiento ? 0 : 0.6;

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          id="panel-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="fixed inset-0 z-[70] flex"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Fondo: la página queda atrás, desenfocada y oscurecida. Un
              clic afuera cierra, como en la referencia. */}
          <motion.button
            type="button"
            aria-label="Cerrar menú"
            onClick={onCerrar}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: sinMovimiento ? 0 : 0.5, ease: CURVA }}
            className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-xl backdrop-saturate-150"
          />

          {/* Panel: sale desde la izquierda. Dos columnas en escritorio. */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: duracion, ease: CURVA }}
            className="text-near relative flex h-dvh w-full max-w-full lg:max-w-[1010px]"
          >
            {/* Columna 1: secciones. */}
            <div
              className={`flex w-full flex-col bg-white px-3 pt-6 pb-8 lg:w-[420px] lg:shrink-0 lg:px-4 lg:pt-24 ${
                detalleMovil ? "max-lg:hidden" : ""
              }`}
            >
              <div className="mb-6 flex items-center justify-between px-3 lg:hidden">
                <span className="type-condensed text-xl font-bold uppercase">
                  Vértice
                </span>
                <button
                  type="button"
                  ref={botonCerrar}
                  onClick={onCerrar}
                  aria-label="Cerrar menú"
                  className="flex size-10 items-center justify-center rounded-full bg-black/5"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <nav aria-label="Secciones">
                <ul className="flex flex-col gap-1">
                  {SECCIONES.map((s, i) => {
                    const esActivo = s.id === activo;
                    return (
                      <motion.li
                        key={s.id}
                        initial={sinMovimiento ? false : { opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: sinMovimiento ? 0 : 0.18 + i * 0.05,
                          ease: CURVA,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActivo(s.id);
                            setDetalleMovil(true);
                          }}
                          onMouseEnter={() => setActivo(s.id)}
                          onFocus={() => setActivo(s.id)}
                          aria-current={esActivo ? "true" : undefined}
                          className={`group flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-[1.05rem] font-medium transition-colors duration-300 ${
                            esActivo ? "bg-[#ececef]" : "hover:bg-[#f4f4f6]"
                          }`}
                        >
                          <span className="type-normal">{s.etiqueta}</span>
                          <CaretRight
                            size={16}
                            weight="regular"
                            className={`ease-premium transition-transform duration-500 ${
                              esActivo ? "translate-x-1" : ""
                            }`}
                          />
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.a
                href="#reservar"
                onClick={onCerrar}
                initial={sinMovimiento ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: CURVA }}
                className="bg-near destello type-normal mt-auto rounded-full px-6 py-4 text-center text-sm font-semibold text-white uppercase"
              >
                Reservar prueba
              </motion.a>
            </div>

            {/* Columna 2: detalle de la sección. */}
            <div
              className={`ease-premium w-full overflow-y-auto bg-[#f1f1f4] px-5 pt-6 pb-10 lg:block lg:px-10 lg:pt-24 ${
                detalleMovil ? "" : "max-lg:hidden"
              }`}
            >
              <button
                type="button"
                onClick={() => setDetalleMovil(false)}
                className="mb-6 flex items-center gap-2 text-sm font-medium lg:hidden"
              >
                <CaretLeft size={16} /> Volver
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={seccion.id}
                  initial={sinMovimiento ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.4, ease: CURVA }}
                >
                  <a
                    href={seccion.href}
                    onClick={onCerrar}
                    className="group flex items-center justify-between py-3 text-[1.05rem] font-medium"
                  >
                    <span className="type-normal">Visión general</span>
                    <ArrowRight
                      size={16}
                      className="ease-premium transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </a>

                  {seccion.tarjetas && (
                    <ul className="mt-2 flex flex-col gap-3">
                      {seccion.tarjetas.map((t, i) => (
                        <motion.li
                          key={t.titulo}
                          initial={
                            sinMovimiento ? false : { opacity: 0, y: 28 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: sinMovimiento ? 0 : 0.08 + i * 0.07,
                            ease: CURVA,
                          }}
                        >
                          <TarjetaMenu tarjeta={t} onClick={onCerrar} />
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {seccion.enlaces && (
                    <ul className="mt-4 flex flex-col">
                      {seccion.enlaces.map((e, i) => (
                        <motion.li
                          key={e.etiqueta}
                          initial={sinMovimiento ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: sinMovimiento ? 0 : 0.1 + i * 0.05,
                            ease: CURVA,
                          }}
                        >
                          <a
                            href={e.href}
                            onClick={onCerrar}
                            className="hover:text-brass block py-3 text-[1.05rem] font-medium transition-colors duration-300"
                          >
                            {e.etiqueta}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Cerrar, en escritorio: junto al borde del panel, sobre el
                fondo desenfocado. */}
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar menú"
              className="absolute top-6 -right-16 hidden size-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/30 lg:flex"
            >
              <X size={18} weight="bold" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Tarjeta de imagen del menú. Mismo lenguaje que la referencia: 24px de
 * radio, el nombre abajo a la izquierda, botón circular translúcido
 * abajo a la derecha, degradado oscuro bajo el texto y la imagen que se
 * acerca despacio al pasar el puntero (0.4s, curva suave).
 */
function TarjetaMenu({
  tarjeta,
  onClick,
}: {
  tarjeta: Tarjeta;
  onClick: () => void;
}) {
  return (
    <a
      href={tarjeta.href}
      onClick={onClick}
      className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-[#121212] [transform:translateZ(0)]"
    >
      {tarjeta.recorte && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_66%_at_50%_36%,#3a3a3a,#121212_72%)]"
        />
      )}

      <Image
        src={tarjeta.imagen}
        alt={tarjeta.alt}
        fill
        sizes="(min-width: 1024px) 460px, 92vw"
        quality={85}
        draggable={false}
        className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06] ${
          tarjeta.recorte
            ? "object-contain object-center px-6 pt-6 pb-16"
            : "object-cover object-center"
        }`}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/85 via-black/40 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="type-normal text-bone text-[1.2rem] leading-tight font-medium">
            {tarjeta.titulo}
          </p>
          {tarjeta.subtitulo && (
            <p className="text-bone/70 mt-0.5 text-sm">{tarjeta.subtitulo}</p>
          )}
        </div>

        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white/45"
        >
          <ArrowRight
            size={16}
            className="ease-premium transition-transform duration-500 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </a>
  );
}
