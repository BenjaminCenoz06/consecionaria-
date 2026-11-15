"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Car, Handshake, Storefront, Wallet } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import TituloAnimado from "./TituloAnimado";
import { useIdioma } from "@/lib/idioma";
import { useSinMovimiento } from "@/lib/sinMovimiento";

type Servicio = {
  n: string;
  icono: ReactNode;
  titulo: string;
  frente: string;
  dorso: string;
  href: string;
  boton: string;
};

/* Sólo lo que el local ya afirma de sí mismo (ver `lib/sitio.ts`): compra,
   venta y consignación, financiación exclusiva, 0 km multimarcas y usados
   seleccionados. Nada de cifras ni condiciones sin confirmar. */
const SERVICIOS: Servicio[] = [
  {
    n: "01",
    icono: <Handshake size={34} weight="light" />,
    titulo: "Compra y venta",
    frente: "Comprá o vendé tu auto con asesoramiento en cada paso.",
    dorso: "Te acompañamos desde que elegís la unidad hasta que te la llevás, y tomamos tu usado como parte de pago.",
    href: "/compra/como-comprar",
    boton: "Cómo comprar",
  },
  {
    n: "02",
    icono: <Storefront size={34} weight="light" />,
    titulo: "Consignación",
    frente: "Dejanos tu auto y nos ocupamos de venderlo.",
    dorso: "Lo mostramos a quienes ya buscan un auto como el tuyo, sin que tengas que atender consultas.",
    href: "/compra/vende-tu-auto",
    boton: "Vender mi auto",
  },
  {
    n: "03",
    icono: <Wallet size={34} weight="light" />,
    titulo: "Financiación exclusiva",
    frente: "Opciones pensadas para que salgas manejando.",
    dorso: "Consultanos por WhatsApp y te armamos una propuesta a tu medida.",
    href: "/compra/financiacion",
    boton: "Ver financiación",
  },
  {
    n: "04",
    icono: <Car size={34} weight="light" />,
    titulo: "0 km y usados",
    frente: "0 km multimarcas y usados seleccionados.",
    dorso: "Elegí entre nuestras unidades y conocelas en detalle antes de decidir.",
    href: "/modelos",
    boton: "Ver los modelos",
  },
];

/**
 * Tarjetas que se dan vuelta en 3D.
 *
 * Con mouse giran al pasar el puntero; en pantallas táctiles, al tocarlas.
 * Frente oscuro con el número gigante de fondo; dorso rojo con el enlace.
 * El dorso es `inert` mientras no se ve, así que el teclado no cae en
 * enlaces escondidos. Con "reducir movimiento" el giro es instantáneo.
 */
function Tarjeta({ s, i }: { s: Servicio; i: number }) {
  const { t } = useIdioma();
  const sinMovimiento = useSinMovimiento();
  const [vuelta, setVuelta] = useState(false);

  return (
    <Reveal as="li" delay={i * 0.09}>
      <div
        className="group relative aspect-[4/5] min-h-[24rem] w-full [perspective:1300px]"
        onPointerEnter={(e) => e.pointerType === "mouse" && setVuelta(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setVuelta(false)}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: vuelta ? 180 : 0 }}
          transition={
            sinMovimiento
              ? { duration: 0 }
              : { type: "spring", stiffness: 110, damping: 17, mass: 0.9 }
          }
        >
          {/* Frente */}
          <button
            type="button"
            aria-pressed={vuelta}
            aria-label={t(s.titulo)}
            onClick={() => setVuelta((v) => !v)}
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] p-6 text-left text-white shadow-[0_30px_60px_-28px_rgb(0_0_0/0.7)] [backface-visibility:hidden] md:p-7"
          >
            <span
              aria-hidden="true"
              className="type-condensed pointer-events-none absolute -right-3 -bottom-8 text-[11rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.10)]"
            >
              {s.n}
            </span>
            <span
              aria-hidden="true"
              className="bg-rojo/20 pointer-events-none absolute -top-16 -left-10 size-48 rounded-full blur-3xl"
            />
            <span className="text-rojo relative [transform:translateZ(40px)]">{s.icono}</span>
            <span className="relative [transform:translateZ(30px)]">
              <span className="type-normal block text-2xl font-semibold md:text-[1.7rem]">
                {t(s.titulo)}
              </span>
              <span className="mt-3 block max-w-[28ch] text-base text-white/65">
                {t(s.frente)}
              </span>
              <span className="type-normal mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                {t("Tocá para ver más")}
              </span>
            </span>
          </button>

          {/* Dorso */}
          <div
            inert={!vuelta}
            className="bg-rojo absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] p-6 text-white shadow-[0_30px_60px_-28px_rgb(216_31_38/0.7)] [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-7"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgb(255_255_255/0.22),transparent_60%)]"
            />
            <span className="type-condensed relative text-5xl font-bold text-white/35">{s.n}</span>
            <span className="relative">
              <span className="type-normal block text-2xl font-semibold">{t(s.titulo)}</span>
              <span className="mt-3 block text-base text-white/90">{t(s.dorso)}</span>
              <Link
                href={s.href}
                className="type-normal destello mt-6 inline-flex h-11 items-center gap-3 rounded-full bg-white px-5 text-sm font-semibold text-[#010205] transition-transform duration-300 hover:scale-[1.04]"
              >
                {t(s.boton)}
                <ArrowRight size={16} weight="bold" />
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function QueHacemos() {
  const { t } = useIdioma();

  return (
    <section id="que-hacemos" aria-labelledby="titulo-que-hacemos" className="py-8 lg:py-24">
      <Container>
        <Reveal>
          <p className="type-normal text-acento-tema text-xs font-semibold tracking-[0.25em] uppercase">
            {t("Qué hacemos")}
          </p>
        </Reveal>
        <TituloAnimado
          id="titulo-que-hacemos"
          texto="Todo en un solo lugar"
          retardo={0.1}
          className="display-tight text-tinta mt-3 max-w-[18ch] text-4xl font-bold md:text-6xl lg:text-7xl"
        />

        <ul className="carrusel-movil mt-8 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">
          {SERVICIOS.map((s, i) => (
            <Tarjeta key={s.n} s={s} i={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
