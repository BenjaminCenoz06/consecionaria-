# Ingeniería inversa: lamborghini.com/es-en

Investigación medida en navegador real (Chrome, viewport 1920×991, DPR 1) el 2026-11-07.
Todos los valores de esta página son **computados del sitio en vivo**, no estimados a ojo.

---

## 0. El hallazgo que cambia el enfoque

Lamborghini **no usa casi ninguna de las técnicas que se asocian con "web premium"**.

Lo que NO encontré en la página:

| Técnica buscada | Resultado |
|---|---|
| Smooth scroll (Lenis / Locomotive) | No. Scroll nativo, `scroll-behavior: auto` |
| GSAP / ScrollTrigger / ScrollSmoother | No |
| Three.js / WebGL / canvas | No. `0` elementos `<canvas>` |
| `cubic-bezier()` custom | Ninguno. Solo `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear` |
| `backdrop-filter` (glassmorphism) | Ninguno |
| `mix-blend-mode` | Ninguno |
| `mask-image` / gradientes de máscara | Ninguno |
| Parallax | No detectado |
| Scroll snap | `scroll-snap-type: none` |
| Lottie / AOS / anime.js | Ninguno |
| Secciones pinneadas (scrollytelling) | Solo 1 elemento `position: sticky` en toda la página |

**El lujo acá no viene del código. Viene de cuatro decisiones:**

1. **Tipografía a 120px.** El `<h1>` es gigante y ocupa el espacio como si fuera una obra impresa.
2. **Una sola fuente, propia, variable.** Cero mezcla de familias.
3. **Paleta de 4 colores reales.** Negro, blanco, dos grises. El dorado aparece una vez.
4. **El asset ES el diseño.** Video a pantalla completa y fotografía de producción. El CSS solo se corre del camino.

> Conclusión operativa: perseguir "efectos" es perseguir lo que Lamborghini justamente evitó.
> Lo que sí hay que perseguir es **escala tipográfica, disciplina cromática y calidad de asset**.

---

## 1. Stack técnico

| Capa | Tecnología (detectada) |
|---|---|
| Framework | **Next.js** (`__NEXT_DATA__` presente, chunks en `/_next/static/`) |
| UI | **React** |
| Estilos | **Emotion / CSS-in-JS** (clases generadas tipo `css-gwl9wl`, keyframe `animation-115gyof`) |
| Design tokens | **125 CSS custom properties** en `:root`, nomenclatura Style Dictionary → exportadas desde Figma |
| Carruseles | **Swiper.js** |
| Tabs | `react-tabs` |
| Consentimiento | OneTrust (`cookielaw.org`) |
| Analítica / RUM | Google Tag Manager + **Dynatrace** |

Clase en `<html>`: `transition-on` — flag global para habilitar/deshabilitar transiciones.
Buen patrón: permite matar toda la animación desde un solo punto.

---

## 2. Tipografía — el verdadero motor

### Familias

| Familia | Archivo | Uso |
|---|---|---|
| **LamboType** | `Lambotype-Variable.woff` | **Absolutamente todo.** `font-display: swap` |
| Open Sans 700 | — | Residual / fallback |
| Lambo-icons | `Lambo-icons.ttf` | Iconografía. `font-display: block` |

**Es una fuente variable** y usan dos ejes:

- `wght` → `400` (texto) y `700` (títulos y UI)
- `wdth` → `0` (condensada, para los títulos gigantes) y `50` (normal, para UI)

Esto es clave: el contraste tipográfico **no** se logra cambiando de familia, sino **moviendo el eje de ancho de la misma fuente**.

### Escala real medida (lo que está en pantalla)

| Rol | Tamaño / interlineado | Ejes | Transform | Color |
|---|---|---|---|---|
| Hero `<h1>` | **120px / 110px** | `wdth 0, wght 700` | `uppercase` | `#FFFFFF` |
| Título de sección `<h2>` | **120px / 110px** | `wdth 0, wght 700` | `uppercase` | `#F5F5F5` |
| Banner `<p>` | **80px / 90px** | `wdth 50, wght 700` | `uppercase` | `#F5F5F5` |
| Subtítulo `<h4>` | **40px / 46px** | `wght 700` | `uppercase` | `#181818` |
| Eyelet / antetítulo | **27px / 37px** | `wght 700` | `uppercase` | `#F5F5F5` |
| UI / menú | **18px / 28px** | `wdth 50, wght 700` | `uppercase` | `#FFFFFF` |
| Nav y links | **16px / 26px** | `wght 700` | `uppercase` | `#FFFFFF` |
| Body | **16px / 24px** | `wght 400` | `none` | — |
| CTA | **12px** | — | `uppercase` | `#FFFFFF` |

