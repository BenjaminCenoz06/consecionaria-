"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import TarjetaImagen from "./TarjetaImagen";
import { AUTOS, formatoUSD } from "@/lib/catalogo";
import { useIdioma } from "@/lib/idioma";
import { CATEGORIAS, paginasDe, type Texto } from "@/lib/sitio";

/** La curva del sitio. El panel y las tarjetas usan la misma. */
const CURVA = [0.22, 1, 0.36, 1] as const;

const T = (es: string, en: string): Texto => ({ es, en });

const BASE_MODELO = (id: string) => AUTOS.find((m) => m.id === id) ?? AUTOS[0];

/** Enlaces que se suman a los de las páginas de cada categoría. */
const EXTRAS: Record<string, { etiqueta: Texto; href: string }[]> = {
  "electricos-hibridos": [
    {
      etiqueta: T("Reservar una prueba de manejo", "Book a test drive"),
      href: "/experiencia/prueba-de-manejo",
    },
  ],
  compra: [
    { etiqueta: T("Cómo funciona", "How it works"), href: "/#como-funciona" },
    { etiqueta: T("Preguntas frecuentes", "FAQ"), href: "/#preguntas" },
  ],
  experiencia: [
    {
      etiqueta: T("Selección de la semana", "Selection of the week"),
      href: "/#destacados",
    },
  ],
};

