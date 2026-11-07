import Container from "./Container";
import Reveal from "./Reveal";

const PASOS = [
  {
    n: "01",
    titulo: "Elegís la unidad",
    texto:
      "Todo el stock está online con el informe de 180 puntos y el historial de service adjuntos. Sin turno previo, sin dejar tus datos para ver un precio.",
  },
  {
    n: "02",
    titulo: "La probás 40 minutos",
    texto:
      "Te damos la llave y te vas solo. Ruta, ciudad, el recorrido que quieras. Nadie va de acompañante diciéndote lo bien que anda.",
  },
  {
    n: "03",
    titulo: "Te la llevás en 48 horas",
    texto:
      "Transferencia, verificación policial y patente nueva los hacemos nosotros. El precio publicado ya los incluye.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-paper py-20 lg:py-24">
      <Container>
        <Reveal>
          <p className="type-normal text-xs font-semibold text-[#8a6f33] uppercase">
            Tres pasos
          </p>
          <h2 className="display-tight text-near mt-3 max-w-[18ch] text-4xl font-bold md:text-6xl lg:text-7xl">
            Cómo funciona
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {PASOS.map((paso, i) => (
            <Reveal as="li" key={paso.n} delay={i * 0.08}>
              <p className="type-condensed text-ash text-6xl font-bold">
                {paso.n}
              </p>
              <h3 className="type-condensed text-near mt-4 text-2xl font-bold uppercase">
                {paso.titulo}
              </h3>
              <p className="text-graphite mt-3 max-w-[42ch] text-base">
                {paso.texto}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