### Tres reglas no negociables que aplican

1. **Interlineado negativo en display.** 120px de tamaño con 110px de línea → ratio **0.917**.
   Los títulos grandes se aprietan verticalmente. Es lo que les da peso de cartel.
2. **`letter-spacing: normal` en absolutamente todo.** No tocan el tracking ni una vez.
   (Sostenible solo porque la fuente es propia y ya viene espaciada para titular.)
3. **`text-transform: uppercase` en todo menos el body.** Títulos, nav, botones, eyelets: todo en caja alta.

### Escala de tokens completa (19 pasos)

```
font-size-0 : 0.625rem  (10px)      font-size-10: 3rem      (48px)
font-size-1 : 0.75rem   (12px)      font-size-11: 3.125rem  (50px)
font-size-2 : 1rem      (16px)      font-size-12: 3.375rem  (54px)
font-size-3 : 1.125rem  (18px)      font-size-13: 3.75rem   (60px)
font-size-4 : 1.5rem    (24px)      font-size-14: 4.375rem  (70px)
font-size-5 : 1.6875rem (27px)      font-size-15: 5rem      (80px)
font-size-6 : 1.75rem   (28px)      font-size-16: 5.625rem  (90px)
font-size-7 : 2.125rem  (34px)      font-size-17: 7.5rem    (120px)
font-size-8 : 2.25rem   (36px)      font-size-18: 8.5rem    (136px)
font-size-9 : 2.5rem    (40px)
```

Nótese el **salto brutal** entre `font-size-9` (40px) y `font-size-17` (120px): no hay nada en el medio en uso real. Es intencional — o es interfaz, o es cartel. Sin tibieza.

### Único efecto tipográfico

```css
text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
```

Aplicado al título del hero. No es decoración: es **legibilidad sobre video**, con el radio mínimo que funciona. Ni un scrim negro encima del video, ni un overlay. Solo 3px de sombra.

---

## 3. Color

Paleta real, por frecuencia de uso medida en el DOM:

| Color | Hex | Rol |
|---|---|---|
| Blanco | `#FFFFFF` | Texto sobre oscuro, fondos de sección clara |
| Casi negro | `#202020` | Texto sobre claro |
| Negro puro | `#000000` | Fondo del hero |
| Off-white | `#F5F5F5` | Texto sobre oscuro (más suave que el blanco puro) |
| Gris medio | `#767676` | Texto secundario |
| Gris claro | `#DCDCDC` | Bordes, divisores |
| Gris | `#969696` | Deshabilitado |
| Gris oscuro | `#494949` | Texto apagado sobre oscuro |
| Negro UI | `#181818` | Fondo de sección oscura |
| Dorado oscuro | `#917300` | **Único acento.** 3 usos en toda la página |
| Amarillo marca | `#DFB400` | Token `--yellow`, reservado |

**Observaciones:**

- Es **monocromo**. Negro, blanco, grises. Nada más.
- El amarillo Lamborghini —el color más reconocible de la marca— **no se usa como color de interfaz**. Vive en el producto, en las fotos. Jamás en un botón.
- Usan `#F5F5F5` en vez de `#FFFFFF` para texto sobre negro. Baja el contraste apenas y elimina el "zumbido" del blanco puro sobre negro puro.
- Overlays: `rgba(0,0,0,0.25)` y `rgba(0,0,0,0.5)`. Nada más sofisticado.

Gradientes en tokens (todos verticales, todos para fundir contenido con el fondo):

```css
--gradient-1:      linear-gradient(180deg, #18181833 0%,     #181818 100%);
--gradient-2:      linear-gradient(180deg, #1818181a 56.08%, #181818 100%);
--gradient-3:      linear-gradient(180deg, #00000000 0%,     #f5f5f5 100%);
--gradient-header: linear-gradient(180deg, #f5f5f5   0%,   #18181800 100%);
```