export default function MenuPanel({
  abierto,
  onCerrar,
}: {
  abierto: boolean;
  onCerrar: () => void;
}) {
  const sinMovimiento = useReducedMotion();
  const { idioma, l, t } = useIdioma();
  const [activo, setActivo] = useState(CATEGORIAS[0].id);
  /* En pantallas chicas es un "drill-down": lista → detalle. */
  const [detalleMovil, setDetalleMovil] = useState(false);
  const botonCerrar = useRef<HTMLButtonElement>(null);

  const categoria = CATEGORIAS.find((c) => c.id === activo) ?? CATEGORIAS[0];

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

  /* Los enlaces de texto de la categoría activa: sus páginas más los
     extras (anclas de la home, prueba de manejo…). */
  const enlaces = [
    ...(categoria.id === "modelos" || categoria.id === "concesionario"
      ? []
      : paginasDe(categoria.id)
          /* "Carga y autonomía" ya tiene su tarjeta de imagen. */
          .filter((p) => !p.slug.endsWith("carga-y-autonomia"))
          .map((p) => ({ etiqueta: p.nombre, href: `/${p.slug}` }))),
    ...(EXTRAS[categoria.id] ?? []),
  ];

  const entrada = (retardo: number, y = 16) =>
    sinMovimiento
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: retardo, ease: CURVA },
        };

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          id="panel-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("Menú principal")}
          className="fixed inset-0 z-[70] flex"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Fondo: la página queda atrás, desenfocada y oscurecida. Un
              clic afuera cierra, como en la referencia. */}
          <motion.button
            type="button"
            aria-label={t("Cerrar menú")}
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
            {/* Columna 1: categorías. */}
            <div
              className={`flex w-full flex-col bg-white px-3 pt-6 pb-8 lg:w-[420px] lg:shrink-0 lg:px-4 lg:pt-24 ${
                detalleMovil ? "max-lg:hidden" : ""
              }`}
            >
              <div className="mb-6 flex items-center justify-between px-3 lg:hidden">
                <span className="type-condensed text-xl font-bold uppercase">
                  Bárcena
                </span>
                <button
                  type="button"
                  ref={botonCerrar}
                  onClick={onCerrar}
                  aria-label={t("Cerrar menú")}
                  className="flex size-10 items-center justify-center rounded-full bg-black/5"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <nav aria-label={t("Secciones")}>
                <ul className="flex flex-col gap-1">
                  {CATEGORIAS.map((c, i) => {
                    const esActivo = c.id === activo;
                    return (
                      <motion.li
                        key={c.id}
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
                            setActivo(c.id);
                            setDetalleMovil(true);
                          }}
                          onMouseEnter={() => setActivo(c.id)}
                          onFocus={() => setActivo(c.id)}
                          aria-current={esActivo ? "true" : undefined}
                          className={`group flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-left text-[1.05rem] font-medium transition-colors duration-300 ${
                            esActivo ? "bg-[#ececef]" : "hover:bg-[#f4f4f6]"
                          }`}
                        >
                          <span className="type-normal">{l(c.etiqueta)}</span>
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

              <motion.div
                {...entrada(0.55)}
                className="mt-auto"
              >
                <Link
                  href="/#reservar"
                  onClick={onCerrar}
                  className="bg-near destello type-normal block rounded-full px-6 py-4 text-center text-sm font-semibold text-white uppercase"
                >
                  {t("Reservar prueba")}
                </Link>
              </motion.div>
            </div>

            {/* Columna 2: detalle de la categoría. */}
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
                <CaretLeft size={16} /> {t("Volver")}
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={categoria.id}
                  initial={sinMovimiento ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.4, ease: CURVA }}
                >
                  {categoria.id === "concesionario" ? (
                    /* Un solo botón ancho, como en la referencia. */
                    <motion.div {...entrada(0.05)}>
                      <Link
                        href="/concesionario"
                        onClick={onCerrar}
                        className="group flex items-center justify-between rounded-xl bg-[#e6e6ea] px-5 py-4 text-[1.05rem] font-medium transition-colors duration-300 hover:bg-[#dcdce1]"
                      >
                        <span className="type-normal">
                          {t("Ubicación y contacto")}
                        </span>
                        <ArrowRight
                          size={18}
                          className="ease-premium transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <Link
                        href={categoria.href}
                        onClick={onCerrar}
                        className="group flex items-center justify-between py-3 text-[1.05rem] font-medium"
                      >
                        <span className="type-normal">{t("Visión general")}</span>
                        <ArrowRight
                          size={16}
                          className="ease-premium transition-transform duration-500 group-hover:translate-x-1"
                        />
                      </Link>

                      {/* Modelos: nombre, auto y etiquetas, como la lista
                          de la referencia. */}
                      {categoria.id === "modelos" && (
                        <ul className="mt-2 flex flex-col gap-7">
                          {AUTOS.map((m, i) => (
                            <motion.li
                              key={m.id}
                              {...entrada(0.06 + Math.min(i, 6) * 0.05, 22)}
                            >
                              <Link
                                href={`/modelos/${m.id}`}
                                onClick={onCerrar}
                                className="group block"
                              >
                                <p className="type-normal flex items-baseline justify-between gap-3 text-[1.1rem] font-medium">
                                  <span>
                                    {m.marca} {m.nombre}
                                  </span>
                                  <span className="text-sm font-normal text-[#6b6b72]">
                                    {formatoUSD(m.precio, idioma)}
                                  </span>
                                </p>
                                <span className="relative mt-2 block h-[104px] w-full max-w-[250px]">
                                  <Image
                                    src={m.foto}
                                    alt={t(m.alt)}
                                    fill
                                    sizes="250px"
                                    quality={75}
                                    draggable={false}
                                    className="origin-left object-contain object-left transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.07]"
                                  />
                                </span>
                                <span className="mt-2 flex flex-wrap gap-2">
                                  {m.combustible.map((e) => (
                                    <span
                                      key={e}
                                      className="type-normal rounded-full bg-white px-3 py-1 text-[11px] font-medium"
                                    >
                                      {t(e)}
                                    </span>
                                  ))}
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      {/* Eléctricos e híbridos: dos tarjetas de imagen. */}
                      {categoria.id === "electricos-hibridos" && (
                        <ul className="mt-2 flex flex-col gap-3">
                          {[
                            {
                              titulo: T(
                                "Modelos eléctricos e híbridos",
                                "Electric and hybrid models",
                              ),
                              href: "/electricos-hibridos",
                              auto: "tesla-model-s",
                            },
                            {
                              titulo: T("Carga y autonomía", "Charging & range"),
                              href: "/electricos-hibridos/carga-y-autonomia",
                              auto: "bmw-i8",
                            },
                          ].map((c, i) => {
                            const auto = BASE_MODELO(c.auto);
                            return (
                              <motion.li
                                key={c.href + c.auto}
                                {...entrada(0.08 + i * 0.07, 28)}
                              >
                                <div onClick={onCerrar}>
                                  <TarjetaImagen
                                    href={c.href}
                                    titulo={l(c.titulo)}
                                    imagen={auto.foto}
                                    alt={t(auto.alt)}
                                    inclinar={false}
                                    aspecto="aspect-[16/10]"
                                  />
                                </div>
                              </motion.li>
                            );
                          })}
                        </ul>
                      )}

                      {/* Enlaces de texto. */}
                      {enlaces.length > 0 && (
                        <ul className="mt-3 flex flex-col">
                          {enlaces.map((e, i) => (
                            <motion.li
                              key={e.href}
                              {...entrada(0.08 + i * 0.05, 12)}
                            >
                              <Link
                                href={e.href}
                                onClick={onCerrar}
                                className="group flex items-center justify-between py-3 text-[1.05rem] font-medium transition-colors duration-300 hover:text-[#c5161c]"
                              >
                                <span className="type-normal">{l(e.etiqueta)}</span>
                                <ArrowRight
                                  size={16}
                                  className="ease-premium -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Cerrar, en escritorio: junto al borde del panel, sobre el
                fondo desenfocado. */}
            <button
              type="button"
              onClick={onCerrar}
              aria-label={t("Cerrar menú")}
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
