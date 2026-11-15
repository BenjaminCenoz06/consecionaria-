# Material del hero

## Origen

| | |
|---|---|
| Fuente | Pexels — video `32098956` |
| URL | https://www.pexels.com/video/32098956/ |
| Archivo original | `13684277_3840_2160_24fps.mp4` — 3840×2160, 24 fps, 15,9 s, 52 MB |
| Licencia | [Pexels License](https://www.pexels.com/license/) — uso comercial libre, sin atribución obligatoria |

Se usan sólo los segundos **0,3 a 4,3**: de ahí en adelante la cámara
deriva, el sol revienta el plano y el auto se va de cuadro.

## Archivos generados

| Archivo | Medidas | Peso | Para |
|---|---|---|---|
| `hero-4k.webm` | 3840×2160 AV1 | — | escritorio, primera opción |
| `hero-4k.mp4` | 3840×2160 H.264 | — | escritorio, respaldo |
| `hero-movil-4k.webm` | 2160×3840 AV1 | 10,7 MB | celular (≤767 px), primera opción — ver «Hero del celular» abajo |
| `hero-movil-1080.mp4` | 1080×1920 H.264 | 10,2 MB | celular, respaldo |
| `hero-movil-4k-poster.jpg` | 1080 px de ancho | 0,4 MB | primera pintura en celular |
| `hero-poster.jpg` | 1920 px de ancho | — | primera pintura y modo sin movimiento (escritorio) |

## Cómo cierra el loop

El plano es un travelling: la cámara deriva, así que **no hay dos
cuadros iguales** y ningún corte cierra solo. Se probaron dos caminos:

- **Disolvencia** de 1,2 s entre el final y el principio → se ve un
  fantasma de dos autos superpuestos. Descartada.
- **Espejo** (ida 4 s + vuelta 4 s) → cierra perfecto. Funciona porque
  el fondo es un barrido uniforme y las llantas están movidas: al
  invertir, nadie nota que el tiempo vuelve atrás. **Es la que está.**

El grado de color (`contraste 1.06 · saturación 0.88 · brillo −0.025`)
más un `hqdn3d` suave bajan el material a la paleta monocroma del sitio
sin apagar el rojo, y de paso le sacan ~15% de peso al archivo.

## Recetas (ffmpeg)

**1. Máster espejado**, casi sin pérdida. Ajustá `-ss`/`-t` a tu clip; el
`between(n,1,94)` descarta el primer y el último cuadro del espejo para
que no se repitan (94 = cuadros − 2, con 4 s a 24 fps).

```bash
G="hqdn3d=3:2:4:4,eq=contrast=1.06:saturation=0.88:brightness=-0.025"
```

```bash
ffmpeg -ss 0.3 -t 4 -i original.mp4 -an -vf "${G},format=yuv420p" -c:v libx264 -preset veryfast -crf 12 ida.mp4 -y
```

```bash
ffmpeg -i ida.mp4 -an -vf "reverse,select='between(n\,1\,94)',setpts=N/FRAME_RATE/TB" -c:v libx264 -preset veryfast -crf 12 vuelta.mp4 -y
```

```bash
printf "file 'ida.mp4'\nfile 'vuelta.mp4'\n" > lista.txt && ffmpeg -f concat -safe 0 -i lista.txt -an -c copy master.mp4 -y
```

**2. Entregables**, todos desde `master.mp4` (ya graduado: no repitas `$G`).

```bash
ffmpeg -i master.mp4 -an -c:v libx264 -preset slow -crf 33 -profile:v high -level 5.1 -g 48 -keyint_min 48 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart hero-4k.mp4 -y
```

```bash
ffmpeg -i master.mp4 -an -c:v libsvtav1 -preset 6 -crf 40 -g 48 -pix_fmt yuv420p hero-4k.webm -y
```

```bash
ffmpeg -ss 0.1 -i master.mp4 -frames:v 1 -vf "scale=1920:-2:flags=lanczos" -q:v 5 hero-poster.jpg -y
```

---

# Hero del celular

El celular **no usa el video de escritorio recortado**: tiene su propia toma
vertical, filmada en 9:16.

| | |
|---|---|
| Fuente | Pexels — video `32391975`, «Luxury car driving along scenic coastline road» |
| URL | https://www.pexels.com/video/luxury-car-driving-along-scenic-coastline-road-32391975/ |
| Archivo original | `13817163_2160_3840_25fps.mp4` — 2160×3840, 25 fps, 33,2 s, 220 MB |
| Licencia | [Pexels License](https://www.pexels.com/license/) — uso comercial libre, sin atribución obligatoria |
| Tramo usado | segundos 0 a 12 (el auto cruza, se acerca de frente y vuelve a salir) |

El material tiene mucho detalle (roca, asfalto) y pesa mucho: se baja el ruido
con `hqdn3d` antes de comprimir, lo que permite mantener el 4K real en ~10 MB.

```bash
ffmpeg -ss 0 -t 12 -i original.mp4 -an -vf "hqdn3d=5:4:8:7,fps=24,format=yuv420p" -c:v libsvtav1 -preset 6 -crf 54 -g 48 hero-movil-4k.webm -y
```

```bash
ffmpeg -ss 0 -t 12 -i original.mp4 -an -vf "hqdn3d=5:4:8:7,scale=1080:1920:flags=lanczos,fps=24,format=yuv420p" -c:v libx264 -preset slow -crf 29 -profile:v high -level 4.2 -g 48 -keyint_min 48 -sc_threshold 0 -movflags +faststart hero-movil-1080.mp4 -y
```

```bash
ffmpeg -ss 0.1 -i original.mp4 -frames:v 1 -vf "scale=1080:-2:flags=lanczos" -q:v 3 hero-movil-4k-poster.jpg -y
```

El navegador usa el AV1 4K si lo soporta; si no, el MP4 de 1080×1920. Con
«ahorro de datos» activado en el celular no se descarga video: queda el poster.
