"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import Tilt3D from "./Tilt3D";
import { useIdioma } from "@/lib/idioma";

/**
 * Tarjeta de imagen: la pieza del menú de la referencia, a tamaño de
 * página. 24px de radio, título abajo a la izquierda, botón circular
 * translúcido abajo a la derecha, degradado oscuro bajo el texto y la
 * imagen que se acerca despacio (0.4s) al pasar el puntero. Con
 * `inclinar` además gira en 3D siguiendo al puntero.
 */
export default function TarjetaImagen({
  href,
  titulo,
  subtitulo,
  imagen,
  alt,
  recorte = true,
  etiquetas,
  externo = false,
  inclinar = true,
  aspecto = "aspect-[4/3]",
}: {
  href: string;
  titulo: string;
  subtitulo?: string;
  imagen: string;
  alt: string;
  /** Recorte con alfa (auto): lleva fondo de estudio. Foto: llena. */
  recorte?: boolean;
  etiquetas?: string[];
  externo?: boolean;
  inclinar?: boolean;
  aspecto?: string;
}) {
  const { t } = useIdioma();

  const interior = (
    <>
      {recorte && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_66%_at_50%_36%,#3a3a3a,#121212_72%)]"
        />
      )}

      <Image
        src={imagen}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
        quality={90}
        draggable={false}
        className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06] ${
          recorte
            ? "object-contain object-center px-6 pt-10 pb-20"
            : "object-cover object-center"
        }`}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/85 via-black/40 to-transparent"
      />

      {etiquetas && etiquetas.length > 0 && (
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {etiquetas.map((e) => (
            <span
              key={e}
              className="type-normal rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-[#202020]"
            >
              {t(e)}
            </span>
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
        <div className="min-w-0">
          <p className="type-normal text-bone text-[1.2rem] leading-tight font-medium md:text-[1.35rem]">
            {titulo}
          </p>
          {subtitulo && (
            <p className="text-bone/70 mt-1 text-sm">{subtitulo}</p>
          )}
        </div>

        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white/45"
        >
          <ArrowRight
            size={18}
            className="ease-premium transition-transform duration-500 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </>
  );

  const clases = `group relative block ${aspecto} overflow-hidden rounded-3xl bg-[#121212] [transform:translateZ(0)]`;

  const enlace = externo ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={clases}>
      {interior}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {interior}
    </Link>
  );

  if (!inclinar) return enlace;

  return (
    <Tilt3D className="rounded-3xl" grados={6} escala={1.015} brillo={false}>
      {enlace}
    </Tilt3D>
  );
}
