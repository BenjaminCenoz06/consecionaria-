import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaBase from "@/components/PaginaBase";
import DetalleAuto from "@/components/DetalleAuto";
import { AUTOS, autoPorId, formatoUSD } from "@/lib/catalogo";

/* Todas las fichas válidas se generan estáticas (`generateStaticParams`),
   así que la navegación hacia ellas es instantánea en producción. El aviso
   del modo desarrollo sobre `params` no aplica; y se conserva el 404 real
   para ids inventados. */
export const instant = false;

type Props = { params: Promise<{ id: string }> };

/** Una página por modelo, generada al compilar. */
export function generateStaticParams() {
  return AUTOS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const auto = autoPorId(id);
  return {
    title: auto ? `${auto.marca} ${auto.nombre}` : "Modelo",
    description: auto
      ? `${auto.marca} ${auto.nombre} ${auto.anio}: ${formatoUSD(auto.precio, "es")}. ${auto.descripcion.es}`
      : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const auto = autoPorId(id);
  if (!auto) notFound();

  return (
    <PaginaBase>
      <DetalleAuto auto={auto} />
    </PaginaBase>
  );
}
