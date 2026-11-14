"use client";

import { useSinMovimiento } from "@/lib/sinMovimiento";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Container from "./Container";
import Paralaje from "./Paralaje";
import Tilt3D from "./Tilt3D";
import { MODELOS } from "@/lib/modelos";
import { useIdioma } from "@/lib/idioma";

const CURVA = [0.22, 1, 0.36, 1] as const;

export type Miga = { texto: string; href: string };
export type DatoPlano = { valor: string; rotulo: string };

/**
 * Portada de toda página interior.
 *
 * La entrada tiene tres tiempos, todos con la misma curva del sitio:
 * las migas y la etiqueta aparecen primero; el título sube palabra por
 * palabra desde detrás de una máscara; la bajada y los datos llegan al
 * final. El auto entra desde la derecha, ya con la flotación y el giro
 * 3D del puntero que usan los demás autos del sitio.
 */
export default function EncabezadoPagina({
  etiqueta,
  titulo,
  bajada,
  auto,
  fondo,
  migas,
  datos,
  etiquetas,
}: {
  etiqueta?: string;
  titulo: string;
  bajada: string;
  /** Id de `lib/modelos.ts`: el recorte que ilustra la portada. */
  auto?: string;
  /** Foto a sangre: reemplaza al auto. */
  fondo?: string;
  migas: Miga[];
  datos?: DatoPlano[];
  etiquetas?: string[];
}) {
  const sinMovimiento = useSinMovimiento();
  const { t } = useIdioma();
  const modelo = auto ? MODELOS.find((m) => m.id === auto) : undefined;
  const mostrarAuto = Boolean(modelo) && !fondo;
  const palabras = titulo.split(" ");

  const entrar = (retardo: number, y = 24) =>
    sinMovimiento
      ? {}
      : {
          initial: { opacity: 0, y, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay: retardo, ease: CURVA },
        };

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-7 lg:pt-40 lg:pb-20">
      {fondo ? (
        <>
          <Paralaje className="-z-20" distancia={48}>
            <Image
              src={fondo}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </Paralaje>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_75%_45%,rgba(216,31,38,0.13),transparent_70%)]"
        />
      )}

      <Container>
        <div
          className={`grid items-center gap-5 lg:gap-10 ${
            mostrarAuto ? "lg:grid-cols-12 lg:gap-6" : ""
          }`}
        >
          <div className={mostrarAuto ? "lg:col-span-7" : "max-w-[900px]"}>
            <motion.nav aria-label={t("Ubicación")} {...entrar(0.05, 12)}>
              <ol className="text-graphite flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                {migas.map((m, i) => (
                  <li key={m.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {i < migas.length - 1 ? (
                      <Link
                        href={m.href}
                        className="hover:text-bone transition-colors duration-300"
                      >
                        {m.texto}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-bone/80">
                        {m.texto}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>

            {etiqueta && (
              <motion.p
                {...entrar(0.12, 14)}
                className="type-normal text-rojo mt-8 text-xs font-semibold tracking-wider uppercase"
              >
                {etiqueta}
              </motion.p>
            )}

            <h1 className="display-tight over-media text-bone mt-4 text-5xl font-bold md:text-7xl lg:text-[5.5rem]">
              {palabras.map((palabra, i) => (
                <span
                  key={`${palabra}-${i}`}
                  className="mr-[0.22em] inline-block overflow-hidden py-[0.07em] align-bottom"
                >
                  <motion.span
                    className="inline-block"
                    initial={sinMovimiento ? { opacity: 0 } : { y: "115%" }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 0.18 + i * 0.07,
                      ease: CURVA,
                    }}
                  >
                    {palabra}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...entrar(0.55)}
              className="text-bone/80 over-media mt-6 max-w-[52ch] text-lg md:text-xl"
            >
              {bajada}
            </motion.p>

            {etiquetas && etiquetas.length > 0 && (
              <motion.div {...entrar(0.65)} className="mt-6 flex flex-wrap gap-2">
                {etiquetas.map((e) => (
                  <span
                    key={e}
                    className="type-normal border-bone/30 text-bone/90 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase"
                  >
                    {t(e)}
                  </span>
                ))}
              </motion.div>
            )}

            {datos && datos.length > 0 && (
              <dl className="border-hairline mt-10 grid max-w-[640px] grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-3">
                {datos.map((d, i) => (
                  <motion.div key={d.rotulo} {...entrar(0.75 + i * 0.1, 18)}>
                    <dd className="type-condensed text-bone text-4xl font-bold uppercase md:text-5xl">
                      {d.valor}
                    </dd>
                    <dt className="text-graphite mt-1 text-sm">{d.rotulo}</dt>
                  </motion.div>
                ))}
              </dl>
            )}
          </div>

          {mostrarAuto && modelo && (
            <motion.div
              className="relative h-[190px] sm:h-[320px] lg:col-span-5 lg:h-[420px] lg:-mr-10"
              initial={
                sinMovimiento
                  ? { opacity: 0 }
                  : { opacity: 0, x: 90, scale: 0.93, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 0.3, ease: CURVA }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-[10%] h-8 w-[80%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65),transparent_70%)]"
              />
              <Tilt3D className="h-full w-full" grados={8} escala={1.03} brillo={false}>
                <div className="animate-flotar h-full w-full">
                  <Image
                    src={modelo.foto}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    quality={90}
                    draggable={false}
                    className="object-contain object-center"
                  />
                </div>
              </Tilt3D>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
