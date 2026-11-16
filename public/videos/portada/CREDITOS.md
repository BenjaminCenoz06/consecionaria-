# Videos de la portada de cada ficha

Reemplazan la marca de agua con el nombre del auto. Cada modelo tiene uno
horizontal (PC, 1920×1080) y uno vertical (celular, 1080×1920), asignados en
`lib/videos.ts` (`PORTADAS`). Todos de Pexels, licencia
[Pexels License](https://www.pexels.com/license/) (uso comercial libre, sin
atribución obligatoria).

**Importante:** son tomas de stock de un auto *del mismo tipo*, no de la unidad
a la venta. Conviene reemplazarlos por videos propios cuando se tengan.

## Horizontales (PC)

| Archivo | Pexels | Lo que muestra | Autos que lo usan |
|---|---|---|---|
| `ferrari-pc` | 30794587 | Ferrari rojo por la ciudad | Ferrari 488 Spider, 812 |
| `lamborghini-pc` | 17051328 | Lamborghini Aventador en Lisboa | Miura, Huracán |
| `clasico-pc` | 27028866 | Chevrolet Impala rojo clásico, calle | Porsche 356 |
| `descapotable-pc` | 11095143 | Rolls-Royce Dawn convertible, desierto | MX-5, F-Type, S63 cabrio |
| `negro-a-pc` | 5701767 | Deportivo negro, toma aérea de ruta | Audi R8, RS5, Lexus LFA, BMW i8 |
| `negro-b-pc` | 5701573 | Deportivo negro, toma aérea de ruta | AMG GT R, Bentley, Tesla Model S, (genérico) |
| `gtr-pc` | 32120999 | Nissan GT-R amarillo en autopista | Nissan 370Z |
| `todoterreno-pc` | 9602658 | 4x4 por camino de monte | Jeep CJ Renegade |

## Verticales (celular)

| Archivo | Pexels | Lo que muestra | Autos que lo usan |
|---|---|---|---|
| `rojo-movil` | 39371057 | Deportivo rojo en autopista al atardecer | Ferrari 488 Spider, 812 |
| `naranja-movil` | 39371052 | Deportivo naranja en autopista | Miura, Huracán, Nissan 370Z |
| `clasico-movil` | 38934742 | Descapotable clásico rojo en un pueblo | Porsche 356 |
| `roadster-movil` | 37838092 | Roadsters clásicos por una ruta | MX-5, F-Type, S63 cabrio |
| `rs6-movil` | 32391975 | Audi RS6 Avant negro, dron, costa | Audi R8, RS5, Lexus LFA |
| `bmw-movil` | 26256252 | BMW negro al atardecer | BMW i8 |
| `mercedes-movil` | 39596652 | Mercedes negro, calle de adoquines | AMG GT R, Bentley |
| `tesla-movil` | 19147672 | Tesla por un campo | Tesla Model S |
| `todoterreno-movil` | 40486514 | 4x4 todoterreno | Jeep CJ Renegade |
| `generico-movil` | 29352145 | Auto oscuro al atardecer | Cualquier modelo sin video |

## Receta (ffmpeg)

```bash
ffmpeg -ss <inicio> -t 9 -i original.mp4 -an -vf "hqdn3d=4:3:6:6,scale=1920:1080:flags=lanczos,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 31 -profile:v high -level 4.2 -g 60 -keyint_min 60 -sc_threshold 0 -movflags +faststart nombre-pc.mp4 -y
ffmpeg -ss 0.3 -i nombre-pc.mp4 -frames:v 1 -vf "scale=1600:-2:flags=lanczos" -q:v 4 nombre-pc.jpg -y
```

Para los verticales, `scale=1080:1920` y el poster a 810 px de ancho.

## Cómo sumar un video propio de una unidad

1. Dejá `<id>-pc.mp4` y `<id>-movil.mp4` con sus `.jpg` en esta carpeta.
2. En `lib/videos.ts`, en `PORTADAS`, apuntá el modelo a esos nombres.
