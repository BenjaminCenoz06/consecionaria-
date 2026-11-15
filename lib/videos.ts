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
