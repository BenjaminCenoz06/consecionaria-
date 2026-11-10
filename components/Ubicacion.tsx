"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import Reveal from "./Reveal";
import Paralaje from "./Paralaje";
import { useIdioma } from "@/lib/idioma";
import { MAPA } from "@/lib/sitio";

/**
 * Franja con foto: título grande y un solo botón.
 *
 * Es la tira baja de la referencia ("Dealer locator"): una foto de
 * showroom recortada a una banda, un velo oscuro encima para que el
 * texto se lea, y un botón blanco. La foto es decorativa (`alt=""`):
 * el sentido lo lleva el título.
 */
export default function Ubicacion() {
  const { t } = useIdioma();

  return (
    <section
      id="ubicacion"
      aria-labelledby="titulo-ubicacion"
      className="bg-ink relative isolate overflow-hidden"
    >
      <Paralaje className="-z-20" distancia={56}>
        <Image
          src="/showroom/showroom.webp"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </Paralaje>

      {/* Velo parejo + degradado a la izquierda, donde va el texto. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
      />

      <Container className="py-8 md:py-14">
        <Reveal>
          <h2
            id="titulo-ubicacion"
            className="display-tight over-media text-bone text-4xl font-bold md:text-6xl"
          >
            {t("Visitá el showroom")}
          </h2>

          <a
            href={MAPA}
            target="_blank"
            rel="noopener noreferrer"
            className="type-condensed destello text-ink hover:bg-rojo hover:text-white group mt-6 inline-flex h-14 items-center gap-6 bg-white px-6 text-[15px] font-bold tracking-wide uppercase transition-colors duration-300"
          >
            {t("Cómo llegar")}
            <ArrowRight
              size={18}
              weight="regular"
              className="ease-premium transition-transform duration-500 group-hover:translate-x-1"
            />
            <span className="sr-only">{t(" (se abre en una pestaña nueva)")}</span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
