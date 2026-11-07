import Container from "@/components/Container";
import CtaTexto from "@/components/Flecha";

export const metadata = {
  title: "Política de privacidad",
  robots: { index: false, follow: true },
};

const BLOQUES = [
  {
    t: "Qué datos pedimos",
    c: "Nombre, mail y teléfono cuando reservás una prueba de manejo. Nada más. No pedimos DNI ni datos patrimoniales por el sitio.",
  },
  {
    t: "Para qué los usamos",
    c: "Solamente para coordinar el turno y responder tu consulta. No los usamos para publicidad ni los cruzamos con otras bases.",
  },
  {
    t: "Con quién los compartimos",
    c: "Con nadie. No vendemos ni cedemos datos a terceros. Si pedís financiación, te avisamos antes de enviar tu legajo al banco.",
  },
  {
    t: "Cuánto los guardamos",
    c: "24 meses desde el último contacto. Después se eliminan de forma automática.",
  },
  {
    t: "Cómo los borrás",
    c: "Escribí a privacidad@vertice.com.ar y los eliminamos dentro de los 10 días hábiles, según la Ley 25.326 de Protección de Datos Personales.",
  },
];

export default function Privacidad() {
  return (
    <main className="bg-ink py-32 lg:py-40">
      <Container>
        <h1 className="display-tight text-bone text-4xl font-bold md:text-6xl">
          Política de privacidad
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
