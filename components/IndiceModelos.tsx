"use client";

import { useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import EncabezadoPagina from "./EncabezadoPagina";
import BandaCta from "./BandaCta";
import TarjetaImagen from "./TarjetaImagen";
import ZonaClara from "./ZonaClara";
import { MODELOS } from "@/lib/modelos";
import { useIdioma } from "@/lib/idioma";
import { COMBUSTIBLE, categoriaPorId } from "@/lib/sitio";

const FILTROS = ["Todos", "Nafta", "Híbrido", "Eléctrico", "Clásico"] as const;

/**
 * Todos los modelos, con filtro por tipo de motor. Al cambiar de filtro
 * las tarjetas se vuelven a montar, así que vuelven a entrar con la
 * animación del sitio en vez de saltar de lugar.
 */
export default function IndiceModelos() {
  const { l, t } = useIdioma();
  const categoria = categoriaPorId("modelos");
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");

  const visibles = MODELOS.filter(
    (m) => filtro === "Todos" || (COMBUSTIBLE[m.id] ?? []).includes(filtro),
  );

  return (
    <>
      <EncabezadoPagina
        titulo={categoria ? l(categoria.etiqueta) : "Modelos"}
        bajada={categoria ? l(categoria.bajada) : ""}
        auto={categoria?.auto}
        migas={[
          { texto: t("Inicio"), href: "/" },
          { texto: categoria ? l(categoria.etiqueta) : "Modelos", href: "/modelos" },
        ]}
      />

      <ZonaClara>
        <section className="py-12 lg:py-16">
          <Container>
            <div
              role="tablist"
              aria-label={t("Filtrar por tipo de motor")}
              className="flex flex-wrap gap-2"
            >
              {FILTROS.map((f) => {
                const activo = f === filtro;
                return (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={activo}
                    onClick={() => setFiltro(f)}
                    className={`type-normal rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                      activo
                        ? "border-tinta bg-tinta text-lienzo"
                        : "border-linea text-graphite hover:border-tinta hover:text-tinta"
                    }`}
                  >
                    {t(f)}
                  </button>
                );
              })}
            </div>

            <ul
              key={filtro}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibles.map((m, i) => (
                <Reveal as="li" key={m.id} delay={(i % 3) * 0.08}>
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
          titulo={t("¿Cuál te llevó la mirada?")}
          botones={[
            { texto: t("Reservar prueba"), href: "/#reservar" },
            { texto: t("Cómo comprar"), href: "/compra/como-comprar" },
          ]}
        />
      </ZonaClara>
    </>
  );
}
