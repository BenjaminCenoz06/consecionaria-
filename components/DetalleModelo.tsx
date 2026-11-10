"use client";

import Container from "./Container";
import Reveal from "./Reveal";
import EncabezadoPagina from "./EncabezadoPagina";
import BloquesPagina from "./BloquesPagina";
import BandaCta from "./BandaCta";
import TarjetaImagen from "./TarjetaImagen";
import ZonaClara from "./ZonaClara";
import { MODELOS } from "@/lib/modelos";
import { useIdioma } from "@/lib/idioma";
import { COMBUSTIBLE, WHATSAPP, type Texto } from "@/lib/sitio";

const T = (es: string, en: string): Texto => ({ es, en });

/** Lo que vale para todos los autos: es la promesa de la casa. */
const PUNTOS: { titulo: Texto; texto: Texto }[] = [
  {
    titulo: T("180 puntos de control", "180 checkpoints"),
    texto: T(
      "Esta unidad pasó los 180 puntos de control. Si uno solo hubiera fallado, no estaría acá.",
      "This car passed all 180 checkpoints. If even one had failed, it wouldn't be here.",
    ),
  },
  {
    titulo: T("Garantía por escrito", "Written warranty"),
    texto: T(
      "12 meses sobre motor, caja y diferencial, sin límite de kilómetros y válida en cualquier taller de la red.",
      "12 months on engine, gearbox and differential, with no mileage limit, valid at any workshop in the network.",
    ),
  },
  {
    titulo: T("Probalo 40 minutos", "Drive it for 40 minutes"),
    texto: T(
      "Sin vendedor al lado y sin obligación de compra. Reservá tu turno y te confirmamos el mismo día.",
      "With no salesperson beside you and no obligation to buy. Book your slot and we'll confirm the same day.",
    ),
  },
];

/** Ficha de un modelo: portada, promesa de la casa y otros autos. */
export default function DetalleModelo({ id }: { id: string }) {
  const { l, t } = useIdioma();
  const modelo = MODELOS.find((m) => m.id === id);
  if (!modelo) return null;

  const nombre = `${modelo.marca} ${modelo.nombre}`;
  const indice = MODELOS.findIndex((m) => m.id === id);
  /* Los tres que siguen, dando la vuelta: nunca queda vacío. */
  const otros = [1, 2, 3].map((n) => MODELOS[(indice + n) % MODELOS.length]);

  return (
    <>
      <EncabezadoPagina
        etiqueta={t("Modelos")}
        titulo={nombre}
        bajada={`${t(modelo.lema)}.`}
        auto={modelo.id}
        migas={[
          { texto: t("Inicio"), href: "/" },
          { texto: t("Modelos"), href: "/modelos" },
          { texto: nombre, href: `/modelos/${modelo.id}` },
        ]}
        etiquetas={COMBUSTIBLE[modelo.id]}
        datos={[
          { valor: "180", rotulo: t("puntos de control") },
          { valor: "12", rotulo: t("meses de garantía") },
          { valor: "40 min", rotulo: t("de prueba de manejo") },
        ]}
      />

      <ZonaClara>
        <BloquesPagina
          bloques={PUNTOS.map((p) => ({ titulo: l(p.titulo), texto: l(p.texto) }))}
        />

        <section className="pt-4 pb-12 lg:pb-16">
          <Container>
            <Reveal>
              <h2 className="display-tight text-tinta text-3xl font-bold md:text-5xl">
                {t("Otros modelos")}
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otros.map((m, i) => (
                <Reveal as="li" key={m.id} delay={i * 0.08}>
                  <TarjetaImagen
                    href={`/modelos/${m.id}`}
                    titulo={`${m.marca} ${m.nombre}`}
                    subtitulo={t(m.lema)}
                    imagen={m.foto}
                    alt={t(m.alt)}
                    etiquetas={COMBUSTIBLE[m.id]}
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <BandaCta
          titulo={`${t("¿Te gustó el")} ${nombre}?`}
          botones={[
            { texto: t("Reservar prueba"), href: "/#reservar" },
            {
              texto: t("Solicitar información"),
              href: `${WHATSAPP}?text=${encodeURIComponent(
                `${t("Hola, quiero información sobre el")} ${nombre}.`,
              )}`,
              externo: true,
            },
          ]}
        />
      </ZonaClara>
    </>
  );
}
