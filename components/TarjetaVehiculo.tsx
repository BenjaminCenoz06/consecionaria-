import Image from "next/image";
import { kilometros, precio, type Vehiculo } from "@/lib/vehiculos";

export default function TarjetaVehiculo({
  vehiculo,
  prioridad = false,
}: {
  vehiculo: Vehiculo;
  prioridad?: boolean;
}) {
  const nombre = `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.version}`;

  return (
    <article className="group border-hairline bg-elevated hover:border-brass/40 flex h-full flex-col border transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="bg-ink relative aspect-[4/3] w-full overflow-hidden">
        {vehiculo.foto ? (
          <Image
            src={vehiculo.foto}
            alt={`${nombre}, año ${vehiculo.anio}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1320px) 50vw, 420px"
            priority={prioridad}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          /* Sin foto todavía: bloque tipográfico, no una imagen rota. */
          <div
            className="flex h-full w-full items-center justify-center p-6"
            aria-hidden="true"
          >
            <span className="type-condensed text-center text-5xl font-bold text-white/[0.07] uppercase lg:text-6xl">
              {vehiculo.modelo}
            </span>
          </div>
        )}
        <span className="type-normal text-bone absolute top-0 left-0 bg-black/70 px-2 py-1 text-xs font-semibold uppercase backdrop-blur-sm">
          {vehiculo.carroceria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="type-normal text-graphite text-xs font-semibold uppercase">
          {vehiculo.marca}
        </p>
        <h3 className="type-condensed text-bone mt-2 text-3xl font-bold uppercase">
          {vehiculo.modelo}
        </h3>
        <p className="text-graphite mt-1 text-sm">{vehiculo.version}</p>

        <dl className="text-graphite border-hairline mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t pt-4 text-sm">
          <div className="flex gap-1">
            <dt className="sr-only">Año</dt>
            <dd>{vehiculo.anio}</dd>
          </div>
          <span aria-hidden="true" className="text-dim">
            ·
          </span>
          <div className="flex gap-1">
            <dt className="sr-only">Kilometraje</dt>
            <dd>{kilometros(vehiculo.km)}</dd>
          </div>
          <span aria-hidden="true" className="text-dim">
            ·
          </span>
          <div className="flex gap-1">
            <dt className="sr-only">Transmisión</dt>
            <dd>{vehiculo.transmision}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between pt-6">
          <p className="type-condensed text-bone text-3xl font-bold">
            {precio(vehiculo.precioUSD)}
          </p>
          <a
            href="#reservar"
            className="type-normal text-brass text-xs font-semibold uppercase underline-offset-4 hover:underline"
          >
            Probarlo
            <span className="sr-only"> — {nombre}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
