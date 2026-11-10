"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";

export type BotonCta = { texto: string; href: string; externo?: boolean };

/**
 * Cierre de página: un título grande y uno o dos botones. El primero es
 * el principal (latón, con el barrido de luz del sitio); el segundo, de
 * contorno.
 */
export default function BandaCta({
  titulo,
  botones,
}: {
  titulo: string;
  botones: BotonCta[];
}) {
  const clase = (principal: boolean) =>
    principal
      ? "type-condensed destello bg-brass text-ink hover:bg-tinta hover:text-lienzo group inline-flex h-14 items-center justify-center gap-5 px-6 text-[15px] font-bold tracking-wide uppercase transition-colors duration-300"
      : "type-condensed text-tinta border-tinta/60 hover:bg-tinta hover:text-lienzo hover:border-tinta group inline-flex h-14 items-center justify-center gap-5 border px-6 text-[15px] font-bold tracking-wide uppercase transition-colors duration-300";

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal>
          <h2 className="display-tight text-tinta max-w-[22ch] text-4xl font-bold md:text-6xl lg:text-7xl">
            {titulo}
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {botones.map((b, i) => {
              const contenido = (
                <>
                  {b.texto}
                  <ArrowRight
                    size={18}
                    className="ease-premium transition-transform duration-500 group-hover:translate-x-1"
                  />
                </>
              );
              return b.externo ? (
                <a
                  key={b.texto}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clase(i === 0)}
                >
                  {contenido}
                </a>
              ) : (
                <Link key={b.texto} href={b.href} className={clase(i === 0)}>
                  {contenido}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
