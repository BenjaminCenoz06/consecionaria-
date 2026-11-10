/**
 * Gama (sección "Tu próximo auto" de la home).
 *
 * Es la grilla grande que va al final del bloque de vitrinas: cada
 * tarjeta muestra un auto con sus etiquetas y una línea que lo
 * describe. No es el stock de venta (`vehiculos.ts`) ni la selección
 * semanal (`destacados.ts`).
 *
 * `foto` reusa los recortes con alfa de `public/modelos/`: el fondo
 * degradado lo pone la tarjeta. Para sumar uno, agregá la entrada acá;
 * la grilla se arma sola.
 */
export type Gama = {
  id: string;
  /** Va arriba del todo, centrado, como la firma del modelo. */
  nombre: string;
  /** Píldoras abajo a la izquierda. Una o dos, no más. */
  etiquetas: string[];
  /** Aviso en lugar de las etiquetas cuando la unidad no está a pedido. */
  aviso?: string;
  /** Una línea. Qué es el auto, sin adjetivos de folleto. */
  descripcion: string;
  foto: string;
  alt: string;
};

export const GAMA: Gama[] = [
  {
    id: "ferrari-488-spider",
    nombre: "488 Spider",
    etiquetas: ["Nafta"],
    descripcion: "Spider de dos plazas con V8 biturbo central.",
    foto: "/modelos/ferrari-488-spider.webp",
    alt: "Ferrari 488 Spider rojo visto de perfil",
  },
  {
    id: "bmw-i8",
    nombre: "i8",
    etiquetas: ["Híbrido", "Nafta"],
    descripcion: "Coupé híbrido enchufable con puertas de ala.",
    foto: "/modelos/bmw-i8.webp",
    alt: "BMW i8 naranja visto de perfil",
  },
  {
    id: "audi-r8",
    nombre: "R8",
    etiquetas: ["Nafta"],
    descripcion: "Deportivo de motor V10 atmosférico central.",
    foto: "/modelos/audi-r8.webp",
    alt: "Audi R8 gris con pinzas verdes visto de perfil",
  },
  {
    id: "lamborghini-miura",
    nombre: "Miura",
    aviso: "Unidad de colección: no entra a pedido. Consultá disponibilidad.",
    etiquetas: ["Nafta", "Clásico"],
    descripcion: "Berlinetta V12 de los años sesenta, restaurada.",
    foto: "/modelos/lamborghini-miura.webp",
    alt: "Lamborghini Miura naranja de época visto de perfil",
  },
];
