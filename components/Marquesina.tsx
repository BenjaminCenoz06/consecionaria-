import { MODELOS } from "@/lib/modelos";

/** Marcas del catálogo, sin repetir y en el orden en que aparecen. */
const MARCAS = [...new Set(MODELOS.map((m) => m.marca))];

/**
 * Cinta de marcas que corre sin parar entre la frase y la selección de
 * la semana.
 *
 * Letras gigantes sólo con contorno: sobre el negro se leen como un
 * rótulo de showroom y al pasar el puntero se rellenan. La pista se
 * repite dos veces y se desplaza exactamente la mitad, así el bucle no
 * tiene salto. Es decorativa (`aria-hidden`): las marcas ya están en el
 * catálogo. Con "reducir movimiento" queda quieta.
 */
export default function Marquesina() {
  const pista = [...MARCAS, ...MARCAS];

  return (
    <div
      aria-hidden="true"
      className="bg-ink group/marquesina relative overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] lg:py-10"
    >
      <div className="animate-marquesina flex w-max items-center group-hover/marquesina:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0 items-center">
            {pista.map((marca, i) => (
              <li key={`${copia}-${marca}-${i}`} className="flex items-center">
                <span className="type-condensed hover:text-bone/90 px-6 text-5xl font-extrabold tracking-wide whitespace-nowrap text-transparent uppercase transition-colors duration-500 [-webkit-text-stroke:1px_rgb(255_255_255/0.38)] hover:[-webkit-text-stroke-color:transparent] md:text-7xl lg:px-10 lg:text-8xl">
                  {marca}
                </span>
                <span className="bg-rojo size-2 shrink-0 rotate-45 lg:size-2.5" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
