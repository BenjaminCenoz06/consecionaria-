"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import TarjetaVehiculo from "./TarjetaVehiculo";
import { VEHICULOS } from "@/lib/vehiculos";

/**
 * Carrusel horizontal.
 *
 * Hallazgo de la investigación: en la referencia el scroll vertical
 * cambia de TEMA, nunca de ITEM. Para recorrer el catálogo se desliza
 * en horizontal. Esto es scroll-snap nativo, sin librería: Swiper
 * costaría unos 40 KB para algo que el navegador ya sabe hacer.
 */
export default function Destacados() {
  const pista = useRef<HTMLUListElement>(null);
  const [puedeIzq, setPuedeIzq] = useState(false);
  const [puedeDer, setPuedeDer] = useState(true);

  const destacados = VEHICULOS.filter((v) => v.destacado);

  const revisarLimites = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    setPuedeIzq(el.scrollLeft > 8);
    setPuedeDer(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    revisarLimites();
    window.addEventListener("resize", revisarLimites);
    return () => window.removeEventListener("resize", revisarLimites);
  }, [revisarLimites]);

  const mover = (direccion: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const paso = el.clientWidth * 0.8;
    el.scrollBy({ left: paso * direccion, behavior: "smooth" });
  };

  const botonBase =
    "flex h-11 w-11 items-center justify-center border border-hairline text-bone transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brass hover:text-brass active:scale-95 disabled:opacity-25 disabled:pointer-events-none";

  return (
    <section className="bg-surface py-20 lg:py-24">
      <Container>
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="type-normal text-brass text-xs font-semibold uppercase">
              Selección de la semana
            </p>
            <h2 className="display-tight text-bone mt-3 text-4xl font-bold md:text-6xl">
              Destacados
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => mover(-1)}
              disabled={!puedeIzq}
              aria-label="Ver anteriores"
              className={botonBase}
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              disabled={!puedeDer}
              aria-label="Ver siguientes"
              className={botonBase}
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </Reveal>
      </Container>

      {/* El `relative` no es decorativo. Sin él, los `sr-only` de las
          tarjetas —que Tailwind define como `position: absolute`— no
          encuentran ancestro posicionado, toman el viewport como bloque
          contenedor y se escapan del scroll horizontal: la página
          entera termina scrolleando de costado en pantallas angostas.
          Con esto quedan contenidos dentro de la pista. */}
      <ul
        ref={pista}
        onScroll={revisarLimites}
        className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:px-[max(1.5rem,calc((100vw-1320px)/2))]"
      >
        {destacados.map((vehiculo, i) => (
          <li
            key={vehiculo.id}
            className="w-[82vw] max-w-[420px] shrink-0 snap-start sm:w-[55vw] lg:w-[32vw]"
          >
            <TarjetaVehiculo vehiculo={vehiculo} prioridad={i < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
