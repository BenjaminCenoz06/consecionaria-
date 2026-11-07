import Container from "./Container";

const COLUMNAS = [
  {
    titulo: "Catálogo",
    enlaces: [
      { href: "#modelos", texto: "Modelos" },
      { href: "#reservar", texto: "Reservar prueba" },
      { href: "#ubicacion", texto: "Showroom" },
    ],
  },
  {
    titulo: "Empresa",
    enlaces: [
      { href: "#como-funciona", texto: "Cómo funciona" },
      { href: "#preguntas", texto: "Preguntas" },
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

export default function Footer() {
  return (
    <footer className="bg-ink border-hairline border-t">
      <Container className="py-16 lg:py-20">
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
              <a href="tel:+541150000000" className="hover:text-bone transition-colors duration-300">
                11 5000 0000
              </a>
            </address>
          </div>

          {COLUMNAS.map((col) => (
            <nav key={col.titulo} aria-label={col.titulo}>
              <h2 className="type-normal text-dim text-xs font-semibold uppercase">
                {col.titulo}
              </h2>
              <ul className="mt-4 space-y-2">
                {col.enlaces.map((e) => (
                  <li key={e.href + e.texto}>
                    <a
                      href={e.href}
                      className="text-graphite hover:text-bone text-sm transition-colors duration-300"
                    >
                      {e.texto}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-hairline text-dim mt-14 flex flex-col gap-2 border-t pt-8 text-xs sm:flex-row sm:justify-between">
          <p>© Vértice Automotores. CUIT 30-71000000-4.</p>
          <p>Agencia registrada DNRPA 0000.</p>
        </div>
      </Container>
    </footer>
  );
}
