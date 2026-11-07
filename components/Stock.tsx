"use client";

import { useMemo, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import TarjetaVehiculo from "./TarjetaVehiculo";
import { CARROCERIAS, VEHICULOS } from "@/lib/vehiculos";

type Carroceria = (typeof CARROCERIAS)[number];

export default function Stock() {
  const [filtro, setFiltro] = useState<Carroceria>("Todos");

  const visibles = useMemo(
    () =>
      filtro === "Todos"
        ? VEHICULOS
        : VEHICULOS.filter((v) => v.carroceria === filtro),
    [filtro],
  );

  return (
    <section id="stock" className="bg-ink py-20 lg:py-24">
      <Container>
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-normal text-brass text-xs font-semibold uppercase">
              {VEHICULOS.length} unidades disponibles
            </p>
            <h2 className="display-tight text-bone mt-3 text-4xl font-bold md:text-6xl lg:text-7xl">
              Stock
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filtrar por carrocería"
            className="flex flex-wrap gap-2"
          >
            {CARROCERIAS.map((c) => {
              const activo = filtro === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFiltro(c)}
                  aria-pressed={activo}
                  className={`type-normal border px-3 py-2 text-sm font-semibold uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] ${
                    activo
                      ? "bg-bone text-ink border-bone"
                      : "border-hairline text-graphite hover:border-graphite hover:text-bone"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </Reveal>

        {visibles.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((vehiculo, i) => (
              <Reveal
                as="li"
                key={vehiculo.id}
                delay={Math.min(i * 0.06, 0.3)}
              >
                <TarjetaVehiculo vehiculo={vehiculo} />
              </Reveal>
            ))}
          </ul>
        ) : (
          /* Estado vacío compuesto, nunca un panel en blanco. */
          <div className="border-hairline mt-12 border border-dashed p-12 text-center">
            <p className="type-condensed text-bone text-3xl font-bold uppercase">
              Nada en {filtro} por ahora
            </p>
            <p className="text-graphite mx-auto mt-3 max-w-[48ch] text-sm">
              El stock rota cada semana. Dejanos tu búsqueda y te avisamos el
              día que entre una unidad que encaje.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setFiltro("Todos")}
                className="bg-bone text-ink type-normal px-3 py-2 text-sm font-semibold uppercase transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              >
                Ver todo el stock
              </button>
              <a
                href="#reservar"
                className="border-hairline text-bone type-normal hover:border-bone border px-3 py-2 text-sm font-semibold uppercase transition-colors duration-300"
              >
                Avisarme por mail
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