---

## 4. Espaciado, grilla y formas

| Token | Valor |
|---|---|
| Contenedor | **1320px** (en viewport de 1920 → márgenes de 300px por lado) |
| Padding vertical de sección | **80px 0** — constante en todas las secciones |
| Grid base | `--scale-spacing-grid: 3.75rem` (60px) |
| Radios | `0px` · `4px` · `8px` · `16px` |
| Bordes | `0` · `1px` · `2px` · `4px` · `8px` |

### Radio: cero

El CTA principal tiene `border-radius: 0px`. Las secciones, las imágenes, las tarjetas: todo a 90°.
**El ángulo recto es una decisión de marca.** Lamborghini es la marca del diseño angular (el Countach, el Aventador). La web lo repite.

### El CTA no es un botón

```
background-color: rgba(0, 0, 0, 0)   <- transparente
border:           0px none
border-radius:    0px
padding:          8px
font-size:        12px
text-transform:   uppercase
color:            #FFFFFF
```

Es **texto con un ícono de flecha**. No hay pills, no hay sombras, no hay gradientes en botones. El llamado a la acción confía en la jerarquía, no en el relleno.

---

## 5. Movimiento — inventario completo

### Transiciones (contadas sobre elementos reales)

| Usos | Propiedad | Duración | Easing |
|---|---|---|---|
| 6× | `opacity` | **0.3s** | `ease-in-out` |
| 6× | `all` | **0.25s** | `ease-out` |
| 6× | `all` | **0.2s** | `ease-in` |
| 2× | `width` | 0.3s | `ease-in-out` |
| 2× | `opacity` | 0.3s | `ease-out` |
| 1× | `transform` | 1s | `linear` |
| 1× | `height, padding` | 0.3s | `ease-out` |
| 1× | `transform, opacity` | **0.5s** (delay 0.2s) | `ease-out` |
| 1× | `top` | 1s | `ease` |

**Todo el vocabulario de movimiento del sitio cabe en cuatro duraciones: 0.2 / 0.25 / 0.3 / 0.5 segundos.**

### Keyframes (los únicos 5 de la página)

```
fadeIn                  0.5s  ease-in-out  x1     <- el único decorativo
animation-115gyof       3s    ease-in      inf    <- loop sutil (Emotion)
sk-scaleout             1s    ease-in-out  inf    <- spinner de carga
swiper-preloader-spin                             <- spinner de Swiper
onetrust-fade-in        0.4s  ease-in-out  x1     <- banner de cookies
```

### El único reveal al scroll

```css
/* estado inicial: opacity: 0 */
transition: transform 0.5s ease-out, opacity 0.5s ease-out;
transition-delay: 0.2s;
```

Un solo patrón: **fade + desplazamiento, 0.5s, ease-out, 200ms de retardo.** Se repite en toda la página. No hay stagger complejo, no hay variantes por sección.

### El hero: donde sí está la magia

```
Swiper
├── effect:   fade
├── autoplay: 4000 ms de delay
├── speed:    4000 ms de transición   <- CUATRO SEGUNDOS de crossfade
└── loop:     false
```

**Ese es el truco cinematográfico de toda la página.** Un crossfade de 4 segundos entre slides. Es tan lento que no se percibe como "animación" sino como respiración. La mayoría de los sitios usan 300–600ms; ellos usan 4000ms.

### Video

```
loop: true · muted: true · playsinline: true
preload: "metadata" · poster: false · autoplay: false (arrancado por JS)
```

Patrón correcto: `preload="metadata"` para no bajar el video entero de entrada, y reproducción disparada por JS en vez de `autoplay` nativo (permite esperar a que el elemento sea visible).

---

## 6. Estructura de la página

La home completa mide **4458px** — apenas **4.5 pantallas**. Y son **5 secciones**:

