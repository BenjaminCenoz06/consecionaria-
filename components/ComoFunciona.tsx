"use client";

import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { useIdioma } from "@/lib/idioma";

const PASOS = [
  {
    n: "01",
    titulo: "Elegís la unidad",
    texto:
      "Mirá el catálogo y consultanos por la que te gustó. Te respondemos por WhatsApp, sin vueltas.",
  },
  {
    n: "02",
    titulo: "Coordinamos tu visita",
    texto:
      "Vení a La Cumbre a ver el auto y probarlo con calma, sin compromiso.",
  },
  {
    n: "03",
    titulo: "Te asesoramos",
    texto:
      "Con financiación exclusiva y ayuda con la documentación, para que salgas manejando.",
  },
];

export default function ComoFunciona() {
  const { t } = useIdioma();

  return (
    <section id="como-funciona" className="py-8 lg:py-24">
      <Container>
        <Reveal>
          <p className="type-normal text-acento-tema text-xs font-semibold uppercase">
            {t("Tres pasos")}
          </p>
          <h2 className="display-tight text-tinta mt-3 max-w-[18ch] text-4xl font-bold md:text-6xl lg:text-7xl">
            {t("Cómo funciona")}
          </h2>
        </Reveal>

        <ol className="carrusel-movil mt-6 sm:grid sm:grid-cols-1 sm:gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:mt-16">
          {PASOS.map((paso, i) => (
            <Reveal as="li" key={paso.n} delay={i * 0.08}>
              {/* Tarjeta con profundidad: el número queda al fondo, el
                  título al medio y el texto al frente. Las sombras en
                  capas dan el apoyo sobre el papel. */}
              <Tilt3D
                grados={7}
                escala={1.03}
                className="h-full rounded-sm"
              >
                <div
                  className="border-linea bg-tarjeta h-full rounded-sm border p-6 shadow-[0_1px_1px_rgb(0_0_0/0.04),0_8px_16px_-6px_rgb(0_0_0/0.08),0_28px_48px_-20px_rgb(0_0_0/0.18)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <p
                    className="type-condensed text-linea text-5xl font-bold lg:text-7xl"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    {paso.n}
                  </p>
                  <h3
                    className="type-condensed text-tinta mt-4 text-2xl font-bold uppercase"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {t(paso.titulo)}
                  </h3>
                  <p
                    className="text-graphite mt-3 max-w-[42ch] text-base"
                    style={{ transform: "translateZ(26px)" }}
                  >
                    {t(paso.texto)}
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
