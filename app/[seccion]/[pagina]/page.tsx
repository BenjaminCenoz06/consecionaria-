import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaBase from "@/components/PaginaBase";
import PaginaInfo from "@/components/PaginaInfo";
import { PAGINAS, paginaPorSlug } from "@/lib/sitio";

/* Ver `app/modelos/[id]/page.tsx`: las páginas válidas son estáticas y
   los desconocidos siguen dando 404. */
export const instant = false;

type Props = { params: Promise<{ seccion: string; pagina: string }> };

/** Páginas de dos niveles: "compra/financiacion", "servicios/envios"… */
export function generateStaticParams() {
  return PAGINAS.filter((p) => p.slug.includes("/")).map((p) => {
    const [seccion, pagina] = p.slug.split("/");
    return { seccion, pagina };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion, pagina } = await params;
  const datos = paginaPorSlug(`${seccion}/${pagina}`);
  return datos
    ? { title: datos.titulo.es, description: datos.bajada.es }
    : {};
}

export default async function Page({ params }: Props) {
  const { seccion, pagina } = await params;
  const datos = paginaPorSlug(`${seccion}/${pagina}`);
  if (!datos) notFound();

  return (
    <PaginaBase>
      <PaginaInfo pagina={datos} />
    </PaginaBase>
  );
}
