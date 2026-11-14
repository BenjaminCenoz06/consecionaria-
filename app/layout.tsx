import type { Metadata } from "next";
import { Barlow_Semi_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SaltarAlContenido from "@/components/SaltarAlContenido";
import BarraProgreso from "@/components/BarraProgreso";
import { IdiomaProvider } from "@/lib/idioma";

/**
 * Una sola familia para todo el sitio.
 * La referencia (Porsche) usa Porsche Next, una fuente propietaria que no
 * se puede licenciar para este sitio. Barlow Semi Condensed es la
 * alternativa libre más cercana: grotesca angosta, de trazo limpio y
 * esquinas apenas redondeadas, con pesos de light a extrabold.
 */
const principal = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-principal",
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
  /* "./" se resuelve contra la URL de cada página: con SITIO fijo, todas
     las páginas declararían a la home como canónica. */
  alternates: { canonical: "./" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${principal.variable} h-full antialiased`}>
      <body className="bg-lienzo text-bone flex min-h-full flex-col">
        <IdiomaProvider>
          <SaltarAlContenido />
          <BarraProgreso />
          <SmoothScroll>{children}</SmoothScroll>
        </IdiomaProvider>
      </body>
    </html>
  );
}
