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

Recompresión: `ffmpeg -ss <inicio> -t 6 -i original.mp4 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart salida.mp4`
