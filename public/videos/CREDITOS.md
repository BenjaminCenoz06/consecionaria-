# Videos de las tarjetas

Todos de Pexels, licencia [Pexels License](https://www.pexels.com/license/)
(uso comercial libre, sin atribución obligatoria). Son material de stock
**de la marca, no de la unidad exacta**: reemplazarlos por videos propios
cuando se tengan.

| Archivo | Fuente | Lo que muestra de verdad |
|---|---|---|
| `ferrari-488-spider.mp4` | https://www.pexels.com/video/luxury-red-ferrari-driving-through-city-streets-30794587/ (seg. 3–9) | Ferrari rojo por la ciudad (no es el 488 Spider) |
| `lamborghini-miura.mp4` | https://www.pexels.com/video/lamborghini-aventador-in-the-city-of-lisbon-17051328/ (seg. 1–7) | Lamborghini Aventador, moderno (el Miura es un clásico de los 60) |
| `tesla-model-s.mp4` | https://www.pexels.com/video/tesla-19147672/ (seg. 2–8, recorte horizontal) | Tesla sin modelo confirmado |

## Fondos de la sección de compra (`public/videos/compra/`)

Video del auto andando detrás de la sección «Comprá tu…» de cada ficha:
horizontal 1920×1080 en PC y vertical 1080×1920 en celular. Cada modelo usa el
suyo si lo tiene; si no, el genérico. Todos de Pexels (licencia libre).

| Archivo | Fuente | Lo que muestra de verdad |
|---|---|---|
| `generico-pc.mp4` | https://www.pexels.com/video/11095143/ (3840×2160) | Rolls-Royce Dawn convertible por un camino del desierto |
| `generico-movil.mp4` | https://www.pexels.com/video/29352145/ (2160×3840, 50 fps) | Auto oscuro por una ruta al atardecer |
| `ferrari-488-spider-pc.mp4` | https://www.pexels.com/video/luxury-red-ferrari-driving-through-city-streets-30794587/ | Ferrari rojo por la ciudad (no es el 488 Spider) |
| `lamborghini-miura-pc.mp4` | https://www.pexels.com/video/lamborghini-aventador-in-the-city-of-lisbon-17051328/ | Aventador moderno (el Miura es un clásico) |
| `tesla-model-s-movil.mp4` | https://www.pexels.com/video/tesla-19147672/ | Tesla sin modelo confirmado, vertical |

Para sumar un modelo propio: dejá `<id>-pc.mp4` y/o `<id>-movil.mp4` con su
`.jpg` de poster y agregá la entrada en `lib/videos.ts`.

Recompresión: `ffmpeg -ss <inicio> -t 6 -i original.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart salida.mp4`