| # | Sección | Alto | Fondo | Contenido |
|---|---|---|---|---|
| 0 | `lam-hero` | 991px (100vh) | `#000000` | 1 video + carrusel Swiper |
| 1 | `smart-title` "Modelos" | 232px | `#FFFFFF` | Solo un título. Nada más. |
| 2 | `families-gallery` | 1022px | `#FFFFFF` | Carrusel de 6 imágenes (900px de ancho) |
| 3 | banner oscuro | 288px | `#000000` | "Dealer Locator" — 1 imagen |
| 4 | `models-chooser` | 922px | `#181818` | Tabs + carrusel, 10 imágenes |

**Dos cosas enormes acá:**

1. **La home es cortísima.** No hay scroll épico de 15 secciones. Hay 5 bloques y se termina.
2. **La navegación profunda es horizontal, no vertical.** Las secciones 2 y 4 son **carruseles**, no grillas. El usuario no scrollea para ver más modelos: desliza. El scroll vertical queda reservado para cambiar de *tema*, no de *item*.

Además: la sección 1 es **un título solo, en 232px de alto, sobre blanco**. Se "desperdicia" una franja entera de pantalla en una sola palabra. Eso es espacio negativo usado como lujo.

### Chrome de navegación

Minimalismo extremo en el header: `MENÚ` a la izquierda, escudo centrado, lupa a la derecha. Nada más. Sin barra de navegación visible, sin links de primer nivel. Todo vive detrás del menú.

---

## 7. Performance — el costo del enfoque

| Métrica | Valor medido |
|---|---|
| TTFB | **988 ms** |
| DOMContentLoaded | 1337 ms |
| Load event | 1667 ms |
| Peticiones | 63–80 |
| **JavaScript (decodificado)** | **≈ 3.79 MB** en 19 archivos |
| Total decodificado | ≈ 3.95 MB |

Los chunks más pesados:

```
1251 KB   [...slug]-*.js        <- el chunk de la ruta, solo
 865 KB   1514-*.js
 382 KB   37006b12*.js          <- Dynatrace (RUM)
 371 KB   4998be31-*.js
 318 KB   58474bfb-*.js
 214 KB   framework-*.js        <- React
 196 KB   _app-*.js
 134 KB   main-*.js
```

> **Nota honesta sobre estos números:** son `decodedBodySize`, no peso de red. Con brotli el JS probablemente viaje en ~1 MB. Aun así es muchísimo. No pude medir el transferido real porque todo vino de caché (`transferSize: 0`), ni obtuve un LCP confiable (la pestaña estuvo en segundo plano y el `first-paint` dio un valor absurdo de 32s, que descarto).

**Debilidades reales que encontré:**

- Imágenes **PNG de 1800px servidas para mostrarse a 900px**, sin `srcset`. Ni WebP ni AVIF en el hero.
- 382 KB solo de monitoreo (Dynatrace).
- El renderer de Chrome se me congeló tres veces al intentar capturar pantalla mientras el video corría.

**Esto es importante:** Lamborghini puede permitirse 4 MB de JS porque nadie abandona la página de Lamborghini. Una concesionaria compite con 8 pestañas abiertas y conexiones móviles. **Este es el aspecto que NO hay que copiar.**

---

## 8. Qué copiar y qué no

### Copiar

| Qué | Por qué |
|---|---|
| Una sola familia tipográfica, variable | El contraste sale de los ejes, no de mezclar fuentes |
| Títulos a 100–120px con interlineado 0.9 | Es el 80% de la sensación premium |
| Mayúsculas en títulos, nav y CTAs | Coherencia inmediata |
| Paleta monocroma + 1 acento usado 3 veces | La contención lee como caro |
| `border-radius: 0` | Si la identidad es angular, sostenerlo en todo |
| CTA como texto + flecha, sin relleno | Confía en la jerarquía |
| Padding vertical constante de 80px | Ritmo predecible |
| Crossfade lentísimo (2–4s) en el hero | El truco cinematográfico más barato que existe |
| Un solo patrón de reveal (fade+shift 0.5s) | Repetición = sistema, variedad = ruido |
| `text-shadow` mínimo en vez de scrim | Mantiene el video limpio |
| Carrusel horizontal para catálogo | El scroll vertical cambia de tema, no de item |
| Home corta (4–5 secciones) | Decir menos |

### No copiar

