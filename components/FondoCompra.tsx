"use client";

import FondoVideo from "./FondoVideo";
import { fondoCompra } from "@/lib/videos";

/**
 * Fondo de video de la sección de compra: el auto andando detrás del
 * precio y los pasos. Encima lleva velos oscuros para que el texto
 * blanco se lea siempre (más cargados a la izquierda en escritorio, donde
 * va el texto, para dejar ver el auto a la derecha).
 */
export default function FondoCompra({ id }: { id: string }) {
  return (
    <FondoVideo {...fondoCompra(id)}>
      <div className="absolute inset-0 bg-black/40 lg:bg-black/15" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0)_75%)] lg:block" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_75%,#000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
    </FondoVideo>
  );
}
