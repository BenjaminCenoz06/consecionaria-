"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Tilt3D from "./Tilt3D";
import { useIdioma } from "@/lib/idioma";
import { formatoUSD, type Auto } from "@/lib/catalogo";
import { WHATSAPP } from "@/lib/sitio";

const CURVA = [0.22, 1, 0.36, 1] as const;

/**
 * Portada de la ficha, como la de una tienda: arriba un estudio oscuro
 * con el nombre del auto de marca de agua, y el auto grande cruzando el
 * borde hacia la franja blanca, donde están el nombre, el precio y los
 * botones de compra.
 *
 * Entrada: el auto llega rodando desde la izquierda y frena con un
 * resorte; la marca de agua se desplaza con el scroll (paralaje) y los
 * textos entran escalonados. El auto sigue al puntero con el giro 3D del
 * sitio.
 */
export default function HeroAuto({ auto }: { auto: Auto }) {
  const { idioma, l, t } = useIdioma();
  const sinMovimiento = useReducedMotion();
  const seccion = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start start", "end start"],
  });
  const marcaX = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const autoY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const entrar = (retardo: number) =>
    sinMovimiento
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: retardo, ease: CURVA },
        };

  const mensaje = `${t("Hola, quiero información sobre el")} ${auto.marca} ${auto.nombre}.`;
  const wa = `${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  const primario =
    "type-normal inline-flex h-12 items-center justify-center rounded-xl bg-[#010205] px-6 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]";
  const secundario =
    "type-normal inline-flex h-12 items-center justify-center rounded-xl bg-[#e4e4e8] px-6 text-sm font-medium text-[#202020] transition-colors duration-300 hover:bg-[#d4d4da]";

  return (
    <section ref={seccion} className="relative isolate">
      {/* Estudio oscuro. No es `overflow-hidden`: el auto lo desborda. */}
      <div className="relative bg-black pt-24 lg:pt-28">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(ellipse 70% 80% at 50% 70%, ${auto.tono}, #000 72%)`,
            }}
          />
          <motion.p
            style={sinMovimiento ? undefined : { x: marcaX }}
            className="type-condensed absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] text-[clamp(7rem,24vw,24rem)] leading-none font-extrabold whitespace-nowrap text-transparent uppercase italic select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,0.13)]"
          >
            {auto.nombre.length <= 9 ? auto.nombre : auto.marca}
          </motion.p>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <motion.div
          style={sinMovimiento ? undefined : { y: autoY }}
          className="relative z-10 mx-auto h-[250px] w-[min(1080px,92vw)] translate-y-[24%] sm:h-[340px] lg:h-[470px]"
        >
          <motion.div
            className="h-full w-full"
            initial={
              sinMovimiento
                ? { opacity: 0 }
                : { opacity: 0, x: -220, scale: 0.92, filter: "blur(14px)" }
            }
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            transition={
              sinMovimiento
                ? { duration: 0.3 }
                : { type: "spring", stiffness: 55, damping: 16, mass: 1.1, delay: 0.15 }
            }
          >
            <Tilt3D className="h-full w-full" grados={9} escala={1.025} brillo={false}>
              <div className="animate-flotar h-full w-full">
                <Image
                  src={auto.foto}
                  alt={t(auto.alt)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 1080px, 92vw"
                  quality={90}
                  draggable={false}
                  className="object-contain object-bottom"
                  style={{
                    WebkitBoxReflect:
                      "below 4px linear-gradient(transparent 62%, rgba(255,255,255,0.14))",
                  }}
                />
              </div>
            </Tilt3D>
          </motion.div>
        </motion.div>
      </div>

      {/* Franja blanca: producto, precio y compra. */}
      <div className="bg-white pt-36 pb-16 text-[#202020] sm:pt-44 lg:pt-52 lg:pb-24">
        <div className="mx-auto flex max-w-[900px] flex-col items-center px-6 text-center">
          <motion.div {...entrar(0.5)} className="flex flex-wrap justify-center gap-2">
            <span className="type-normal rounded-full bg-[#e4e4e8] px-4 py-1.5 text-xs font-medium">
              {l(auto.clase)}
            </span>
            <span className="type-normal rounded-full bg-[#e4e4e8] px-4 py-1.5 text-xs font-medium">
              {auto.anio}
            </span>
          </motion.div>

          <h1 className="type-normal mt-5 text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
            {auto.marca} {auto.nombre}
          </h1>

          {auto.lema && (
            <motion.p {...entrar(0.6)} className="mt-3 text-lg text-[#6b6b72]">
              {t(auto.lema)}
            </motion.p>
          )}

          <motion.div {...entrar(0.65)} className="mt-4 flex flex-wrap justify-center gap-2">
            {auto.combustible.map((c) => (
              <span
                key={c}
                className="type-normal rounded-full bg-[#e4e4e8] px-3 py-1 text-[11px] font-medium"
              >
                {t(c)}
              </span>
            ))}
          </motion.div>

          <motion.div {...entrar(0.72)} className="mt-6">
            <p className="type-normal text-3xl font-medium md:text-4xl">
              {formatoUSD(auto.precio, idioma)}
            </p>
            <p className="mt-1 text-sm text-[#6b6b72]">
              {t("Precio final publicado")}
            </p>
          </motion.div>

          <motion.div
            {...entrar(0.8)}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <a href="#comprar" className={primario}>
              {t("Comprar este auto")}
            </a>
            <Link href="/#reservar" className={secundario}>
              {t("Reservar prueba")}
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className={secundario}>
              {t("Consultar por WhatsApp")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
