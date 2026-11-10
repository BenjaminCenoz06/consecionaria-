import { Plus } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import Reveal from "./Reveal";
import Plano3D from "./Plano3D";

const PREGUNTAS = [
  {
    p: "¿Qué cubre la garantía de 12 meses?",
    r: "Motor, caja y diferencial, sin límite de kilómetros. Se entrega por escrito el día de la transferencia y es válida en cualquier taller de la red, no sólo en el nuestro.",
  },
  {
    p: "¿Puedo llevar el auto a mi mecánico antes de comprarlo?",
    r: "Sí, y lo recomendamos. Coordinás el día, te damos la unidad y la llevás al taller que elijas dentro de AMBA. Lo único que pedimos es el DNI y una constancia de seguro.",
  },
  {
    p: "¿Cómo funciona la permuta?",
    r: "Traés tu auto al showroom, lo tasamos en el día y te damos la oferta por escrito con 7 días de validez. No estás obligado a comprar acá para recibir la tasación.",
  },
  {
    p: "¿Trabajan con financiación?",
    r: "Sí. Prendarios con Banco Galicia, Santander y Macro, hasta 48 cuotas y hasta el 50% del valor. La preaprobación la gestionamos nosotros y tarda entre 48 y 72 horas.",
  },
  {
    p: "¿El precio publicado es el precio final?",
    r: "Sí. Incluye transferencia, verificación policial, informe de dominio y gestoría. Lo único que se suma es el patentamiento si la unidad es 0km.",
  },
  {
    p: "¿Envían unidades al interior del país?",
    r: "Sí, con camión cerrado y seguro contratado. El costo depende del destino y se cotiza aparte. A Córdoba, Rosario y Mendoza el envío está bonificado.",
  },
  {
    p: "¿Qué pasa si el auto no era lo que esperaba?",
    r: "Tenés 7 días corridos o 300 kilómetros, lo que ocurra primero, para devolverlo. Se reintegra el total menos los gastos de transferencia ya realizados.",
  },
  {
    p: "¿Necesito turno para ir al showroom?",
    r: "Para recorrer el stock no. Para una prueba de manejo sí, porque preparamos la unidad y la documentación con anticipación.",
  },
];

export default function Preguntas() {
  return (
    <section id="preguntas" className="py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <Reveal>
            <h2 className="display-tight text-tinta text-4xl font-bold md:text-6xl">
              Preguntas
            </h2>
            <p className="text-graphite mt-6 max-w-[34ch] text-base">
              Si falta la tuya, escribinos por WhatsApp y te contestamos sin
              pedirte los datos primero.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Plano3D inclinacion={8}>
            <dl className="border-linea border-t">
              {PREGUNTAS.map((item) => (
                <details
                  key={item.p}
                  name="preguntas"
                  className="group border-linea border-b"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <dt className="type-normal text-tinta text-lg font-semibold">
                      {item.p}
                    </dt>
                    <Plus
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                      className="text-graphite mt-1 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                    />
                  </summary>
                  <dd className="text-graphite max-w-[62ch] pb-6 text-base">
                    {item.r}
                  </dd>
                </details>
              ))}
            </dl>
            </Plano3D>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
