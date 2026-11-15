"use client";

import Container from "./Container";
import Reveal from "./Reveal";
import EncabezadoPagina from "./EncabezadoPagina";
import BloquesPagina from "./BloquesPagina";
import BandaCta from "./BandaCta";
import TarjetaImagen from "./TarjetaImagen";
import ZonaClara from "./ZonaClara";
import { MODELOS } from "@/lib/modelos";
import { useIdioma } from "@/lib/idioma";
import {
  categoriaPorId,
  paginasDe,
  type Pagina,
} from "@/lib/sitio";

/**
 * Página de contenido: portada animada, datos clave, tarjetas con los
 * puntos principales sobre fondo blanco, más páginas para seguir
 * leyendo y un cierre con la acción. Todo sale de un objeto `Pagina`
 * de `lib/sitio.ts`.
 */
export default function PaginaInfo({ pagina }: { pagina: Pagina }) {
  const { l, t } = useIdioma();
  const categoria = categoriaPorId(pagina.categoria);
  const modelo = MODELOS.find((m) => m.id === pagina.auto);

  const migas = [{ texto: t("Inicio"), href: "/" }];
  if (categoria && categoria.href !== `/${pagina.slug}`) {
    migas.push({ texto: l(categoria.etiqueta), href: categoria.href });
  }
  migas.push({ texto: l(pagina.titulo), href: `/${pagina.slug}` });

  /* Más para leer: las hermanas de la misma categoría; si no hay
     (páginas sueltas), tres modelos. */
  const hermanas = paginasDe(pagina.categoria).filter(
    (p) => p.slug !== pagina.slug,
  );
  const tarjetas =
    hermanas.length >= 2
      ? hermanas.slice(0, 3).map((p) => {
          const auto = MODELOS.find((m) => m.id === p.auto) ?? MODELOS[0];
          return {
            href: `/${p.slug}`,
            titulo: l(p.nombre),
            imagen: auto.foto,
            alt: t(auto.alt),
          };
        })
      : MODELOS.slice(0, 3).map((m) => ({
          href: `/modelos/${m.id}#comprar`,
          titulo: `${m.marca} ${m.nombre}`,
          imagen: m.foto,
          alt: t(m.alt),
        }));

  const botones = [
    {
      texto: l(pagina.cta.texto),
      href: pagina.cta.href,
      externo: pagina.cta.externo,
    },
  ];
  if (pagina.cta.href !== "/modelos") {
    botones.push({ texto: t("Ver los modelos"), href: "/modelos", externo: false });
  }

  return (
    <>
      <EncabezadoPagina
        etiqueta={categoria ? l(categoria.etiqueta) : undefined}
        titulo={l(pagina.titulo)}
        bajada={l(pagina.bajada)}
        auto={modelo?.id}
        fondo={pagina.fondo}
        migas={migas}
        datos={pagina.datos?.map((d) => ({
          valor: l(d.valor),
          rotulo: l(d.rotulo),
        }))}
      />

      <ZonaClara>
        <BloquesPagina
          bloques={pagina.bloques.map((b) => ({
            titulo: l(b.titulo),
            texto: l(b.texto),
          }))}
        />

        <section className="pt-2 pb-6 lg:pt-4 lg:pb-16">
          <Container>
            <Reveal>
              <h2 className="display-tight text-tinta text-3xl font-bold md:text-5xl">
                {t("Seguí explorando")}
              </h2>
            </Reveal>
            <ul className="carrusel-movil mt-6 sm:mt-10 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tarjetas.map((c, i) => (
                <Reveal as="li" key={c.href} delay={i * 0.08}>
                  <TarjetaImagen {...c} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <BandaCta titulo={t("Te esperamos en el showroom.")} botones={botones} />
      </ZonaClara>
    </>
  );
}
