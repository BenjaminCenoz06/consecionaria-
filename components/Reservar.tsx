"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import { VEHICULOS } from "@/lib/vehiculos";

type Clave = "nombre" | "email" | "telefono";
type Errores = Partial<Record<Clave, string>>;

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CAMPO =
  "mt-2 w-full border border-hairline bg-ink px-3 py-2 text-base text-bone placeholder:text-dim transition-colors duration-300 focus:border-brass";

function Campo({
  id,
  etiqueta,
  error,
  ...resto
}: {
  id: Clave;
  etiqueta: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="type-normal text-graphite block text-xs font-semibold uppercase"
      >
        {etiqueta}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `err-${id}` : undefined}
        className={CAMPO}
        {...resto}
      />
      {error && (
        <p id={`err-${id}`} className="text-brass mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Reservar() {
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"inicial" | "enviando" | "listo">("inicial");
  const [nombreEnviado, setNombreEnviado] = useState("");

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const email = String(datos.get("email") ?? "").trim();
    const telefono = String(datos.get("telefono") ?? "").trim();

    const nuevos: Errores = {};
    if (nombre.length < 2) nuevos.nombre = "Escribí tu nombre y apellido.";
    if (!EMAIL_VALIDO.test(email))
      nuevos.email = "Revisá el mail. Falta el arroba o el punto final.";
    if (telefono.replace(/\D/g, "").length < 8)
      nuevos.telefono = "Poné el teléfono con característica, sin 0 ni 15.";

    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEstado("enviando");
    // TODO: conectar con el CRM o una Server Action. Hoy sólo simula el envío.
    await new Promise((r) => setTimeout(r, 900));
    setNombreEnviado(nombre.split(" ")[0]);
    setEstado("listo");
  }

  return (
    <section id="reservar" className="bg-surface py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display-tight text-bone text-4xl font-bold md:text-6xl lg:text-7xl">
              Reservá tu
              <br />
              prueba
            </h2>
            <p className="text-graphite mt-8 max-w-[44ch] text-lg">
              40 minutos con la unidad, sin acompañamiento. Te confirmamos el
              turno el mismo día.
            </p>
            <ul className="text-graphite border-hairline mt-10 space-y-3 border-t pt-8 text-sm">
              <li>Sin costo y sin obligación de compra.</li>
              <li>Hace falta registro vigente y DNI.</li>
              <li>Se puede cancelar hasta 2 horas antes.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            {estado === "listo" ? (
              <div role="status" className="border-brass/40 flex h-full flex-col justify-center border p-10">
                <CheckCircle size={32} weight="light" className="text-brass" aria-hidden="true" />
                <p className="type-condensed text-bone mt-5 text-3xl font-bold uppercase">
                  Listo, {nombreEnviado}
                </p>
                <p className="text-graphite mt-3 max-w-[40ch] text-base">
                  Te llamamos dentro de las próximas 2 horas hábiles para cerrar
                  el día y el horario.
                </p>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="space-y-6">
                <Campo id="nombre" etiqueta="Nombre y apellido" type="text" autoComplete="name" placeholder="Marina Pelliza" error={errores.nombre} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Campo id="email" etiqueta="Mail" type="email" autoComplete="email" placeholder="marina@estudio.com.ar" error={errores.email} />
                  <Campo id="telefono" etiqueta="Teléfono" type="tel" autoComplete="tel" placeholder="11 4000 0000" error={errores.telefono} />
                </div>
                <div>
                  <label htmlFor="unidad" className="type-normal text-graphite block text-xs font-semibold uppercase">
                    Unidad que querés probar
                  </label>
                  <select id="unidad" name="unidad" defaultValue="" className={CAMPO}>
                    <option value="">Todavía no sé</option>
                    {VEHICULOS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.marca} {v.modelo} {v.version} · {v.anio}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="bg-bone text-ink type-normal w-full px-3 py-2 text-base font-semibold uppercase transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                >
                  {estado === "enviando" ? "Enviando…" : "Reservar prueba"}
                </button>
                <p className="text-dim text-sm">
                  Usamos tus datos sólo para coordinar el turno. Más en la{" "}
                  <a href="/privacidad" className="text-graphite underline">política de privacidad</a>.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
