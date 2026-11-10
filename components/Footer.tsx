"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Container from "./Container";
import { useIdioma } from "@/lib/idioma";

const COLUMNAS = [
  {
    titulo: "Catálogo",
    enlaces: [
      { href: "/modelos", texto: "Modelos" },
      { href: "/#reservar", texto: "Reservar prueba" },
      { href: "/experiencia/showroom", texto: "Showroom" },
    ],
  },
  {
    titulo: "Empresa",
    enlaces: [
      { href: "/compra/como-comprar", texto: "Cómo funciona" },
      { href: "/#preguntas", texto: "Preguntas" },
    ],
  },
  {
    titulo: "Legales",
    enlaces: [
      { href: "/privacidad", texto: "Privacidad" },
      { href: "/terminos", texto: "Términos" },
    ],
  },
];

/**
 * El lema. Dos palabras angostas y una ancha: el contraste sale de mover
 * el eje de ancho de la fuente variable, no de mezclar familias.
 */
const LEMA = [
  { texto: "Acá", clase: "type-condensed font-bold" },
  { texto: "se", clase: "type-condensed font-bold" },
  {
    texto: "maneja",
    clase: "font-extrabold [font-variation-settings:'wdth'_125]",
  },
] as const;

/** Cuánto después de una palabra sale la siguiente. */
const ESCALONADO = 0.1;

/**
 * Footer en cortina, como el de psg.fr.
 *
 * El footer queda pegado al borde inferior de la pantalla, por debajo de
 * todo; el `<main>` de la página (z-10, fondo sólido) lo tapa. Al llegar
 * al final el contenido se desliza hacia arriba y lo descubre. Por eso la
 * página tiene que darle al `<main>` `relative z-10` y un fondo.
 *
 * Cuando ya se ve un buen trozo del footer, el lema se revela palabra
 * por palabra con un panel que lo barre (ver `globals.css`).
 */
export default function Footer() {
  const marcador = useRef<HTMLSpanElement>(null);
  const [juega, setJuega] = useState(false);
  const { t } = useIdioma();

  /* El marcador vive justo donde termina el `<main>`. Mientras el footer
     está pegado debajo del contenido no se lo puede observar a él (está
     "en pantalla" todo el tiempo), así que se observa este punto: cuando
     sube 240px sobre el borde inferior, ya se descubrió ese tanto de
     footer y arranca la animación. Si el marcador pasó por arriba de la
     pantalla (en celular, con el footer en el flujo normal) también
     cuenta como "ya llegó": sólo se reinicia al volver a subir. */
  useEffect(() => {
    const punto = marcador.current;
    if (!punto) return;

    const observador = new IntersectionObserver(
      ([entrada]) =>
        setJuega(entrada.isIntersecting || entrada.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -240px 0px", threshold: 0 },
    );
    observador.observe(punto);
    return () => observador.disconnect();
  }, []);

  return (
    <>
      <div className="relative h-0" aria-hidden="true">
        <span
          ref={marcador}
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
        />
      </div>

      <footer className="cortina text-bone">
        <div className="bg-ink">
          <Container className="pt-14 pb-8 lg:pt-16">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <p className="type-condensed text-bone text-3xl font-bold uppercase">
                  Vértice
                </p>
                <address className="text-graphite mt-4 text-sm not-italic">
                  Av. del Libertador 4874
                  <br />
                  Núñez, Buenos Aires
                  <br />
                  <a
                    href="tel:+541150000000"
                    className="hover:text-bone transition-colors duration-300"
                  >
                    11 5000 0000
                  </a>
                </address>
              </div>

              {COLUMNAS.map((col) => (
                <nav key={col.titulo} aria-label={t(col.titulo)}>
                  <h2 className="type-normal text-dim text-xs font-semibold uppercase">
                    {t(col.titulo)}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {col.enlaces.map((e) => (
                      <li key={e.href + e.texto}>
                        <Link
                          href={e.href}
                          className="text-graphite hover:text-bone text-sm transition-colors duration-300"
                        >
                          {t(e.texto)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* El lema. El texto accesible va en el <p>; las palabras y
                los paneles son decoración. Cada palabra recorta lo que
                se sale de su caja, así el panel y el desplazamiento de
                50px no se ven fuera de ella. */}
            <p
              aria-label={t("Acá se maneja")}
              className="mt-12 flex items-end gap-[0.16em] text-[min(calc((100vw-3rem)/8.6),9.25rem)] leading-[0.9] uppercase lg:mt-14"
            >
              {LEMA.map((palabra, i) => {
                const retardo = {
                  "--retardo": `${i * ESCALONADO}s`,
                } as CSSProperties;
                return (
                  <span
                    key={palabra.texto}
                    aria-hidden="true"
                    className="relative block shrink-0 overflow-hidden pt-[0.16em]"
                  >
                    <span
                      style={retardo}
                      className={`cortina-palabra block ${palabra.clase} ${
                        juega ? "palabra-entra" : "opacity-0"
                      }`}
                    >
                      {t(palabra.texto)}
                    </span>
                    <span
                      style={retardo}
                      className={`bg-ink absolute inset-0 ${
                        juega ? "barrido" : "opacity-0"
                      }`}
                    />
                  </span>
                );
              })}
            </p>

            <div className="border-hairline text-dim mt-10 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:justify-between">
              <p>{t("© Vértice Automotores. CUIT 30-71000000-4.")}</p>
              <p>{t("Agencia registrada DNRPA 0000.")}</p>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
