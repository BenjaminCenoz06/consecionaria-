"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import VideoAuto from "./VideoAuto";
import { videoDe } from "@/lib/videos";
import { MODELOS } from "@/lib/modelos";
import { useIdioma } from "@/lib/idioma";

const WHATSAPP = "https://wa.me/5493548409755";

/**
 * Qué tres modelos van en la fila. Son ids de `lib/modelos.ts`: se
 * cambia el orden o los ids y la fila se rearma sola, sin tocar nada
 * más. A propósito no son los de la selección de la semana, que está
 * justo arriba: la fila existe para mostrar otra cosa.
 */
const ELEGIDOS = ["porsche-356", "tesla-model-s", "bentley-continental-gt"];

/**
 * Fila de tres tarjetas con foto.
 *
 * Va debajo de la selección de la semana: el auto ocupa la tarjeta, el
 * nombre se apoya abajo a la izquierda y la flecha en círculo cierra a
 * la derecha. Es el único lugar del sitio con esquinas redondeadas —
 * el resto es a escuadra — porque la tarjeta necesita leerse como
 * objeto suelto sobre el fondo.
 *
 * La tarjeta se inclina con el puntero (`Tilt3D`). Para que el 3D no se
 * aplaste, la foto se recorta en una capa aparte: `overflow-hidden` y
 * `preserve-3d` no conviven, el navegador elige el recorte y achata
 * todo. Así el texto y la flecha quedan afuera del recorte, levantados
 * en Z, y flotan sobre la foto cuando la tarjeta gira.
 */
export default function Explorar() {
  const { t } = useIdioma();
  const tarjetas = ELEGIDOS.flatMap((id) => {
    const modelo = MODELOS.find((m) => m.id === id);
    return modelo ? [modelo] : [];
  });

  return (
    <section
      id="explorar"
      aria-labelledby="titulo-explorar"
      className="py-6 lg:py-20"
    >
      <h2 id="titulo-explorar" className="sr-only">
        {t("Seguí explorando")}
      </h2>

      <Container>
        <ul className="carrusel-movil sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {tarjetas.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 0.1}>
              <Tilt3D className="rounded-[2rem]" grados={8}>
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent(
                    `${t("Hola, quiero información sobre el")} ${m.marca} ${m.nombre}.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-3/2 flex-col justify-end rounded-[2rem] [transform-style:preserve-3d]"
                >
                  {/* Capa recortada: todo lo que es superficie. */}
                  <div className="border-hairline group-hover:border-rojo/60 absolute inset-0 overflow-hidden rounded-[2rem] border transition-colors duration-500">
                    {/* Fondo de estudio: claro arriba del auto, oscuro
                        en los bordes. Es lo que le da volumen al recorte. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(ellipse_78%_66%_at_50%_34%,#2e2e2e,#121212_72%)]"
                    />

                    <Image
                      src={m.foto}
                      alt={t(m.alt)}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                      quality={90}
                      draggable={false}
                      className="ease-premium object-contain object-center px-5 pt-8 pb-24 transition-transform duration-700 group-hover:scale-[1.05]"
                    />

                    {/* Con scroll, la foto se funde con el auto andando. */}
                    <VideoAuto src={videoDe(m.id)} />

                    {/* Sombra de apoyo: sin esto el auto flota en el aire. */}
                    <div
                      aria-hidden="true"
                      className="ease-premium absolute bottom-[26%] left-1/2 h-5 w-[62%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75),transparent_72%)] transition-all duration-700 group-hover:w-[56%] group-hover:opacity-80"
                    />

                    {/* Velo bajo: sin esto el nombre pelea con el auto. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 via-black/35 to-transparent"
                    />
                  </div>

                  {/* Fuera del recorte y levantado en Z: es lo que
                      flota sobre la foto cuando la tarjeta gira. */}
                  <div className="relative flex items-end justify-between gap-4 p-6 [transform:translateZ(42px)]">
                    <p className="type-normal text-bone text-xl font-semibold text-balance md:text-[1.4rem]">
                      {m.marca} {m.nombre}.
                    </p>

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
