import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaBase from "@/components/PaginaBase";
import DetalleModelo from "@/components/DetalleModelo";
import { MODELOS } from "@/lib/modelos";

/* Todas las fichas válidas se generan estáticas (`generateStaticParams`),
   así que la navegación hacia ellas es instantánea en producción. El aviso
   del modo desarrollo sobre `params` no aplica; y se conserva el 404 real
   para ids inventados. */
export const instant = false;

type Props = { params: Promise<{ id: string }> };

/** Una página por modelo, generada al compilar. */
export function generateStaticParams() {
  return MODELOS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const modelo = MODELOS.find((m) => m.id === id);
  return {
    title: modelo ? `${modelo.marca} ${modelo.nombre}` : "Modelo",
    description: modelo
      ? `${modelo.marca} ${modelo.nombre}: ${modelo.lema}. 180 puntos de control y garantía escrita de 12 meses.`
      : undefined,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!MODELOS.some((m) => m.id === id)) notFound();

  return (
    <PaginaBase>
      <DetalleModelo id={id} />
    </PaginaBase>
  );
}
