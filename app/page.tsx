import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Modelos from "@/components/Modelos";
import Ubicacion from "@/components/Ubicacion";
import Tagline from "@/components/Tagline";
import Destacados from "@/components/Destacados";
import Explorar from "@/components/Explorar";
import Gama from "@/components/Gama";
import ComoFunciona from "@/components/ComoFunciona";
import Preguntas from "@/components/Preguntas";
import Reservar from "@/components/Reservar";
import Footer from "@/components/Footer";
import TemaScroll from "@/components/TemaScroll";

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
      <main id="contenido" className="bg-lienzo relative z-10 flex-1">
        <TemaScroll />
        <Hero />
        <Modelos />
        <Ubicacion />
        <Tagline />
        {/* Zona clara: arranca en "Selección de la semana". Mientras esta
            franja cruza el 40% de la pantalla, todo el sitio pasa de
            negro a blanco. Ver TemaScroll.tsx. */}
        <div data-zona="claro">
          {/* Borde de entrada: en vez de un corte seco entre el negro de
              Tagline y el blanco, un degradé de varias paradas (curva
              suave, no lineal) con un halo latón apenas visible. Sobre
              el fondo negro, antes del cambio de tema, es invisible. */}
          <div
            aria-hidden="true"
            className="h-36 lg:h-52"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 55% 90% at 50% 0%, rgba(194,160,91,0.2), transparent 70%), linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.88) 16%, rgba(0,0,0,0.66) 38%, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.14) 82%, rgba(0,0,0,0) 100%)",
            }}
          />
          <Destacados />
          <Explorar />
          <Gama />
          <ComoFunciona />
          <Preguntas />
          {/* Borde de salida: el mismo degradé, al revés, hacia Reservar. */}
          <div
            aria-hidden="true"
            className="h-36 lg:h-52"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 55% 90% at 50% 100%, rgba(194,160,91,0.2), transparent 70%), linear-gradient(to top, #000 0%, rgba(0,0,0,0.88) 16%, rgba(0,0,0,0.66) 38%, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.14) 82%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
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
