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
