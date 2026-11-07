"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import { MODELOS } from "@/lib/modelos";

/** Cuánto hay que arrastrar para que cuente como un deslizamiento. */
const UMBRAL_SWIPE = 48;

/** Cuántos modelos a cada lado se descargan antes de que se necesiten. */
const PRECARGA = 2;

/**
 * Vitrina de modelos.
 *
 * Un solo modelo en foco, centrado y a plena luz; el siguiente asoma
 * apagado por el costado, que es lo que le dice al ojo "hay más".
 * El desplazamiento es una sola transformación CSS calculada con
 * variables: no mide nada en JS, así que no hay salto en la primera
 * pintura ni layout shift.
 *
 * Los recortes llevan transparencia: el fondo negro y el brillo del
 * piso los pone la sección.
 */
export default function Modelos() {
  const [activo, setActivo] = useState(0);
  const inicioX = useRef<number | null>(null);
  const pestanas = useRef<HTMLDivElement>(null);
  const total = MODELOS.length;

  const ir = (indice: number) => setActivo((indice + total) % total);

  /* Distancia circular: del último al primero hay un paso, no total-1. */
  const distancia = (i: number) => {
    const d = Math.abs(i - activo);
    return Math.min(d, total - d);
  };

  /* Con muchos modelos las pestañas no entran en una fila: se
     desplazan solas para que la activa quede centrada. Se mueve el
     contenedor, nunca la página (scrollTo, no scrollIntoView). */
  useEffect(() => {
    const barra = pestanas.current;
    const pestana = barra?.firstElementChild?.children[activo] as
      | HTMLElement
      | undefined;
    if (!barra || !pestana) return;
    barra.scrollTo({
      left: pestana.offsetLeft - (barra.clientWidth - pestana.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activo]);

  const alPresionar = (e: PointerEvent) => {
    inicioX.current = e.clientX;
  };

  const alSoltar = (e: PointerEvent) => {
    if (inicioX.current === null) return;
    const delta = e.clientX - inicioX.current;
    inicioX.current = null;
    if (Math.abs(delta) >= UMBRAL_SWIPE) ir(activo + (delta < 0 ? 1 : -1));
  };

  const alTeclear = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") ir(activo + 1);
    if (e.key === "ArrowLeft") ir(activo - 1);
  };

  const actual = MODELOS[activo];

  return (
    <section
      id="modelos"
      aria-roledescription="carrusel"
      aria-label="Modelos"
      onKeyDown={alTeclear}
      className="bg-ink relative overflow-hidden pt-12 pb-14 lg:pt-14 lg:pb-16"
    >
      <Container>
        <Reveal className="flex items-start justify-between gap-6">
          <h2 className="type-normal text-bone text-3xl font-bold uppercase md:text-4xl">
            Modelos
          </h2>

          <a
            href="#destacados"
            className="group type-condensed text-bone border-bone/70 hover:border-brass hover:text-brass inline-flex items-center gap-4 border-b pt-1 pr-1 pb-3 text-sm font-bold tracking-wide uppercase transition-colors duration-300 sm:min-w-[17rem] sm:justify-between"
          >
            <span>
              Descubrir
              <span className="hidden sm:inline"> todos los modelos</span>
            </span>
            <ArrowRight
              size={18}
              weight="regular"
              className="ease-premium transition-transform duration-500 group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        <div className="relative mt-6 lg:mt-4">
          {/* Flechas hexagonales: a los costados en escritorio. */}
          <Hexagono
            lado="izq"
            onClick={() => ir(activo - 1)}
            className="absolute top-3 left-0 hidden lg:flex"
          />
          <Hexagono
            lado="der"
            onClick={() => ir(activo + 1)}
            className="absolute top-3 right-0 hidden lg:flex"
          />

          {/* Todos los textos comparten una misma celda de la grilla: la
              altura la fija el más alto y al cambiar de modelo nada se
              mueve. Se funden por opacidad, no se montan y desmontan. */}
          <div className="grid place-items-center text-center">
            {MODELOS.map((m, i) => {
              const enFoco = i === activo;
              return (
                <div
                  key={m.id}
                  aria-hidden={!enFoco}
                  /* Sale rápido y el nuevo entra con retardo: nunca hay
                     dos frases a medio fundir una encima de la otra. */
                  className={`ease-premium col-start-1 row-start-1 flex w-full flex-col items-center transition-[opacity,transform] ${
                    enFoco
                      ? "translate-y-0 opacity-100 delay-300 duration-700"
                      : "pointer-events-none translate-y-4 opacity-0 duration-300"
                  }`}
                >
                  <p className="type-normal text-bone -skew-x-12 text-xl font-extrabold tracking-[0.16em] uppercase md:text-3xl">
                    {m.marca} <span className="text-brass">{m.nombre}</span>
                  </p>

                  {/* La línea de tres tramos de la referencia, en
                      la paleta del sitio: latón, hueso, latón apagado. */}
                  <span
                    aria-hidden="true"
                    className="mt-2.5 flex h-[3px] w-full max-w-[240px]"
                  >
                    <i className="bg-brass flex-1" />
                    <i className="bg-bone/80 flex-1" />
                    <i className="bg-brass/45 flex-1" />
                  </span>

                  <p className="display-tight mt-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-[4rem]">
                    {m.lema}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Escenario. Ocupa todo el ancho: el vecino tiene que poder
          asomar fuera del contenedor de 1320px. */}
      <div
        onPointerDown={alPresionar}
        onPointerUp={alSoltar}
        onPointerCancel={() => (inicioX.current = null)}
        className="relative mt-2 touch-pan-y select-none"
      >
        {/* Resplandor cálido en el piso, detrás del auto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-10 h-3/4 bg-[radial-gradient(ellipse_42%_55%_at_50%_100%,rgba(194,160,91,0.16),transparent_72%)]"
        />

        <div className="relative overflow-hidden pb-14 [--g:clamp(1.25rem,5vw,3.5rem)] [--w:min(720px,78vw)] 2xl:[--w:min(860px,50vw)]">
          <ul
            className="ease-premium relative left-1/2 flex w-max transition-transform duration-[900ms]"
            style={{
              gap: "var(--g)",
              transform: `translateX(calc(var(--w) / -2 - ${activo} * (var(--w) + var(--g))))`,
            }}
          >
            {MODELOS.map((m, i) => {
              const enFoco = i === activo;
              return (
                <li
                  key={m.id}
                  aria-hidden={!enFoco}
                  style={{ width: "var(--w)" }}
                  className={`ease-premium h-[clamp(110px,20vw,215px)] shrink-0 origin-bottom transition-[opacity,transform] duration-[900ms] 2xl:h-[260px] ${
                    enFoco
                      ? "scale-100 opacity-100"
                      : "scale-[0.88] opacity-[0.16]"
                  }`}
                >
                  <Image
                    src={m.foto}
                    alt={m.alt}
                    width={m.ancho}
                    height={m.alto}
                    sizes="(min-width: 1536px) 860px, (min-width: 1024px) 720px, 78vw"
                    quality={90}
                    /* Los vecinos se bajan antes de hacer falta; el resto
                       espera. Pasar de "lazy" a "eager" dispara la descarga
                       al instante, así el deslizamiento nunca muestra un
                       hueco. */
                    loading={distancia(i) <= PRECARGA ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full object-contain object-bottom"
                    /* Reflejo en el piso. Chromium y Safari lo dibujan;
                       Firefox lo ignora y el auto queda igual de bien. */
                    style={{
                      WebkitBoxReflect:
                        "below 2px linear-gradient(transparent 58%, rgba(255,255,255,0.16))",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {/* Línea de piso: ancla el auto y separa el reflejo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-14 left-1/2 h-px w-(--w) -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </div>
      </div>

      <Container>
        {/* Pestañas: una por modelo, con el subrayado de la referencia. */}
        <div
          ref={pestanas}
          className="-mx-6 overflow-x-auto px-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* `mx-auto w-max`: centrado si entran, desplazable si no. */}
          <div
            role="tablist"
            aria-label="Elegir modelo"
            className="mx-auto flex w-max gap-5 px-6"
          >
            {MODELOS.map((m, i) => {
              const enFoco = i === activo;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={enFoco}
                  tabIndex={enFoco ? 0 : -1}
                  onClick={() => ir(i)}
                  className={`type-normal shrink-0 border-b px-4 pb-3 text-sm font-medium whitespace-nowrap uppercase transition-colors duration-300 sm:min-w-[11rem] ${
                    enFoco
                      ? "text-bone border-bone"
                      : "text-graphite border-hairline hover:text-bone hover:border-dim"
                  }`}
                >
                  {m.marca} {m.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* En celular las flechas bajan acá, junto al contador. */}
        <div className="mt-6 flex items-center justify-center gap-6 lg:hidden">
          <Hexagono lado="izq" onClick={() => ir(activo - 1)} />
          <p
            className="type-normal text-graphite w-16 text-center text-sm tabular-nums"
            aria-hidden="true"
          >
            {String(activo + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <Hexagono lado="der" onClick={() => ir(activo + 1)} />
        </div>

        <p className="text-graphite mt-10 max-w-[1040px] text-xs leading-relaxed">
          Imágenes ilustrativas. Las unidades están sujetas a disponibilidad;
          precio, historial y estado se informan por nuestros asesores, con el
          informe de los 180 puntos de control firmado.
        </p>

        <p className="sr-only" aria-live="polite">
          Modelo {activo + 1} de {total}: {actual.marca} {actual.nombre}.{" "}
          {actual.lema}.
        </p>
      </Container>
    </section>
  );
}

/** Botón hexagonal de la referencia: contorno fino, vértice arriba. */
function Hexagono({
  lado,
  onClick,
  className = "relative flex",
}: {
  lado: "izq" | "der";
  onClick: () => void;
  className?: string;
}) {
  const Caret = lado === "izq" ? CaretLeft : CaretRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={lado === "izq" ? "Modelo anterior" : "Modelo siguiente"}
      className={`group text-bone/70 hover:text-brass h-14 w-[50px] items-center justify-center transition-colors duration-300 active:scale-95 ${className}`}
    >
      <svg
        viewBox="0 0 50 56"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full fill-none stroke-current"
        strokeWidth="1"
      >
        <polygon points="25,1 49,14 49,42 25,55 1,42 1,14" />
      </svg>
      <Caret
        size={20}
        weight="light"
        className={`ease-premium transition-transform duration-500 ${
          lado === "izq"
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      />
    </button>
  );
}
