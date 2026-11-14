# Videos de los autos

Poné acá un video por auto, con el **id del auto** como nombre:

    ferrari-488-spider.mp4

Después activalo en `lib/videos.ts` descomentando o agregando la línea:

    "ferrari-488-spider": "/videos/ferrari-488-spider.mp4",

## Formato recomendado

- MP4 (H.264), **sin audio**, de 3 a 6 segundos que cierren en loop.
- Horizontal 3:2 o 16:9, 1280×720 alcanza. Peso ideal: menos de 2 MB.
- El auto andando, bien centrado: la tarjeta recorta los bordes.

Reducir un video con ffmpeg:

    ffmpeg -i original.mp4 -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart salida.mp4

## Ids que hoy tienen carta con video

- Explorar (home): `porsche-356`, `tesla-model-s`, `bentley-continental-gt`
- Gama (home): `ferrari-488-spider`, `bmw-i8`, `audi-r8`, `lamborghini-miura`

Otros ids de `lib/modelos.ts` también funcionan en las tarjetas de
imagen si se les pasa la propiedad `video`.
