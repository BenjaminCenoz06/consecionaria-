/**
 * Vitrina "Modelos" de la home.
 *
 * Es la selección editorial que se ve bajo el hero, no el stock de
 * venta (ese vive en `vehiculos.ts`). Las fotos son recortes con
 * transparencia, ~3000 px de ancho: el fondo lo pone la sección.
 *
 * Para sumar un modelo: dejá el recorte en `public/modelos/` (webp con
 * alfa, ajustado al borde del auto y con las ruedas apoyadas en el borde
 * inferior) y agregá una entrada acá. Sin tocar el componente: tabs,
 * contador y carga anticipada se arman solos con la lista.
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
    ancho: 3012,
    alto: 876,
    alt: "Ferrari 488 Spider rojo visto de perfil",
  },
  {
    id: "bmw-i8",
    marca: "BMW",
    nombre: "i8",
    lema: "Electrizante por diseño",
    foto: "/modelos/bmw-i8.webp",
    ancho: 2713,
    alto: 830,
    alt: "BMW i8 naranja visto de perfil",
  },
  {
    id: "bentley-continental-gt",
    marca: "Bentley",
    nombre: "Continental GT",
    lema: "Lujo en movimiento",
    foto: "/modelos/bentley-continental-gt.webp",
    ancho: 2992,
    alto: 921,
    alt: "Bentley Continental GT gris visto de perfil",
  },
  {
    id: "lamborghini-miura",
    marca: "Lamborghini",
    nombre: "Miura",
    lema: "Un clásico vivo",
    foto: "/modelos/lamborghini-miura.webp",
    ancho: 3008,
    alto: 817,
    alt: "Lamborghini Miura naranja de época visto de perfil",
  },
  {
    id: "mercedes-amg-s63-cabrio",
    marca: "Mercedes-AMG",
    nombre: "S 63 Cabrio",
    lema: "Potencia con clase",
    foto: "/modelos/mercedes-amg-s63-cabrio.webp",
    ancho: 3026,
    alto: 930,
    alt: "Mercedes-AMG S 63 Cabrio plateado visto de perfil",
  },
  {
    id: "porsche-356",
    marca: "Porsche",
    nombre: "356",
    lema: "Pura herencia",
    foto: "/modelos/porsche-356.webp",
    ancho: 3125,
    alto: 1072,
    alt: "Porsche 356 rojo clásico visto de perfil",
  },
  {
    id: "tesla-model-s",
    marca: "Tesla",
    nombre: "Model S",
    lema: "El silencio acelera",
    foto: "/modelos/tesla-model-s.webp",
    ancho: 3009,
    alto: 1109,
    alt: "Tesla Model S azul visto de perfil",
  },
  {
    id: "audi-r8",
    marca: "Audi",
    nombre: "R8",
    lema: "Instinto V10",
    foto: "/modelos/audi-r8.webp",
    ancho: 2976,
    alto: 894,
    alt: "Audi R8 gris con pinzas verdes visto de perfil",
  },
  {
    id: "jaguar-f-type",
    marca: "Jaguar",
    nombre: "F-Type",
    lema: "Carácter británico",
    foto: "/modelos/jaguar-f-type.webp",
    ancho: 3000,
    alto: 973,
    alt: "Jaguar F-Type blanco visto de perfil",
  },
  {
    id: "mazda-mx5",
    marca: "Mazda",
    nombre: "MX-5",
    lema: "Pura diversión",
    foto: "/modelos/mazda-mx5.webp",
    ancho: 3011,
    alto: 1060,
    alt: "Mazda MX-5 rojo visto de perfil",
  },
  {
    id: "nissan-370z",
    marca: "Nissan",
    nombre: "370Z",
    lema: "Pulso deportivo",
    foto: "/modelos/nissan-370z.webp",
    ancho: 3014,
    alto: 986,
    alt: "Nissan 370Z blanco visto de perfil",
  },
];
