import Container from "@/components/Container";
import CtaTexto from "@/components/Flecha";

export const metadata = {
  title: "Términos y condiciones",
  robots: { index: false, follow: true },
};

const BLOQUES = [
  {
    t: "Publicación de precios",
    c: "Los precios están expresados en dólares estadounidenses e incluyen transferencia, verificación policial, informe de dominio y gestoría. El patentamiento de unidades 0km se cotiza aparte.",
  },
  {
    t: "Disponibilidad del stock",
    c: "Las unidades publicadas están sujetas a disponibilidad. Una unidad se considera reservada únicamente con seña documentada.",
  },
  {
    t: "Prueba de manejo",
    c: "Requiere registro de conducir vigente y DNI. La unidad está asegurada durante la prueba. El conductor responde por multas e infracciones cometidas en ese lapso.",
  },
  {
    t: "Garantía",
    c: "12 meses sobre motor, caja y diferencial, sin límite de kilómetros, desde la fecha de transferencia. No cubre desgaste normal, neumáticos ni elementos de mantenimiento periódico.",
  },
  {
    t: "Devolución",
    c: "7 días corridos o 300 kilómetros desde la entrega, lo que ocurra primero. Se reintegra el total abonado menos los gastos de transferencia ya ejecutados.",
  },
  {
    t: "Jurisdicción",
    c: "Ante cualquier controversia, las partes se someten a los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires.",
  },
];

export default function Terminos() {
  return (
    <main className="bg-ink py-32 lg:py-40">
      <Container>
        <h1 className="display-tight text-bone text-4xl font-bold md:text-6xl">
          Términos y condiciones
        </h1>
        <p className="text-dim mt-4 text-sm">Última actualización: marzo de 2026.</p>
        <dl className="mt-14 max-w-[70ch] space-y-10">
          {BLOQUES.map((b) => (
            <div key={b.t} className="border-hairline border-t pt-6">
              <dt className="type-condensed text-bone text-2xl font-bold uppercase">
                {b.t}
              </dt>
              <dd className="text-graphite mt-3 text-base">{b.c}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-14">
          <CtaTexto href="/">Volver al inicio</CtaTexto>
        </div>
      </Container>
    </main>
  );
}
