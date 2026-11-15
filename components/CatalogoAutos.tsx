"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, X } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import EncabezadoPagina from "./EncabezadoPagina";
import BandaCta from "./BandaCta";
import ZonaClara from "./ZonaClara";
import { useIdioma } from "@/lib/idioma";
import {
  AUTOS,
  COMBUSTIBLES,
  MARCAS,
  formatoDecimal,
  formatoUSD,
  hrefCompra,
  type Auto,
} from "@/lib/catalogo";
import { categoriaPorId } from "@/lib/sitio";

const CURVA = [0.22, 1, 0.36, 1] as const;
const MAX_COMPARAR = 3;

type Orden = "precio-asc" | "precio-desc" | "potencia" | "rapidez";

/** Tarjeta de producto: el auto sale por encima del borde de la tarjeta
    y gira con el puntero; debajo, precio, etiquetas, cifras y botones. */
function CartaProducto({
  auto,
  elegido,
  alElegir,
  puedeElegir,
}: {
  auto: Auto;
  elegido: boolean;
  alElegir: () => void;
  puedeElegir: boolean;
}) {
  const { idioma, l, t } = useIdioma();

  const cifras = [
    { valor: `${formatoDecimal(auto.aceleracion, idioma)} s`, rotulo: t("0 – 100 km/h") },
    { valor: `${auto.kw} kW / ${auto.cv} CV`, rotulo: t("Potencia") },
    { valor: `${auto.vmax} km/h`, rotulo: t("Velocidad máxima") },
  ];

  return (
    <Tilt3D grados={5} escala={1.015} brillo={false} className="h-full rounded-[2rem]">
      <article
        className="relative h-full pt-9 md:pt-16"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Link
          href={hrefCompra(auto.id)}
          aria-label={`${t("Comprar")} ${auto.marca} ${auto.nombre}`}
          className="group absolute inset-x-0 top-0 z-10 block h-[84px] md:h-[150px]"
          style={{ transform: "translateZ(70px)" }}
        >
          {/* Sombra de apoyo barata (un degradé), no `drop-shadow`: con 16
              fotos grandes en pantalla el filtro pesa demasiado. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[14%] h-5 w-[72%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.38),transparent_70%)]"
          />
          <Image
            src={auto.foto}
            alt={t(auto.alt)}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 90vw"
            quality={90}
            draggable={false}
            className="ease-premium object-contain object-bottom px-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.06]"
          />
        </Link>

        <div className="border-linea bg-tarjeta text-tinta flex h-full flex-col rounded-[2rem] border px-3 pt-14 pb-3 shadow-[0_1px_1px_rgb(0_0_0/0.04),0_14px_28px_-12px_rgb(0_0_0/0.14),0_36px_60px_-30px_rgb(0_0_0/0.22)]">
          <h3 className="type-normal text-[0.95rem] leading-tight font-normal md:text-2xl md:font-light">
            {auto.marca} {auto.nombre}
          </h3>
          <p className="type-normal mt-1 text-xs text-[#6b6b72] md:text-sm">
            {formatoUSD(auto.precio, idioma)}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
            <span className="type-normal bg-linea text-tinta rounded-full px-3 py-1 text-[11px] font-medium">
              {auto.anio}
            </span>
            <span className="type-normal bg-linea text-tinta rounded-full px-3 py-1 text-[11px] font-medium">
              {l(auto.clase)}
            </span>
            {auto.combustible.map((c) => (
              <span
                key={c}
                className="type-normal bg-linea text-tinta rounded-full px-3 py-1 text-[11px] font-medium"
              >
                {t(c)}
              </span>
            ))}
          </div>

          <dl className="mt-6 hidden space-y-4 md:block">
            {cifras.map((c) => (
              <div key={c.rotulo}>
                <dd className="type-normal text-lg font-normal">{c.valor}</dd>
                <dt className="text-xs text-[#6b6b72]">{c.rotulo}</dt>
              </div>
            ))}
          </dl>

          <Link
            href={`/modelos/${auto.id}`}
            className="mt-6 hidden text-sm underline underline-offset-4 transition-opacity duration-300 hover:opacity-70 md:block"
          >
            {t("Datos técnicos y equipamiento")}
          </Link>

          <div className="mt-auto flex flex-wrap gap-2 pt-3 md:pt-6">
            <Link
              href={hrefCompra(auto.id)}
              className="type-normal destello inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-[#010205] px-4 text-sm font-medium whitespace-nowrap text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] md:h-11"
            >
              {t("Comprar")}
            </Link>
            <Link
              href="/#reservar"
              className="type-normal hidden h-11 flex-1 items-center justify-center rounded-xl bg-[#e4e4e8] px-4 text-sm font-medium whitespace-nowrap text-[#202020] transition-colors duration-300 hover:bg-[#d4d4da] md:inline-flex"
            >
              {t("Reservar prueba")}
            </Link>
          </div>

          <label
            className={`type-normal mt-2.5 flex w-fit items-center gap-2 text-xs md:mt-4 md:text-sm ${
              puedeElegir || elegido ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          >
            <input
              type="checkbox"
              checked={elegido}
              disabled={!puedeElegir && !elegido}
              onChange={alElegir}
              className="size-4 accent-[#010205]"
            />
            {t("Comparar")}
          </label>
        </div>
      </article>
    </Tilt3D>
  );
}

/** Tabla comparativa en una ventana. */
function Comparador({
  autos,
  alCerrar,
}: {
  autos: Auto[];
  alCerrar: () => void;
}) {
  const { idioma, l, t } = useIdioma();

  const filas: { rotulo: string; valor: (a: Auto) => string }[] = [
    { rotulo: t("Precio"), valor: (a) => formatoUSD(a.precio, idioma) },
    { rotulo: t("Año"), valor: (a) => String(a.anio) },
    { rotulo: t("Clase"), valor: (a) => l(a.clase) },
    { rotulo: t("Tipo de motor"), valor: (a) => a.combustible.map((c) => t(c)).join(", ") },
    { rotulo: t("0 – 100 km/h"), valor: (a) => `${formatoDecimal(a.aceleracion, idioma)} s` },
    { rotulo: t("Potencia"), valor: (a) => `${a.kw} kW / ${a.cv} CV` },
    { rotulo: t("Velocidad máxima"), valor: (a) => `${a.vmax} km/h` },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={alCerrar}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t("Comparar")}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.45, ease: CURVA }}
        className="max-h-[92dvh] w-full max-w-[1000px] overflow-auto rounded-t-3xl bg-white p-6 text-[#202020] sm:rounded-[2rem] sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="type-normal text-3xl font-light">{t("Comparar")}</h2>
          <button
            type="button"
            onClick={alCerrar}
            aria-label={t("Cerrar")}
            className="flex size-10 items-center justify-center rounded-full bg-[#ececef] transition-colors duration-300 hover:bg-[#dcdce1]"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[26%]" />
                {autos.map((a) => (
                  <th key={a.id} className="px-3 pb-6 align-bottom">
                    <div className="relative mb-3 h-[88px]">
                      <Image
                        src={a.foto}
                        alt={t(a.alt)}
                        fill
                        sizes="240px"
                        quality={75}
                        className="object-contain object-bottom"
                      />
                    </div>
                    <p className="type-normal text-lg font-medium">
                      {a.marca} {a.nombre}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.rotulo} className="border-t border-[#e4e4e8]">
                  <th className="py-4 pr-3 text-sm font-normal text-[#6b6b72]">
                    {f.rotulo}
                  </th>
                  {autos.map((a) => (
                    <td key={a.id} className="type-normal px-3 py-4 text-base">
                      {f.valor(a)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-[#e4e4e8]">
                <th />
                {autos.map((a) => (
                  <td key={a.id} className="px-3 py-5">
                    <Link
                      href={hrefCompra(a.id)}
                      className="type-normal inline-flex h-11 items-center rounded-xl bg-[#010205] px-5 text-sm font-medium text-white"
                    >
                      {t("Comprar")}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * La tienda: todos los autos con filtros por marca y motor, orden por
 * precio o rendimiento, y un comparador de hasta tres. Las tarjetas se
 * vuelven a montar al cambiar de filtro, así que entran de nuevo con la
 * animación del sitio.
 */
export default function CatalogoAutos() {
  const { l, t } = useIdioma();
  const categoria = categoriaPorId("modelos");

  const [marca, setMarca] = useState<string>("Todas");
  const [motores, setMotores] = useState<string[]>([]);
  const [orden, setOrden] = useState<Orden>("precio-asc");
  const [elegidos, setElegidos] = useState<string[]>([]);
  const [comparando, setComparando] = useState(false);
  /* En celular los filtros van plegados: la lista de marcas ocupa una
     pantalla entera y el visitante vino a ver autos. */
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const visibles = useMemo(() => {
    const lista = AUTOS.filter(
      (a) =>
        (marca === "Todas" || a.marca === marca) &&
        (motores.length === 0 || motores.some((m) => a.combustible.includes(m))),
    );
    const por: Record<Orden, (a: Auto, b: Auto) => number> = {
      "precio-asc": (a, b) => a.precio - b.precio,
      "precio-desc": (a, b) => b.precio - a.precio,
      potencia: (a, b) => b.cv - a.cv,
      rapidez: (a, b) => a.aceleracion - b.aceleracion,
    };
    return [...lista].sort(por[orden]);
  }, [marca, motores, orden]);

  const alternarMotor = (m: string) =>
    setMotores((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));

  const alternarComparar = (id: string) =>
    setElegidos((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : p.length < MAX_COMPARAR ? [...p, id] : p,
    );

  const autosElegidos = elegidos
    .map((id) => AUTOS.find((a) => a.id === id))
    .filter((a): a is Auto => Boolean(a));

  const hayFiltros = marca !== "Todas" || motores.length > 0;

  return (
    <>
      <EncabezadoPagina
        titulo={categoria ? l(categoria.etiqueta) : "Modelos"}
        bajada={categoria ? l(categoria.bajada) : ""}
        auto={categoria?.auto}
        migas={[
          { texto: t("Inicio"), href: "/" },
          { texto: categoria ? l(categoria.etiqueta) : "Modelos", href: "/modelos" },
        ]}
      />

      <ZonaClara>
        <section className="py-10 lg:py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-12">
              {/* Filtros. */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <button
                  type="button"
                  aria-expanded={filtrosAbiertos}
                  onClick={() => setFiltrosAbiertos((v) => !v)}
                  className="border-linea bg-tarjeta text-tinta type-normal flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium lg:hidden"
                >
                  <span>
                    {t("Filtros")}
                    {hayFiltros
                      ? ` (${(marca !== "Todas" ? 1 : 0) + motores.length})`
                      : ""}
                  </span>
                  <CaretDown
                    size={16}
                    weight="bold"
                    className={`ease-premium transition-transform duration-500 ${
                      filtrosAbiertos ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`${filtrosAbiertos ? "mt-5 block" : "hidden"} lg:mt-0 lg:block`}
                >
                <fieldset>
                  <legend className="type-normal text-tinta text-lg font-semibold">
                    {t("Marca")}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-y-1">
                    {["Todas", ...MARCAS].map((m) => {
                      const cantidad =
                        m === "Todas"
                          ? AUTOS.length
                          : AUTOS.filter((a) => a.marca === m).length;
                      return (
                        <label
                          key={m}
                          className="type-normal text-tinta flex cursor-pointer items-center gap-2.5 py-1 text-sm"
                        >
                          <input
                            type="radio"
                            name="marca"
                            checked={marca === m}
                            onChange={() => setMarca(m)}
                            className="size-4 accent-[#010205]"
                          />
                          {m === "Todas" ? t("Todas") : m}{" "}
                          <span className="text-graphite">({cantidad})</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="type-normal text-tinta text-lg font-semibold">
                    {t("Tipo de motor")}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-y-1">
                    {COMBUSTIBLES.map((c) => (
                      <label
                        key={c}
                        className="type-normal text-tinta flex cursor-pointer items-center gap-2.5 py-1 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={motores.includes(c)}
                          onChange={() => alternarMotor(c)}
                          className="size-4 accent-[#010205]"
                        />
                        {t(c)}{" "}
                        <span className="text-graphite">
                          ({AUTOS.filter((a) => a.combustible.includes(c)).length})
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-8">
                  <label
                    htmlFor="orden"
                    className="type-normal text-tinta block text-lg font-semibold"
                  >
                    {t("Ordenar por")}
                  </label>
                  <select
                    id="orden"
                    value={orden}
                    onChange={(e) => setOrden(e.target.value as Orden)}
                    className="border-linea bg-tarjeta text-tinta mt-3 w-full rounded-xl border px-3 py-2.5 text-sm"
                  >
                    <option value="precio-asc">{t("Precio: menor a mayor")}</option>
                    <option value="precio-desc">{t("Precio: mayor a menor")}</option>
                    <option value="potencia">{t("Más potentes")}</option>
                    <option value="rapidez">{t("Más rápidos")}</option>
                  </select>
                </div>

                {hayFiltros && (
                  <button
                    type="button"
                    onClick={() => {
                      setMarca("Todas");
                      setMotores([]);
                    }}
                    className="type-normal bg-linea text-tinta mt-8 w-full rounded-xl px-4 py-3 text-sm font-medium transition-opacity duration-300 hover:opacity-70"
                  >
                    {t("Limpiar filtros")}
                  </button>
                )}
                </div>
              </aside>

              {/* Resultados. */}
              <div>
                <p className="type-normal text-tinta text-xl font-light" aria-live="polite">
                  {visibles.length} {t("autos")}
                </p>

                {visibles.length === 0 ? (
                  <p className="text-graphite mt-10">
                    {t("No hay autos con esos filtros.")}
                  </p>
                ) : (
                  <ul
                    key={`${marca}-${motores.join()}-${orden}`}
                    className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8 md:mt-8 md:gap-x-6 md:gap-y-10 xl:grid-cols-3"
                  >
                    {visibles.map((a, i) => (
                      <Reveal as="li" key={a.id} delay={(i % 3) * 0.08}>
                        <CartaProducto
                          auto={a}
                          elegido={elegidos.includes(a.id)}
                          alElegir={() => alternarComparar(a.id)}
                          puedeElegir={elegidos.length < MAX_COMPARAR}
                        />
                      </Reveal>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Container>
        </section>

        <BandaCta
          titulo={t("¿Cuál te llevó la mirada?")}
          botones={[
            { texto: t("Reservar prueba"), href: "/#reservar" },
            { texto: t("Cómo comprar"), href: "/compra/como-comprar" },
          ]}
        />
      </ZonaClara>

      {/* Barra del comparador. */}
      <AnimatePresence>
        {autosElegidos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.45, ease: CURVA }}
            className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-[760px] items-center gap-3 rounded-2xl border border-white/10 bg-black/85 p-3 pl-4 backdrop-blur-xl"
          >
            <ul className="flex min-w-0 flex-1 flex-wrap gap-2">
              {autosElegidos.map((a) => (
                <li
                  key={a.id}
                  className="type-normal text-bone flex items-center gap-2 rounded-full bg-white/10 py-1 pr-1 pl-3 text-xs"
                >
                  {a.marca} {a.nombre}
                  <button
                    type="button"
                    onClick={() => alternarComparar(a.id)}
                    aria-label={`${t("Quitar")} ${a.marca} ${a.nombre}`}
                    className="flex size-6 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/25"
                  >
                    <X size={12} weight="bold" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={autosElegidos.length < 2}
              onClick={() => setComparando(true)}
              className="type-normal inline-flex h-11 shrink-0 items-center rounded-xl bg-white px-5 text-sm font-medium text-[#010205] transition-transform duration-300 hover:scale-[1.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {t("Comparar ahora")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comparando && autosElegidos.length >= 2 && (
          <Comparador autos={autosElegidos} alCerrar={() => setComparando(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
