import Container from "./Container";
import Reveal from "./Reveal";
import CtaTexto from "./Flecha";

/**
 * La franja oscura de la referencia: 288px, fondo negro, un título
 * enorme y nada más. Corta el ritmo entre dos secciones largas.
 */
export default function BannerShowroom() {
  return (
    <section id="showroom" className="bg-ink border-hairline border-y">
      <Container className="py-20 lg:py-24">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display-tight text-bone text-4xl font-bold md:text-6xl lg:text-7xl">
              Showroom
            </h2>
            <address className="text-graphite mt-6 max-w-[40ch] text-base not-italic">
              Av. del Libertador 4874, Núñez, Buenos Aires.
              <br />
              Lunes a viernes de 9 a 19. Sábados de 10 a 14.
            </address>
          </div>
          <div className="flex flex-col gap-3">
            <CtaTexto href="#reservar">Agendar una visita</CtaTexto>
            <a
              href="https://wa.me/5491150000000"
              className="type-normal text-graphite hover:text-bone text-sm font-semibold uppercase transition-colors duration-300"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
