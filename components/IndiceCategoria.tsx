"use client";

import Container from "./Container";
import Reveal from "./Reveal";
import EncabezadoPagina from "./EncabezadoPagina";
import BandaCta from "./BandaCta";
import TarjetaImagen from "./TarjetaImagen";
import ZonaClara from "./ZonaClara";
import { MODELOS } from "@/lib/modelos";
import { useIdioma } from "@/lib/idioma";
import { COMBUSTIBLE, categoriaPorId, paginasDe } from "@/lib/sitio";

/**
 * Portada de una categoría del menú (Asesoramiento y compra, Servicios,
 * Experiencia, Eléctricos e híbridos): la lista de sus páginas como
 * tarjetas de imagen. En "Eléctricos e híbridos" van primero los autos.
 */
export default function IndiceCategoria({ categoriaId }: { categoriaId: string }) {
  const { l, t } = useIdioma();
  const categoria = categoriaPorId(categoriaId);
  if (!categoria) return null;

  const paginas = paginasDe(categoria.id);

  const autos =
    categoria.id === "electricos-hibridos"
      ? MODELOS.filter((m) =>
          (COMBUSTIBLE[m.id] ?? []).some((c) => c === "Eléctrico" || c === "Híbrido"),
        ).map((m) => ({
          href: `/modelos/${m.id}`,
          titulo: `${m.marca} ${m.nombre}`,
          subtitulo: t(m.lema),
          imagen: m.foto,
          alt: t(m.alt),
          etiquetas: COMBUSTIBLE[m.id],
        }))
      : [];

  const paginasTarjetas = paginas.map((p) => {
    const auto = MODELOS.find((m) => m.id === p.auto) ?? MODELOS[0];
    return {
      href: `/${p.slug}`,
      titulo: l(p.nombre),
      imagen: auto.foto,
      alt: t(auto.alt),
      etiquetas: undefined as string[] | undefined,
      subtitulo: undefined as string | undefined,
    };
  });

  const tarjetas = [...autos, ...paginasTarjetas];

  return (
    <>
      <EncabezadoPagina
        titulo={l(categoria.etiqueta)}
        bajada={l(categoria.bajada)}
        auto={categoria.auto}
        migas={[
          { texto: t("Inicio"), href: "/" },
          { texto: l(categoria.etiqueta), href: categoria.href },
        ]}
      />

      <ZonaClara>
        <section className="py-12 lg:py-16">
          <Container>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tarjetas.map((c, i) => (
                <Reveal as="li" key={c.href} delay={(i % 3) * 0.08}>
                  <TarjetaImagen {...c} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <BandaCta
          titulo={t("¿Hablamos?")}
          botones={[
            { texto: t("Reservar prueba"), href: "/#reservar" },
            { texto: t("Ver los modelos"), href: "/modelos" },
          ]}
        />
      </ZonaClara>
    </>
  );
}
