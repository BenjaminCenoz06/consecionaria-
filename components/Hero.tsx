"use client";

import { useSinMovimiento } from "@/lib/sinMovimiento";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useIdioma } from "@/lib/idioma";

/* ============================================================
   HERO — sólo material. Sin tipografía encima.
   ============================================================

   Ranura de archivos. Dejá los videos en `public/media/`:

     hero-4k.webm         3840×2160 AV1   → escritorio, primera opción
     hero-4k.mp4          3840×2160 H.264 → escritorio, respaldo
     hero-mobile.mp4      1080×1920 H.264 → celular
     hero-poster.jpg      1920px de ancho → primera pintura, escritorio
     hero-poster-mov.jpg  1080px de ancho → primera pintura, celular

   Origen, licencia y recetas de ffmpeg: `public/media/CREDITOS.md`.
   Si falta un archivo queda el poster; y sin poster, negro.        */

const FUENTE_ESCRITORIO = "/media/hero-4k.mp4";
const FUENTE_ESCRITORIO_WEBM = "/media/hero-4k.webm";
const FUENTE_CELULAR = "/media/hero-mobile.mp4";
const POSTER_ESCRITORIO = "/media/hero-poster.jpg";
const POSTER_CELULAR = "/media/hero-poster-mov.jpg";

/** Debajo de esto se sirve el corte vertical y liviano. */
const CORTE_CELULAR = "(max-width: 767px)";

export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const seccion = useRef<HTMLElement>(null);
  const { t } = useIdioma();

  /* Paralaje de salida. El material se acerca y se apaga mientras la
     página sube por encima, así el hero se despide en vez de cortarse.
     Va sobre `useScroll`, que corre en requestAnimationFrame y entra en
     el mismo cuadro que la inercia de Lenis. */
  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start start", "end start"],
  });
  const acercar = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const correr = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const apagar = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const senal = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  /* `null` hasta que el cliente mide la pantalla. Evita que el celular
     empiece a bajar 4K por una suposición hecha en el servidor.      */
  const [esCelular, setEsCelular] = useState<boolean | null>(null);
  const [sinMovimiento, setSinMovimiento] = useState(false);
  const sinMovimientoSistema = useSinMovimiento();

  useEffect(() => {
    const pantalla = window.matchMedia(CORTE_CELULAR);
    const movimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sincronizar = () => {
      setEsCelular(pantalla.matches);
      setSinMovimiento(movimiento.matches);
    };

    sincronizar();
    pantalla.addEventListener("change", sincronizar);
    movimiento.addEventListener("change", sincronizar);
    return () => {
      pantalla.removeEventListener("change", sincronizar);
      movimiento.removeEventListener("change", sincronizar);
    };
  }, []);

  /* Safari en iOS puede rechazar el autoplay aunque esté muteado.
     Si falla, el poster se queda y la sección no se rompe.          */
  useEffect(() => {
    const nodo = video.current;
    if (!nodo || esCelular === null) return;

    if (sinMovimiento) {
      nodo.pause();
      return;
    }
    nodo.play().catch(() => {});
  }, [esCelular, sinMovimiento]);

  const fuente = esCelular ? FUENTE_CELULAR : FUENTE_ESCRITORIO;
  /* En el servidor todavía no se sabe la pantalla: va el apaisado,
     que es el que acierta en la mayoría de las visitas.            */
  const poster = esCelular ? POSTER_CELULAR : POSTER_ESCRITORIO;
  const reproducir = esCelular !== null && !sinMovimiento;

  return (
    <section
      ref={seccion}
      id="top"
      className="bg-ink relative h-svh min-h-[560px] w-full overflow-hidden"
    >
      {/* El h1 existe para buscadores y lectores de pantalla.
          No se ve: el hero es imagen pura, como se pidió.         */}
      <h1 className="sr-only">
        {t("Bárcena Automotores — compra, venta y consignación de autos en La Cumbre, Córdoba")}
      </h1>

      <motion.div
        className="absolute inset-0"
        style={
          sinMovimientoSistema
            ? undefined
            : { scale: acercar, y: correr, opacity: apagar }
        }
      >
        {reproducir ? (
          /* El atributo `poster` tapa el elemento hasta que llega el
           primer cuadro, y vuelve a taparlo si el navegador bloquea
           el autoplay. Por eso acá no hay ningún fundido: encimar el
           poster con un cuadro posterior dejaba un doble auto.      */
          <video
            key={fuente}
            ref={video}
            className="absolute inset-0 h-full w-full object-cover"
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload={esCelular ? "metadata" : "auto"}
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          >
            {!esCelular && (
              <source src={FUENTE_ESCRITORIO_WEBM} type="video/webm" />
            )}
            <source src={fuente} type="video/mp4" />
          </video>
        ) : (
          /* Render del servidor y modo sin movimiento: sólo el cuadro. */
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
      </motion.div>

      {/* Arriba: apenas lo necesario para que la barra fija se lea.
          Abajo: funde el material con la sección siguiente.        */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.10)_22%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.65)_88%,#000_100%)]"
      />

      {/* Señal de scroll. Sin texto: una línea que baja y vuelve.   */}
      <motion.a
        href="#modelos"
        aria-label={t("Ir a los modelos")}
        style={sinMovimientoSistema ? undefined : { opacity: senal }}
        className="group absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center"
      >
        <span
          aria-hidden="true"
          className="bg-bone/70 group-hover:bg-rojo animate-baja block h-8 w-px origin-top transition-colors duration-300"
        />
      </motion.a>
    </section>
  );
}
