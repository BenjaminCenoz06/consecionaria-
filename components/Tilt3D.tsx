"use client";

import { useSinMovimiento } from "@/lib/sinMovimiento";
import {
  useRef,
  type PointerEvent as PunteroReact,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

/** Un solo resorte para todo el sitio: pesado, sin rebote visible. */
const RESORTE = { stiffness: 150, damping: 20, mass: 0.6 } as const;

/**
 * Inclinación 3D que sigue al puntero.
 *
 * Es la única pieza de 3D del sitio: la usan las tarjetas y también los
 * autos sueltos sobre el escenario negro. Un solo componente para que
 * todos se muevan igual; variantes por sección leen como ruido, igual
 * que con `Reveal`.
 *
 * Tres reglas que la hacen sentir cara en vez de barata:
 *
 * 1. Nada de `transition`: la rotación va por resorte, así frena sola
 *    y nunca llega de golpe al tope.
 * 2. El giro es chico. Arriba de unos 10° deja de leerse como objeto
 *    y empieza a leerse como truco.
 * 3. Se apaga sola donde molesta: con `prefers-reduced-motion`, y en
 *    pantallas táctiles, donde no hay puntero que seguir y el "hover"
 *    se quedaría pegado después de tocar.
 *
 * Para que las capas de adentro floten hay que ponerles `translateZ`:
 * el contenedor ya trae `transform-style: preserve-3d`. Ojo con
 * `overflow-hidden` en el medio, que aplasta el 3D — por eso las
 * tarjetas recortan la foto en un hijo aparte y dejan el texto afuera.
 */
export default function Tilt3D({
  children,
  className = "",
  grados = 9,
  escala = 1.02,
  brillo = true,
  activo = true,
  perspectiva = 1100,
}: {
  children: ReactNode;
  className?: string;
  /** Giro máximo en cada eje. */
  grados?: number;
  /** Cuánto se acerca al pasar por encima. */
  escala?: number;
  /** Reflejo especular que sigue al puntero. Sólo para superficies. */
  brillo?: boolean;
  /** `false` lo deja quieto (ej.: el auto que no está en foco). */
  activo?: boolean;
  perspectiva?: number;
}) {
  const sinMovimiento = useSinMovimiento();
  const caja = useRef<HTMLDivElement>(null);

  /* Posición del puntero dentro de la caja, de -0.5 a 0.5. */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const encima = useMotionValue(0);

  /* Signos: la cara se inclina HACIA el puntero, no en contra. Leído
     así el objeto parece atraído por la mano; al revés parece que uno
     lo empuja, que es el gesto equivocado para algo que se quiere
     mirar. */
  const girarX = useSpring(
    useTransform(y, [-0.5, 0.5], [-grados, grados]),
    RESORTE,
  );
  const girarY = useSpring(
    useTransform(x, [-0.5, 0.5], [grados, -grados]),
    RESORTE,
  );
  const acercar = useSpring(useTransform(encima, [0, 1], [1, escala]), RESORTE);
  const luz = useSpring(encima, { stiffness: 90, damping: 20 });

  const brilloX = useTransform(x, (v) => `${(v + 0.5) * 100}%`);
  const brilloY = useTransform(y, (v) => `${(v + 0.5) * 100}%`);
  const fondoBrillo = useMotionTemplate`radial-gradient(circle at ${brilloX} ${brilloY}, rgba(255,255,255,0.22), rgba(255,255,255,0.06) 32%, transparent 62%)`;

  const quieto = Boolean(sinMovimiento) || !activo;

  const seguir = (e: PunteroReact<HTMLDivElement>) => {
    /* `pointerType` y no un media query: lo que importa es con qué se
       está tocando ahora, no qué puede hacer el dispositivo. */
    if (quieto || e.pointerType === "touch") return;
    const r = caja.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
    encima.set(1);
  };

  const soltar = () => {
    x.set(0);
    y.set(0);
    encima.set(0);
  };

  return (
    <div
      ref={caja}
      onPointerMove={seguir}
      onPointerLeave={soltar}
      onPointerCancel={soltar}
      style={{ perspective: `${perspectiva}px` }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: quieto ? 0 : girarX,
          rotateY: quieto ? 0 : girarY,
          scale: quieto ? 1 : acercar,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative h-full w-full rounded-[inherit]"
      >
        {children}

        {brillo && !quieto && (
          <motion.span
            aria-hidden="true"
            style={{ backgroundImage: fondoBrillo, opacity: luz }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          />
        )}
      </motion.div>
    </div>
  );
}
