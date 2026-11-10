"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import Reveal from "./Reveal";
import Plano3D from "./Plano3D";
import { useIdioma } from "@/lib/idioma";

const PREGUNTAS = [
  {
    p: "¿Qué servicios ofrecen?",
    r: "Compra, venta y consignación de autos. Trabajamos 0 km multimarcas y usados seleccionados, con financiación exclusiva.",
  },
  {
    p: "¿Trabajan con financiación?",
    r: "Sí, tenemos financiación exclusiva. Consultanos por WhatsApp las opciones disponibles para el auto que te interesa.",
  },
  {
    p: "¿Compran mi auto?",
    r: "Sí. Evaluamos tu auto y te hacemos una propuesta. También podés entregarlo como parte de pago de tu próximo auto.",
  },
  {
    p: "¿Qué es la consignación?",
    r: "Es una forma de vender tu auto sin ocuparte de todo: lo exhibimos y gestionamos la venta por vos. Consultanos las condiciones.",
  },
  {
    p: "¿Trabajan con 0 km de todas las marcas?",
    r: "Trabajamos 0 km multimarcas. Escribinos con la marca y el modelo que buscás y te contamos qué hay disponible.",
  },
  {
    p: "¿Dónde están?",
    r: "En La Cumbre, Córdoba. Estamos preparando un nuevo espacio y, mientras tanto, te atendemos por WhatsApp.",
  },
  {
    p: "¿Hacen sorteos?",
    r: "Sí. Los anunciamos en nuestro Instagram, @barcena.automotores.",
  },
  {
    p: "¿Cómo reservo una visita?",
    r: "Completá el formulario de esta página o escribinos por WhatsApp al 3548 40-9755 y coordinamos el día.",
  },
];

export default function Preguntas() {
  const { t } = useIdioma();

  return (
    <section id="preguntas" className="py-8 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <Reveal>
            <h2 className="display-tight text-tinta text-4xl font-bold md:text-6xl">
              {t("Preguntas")}
            </h2>
            <p className="text-graphite mt-6 max-w-[34ch] text-base">
              {t(
                "Si falta la tuya, escribinos por WhatsApp y te contestamos sin pedirte los datos primero.",
              )}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Plano3D inclinacion={8}>
            <dl className="border-linea border-t">
              {PREGUNTAS.map((item) => (
                <details
                  key={item.p}
                  name="preguntas"
                  className="group border-linea border-b"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-3.5 lg:py-5 [&::-webkit-details-marker]:hidden">
                    <dt className="type-normal text-tinta text-lg font-semibold">
                      {t(item.p)}
                    </dt>
                    <Plus
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                      className="text-graphite mt-1 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                    />
                  </summary>
                  <dd className="text-graphite max-w-[62ch] pb-6 text-base">
                    {t(item.r)}
                  </dd>
                </details>
              ))}
            </dl>
            </Plano3D>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
