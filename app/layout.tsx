import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/**
 * Una sola familia para todo el sitio.
 * `axes: ["wdth"]` es lo que habilita el eje de ancho: sin esto Next
 * sólo trae el eje de peso y `font-variation-settings: "wdth" 70` no
 * haría absolutamente nada.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const SITIO = "https://vertice.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "Vértice — Concesionaria de autos seleccionados en Buenos Aires",
    template: "%s | Vértice",
  },
  description:
    "Seleccionamos 1 de cada 9 unidades que evaluamos. 180 puntos de control, garantía escrita de 12 meses y prueba de manejo de 40 minutos sin vendedor.",
  keywords: [
    "concesionaria Buenos Aires",
    "autos usados seleccionados",
    "autos 0km",
    "prueba de manejo",
    "permuta de autos",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITIO,
    siteName: "Vértice",
    title: "Vértice — Autos que se manejan antes de comprarse",
    description:
      "180 puntos de control, informe abierto y 40 minutos de prueba sin acompañamiento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vértice — Autos que se manejan antes de comprarse",
    description: "180 puntos de control. Precio cerrado. Garantía por escrito.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITIO },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${archivo.variable} h-full antialiased`}>
      <body className="bg-lienzo text-bone flex min-h-full flex-col">
        <a
          href="#contenido"
          className="bg-brass text-ink type-normal sr-only text-sm font-semibold uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-3 focus:py-2"
        >
          Saltar al contenido
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
