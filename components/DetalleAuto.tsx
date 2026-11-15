"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Check } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import Plano3D from "./Plano3D";
import HeroAuto from "./HeroAuto";
import EspecificacionesAuto from "./EspecificacionesAuto";
import TarjetaImagen from "./TarjetaImagen";
import FondoCompra from "./FondoCompra";
import TituloAnimado from "./TituloAnimado";
import Magnetico from "./Magnetico";
import { useIdioma } from "@/lib/idioma";
import { AUTOS, formatoUSD, type Auto } from "@/lib/catalogo";
import { WHATSAPP } from "@/lib/sitio";

const CURVA = [0.22, 1, 0.36, 1] as const;

const INCLUYE = [
  "Asesoramiento personalizado",
  "Financiación exclusiva",
  "Te ayudamos con la documentación",
  "Tomamos tu usado como parte de pago",
  "Atención directa por WhatsApp",
  "Visita y prueba sin compromiso",
];

const PASOS = [
  { n: "01", t: "Coordiná tu visita", d: "Escribinos o completá el formulario y te respondemos por WhatsApp." },
  { n: "02", t: "Elegí cómo pagar", d: "Consultá la financiación exclusiva o entregá tu usado como parte de pago." },
  { n: "03", t: "Salí manejando", d: "Te asesoramos con la documentación para que te lleves el auto con tranquilidad." },
];

/** Barra de compra que acompaña el scroll: precio siempre a la vista,
    como el "agregar al carrito" fijo de una tienda. Se esconde cuando
    ya se está viendo la sección de compra. */
