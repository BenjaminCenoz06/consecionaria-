"use client";

import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";

export type BloquePlano = { titulo: string; texto: string };

/**
 * Tarjetas numeradas con volumen: el número queda al fondo, el título
 * al medio y el texto al frente. Es la misma pieza de "Cómo funciona"
 * de la home, para que todas las páginas hablen igual. Va dentro de una
 * `ZonaClara`: lee los colores del tema.
 */
export default function BloquesPagina({
  bloques,
  titulo,
}: {
  bloques: BloquePlano[];
  titulo?: string;
}) {
  const columnas =
    bloques.length === 4 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-6 lg:py-16">
      <Container>
        {titulo && (
          <Reveal>
            <h2 className="display-tight text-tinta max-w-[20ch] text-4xl font-bold md:text-6xl">
              {titulo}
            </h2>
          </Reveal>
        )}

        <ol className={`carrusel-movil sm:grid sm:grid-cols-1 sm:gap-6 ${titulo ? "mt-8 lg:mt-12" : ""} ${columnas}`}>
          {bloques.map((b, i) => (
            <Reveal as="li" key={b.titulo} delay={(i % 3) * 0.08}>
              <Tilt3D grados={6} escala={1.025} className="h-full rounded-2xl">
                <div
                  className="border-linea bg-tarjeta h-full rounded-2xl border p-6 shadow sm:p-8-[0_1px_1px_rgb(0_0_0/0.04),0_8px_16px_-6px_rgb(0_0_0/0.08),0_28px_48px_-20px_rgb(0_0_0/0.18)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p
                    className="type-condensed text-linea text-7xl font-bold"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="type-condensed text-tinta mt-4 text-2xl font-bold uppercase"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {b.titulo}
                  </h3>
                  <p
                    className="text-graphite mt-3 max-w-[46ch] text-base"
                    style={{ transform: "translateZ(26px)" }}
                  >
                    {b.texto}
                  </p>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
