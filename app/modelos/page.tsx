import type { Metadata } from "next";
import PaginaBase from "@/components/PaginaBase";
import CatalogoAutos from "@/components/CatalogoAutos";

export const metadata: Metadata = {
  title: "Modelos",
  description:
    "Todos los autos de Bárcena: cada uno pasó 180 puntos de control y tiene garantía escrita de 12 meses.",
};

export default function Page() {
  return (
    <PaginaBase>
      <CatalogoAutos />
    </PaginaBase>
  );
}