function BarraCompra({ auto }: { auto: Auto }) {
  const { idioma, t } = useIdioma();
  const { scrollY } = useScroll();
  const [pasado, setPasado] = useState(false);
  const [enCompra, setEnCompra] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setPasado(v > 760));

  useEffect(() => {
    const seccion = document.getElementById("comprar");
    if (!seccion) return;
    const obs = new IntersectionObserver(
      ([e]) => setEnCompra(e.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(seccion);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {pasado && !enCompra && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: CURVA }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-[780px] items-center gap-3 rounded-2xl border border-white/10 bg-black/80 p-3 pl-5 backdrop-blur-xl sm:gap-5"
        >
          <div className="min-w-0 flex-1">
            <p className="type-normal text-bone truncate text-sm font-medium">
              {auto.marca} {auto.nombre}
            </p>
            <p className="text-rojo type-normal text-base font-semibold">
              {formatoUSD(auto.precio, idioma)}
            </p>
          </div>
          <a
            href="#comprar"
            className="type-normal inline-flex h-11 shrink-0 items-center rounded-xl bg-white px-5 text-sm font-medium text-[#010205] transition-transform duration-300 hover:scale-[1.04]"
          >
            {t("Comprar este auto")}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Ficha de producto completa: portada de tienda, cifras en grande, por
 * qué lo recomendamos, qué incluye el precio y cómo seguir. Cierra con
 * otros autos y una barra de compra fija.
 */
export default function DetalleAuto({ auto }: { auto: Auto }) {
  const { idioma, l, t } = useIdioma();

  const indice = AUTOS.findIndex((a) => a.id === auto.id);
  const otros = [1, 2, 3].map((n) => AUTOS[(indice + n) % AUTOS.length]);

  const wa = `${WHATSAPP}?text=${encodeURIComponent(
    `${t("Hola, quiero información sobre el")} ${auto.marca} ${auto.nombre}.`,
  )}`;
  const waCompra = `${WHATSAPP}?text=${encodeURIComponent(
    `${t("Hola, quiero comprar el")} ${auto.marca} ${auto.nombre}.`,
  )}`;

  /* Botones sobre el fondo de video: el principal es blanco macizo; los
     demás, de vidrio. */
  const primario =
    "type-normal destello inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#010205] shadow-[0_0_40px_rgb(255_255_255/0.25)] transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]";
  const secundario =
    "type-normal inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20";

  return (
    <>
      <HeroAuto auto={auto} />

      <EspecificacionesAuto auto={auto} />

      {/* Por qué lo recomendamos. */}
      <section className="bg-black py-9 lg:py-28">
        <Container>
          <div className="grid gap-7 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="type-normal text-rojo text-xs font-semibold tracking-wider uppercase">
                {auto.marca} {auto.nombre}
              </p>
              <TituloAnimado
                texto="Por qué te lo recomendamos"
                className="display-tight text-bone mt-4 text-4xl font-bold md:text-6xl"
              />
              <p className="text-bone/75 mt-6 max-w-[48ch] text-lg leading-relaxed">
                {l(auto.descripcion)}
              </p>
            </Reveal>

            <Plano3D className="lg:col-span-7" inclinacion={7}>
              <ul className="grid gap-5">
                {auto.rasgos.map((r, i) => (
                  <Reveal as="li" key={r.titulo.es} delay={i * 0.1}>
                    <Tilt3D grados={5} escala={1.02} className="rounded-2xl">
                      <div
                        className="flex gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <p
                          className="type-condensed text-rojo text-5xl font-bold"
                          style={{ transform: "translateZ(30px)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <div style={{ transform: "translateZ(22px)" }}>
                          <h3 className="type-normal text-bone text-xl font-semibold">
                            {l(r.titulo)}
                          </h3>
                          <p className="text-bone/65 mt-2 max-w-[44ch]">{l(r.texto)}</p>
                        </div>
                      </div>
                    </Tilt3D>
                  </Reveal>
                ))}
              </ul>
            </Plano3D>
          </div>
        </Container>
      </section>

      {/* Compra: de fondo, el auto andando en video (vertical en celular,
          horizontal en PC); encima, precio, qué incluye y pasos. */}
      <section
        id="comprar"
        className="relative isolate scroll-mt-20 overflow-hidden bg-black py-14 text-white lg:py-32"
      >
        <FondoCompra id={auto.id} />
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="type-normal text-rojo text-xs font-semibold tracking-[0.25em] uppercase">
                {t("Hablemos de tu compra")}
              </p>
              <TituloAnimado
                texto={`${t("Comprá tu")} ${auto.marca} ${auto.nombre}`}
                className="display-tight mt-4 text-4xl font-bold md:text-6xl"
              />
              <p className="type-normal mt-8 text-5xl font-light">
                {formatoUSD(auto.precio, idioma)}
              </p>
              <p className="mt-2 text-sm text-white/60">{t("Precio de referencia")}</p>

              <p className="type-normal mt-10 text-sm font-semibold tracking-wide uppercase">
                {t("Qué te ofrecemos")}
              </p>
              <ul className="mt-4 space-y-3">
                {INCLUYE.map((item, i) => (
                  <Reveal as="li" key={item} delay={0.15 + i * 0.06} className="flex items-start gap-3 text-base text-white/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[#010205]">
                      <Check size={12} weight="bold" />
                    </span>
                    {t(item)}
                  </Reveal>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <Tilt3D grados={4} escala={1.01} className="rounded-[2rem]">
                <div
                  className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_40px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-2xl lg:p-10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p
                    className="type-normal text-sm font-semibold tracking-wide uppercase"
                    style={{ transform: "translateZ(24px)" }}
                  >
                    {t("Cómo seguimos")}
                  </p>
                  <ol className="mt-6 space-y-6" style={{ transform: "translateZ(16px)" }}>
                    {PASOS.map((p) => (
                      <li key={p.n} className="flex gap-5">
                        <span className="type-condensed text-4xl font-bold text-white/30">
                          {p.n}
                        </span>
                        <div>
                          <p className="type-normal text-lg font-semibold">{t(p.t)}</p>
                          <p className="mt-1 text-white/65">{t(p.d)}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div
                    className="mt-9 flex flex-wrap gap-3"
                    style={{ transform: "translateZ(34px)" }}
                  >
                    <Magnetico>
                      <a
                        href={waCompra}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={primario}
                      >
                        {t("Comprar por WhatsApp")}
                        <span className="sr-only">{t(" (se abre en una pestaña nueva)")}</span>
                      </a>
                    </Magnetico>
                    <Link href="/#reservar" className={secundario}>
                      {t("Reservar prueba")}
                    </Link>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className={secundario}>
                      {t("Consultar por WhatsApp")}
                    </a>
                    <Link href="/compra/financiacion" className={secundario}>
                      {t("Financiar")}
                    </Link>
                    <Link href="/compra/vende-tu-auto" className={secundario}>
                      {t("Vender mi auto")}
                    </Link>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Otros autos. */}
      <section className="bg-black py-9 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="display-tight text-bone text-3xl font-bold md:text-5xl">
              {t("Otros autos que te pueden gustar")}
            </h2>
          </Reveal>
          <ul className="carrusel-movil mt-6 sm:mt-10 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((o, i) => (
              <Reveal as="li" key={o.id} delay={i * 0.08}>
                <TarjetaImagen
                  href={`/modelos/${o.id}#comprar`}
                  titulo={`${o.marca} ${o.nombre}`}
                  subtitulo={formatoUSD(o.precio, idioma)}
                  imagen={o.foto}
                  alt={t(o.alt)}
                  etiquetas={o.combustible}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <BarraCompra auto={auto} />
    </>
  );
}
