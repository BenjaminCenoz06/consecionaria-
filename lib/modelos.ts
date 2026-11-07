/**
 * Vitrina "Modelos" de la home.
 *
 * Es la selección editorial que se ve bajo el hero, no el stock de
 * venta (ese vive en `vehiculos.ts`). Las fotos son recortes con
 * transparencia: el fondo lo pone la sección, no la imagen.
 *
 * Para sumar un modelo: dejá el recorte en `public/modelos/` (webp con
 * alfa, ya ajustado al borde del auto) y agregá una entrada acá.
 * Origen y licencia de las fotos: `public/modelos/CREDITOS.md`.
 */
export type Modelo = {
  id: string;
  marca: string;
  nombre: string;
  /** Frase corta. Va en grande: dos líneas como máximo en celular. */
  lema: string;
  foto: string;
  ancho: number;
  alto: number;
  alt: string;
};

export const MODELOS: Modelo[] = [
  {
    id: "ferrari-488-spider",
    marca: "Ferrari",
    nombre: "488 Spider",
    lema: "Cielo abierto",
    foto: "/modelos/ferrari-488-spider.webp",
    ancho: 1600,
    alto: 471,
    alt: "Ferrari 488 Spider rojo visto de perfil",
  },
  {
    id: "bmw-i8",
    marca: "BMW",
    nombre: "i8",
    lema: "Electrizante por diseño",
    foto: "/modelos/bmw-i8.webp",
    ancho: 1600,
    alto: 495,
    alt: "BMW i8 naranja visto de perfil",
  },
  {
    id: "bentley-continental-gt",
    marca: "Bentley",
    nombre: "Continental GT",
    lema: "Lujo en movimiento",
    foto: "/modelos/bentley-continental-gt.webp",
    ancho: 1600,
    alto: 502,
    alt: "Bentley Continental GT gris visto de perfil",
  },
  {
    id: "lamborghini-miura",
    marca: "Lamborghini",
    nombre: "Miura",
    lema: "Un clásico vivo",
    foto: "/modelos/lamborghini-miura.webp",
    ancho: 1324,
    alto: 366,
    alt: "Lamborghini Miura naranja de época visto de perfil",
  },
];
