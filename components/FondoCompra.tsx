"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fondoCompra } from "@/lib/videos";
import { useMovil } from "@/lib/usarMovil";
import { useSinMovimiento } from "@/lib/sinMovimiento";

/* `false` en el servidor y en la hidratación, `true` ya en el cliente:
   así el video correcto (celular o PC) recién se elige cuando se sabe
   la pantalla, sin descargar el equivocado ni romper la hidratación. */
const suscribirNada = () => () => {};

/**
 * Fondo de video de la sección de compra.
 *
 * Es una capa absoluta: se pone dentro de una sección `relative` y el
 * contenido va encima. Elige el video vertical en celular y el
 * horizontal en PC; el poster (un cuadro del mismo video) se ve de
 * inmediato y el video entra por encima cuando ya puede reproducirse.
 * Se pausa al salir de pantalla, tiene un leve paralaje con el scroll y
 * no se reproduce con "reducir movimiento" ni con "ahorro de datos".
 * Encima lleva velos oscuros para que el texto blanco se lea siempre.
 */
export default function FondoCompra({ id }: { id: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const movil = useMovil();
  const sinMovimiento = useSinMovimiento();
  const cliente = useSyncExternalStore(suscribirNada, () => true, () => false);
  const [visible, setVisible] = useState(false);
  const [listo, setListo] = useState(false);

  const fondo = fondoCompra(id);
  const src = movil ? fondo.movil : fondo.pc;
  const poster = movil ? fondo.movilPoster : fondo.pcPoster;

  const ahorro =
    cliente &&
    Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );
  const reproducir = cliente && !sinMovimiento && !ahorro;

  /* Paralaje suave: el video se mueve un poco menos que la página. */
  const { scrollYProgress } = useScroll({
    target: caja,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.05,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (visible) el.play().catch(() => {});
    else el.pause();
  }, [visible, src]);

  return (
    <div
      ref={caja}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black"
    >
      <motion.div
        style={sinMovimiento ? undefined : { y }}
        className="absolute -inset-y-[7%] inset-x-0"
      >
        {/* Poster: se ve al instante y queda de respaldo. */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
        {reproducir && (
          <video
            key={src}
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            disablePictureInPicture
            tabIndex={-1}
            onPlaying={() => setListo(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              listo ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </motion.div>

      {/* Velos: parejo para el texto, más oscuro arriba y abajo para
          fundir con las secciones vecinas, y una viñeta lateral. */}
      <div className="absolute inset-0 bg-black/40 lg:bg-black/15" />
      {/* En escritorio el texto va a la izquierda: el velo se concentra ahí
          y deja ver el auto a la derecha. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_75%)] lg:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_75%,#000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
