"use client";

import FondoVideo from "./FondoVideo";
import { portadaDe } from "@/lib/videos";

/**
 * Fondo de la portada de cada ficha: el auto (o uno del mismo tipo)
 * andando, en lugar de la marca de agua con el nombre.
 *
 * El auto recortado va por delante, así que los velos lo hacen "flotar":
 * oscurecen parejo, hunden los bordes y funden el borde de abajo con
 * negro, donde empieza la franja blanca del producto.
 */
export default function FondoPortada({ id }: { id: string }) {
  return (
    <FondoVideo {...portadaDe(id)} paralaje={false} posicion="center 55%" className="z-0">
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_75%_at_50%_55%,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </FondoVideo>
  );
}
