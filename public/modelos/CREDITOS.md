# Fotos de la vitrina "Modelos"

Fotos de Pexels ([licencia Pexels](https://www.pexels.com/license/): uso
comercial libre, sin atribución obligatoria).

## Cómo se procesaron (calidad 4K)

1. Se bajó el **original** de cada foto (4000–8000 px de ancho).
2. Primera pasada de `rembg` (`isnet-general-use`) sobre una copia chica,
   sólo para ubicar el auto.
3. Se recortó el original alrededor del auto y se pasó una **segunda
   vez** con el auto ocupando todo el cuadro, con refinado de bordes
   (alpha matting): la máscara sale con mucho más detalle que en una
   sola pasada.
4. Se descartaron los restos sueltos (destellos de estudio, cables,
   paredes), se suavizó el borde y se exportó a **WebP con transparencia,
   ~3000 px de ancho**.

Next sirve cada recorte en AVIF/WebP al tamaño que necesita la pantalla
(hasta 3840 px en pantallas 4K/retina) con calidad 90.

## Fotos originales

| Archivo | Foto |
|---|---|
| `ferrari-488-spider.webp` | https://www.pexels.com/photo/18479749/ |
| `bmw-i8.webp` | https://www.pexels.com/photo/19076555/ |
| `bentley-continental-gt.webp` | https://www.pexels.com/photo/261986/ |
| `lamborghini-miura.webp` | https://www.pexels.com/photo/9545542/ |
| `mercedes-amg-s63-cabrio.webp` | https://www.pexels.com/photo/17259660/ |
| `porsche-356.webp` | https://www.pexels.com/photo/38058755/ |
| `tesla-model-s.webp` | https://www.pexels.com/photo/28123191/ |
| `audi-r8.webp` | https://www.pexels.com/photo/12764935/ |
| `jaguar-f-type.webp` | https://www.pexels.com/photo/20695256/ |
| `mazda-mx5.webp` | https://www.pexels.com/photo/38404151/ |
| `nissan-370z.webp` | https://www.pexels.com/photo/5120130/ |

El modelo exacto de cada auto está verificado en el título o la
descripción de Pexels para el Ferrari, BMW i8, Miura, Mercedes, Tesla,
Audi R8 y Jaguar; el Bentley, Porsche 356, MX-5 y 370Z se identificaron
por la forma. Si alguno no coincide, corregí `marca`/`nombre` en
`lib/modelos.ts`.

Son autos de referencia para la vitrina, no stock de la concesionaria.
Reemplazalos por fotos propias de las unidades cuando las tengas: el
recorte tiene que quedar ajustado al borde del auto, con las ruedas
apoyadas en el borde inferior de la imagen (la sección alinea todos los
autos sobre esa línea).
