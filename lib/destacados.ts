/**
 * Selección de la semana (sección "Destacados" de la home).
 *
 * Son los autos que se muestran de frente, grandes, con pestañas. No es
 * el stock de venta (`vehiculos.ts`): es una vitrina editorial que se
 * cambia a mano cada semana.
 *
 * Para sumar uno: dejá el recorte (webp con alfa, ajustado al borde del
 * auto) en `public/destacados/` y agregá una entrada acá. Las pestañas
 * se arman solas con la lista. Origen de las fotos:
 * `public/destacados/CREDITOS.md`.
 */
export type Destacado = {
  id: string;
  marca: string;
  /** Va en grande, en una o dos líneas. */
  nombre: string;
  foto: string;
  ancho: number;
  alto: number;
  alt: string;
};

export const DESTACADOS: Destacado[] = [
  {
    id: "mercedes-amg-gt-r",
    marca: "Mercedes-AMG",
    nombre: "GT R",
    foto: "/destacados/mercedes-amg-gt-r.webp",
    ancho: 2400,
    alto: 1006,
    alt: "Mercedes-AMG GT R verde visto de frente en tres cuartos",
  },
  {
    id: "ferrari-812",
    marca: "Ferrari",
    nombre: "812",
    foto: "/destacados/ferrari-812.webp",
    ancho: 2145,
    alto: 1026,
    alt: "Ferrari 812 rojo visto de frente en tres cuartos",
  },
  {
    id: "lamborghini-huracan-tecnica",
    marca: "Lamborghini",
    nombre: "Huracán Tecnica",
    foto: "/destacados/lamborghini-huracan-tecnica.webp",
    ancho: 2400,
    alto: 1020,
    alt: "Lamborghini Huracán Tecnica naranja visto de frente en tres cuartos",
  },
  {
    id: "audi-rs5",
    marca: "Audi",
    nombre: "RS5",
    foto: "/destacados/audi-rs5.webp",
    ancho: 2400,
    alto: 1172,
    alt: "Audi RS5 azul oscuro visto de frente en tres cuartos",
  },
  {
    id: "lexus-lfa",
    marca: "Lexus",
    nombre: "LFA",
    foto: "/destacados/lexus-lfa.webp",
    ancho: 2400,
    alto: 1910,
    alt: "Lexus LFA blanco visto de frente",
  },
];
