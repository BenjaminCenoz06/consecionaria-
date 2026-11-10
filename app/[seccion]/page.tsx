import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PaginaBase from "@/components/PaginaBase";
import PaginaInfo from "@/components/PaginaInfo";
import IndiceCategoria from "@/components/IndiceCategoria";
import { CATEGORIAS, PAGINAS, categoriaPorId, paginaPorSlug } from "@/lib/sitio";

/* Ver `app/modelos/[id]/page.tsx`: las secciones válidas son estáticas y
   los desconocidos siguen dando 404. */
export const instant = false;

type Props = { params: Promise<{ seccion: string }> };

/** Categorías con índice propio. "modelos" tiene su ruta aparte. */
const INDICES = CATEGORIAS.filter(
  (c) => c.id !== "modelos" && c.id !== "concesionario",
).map((c) => c.id);

/** Páginas de un solo nivel: "concesionario", "privacidad", "terminos". */
const SUELTAS = PAGINAS.filter((p) => !p.slug.includes("/")).map((p) => p.slug);

export function generateStaticParams() {
  return [...INDICES, ...SUELTAS].map((seccion) => ({ seccion }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seccion } = await params;
  const pagina = paginaPorSlug(seccion);
  if (pagina) return { title: pagina.titulo.es, description: pagina.bajada.es };
  const categoria = categoriaPorId(seccion);
  if (categoria) return { title: categoria.etiqueta.es, description: categoria.bajada.es };
  return {};
}

export default async function Page({ params }: Props) {
  const { seccion } = await params;

  const suelta = SUELTAS.includes(seccion) ? paginaPorSlug(seccion) : undefined;
  if (suelta) {
    return (
      <PaginaBase>
        <PaginaInfo pagina={suelta} />
      </PaginaBase>
    );
  }

  if (INDICES.includes(seccion)) {
    return (
      <PaginaBase>
        <IndiceCategoria categoriaId={seccion} />
      </PaginaBase>
    );
  }

  notFound();
}
