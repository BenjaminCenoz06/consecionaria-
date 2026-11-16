/**
 * Videos de los autos en movimiento, por id de auto (`lib/modelos.ts`).
 *
 * Las tarjetas muestran la foto y, mientras la persona hace scroll con la
 * tarjeta a la vista, la funden con este video; al dejar de scrollear
 * vuelve la foto. Un auto sin entrada acá simplemente muestra la foto.
 *
 * Para sumar uno: dejá el archivo en `public/videos/` (mp4 H.264, sin
 * audio, 3–6 s en loop, horizontal 3:2 o 16:9, idealmente < 2 MB) y
 * agregá la línea.
 */
export const VIDEOS: Record<string, string> = {
  /* Material de stock de la marca, no de la unidad exacta: reemplazar
     por videos propios cuando se tengan (ver public/videos/CREDITOS.md). */
  "ferrari-488-spider": "/videos/ferrari-488-spider.mp4",
  "lamborghini-miura": "/videos/lamborghini-miura.mp4",
  "tesla-model-s": "/videos/tesla-model-s.mp4",
};

export const videoDe = (id: string): string | undefined => VIDEOS[id];

/* ------------------------------------------------------------------ */
/* Fondo de la portada de cada ficha                                   */
/* ------------------------------------------------------------------ */

type Portada = {
  pc: string;
  pcPoster: string;
  movil: string;
  movilPoster: string;
};

const portada = (pc: string, movil: string): Portada => ({
  pc: `/videos/portada/${pc}.mp4`,
  pcPoster: `/videos/portada/${pc}.jpg`,
  movil: `/videos/portada/${movil}.mp4`,
  movilPoster: `/videos/portada/${movil}.jpg`,
});

/**
 * Videos de la portada por modelo: uno horizontal para PC y uno vertical
 * para celular, ambos de `public/videos/portada/`. Salvo donde se aclara,
 * son tomas de stock de un auto del MISMO TIPO, no de la unidad: se
 * reemplazan por videos propios cuando se tengan (ver CREDITOS.md).
 * Para sumar uno: dejá `<nombre>-pc.mp4` y `<nombre>-movil.mp4` con su
 * `.jpg` de poster y agregá la línea.
 */
const PORTADAS: Record<string, Portada> = {
  // Deportivos rojos
  "ferrari-488-spider": portada("ferrari-pc", "rojo-movil"),
  "ferrari-812": portada("ferrari-pc", "rojo-movil"),
  // Lamborghini
  "lamborghini-miura": portada("lamborghini-pc", "naranja-movil"),
  "lamborghini-huracan-tecnica": portada("lamborghini-pc", "naranja-movil"),
  // Clásico
  "porsche-356": portada("clasico-pc", "clasico-movil"),
  // Convertibles
  "mazda-mx5": portada("descapotable-pc", "roadster-movil"),
  "jaguar-f-type": portada("descapotable-pc", "roadster-movil"),
  "mercedes-amg-s63-cabrio": portada("descapotable-pc", "roadster-movil"),
  // Alemanes y deportivos oscuros
  "audi-r8": portada("negro-a-pc", "rs6-movil"),
  "audi-rs5": portada("negro-a-pc", "rs6-movil"),
  "lexus-lfa": portada("negro-a-pc", "rs6-movil"),
  "bmw-i8": portada("negro-a-pc", "bmw-movil"),
  "mercedes-amg-gt-r": portada("negro-b-pc", "mercedes-movil"),
  "bentley-continental-gt": portada("negro-b-pc", "mercedes-movil"),
  // Eléctrico
  "tesla-model-s": portada("negro-b-pc", "tesla-movil"),
  // Otros
  "nissan-370z": portada("gtr-pc", "naranja-movil"),
  "jeep-cj-renegade": portada("todoterreno-pc", "todoterreno-movil"),
};

/** Si un modelo todavía no tiene video, se usa uno genérico. */
const PORTADA_GENERICA = portada("negro-b-pc", "generico-movil");

export const portadaDe = (id: string): Portada => PORTADAS[id] ?? PORTADA_GENERICA;

/* ------------------------------------------------------------------ */
/* Fondo de la sección de compra de cada ficha                         */
/* ------------------------------------------------------------------ */

export type FondoCompra = {
  /** Video horizontal 1920×1080 para escritorio. */
  pc: string;
  pcPoster: string;
  /** Video vertical 1080×1920 para celular. */
  movil: string;
  movilPoster: string;
};

/** Auto andando que se usa cuando un modelo no tiene video propio. */
const GENERICO: FondoCompra = {
  pc: "/videos/compra/generico-pc.mp4",
  pcPoster: "/videos/compra/generico-pc.jpg",
  movil: "/videos/compra/generico-movil.mp4",
  movilPoster: "/videos/compra/generico-movil.jpg",
};

/**
 * Videos propios por modelo. Un modelo puede tener sólo uno de los dos
 * formatos: el que falte se completa con el genérico. Para sumar uno,
 * dejá `<id>-pc.mp4` y/o `<id>-movil.mp4` (con su `.jpg` de poster) en
 * `public/videos/compra/` y agregá la entrada.
 */
const PROPIOS: Record<string, Partial<FondoCompra>> = {
  "ferrari-488-spider": {
    pc: "/videos/compra/ferrari-488-spider-pc.mp4",
    pcPoster: "/videos/compra/ferrari-488-spider-pc.jpg",
  },
  "lamborghini-miura": {
    pc: "/videos/compra/lamborghini-miura-pc.mp4",
    pcPoster: "/videos/compra/lamborghini-miura-pc.jpg",
  },
  "tesla-model-s": {
    movil: "/videos/compra/tesla-model-s-movil.mp4",
    movilPoster: "/videos/compra/tesla-model-s-movil.jpg",
  },
};

export const fondoCompra = (id: string): FondoCompra => ({
  ...GENERICO,
  ...PROPIOS[id],
});
