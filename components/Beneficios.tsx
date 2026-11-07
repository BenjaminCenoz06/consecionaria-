import Container from "./Container";
import Reveal from "./Reveal";

const BENEFICIOS = [
  {
    titulo: "180 puntos de control",
    texto:
      "Motor, tren delantero, electrónica, granizo y chapa. El informe se firma y te lo llevás, aunque no compres.",
  },
  {
    titulo: "Prueba sin vendedor",
    texto:
      "40 minutos con el auto, solo. Si querés llevarlo a tu mecánico de confianza, también se puede.",
  },
  {
    titulo: "Precio cerrado",
    texto:
      "El número publicado incluye transferencia, verificación y gestoría. No aparece nada nuevo al momento de firmar.",
  },
  {
    titulo: "Permuta tasada en 24 horas",
    texto:
      "Traés tu auto, lo tasamos por escrito y la oferta te queda firme 7 días. Sin obligación de comprar acá.",
  },
];

export default function Beneficios() {
  return (
    <section className="bg-surface py-20 lg:py-24">
      <Container>
        <Reveal>
          <h2 className="display-tight text-bone max-w-[20ch] text-4xl font-bold md:text-6xl">
            Por qué la gente vuelve
          </h2>
        </Reveal>

        <ul className="border-hairline mt-14 grid grid-cols-1 gap-px border md:grid-cols-2">
          {BENEFICIOS.map((b, i) => (
            <Reveal
              as="li"
              key={b.titulo}
              delay={i * 0.06}
              className="bg-surface outline-hairline p-8 outline outline-offset-0 lg:p-10"
            >
              <h3 className="type-condensed text-bone text-2xl font-bold uppercase">
                {b.titulo}
              </h3>
              <p className="text-graphite mt-3 max-w-[46ch] text-base">
                {b.texto}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
