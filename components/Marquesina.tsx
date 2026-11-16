/**
 * Cinta de marcas que corre sin parar entre la frase y la selección de
 * la semana, con los logos reales de cada marca en su color.
 *
 * Los logos son SVG de la colección Simple Icons (CC0, ver
 * `public/marcas/CREDITOS.md`), recortados a su contorno. Cada uno se
 * dibuja como máscara con el color de la marca: así se tiñen sin tocar
 * el archivo y se pueden cambiar desde acá. Los colores son los
 * característicos de cada marca, aclarados donde hacía falta para que
 * se lean sobre el fondo negro.
 *
 * La pista se repite dos veces y se desplaza exactamente la mitad, así
 * el bucle no tiene salto. Es decorativa (`aria-hidden`): las marcas ya
 * están en el catálogo. Se frena al pasar el puntero y con "reducir
 * movimiento" queda quieta.
 */
import type { CSSProperties } from "react";

type Marca = {
  nombre: string;
  /** Archivo en `public/marcas/`. */
  archivo: string;
  /** Color característico de la marca. */
  color: string;
  /** Proporción ancho/alto del logo ya recortado. */
  proporcion: number;
  /** Alto relativo: los logos anchos (Audi, Bentley…) se achican un poco. */
  escala?: number;
  /** Texto que va junto al logo cuando la marca lo lleva (AMG). */
  texto?: string;
};

const MARCAS: Marca[] = [
  { nombre: "Ferrari", archivo: "ferrari", color: "#FF2800", proporcion: 0.72 },
  { nombre: "Mercedes-AMG", archivo: "mercedes", color: "#C9CDD2", proporcion: 1, texto: "AMG" },
  { nombre: "Lamborghini", archivo: "lamborghini", color: "#E0B52B", proporcion: 0.86 },
  { nombre: "Porsche", archivo: "porsche", color: "#E1BC5F", proporcion: 0.78 },
  { nombre: "BMW", archivo: "bmw", color: "#2F7BE0", proporcion: 1 },
  { nombre: "Audi", archivo: "audi", color: "#E8E8E8", proporcion: 2.89, escala: 0.55 },
  { nombre: "Bentley", archivo: "bentley", color: "#3FA56B", proporcion: 3.09, escala: 0.5 },
  { nombre: "Tesla", archivo: "tesla", color: "#E31937", proporcion: 1, escala: 0.8 },
  { nombre: "Jaguar", archivo: "jaguar", color: "#C8B07A", proporcion: 2.23, escala: 0.7 },
  { nombre: "Mazda", archivo: "mazda", color: "#D5D8DD", proporcion: 1.25, escala: 0.9 },
  { nombre: "Nissan", archivo: "nissan", color: "#E0334F", proporcion: 1.2, escala: 0.9 },
  { nombre: "Volkswagen", archivo: "volkswagen", color: "#3C82E6", proporcion: 1 },
  { nombre: "Jeep", archivo: "jeep", color: "#9DBF4F", proporcion: 2.48, escala: 0.6 },
];

function Logo({ marca }: { marca: Marca }) {
  const url = `url(/marcas/${marca.archivo}.svg)`;

  return (
    <span className="group/logo flex items-center gap-3 px-8 lg:gap-4 lg:px-14">
      <span
        title={marca.nombre}
        className="block opacity-90 transition-[opacity,transform,filter] duration-500 group-hover/logo:scale-110 group-hover/logo:opacity-100 group-hover/logo:[filter:drop-shadow(0_0_14px_var(--color-marca))]"
        style={
          {
            "--color-marca": marca.color,
            height: `calc(var(--alto-logo) * ${marca.escala ?? 1})`,
            aspectRatio: String(marca.proporcion),
            backgroundColor: marca.color,
            WebkitMask: `${url} center / contain no-repeat`,
            mask: `${url} center / contain no-repeat`,
          } as CSSProperties
        }
      />
      {marca.texto && (
        <span
          className="type-condensed text-4xl leading-none font-extrabold tracking-wider md:text-5xl lg:text-6xl"
          style={{ color: marca.color }}
        >
          {marca.texto}
        </span>
      )}
    </span>
  );
}

export default function Marquesina() {
  return (
    <div
      aria-hidden="true"
      className="bg-ink group/marquesina relative overflow-hidden border-y border-white/10 py-8 [--alto-logo:3.4rem] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] md:[--alto-logo:4.4rem] lg:py-12 lg:[--alto-logo:5.6rem]"
    >
      <div className="animate-marquesina flex w-max items-center group-hover/marquesina:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0 items-center">
            {MARCAS.map((marca) => (
              <li key={`${copia}-${marca.archivo}`} className="flex items-center">
                <Logo marca={marca} />
                <span className="h-10 w-px shrink-0 bg-white/15 lg:h-14" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
