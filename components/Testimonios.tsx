import Container from "./Container";
import Reveal from "./Reveal";

const TESTIMONIOS = [
  {
    cita: "Me dieron la llave y me fui solo hasta Pilar y volví. Era la primera vez en catorce años comprando autos que nadie me respiraba en la nuca.",
    nombre: "Marina Pelliza",
    detalle: "Compró un Q5 45 TFSI · Vicente López",
  },
  {
    cita: "Tasaron mi Golf en 24 horas y por escrito. Fui a comparar a otras tres concesionarias y volví porque fueron los únicos que no cambiaron el número a último momento.",
    nombre: "Hernán Dukelsky",
    detalle: "Permutó por un X3 xDrive30i · Núñez",
  },
  {
    cita: "El informe de los 180 puntos marcaba dos cosas a corregir y las habían corregido antes de la entrega. Me mostraron las facturas sin que las pidiera.",
    nombre: "Carolina Fresán",
    detalle: "Compró un C200 AMG Line · Martínez",
  },
];

export default function Testimonios() {
  return (
    <section className="bg-ink py-20 lg:py-24">
      <Container>
        <Reveal>
          <h2 className="display-tight text-bone max-w-[18ch] text-4xl font-bold md:text-6xl">
            Lo que dicen
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <Reveal
              as="li"
              key={t.nombre}
              delay={i * 0.08}
              className="border-hairline flex h-full flex-col border p-8"
            >
              <blockquote className="text-bone flex-1 text-lg">
                {t.cita}
              </blockquote>
              <footer className="border-hairline mt-8 border-t pt-5">
                <p className="type-condensed text-bone text-xl font-bold uppercase">
                  {t.nombre}
                </p>
                <p className="text-graphite mt-1 text-sm">{t.detalle}</p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