| Qué | Por qué |
|---|---|
| 4 MB de JavaScript | Una concesionaria pierde la venta en el tiempo de carga |
| PNG sin `srcset` ni WebP/AVIF | Error directo, no estilo |
| Header sin navegación visible | Lamborghini puede esconder el menú porque ya sabés qué vende. Una concesionaria no. |
| Ausencia total de scroll trabajado | El pedido incluye scroll fluido; acá no hay. Hay que agregarlo. |
| Cero jerarquía de información de producto | Una concesionaria necesita precio, km, año y financiación visibles |

---

## 9. Recomendación para la concesionaria

Lamborghini vende **deseo** a gente que ya decidió. Una concesionaria vende **confianza** a gente que todavía está comparando. Copiar la estética sin ajustar la función daría una página bellísima que no vende autos.

**La propuesta: disciplina visual de Lamborghini + el scroll trabajado que ellos no tienen.**

### Dirección

1. **Tipografía:** una variable condensada con eje `wdth`. El equivalente gratuito más cercano a LamboType es **Archivo** (Google Fonts, ejes `wght` 100–900 y `wdth` 62–125). Alternativas: Saira, Oswald.
2. **Escala:** display a 96–120px con `line-height: 0.92`, UI a 16–18px. Sin nada en el medio.
3. **Color:** negro `#0A0A0A`, off-white `#F5F5F5`, dos grises, **un** acento de marca.
4. **Radio 0** en todo.
5. **Movimiento:** cuatro duraciones (0.2 / 0.3 / 0.5 / 0.8s), un solo reveal, `ease-out`.
6. **Scroll fluido real:** acá sí nos separamos de la referencia — **Lenis** para la inercia, más reveals disparados por `IntersectionObserver`.
7. **Catálogo:** carrusel horizontal para destacados, grilla filtrable para el stock completo.
8. **Lo que Lamborghini no necesita y una concesionaria sí:** ficha con precio/año/km, filtros, simulador de financiación, WhatsApp, ubicación, prueba de manejo.

### Stack propuesto

| Capa | Elección | Motivo |
|---|---|---|
| Framework | **Next.js (App Router)** | SEO local, `next/image`, Server Components |
| Estilos | **Tailwind CSS** | Tokens en config, sin runtime (a diferencia de Emotion) |
| Animación | **Motion** (ex Framer Motion) | Declarativo, `whileInView` resuelve el 90% |
| Scroll | **Lenis** | La pieza que la referencia no tiene y que se pidió |
| Imágenes | `next/image` + **AVIF/WebP** + `srcset` | Corrige el error de la referencia |
| Fuente | `next/font` con **Archivo variable** | Sin FOUT, self-hosted |

### Presupuesto de performance (no negociable)

- JS inicial **< 200 KB** comprimido — el 5% de lo que pesa Lamborghini
- LCP **< 2.5s** en 4G
- `prefers-reduced-motion` respetado en **todos** los reveals
- Video con `poster`, `preload="metadata"`, reproducción solo al ser visible

---

## 10. Checklist de implementación

- [ ] Elegir y auto-hospedar la fuente variable; verificar ejes `wght`/`wdth`
- [ ] Definir los tokens (tamaños, interlineados, color, espaciado, duraciones) antes de la primera línea de UI
- [ ] Hero 100vh con video + crossfade lento + `text-shadow` de 3px
- [ ] Un único componente de reveal reutilizado en toda la página
- [ ] Lenis con desactivación bajo `prefers-reduced-motion`
- [ ] Carrusel horizontal de destacados
- [ ] Grilla de stock con filtros (marca, precio, año, km)
- [ ] Ficha de vehículo
- [ ] WhatsApp flotante + formulario de contacto
- [ ] Schema.org `AutoDealer` + `Car` para SEO local
- [ ] Auditoría Lighthouse contra el presupuesto de arriba

---

## Anexo: límites de esta investigación

- Medido en **desktop 1920×991 únicamente**. No audité el breakpoint móvil.
- Solo la **home** (`/es-en`). Las fichas de modelo y el configurador pueden usar técnicas distintas (es probable que el configurador sí tenga WebGL).
- Las **capturas de pantalla fallaron** repetidamente por congelamiento del renderer con el video activo; la descripción visual de las secciones internas proviene del DOM y de estilos computados, no de inspección visual.
- Los pesos son **decodificados**, no transferidos (ver nota en la sección 7).
