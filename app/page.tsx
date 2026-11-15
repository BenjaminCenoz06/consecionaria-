import Header from "@/components/Header";import Hero from "@/components/Hero";
import Modelos from "@/components/Modelos";
import Ubicacion from "@/components/Ubicacion";
import Tagline from "@/components/Tagline";
import Marquesina from "@/components/Marquesina";
import Destacados from "@/components/Destacados";
import Explorar from "@/components/Explorar";
import Gama from "@/components/Gama";
import QueHacemos from "@/components/QueHacemos";
import ComoFunciona from "@/components/ComoFunciona";
import Preguntas from "@/components/Preguntas";
import Reservar from "@/components/Reservar";
import Footer from "@/components/Footer";
import TemaScroll from "@/components/TemaScroll";
import ZonaClara from "@/components/ZonaClara";

/** Datos estructurados para búsqueda local. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Bárcena Automotores",
  description:
    "Concesionaria en La Cumbre, Córdoba: compra, venta y consignación de autos, 0 km multimarcas, usados seleccionados y financiación exclusiva.",
  telephone: "+54-9-3548-409755",
  sameAs: ["https://www.instagram.com/barcena.automotores/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Cumbre",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      {/* `relative z-10` + fondo sólido: es la cortina que tapa al footer
          (sticky, z-0) hasta que se llega al final. Ver Footer.tsx. */}
      <main id="contenido" className="bg-lienzo relative z-10 flex-1">
        <TemaScroll />
        <Hero />
        <Modelos />
        <Ubicacion />
        <Tagline />
        <Marquesina />
        {/* Zona clara: arranca en "Selección de la semana". Mientras esta
            franja cruza el 40% de la pantalla, todo el sitio pasa de
            negro a blanco. Ver TemaScroll.tsx. */}
        <ZonaClara>
          <Destacados />
          <Explorar />
          <Gama />
          <QueHacemos />
          <ComoFunciona />
          <Preguntas />
        </ZonaClara>
        <Reservar />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
    </>
  );
}
