import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Modelos from "@/components/Modelos";
import Ubicacion from "@/components/Ubicacion";
import Tagline from "@/components/Tagline";
import Destacados from "@/components/Destacados";
import ComoFunciona from "@/components/ComoFunciona";
import Beneficios from "@/components/Beneficios";
import Preguntas from "@/components/Preguntas";
import Reservar from "@/components/Reservar";
import Footer from "@/components/Footer";

/** Datos estructurados para búsqueda local. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Vértice Automotores",
  description:
    "Concesionaria de autos seleccionados en Buenos Aires. 180 puntos de control, garantía escrita de 12 meses y prueba de manejo sin vendedor.",
  url: "https://vertice.com.ar",
  telephone: "+54-11-5000-0000",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. del Libertador 4874",
    addressLocality: "Núñez",
    addressRegion: "Ciudad Autónoma de Buenos Aires",
    postalCode: "C1426",
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      {/* `relative z-10` + fondo sólido: es la cortina que tapa al footer
          (sticky, z-0) hasta que se llega al final. Ver Footer.tsx. */}
      <main id="contenido" className="bg-ink relative z-10 flex-1">
        <Hero />
        <Modelos />
        <Ubicacion />
        <Tagline />
        <Destacados />
        <ComoFunciona />
        <Beneficios />
        <Preguntas />
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
