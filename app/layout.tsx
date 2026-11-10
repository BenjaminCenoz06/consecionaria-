import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SaltarAlContenido from "@/components/SaltarAlContenido";
import { IdiomaProvider } from "@/lib/idioma";

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

/* El dominio definitivo todavía no está definido. Cuando se publique,
   cargarlo en la variable de entorno NEXT_PUBLIC_SITE_URL. */
const SITIO = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: "Bárcena Automotores — Compra, venta y consignación de autos en La Cumbre",
    template: "%s | Bárcena Automotores",
  },
  description:
    "Bárcena Automotores, La Cumbre (Córdoba): compra, venta y consignación de autos. 0 km multimarcas, usados seleccionados y financiación exclusiva.",
  keywords: [
    "concesionaria La Cumbre",
    "autos usados Córdoba",
    "autos 0km multimarcas",
    "consignación de autos",
    "financiación de autos",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITIO,
    siteName: "Bárcena Automotores",
    title: "Bárcena Automotores — Compra, venta y consignación",
    description:
      "0 km multimarcas, usados seleccionados y financiación exclusiva en La Cumbre, Córdoba.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bárcena Automotores — Compra, venta y consignación",
    description: "0 km multimarcas, usados seleccionados y financiación exclusiva.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITIO },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${archivo.variable} h-full antialiased`}>
      <body className="bg-lienzo text-bone flex min-h-full flex-col">
        <IdiomaProvider>
          <SaltarAlContenido />
          <SmoothScroll>{children}</SmoothScroll>
        </IdiomaProvider>
      </body>
    </html>
  );
}
