"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as TeclaReact,
} from "react";
import Image from "next/image";
import { SteeringWheel, WhatsappLogo } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { DESTACADOS } from "@/lib/destacados";
import { useIdioma } from "@/lib/idioma";

const WHATSAPP = "https://wa.me/5491150000000";

/**
 * Selección de la semana.
 *
 * Pestañas arriba, el nombre del auto en grande a la izquierda con sus
 * dos botones, y el auto de frente a la derecha sobre gris oscuro.
 *
 * Textos y fotos se apilan en la misma celda de la grilla: la altura la
 * fija el más alto, así que al cambiar de pestaña nada se mueve. Salen
 * rápido y el nuevo entra con retardo, para que nunca haya dos autos a
 * medio fundir uno encima del otro.
 */
export default function Destacados() {
  const [activo, setActivo] = useState(0);
  const barra = useRef<HTMLDivElement>(null);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const total = DESTACADOS.length;
  const { t } = useIdioma();

  /* En pantallas angostas las pestañas no entran: se desplazan solas
     para dejar la activa centrada. Se mueve el contenedor, no la página. */
  useEffect(() => {
    const cont = barra.current;
    const pestana = pestanas.current[activo];
    if (!cont || !pestana) return;
    cont.scrollTo({
      left: pestana.offsetLeft - (cont.clientWidth - pestana.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activo]);

  /* Flechas, Inicio y Fin recorren las pestañas, como pide el patrón
     de pestañas de ARIA. */
  const alTeclear = (e: TeclaReact) => {
    let nuevo = activo;
    if (e.key === "ArrowRight") nuevo = (activo + 1) % total;
    else if (e.key === "ArrowLeft") nuevo = (activo - 1 + total) % total;
    else if (e.key === "Home") nuevo = 0;
    else if (e.key === "End") nuevo = total - 1;
    else return;
    e.preventDefault();
    setActivo(nuevo);
    pestanas.current[nuevo]?.focus();
  };

  return (
    <section
      id="destacados"
      aria-label={t("Selección de la semana")}
      className="relative overflow-hidden py-14 lg:py-16"
    >
      <h2 className="sr-only">{t("Selección de la semana")}</h2>

      <Container>
        <Reveal>
          {/* Pestañas: `mx-auto w-max` las centra si entran y las deja
              desplazables si no. */}
          <div
            ref={barra}
            className="-mx-6 overflow-x-auto px-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              role="tablist"
              aria-label={t("Elegir auto de la selección")}
              onKeyDown={alTeclear}
              className="mx-auto flex w-max gap-5 px-6"
            >
              {DESTACADOS.map((d, i) => {
                const enFoco = i === activo;
                return (
                  <button
                    key={d.id}
                    ref={(el) => {
                      pestanas.current[i] = el;
                    }}
                    id={`pestana-${d.id}`}
                    type="button"
                    role="tab"
                    aria-selected={enFoco}
                    aria-controls={`panel-${d.id}`}
                    tabIndex={enFoco ? 0 : -1}
                    onClick={() => setActivo(i)}
                    className={`type-normal shrink-0 border-b px-5 pb-3 text-sm font-medium whitespace-nowrap uppercase transition-colors duration-300 ${
                      enFoco
                        ? "text-tinta border-brass"
                        : "text-graphite hover:text-tinta border-linea hover:border-graphite"
                    }`}
                  >
                    {d.marca} {d.nombre}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid items-center gap-6 lg:mt-4 lg:grid-cols-12 lg:gap-0">
            {/* Texto y botones. En celular van debajo del auto. */}
            <div className="order-2 grid lg:order-1 lg:col-span-5">
              {DESTACADOS.map((d, i) => {
                const enFoco = i === activo;
                return (
                  <div
                    key={d.id}
                    id={`panel-${d.id}`}
                    role="tabpanel"
                    aria-labelledby={`pestana-${d.id}`}
                    inert={!enFoco}
                    className={`ease-premium col-start-1 row-start-1 flex flex-col items-start transition-[opacity,transform] ${
                      enFoco
                        ? "translate-y-0 opacity-100 delay-200 duration-700"
                        : "pointer-events-none translate-y-4 opacity-0 duration-300"
                    }`}
                  >
                    <p className="type-normal text-acento-tema text-xs font-semibold tracking-wider uppercase">
                      {t("Selección de la semana")}
                    </p>
                    <p className="type-normal text-tinta mt-3 text-lg font-semibold uppercase md:text-xl">
                      {d.marca}
                    </p>
                    <p className="display-tight text-tinta mt-2 text-6xl font-bold md:text-7xl lg:text-[5.25rem]">
                      {d.nombre}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="#reservar"
                        className="type-condensed destello bg-brass text-ink hover:bg-tinta hover:text-lienzo group inline-flex h-14 items-center justify-center gap-5 px-5 text-[15px] font-bold tracking-wide uppercase transition-colors duration-300"
                      >
                        {t("Reservar prueba")}
                        <SteeringWheel size={20} weight="regular" />
                      </a>

                      <a
                        href={`${WHATSAPP}?text=${encodeURIComponent(
                          `${t("Hola, quiero información sobre el")} ${d.marca} ${d.nombre}.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="type-condensed text-tinta border-tinta/60 hover:bg-tinta hover:text-lienzo hover:border-tinta inline-flex h-14 items-center justify-center gap-5 border px-5 text-[15px] font-bold tracking-wide uppercase transition-colors duration-300"
                      >
                        {t("Solicitar información")}
                        <WhatsappLogo size={20} weight="regular" />
                        <span className="sr-only">
                          {t(" (se abre en una pestaña nueva)")}
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Autos. Pasan por encima del borde del contenedor a la
                derecha, como en la referencia. */}
            <div className="relative order-1 h-[230px] sm:h-[320px] lg:order-2 lg:col-span-7 lg:-mr-10 lg:h-[400px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_68%_at_52%_58%,rgba(255,255,255,0.075),transparent_72%)]"
              />
              {/* Sombra de apoyo, pareja para todos los autos. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 left-[12%] h-8 w-[76%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_70%)]"
              />

              {DESTACADOS.map((d, i) => {
                const enFoco = i === activo;
                return (
                  <div
                    key={d.id}
                    aria-hidden={!enFoco}
                    className={`ease-premium absolute inset-0 transition-[opacity,transform] ${
                      enFoco
                        ? "translate-x-0 scale-100 opacity-100 delay-200 duration-700"
                        : "pointer-events-none translate-x-10 scale-[0.96] opacity-0 duration-300"
                    }`}
                  >
                    {/* `brillo={false}`: el recorte no es una
                        superficie, es el auto. Un reflejo rectangular
                        encima lo delataría como foto pegada. */}
                    <Tilt3D
                      className="h-full w-full"
                      grados={10}
                      escala={1.03}
                      brillo={false}
                      activo={enFoco}
                    >
                      {/* La flotación va en su propia capa: si
                          compartiera transformación con el giro, una
                          le pisaría la otra. */}
                      <div className="animate-flotar h-full w-full">
                        <Image
                          src={d.foto}
                          alt={t(d.alt)}
                          fill
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          quality={90}
                          draggable={false}
                          className="object-contain object-bottom"
                        />
                      </div>
                    </Tilt3D>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <p className="text-graphite mt-12 max-w-[1040px] text-xs leading-relaxed lg:mt-10">
          {t(
            "La selección cambia cada semana y está sujeta a disponibilidad. Imágenes ilustrativas: precio, historial y estado de cada unidad se informan por nuestros asesores.",
          )}
        </p>
      </Container>
    </section>
  );
}
