"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMovil } from "@/lib/usarMovil";
import { useSinMovimiento } from "@/lib/sinMovimiento";

/* `false` en el servidor y en la hidratación, `true` ya en el cliente:
   así el video correcto (celular o PC) recién se elige cuando se sabe
   la pantalla, sin descargar el equivocado ni romper la hidratación. */
const suscribirNada = () => () => {};

export type FuentesVideo = {
  /** Video horizontal para escritorio. */
  pc: string;
  pcPoster: string;
  /** Video vertical para celular. */
  movil: string;
  movilPoster: string;
};

/**
 * Capa de video de fondo, común a la portada y a la compra de cada ficha.
 *
 * Es una capa absoluta: se pone dentro de una sección `relative` y el
 * contenido va encima. Elige el video vertical en celular y el
 * horizontal en PC; el poster (un cuadro del mismo video) se ve de
 * inmediato y el video entra por encima cuando ya puede reproducirse.
 * Se pausa al salir de pantalla y no se reproduce con "reducir
 * movimiento" ni con "ahorro de datos". Los `children` son los velos
 * oscuros que cada uso pone encima para que el texto se lea.
 */
export default function FondoVideo({
  pc,
  pcPoster,
  movil,
  movilPoster,
  paralaje = true,
  posicion = "center",
  className = "-z-10",
  children,
}: FuentesVideo & {
  /** Desplaza un poco el video con el scroll. */
  paralaje?: boolean;
  /** `object-position` del video: qué parte se ve cuando se recorta. */
  posicion?: string;
  className?: string;
  children?: ReactNode;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const esMovil = useMovil();
  const sinMovimiento = useSinMovimiento();
  const cliente = useSyncExternalStore(suscribirNada, () => true, () => false);
  const [visible, setVisible] = useState(false);
  const [listo, setListo] = useState(false);

  const src = esMovil ? movil : pc;
  const poster = esMovil ? movilPoster : pcPoster;

  const ahorro =
    cliente &&
    Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );
  const reproducir = cliente && !sinMovimiento && !ahorro;

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
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className}`}
    >
      <motion.div
        style={sinMovimiento || !paralaje ? undefined : { y }}
        className={paralaje ? "absolute -inset-y-[7%] inset-x-0" : "absolute inset-0"}
      >
        {/* Poster: se ve al instante y queda de respaldo. */}
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${poster})`, backgroundPosition: posicion }}
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
            style={{ objectPosition: posicion }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              listo ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
}
