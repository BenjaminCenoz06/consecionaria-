"use client";

import { useEffect, useRef, useState } from "react";

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

  /* `null` hasta que el cliente mide la pantalla. Evita que el celular
     empiece a bajar 4K por una suposición hecha en el servidor.      */
  const [esCelular, setEsCelular] = useState<boolean | null>(null);
  const [sinMovimiento, setSinMovimiento] = useState(false);

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
      id="top"
      className="bg-ink relative h-svh min-h-[560px] w-full overflow-hidden"
    >
      {/* El h1 existe para buscadores y lectores de pantalla.
          No se ve: el hero es imagen pura, como se pidió.         */}
      <h1 className="sr-only">
        Vértice Automotores — autos seleccionados en Buenos Aires
      </h1>

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
          preload="auto"
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

      {/* Arriba: apenas lo necesario para que la barra fija se lea.
          Abajo: funde el material con la sección siguiente.        */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.10)_22%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.65)_88%,#000_100%)]"
      />

      {/* Señal de scroll. Sin texto: una línea que baja y vuelve.   */}
      <a
        href="#modelos"
        aria-label="Ir a los modelos"
        className="group absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center"
      >
        <span
          aria-hidden="true"
          className="bg-bone/70 group-hover:bg-brass animate-baja block h-8 w-px origin-top transition-colors duration-300"
        />
      </a>
    </section>
  );
}
