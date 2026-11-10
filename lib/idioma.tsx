"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EN } from "./textos-en";
import type { Texto } from "./sitio";

export type Idioma = "es" | "en";

const CLAVE = "barcena-idioma";

type Contexto = {
  idioma: Idioma;
  setIdioma: (idioma: Idioma) => void;
  /** Traduce un texto escrito en español. Si falta el par, devuelve el original. */
  t: (texto: string) => string;
  /** Elige el idioma de un texto que ya trae su par {es, en}. */
  l: (texto: Texto) => string;
};

const Ctx = createContext<Contexto>({
  idioma: "es",
  setIdioma: () => {},
  t: (texto) => texto,
  l: (texto) => texto.es,
});

const TITULO: Record<Idioma, string> = {
  es: "Bárcena Automotores — Compra, venta y consignación de autos en La Cumbre",
  en: "Bárcena Automotores — Car buying, selling and consignment in La Cumbre",
};

/**
 * Idioma del sitio.
 *
 * Arranca siempre en español: el servidor no sabe qué eligió la persona y
 * un valor distinto en el primer render rompería la hidratación. Recién
 * montado el cliente se lee la elección guardada. Cambiar de idioma no
 * navega ni recarga: todo el texto sale de `t()`, así que React repinta
 * en el lugar.
 */
export function IdiomaProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdiomaEstado] = useState<Idioma>("es");

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado === "en" || guardado === "es") setIdiomaEstado(guardado);
    } catch {
      /* Sin almacenamiento (ventana privada): queda el español. */
    }
  }, []);

  /* El <html lang> y el título tienen que acompañar al texto: lectores de
     pantalla y traductores del navegador leen el atributo. */
  useEffect(() => {
    document.documentElement.lang = idioma === "en" ? "en" : "es-AR";
    /* Sólo la home tiene par de títulos. Las demás páginas traen el suyo
       del `metadata` de su ruta y no hay que pisarlo. */
    if (document.title === TITULO.es || document.title === TITULO.en) {
      document.title = TITULO[idioma];
    }
  }, [idioma]);

  const setIdioma = useCallback((nuevo: Idioma) => {
    setIdiomaEstado(nuevo);
    try {
      localStorage.setItem(CLAVE, nuevo);
    } catch {
      /* Se aplica igual en esta visita. */
    }
  }, []);

  const t = useCallback(
    (texto: string) => (idioma === "en" ? (EN[texto] ?? texto) : texto),
    [idioma],
  );

  const l = useCallback(
    (texto: Texto) => (idioma === "en" ? texto.en : texto.es),
    [idioma],
  );

  const valor = useMemo(
    () => ({ idioma, setIdioma, t, l }),
    [idioma, setIdioma, t, l],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export const useIdioma = () => useContext(Ctx);
