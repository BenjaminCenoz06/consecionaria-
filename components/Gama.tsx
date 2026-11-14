"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import VideoAuto from "./VideoAuto";
import { videoDe } from "@/lib/videos";
import { GAMA } from "@/lib/gama";
import { useIdioma } from "@/lib/idioma";

const WHATSAPP = "https://wa.me/5493548409755";

/**
 * Grilla grande de la gama.
 *
 * Cierra el bloque de vitrinas: título centrado arriba y tarjetas de a
 * dos. Cada tarjeta lleva la firma del modelo arriba del todo, el auto
 * en el medio y, abajo, las píldoras con el tipo de motor, la línea que
 * lo describe y la flecha.
 *
 * El alto lo fija el `aspect`, no el contenido: las cuatro tarjetas
 * miden igual aunque una tenga aviso y dos píldoras y otra una sola.
 * Comparte lenguaje con `Explorar.tsx` (mismo radio, mismo degradado de
 * estudio, misma flecha en círculo, misma inclinación 3D), que va justo
 * arriba. Como allá, la foto se recorta en una capa aparte para que
 * `overflow-hidden` no aplaste el 3D del resto.
 */
export default function Gama() {
  const { t } = useIdioma();

  return (
    <section
      id="gama"
      aria-labelledby="titulo-gama"
      className="pt-2 pb-8 lg:pt-6 lg:pb-24"
    >
      <Container>
        <Reveal>
          <h2
            id="titulo-gama"
            className="display-tight text-tinta mx-auto max-w-[18ch] text-center text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            {t("Tu próximo auto empieza acá.")}
          </h2>
        </Reveal>

        <ul className="carrusel-movil mt-5 sm:mt-12 sm:grid sm:gap-6 lg:mt-16 lg:grid-cols-2">
          {GAMA.map((g, i) => (
            <Reveal as="li" key={g.id} delay={(i % 2) * 0.1}>
              <Tilt3D className="rounded-[2rem]" grados={7}>
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent(
                    `${t("Hola, quiero información sobre el")} ${g.nombre}.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-[4/5] flex-col rounded-[2rem] [transform-style:preserve-3d] sm:aspect-square lg:aspect-4/3"
                >
                  {/* Capa recortada: todo lo que es superficie. */}
                  <div className="border-hairline group-hover:border-rojo/60 absolute inset-0 overflow-hidden rounded-[2rem] border transition-colors duration-500">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(ellipse_78%_62%_at_50%_42%,#2e2e2e,#121212_74%)]"
                    />

                    <Image
                      src={g.foto}
                      alt={t(g.alt)}
                      fill
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      quality={90}
                      draggable={false}
                      className="ease-premium object-contain object-center px-5 pt-20 pb-32 transition-transform duration-700 group-hover:scale-[1.05]"
                    />

                    {/* Con scroll, la foto se funde con el auto andando. */}
                    <VideoAuto src={videoDe(g.id)} />

                    <div
                      aria-hidden="true"
                      className="ease-premium absolute bottom-[30%] left-1/2 h-5 w-[58%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75),transparent_72%)] transition-all duration-700 group-hover:w-[52%] group-hover:opacity-80"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/40 to-transparent"
                    />
                  </div>

                  {/* Firma del modelo, centrada arriba. Sin `uppercase`:
                      los nombres van como los escribe cada marca («i8»,
                      no «I 8», que con este interletrado se lee partido). */}
                  <p className="type-condensed over-media text-bone relative pt-6 text-center text-lg font-bold tracking-[0.16em] [transform:translateZ(55px)] md:text-xl">
                    {g.nombre}
                  </p>

                  <div className="relative mt-auto flex items-end justify-between gap-4 p-6 [transform:translateZ(45px)]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {g.aviso ? (
                          <span className="type-normal border-bone/25 text-bone/90 rounded-full border bg-black/45 px-3 py-1 text-[11px] leading-tight backdrop-blur-xs">
                            {t(g.aviso)}
                          </span>
                        ) : (
                          g.etiquetas.map((e) => (
                            <span
                              key={e}
                              className="type-normal border-bone/25 text-bone/90 rounded-full border bg-black/45 px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur-xs"
                            >
                              {t(e)}
                            </span>
                          ))
                        )}
                      </div>

                      <p className="type-normal text-bone mt-3 text-sm md:text-base">
                        {t(g.descripcion)}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="border-bone/50 text-bone group-hover:bg-bone group-hover:text-ink group-hover:border-bone ease-premium flex size-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-xs transition-colors duration-500"
                    >
                      <ArrowRight
                        size={18}
                        weight="regular"
                        className="ease-premium transition-transform duration-500 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <span className="sr-only">
                    {t("Consultar por WhatsApp (se abre en una pestaña nueva)")}
                  </span>
                </a>
              </Tilt3D>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
