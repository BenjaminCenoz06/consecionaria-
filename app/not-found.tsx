import Container from "@/components/Container";
import CtaTexto from "@/components/Flecha";

export const metadata = { title: "Página no encontrada" };

export default function NoEncontrada() {
  return (
    <main className="bg-ink flex min-h-svh flex-col justify-center">
      <Container>
        <p className="type-normal text-rojo text-xs font-semibold uppercase">
          Error 404
        </p>
        <h1 className="display-tight text-bone mt-4 text-5xl font-bold sm:text-7xl lg:text-8xl">
          Esta página
          <br />
          no existe
        </h1>
        <p className="text-graphite mt-8 max-w-[52ch] text-lg">
          Puede que la unidad que buscabas ya se haya vendido. El stock rota
          cada semana.
        </p>
        <div className="mt-10 flex flex-wrap gap-8">
          <CtaTexto href="/">Volver al inicio</CtaTexto>
          <CtaTexto href="/#modelos">Ver los modelos</CtaTexto>
        </div>
      </Container>
    </main>
  );
}
