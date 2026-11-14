"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSinMovimiento } from "@/lib/sinMovimiento";

/** Cuánto tarda en volver la foto después del último gesto de scroll. */
const ESPERA_MS = 1800;

/* Un solo oyente de scroll para todas las tarjetas: "¿se está
   scrolleando ahora mismo?". */
let scrolleando = false;
let temporizador: ReturnType<typeof setTimeout> | undefined;
const oyentes = new Set<() => void>();

function alScroll() {
  if (!scrolleando) {
    scrolleando = true;
    oyentes.forEach((avisar) => avisar());
  }
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    scrolleando = false;
    oyentes.forEach((avisar) => avisar());
  }, ESPERA_MS);
}

function suscribir(avisar: () => void) {
  if (oyentes.size === 0) {
    window.addEventListener("scroll", alScroll, { passive: true });
  }
  oyentes.add(avisar);
  return () => {
    oyentes.delete(avisar);
    if (oyentes.size === 0) {
      window.removeEventListener("scroll", alScroll);
      clearTimeout(temporizador);
      scrolleando = false;
    }
  };
}

/**
 * Capa de video para una tarjeta de auto.
 *
 * Va dentro de la capa recortada de la tarjeta, justo encima de la foto.
 * Con la tarjeta a la vista y la página en movimiento, el video aparece y
 * corre; cuando el scroll se detiene (o la tarjeta sale de pantalla) se
 * funde de vuelta a la foto y se pausa. Sin `src` o con "reducir
 * movimiento" activado no renderiza nada y queda sólo la foto.
 */
export default function VideoAuto({ src }: { src?: string }) {
  const sinMovimiento = useSinMovimiento();
  const enScroll = useSyncExternalStore(suscribir, () => scrolleando, () => false);
  const [visible, setVisible] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { threshold: 0.5 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [src, sinMovimiento]);

  const mostrar = visible && enScroll;

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (mostrar) {
      el.play().catch(() => {});
      return;
    }
    /* Se pausa después del fundido, no antes, para que no se congele. */
    const pausa = setTimeout(() => el.pause(), 800);
    return () => clearTimeout(pausa);
  }, [mostrar]);

  if (!src || sinMovimiento) return null;

  return (
    <video
      ref={video}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        mostrar ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
