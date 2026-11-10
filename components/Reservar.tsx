"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import Container from "./Container";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import Plano3D from "./Plano3D";
import { AUTOS } from "@/lib/catalogo";
import { WHATSAPP } from "@/lib/sitio";
import { useIdioma } from "@/lib/idioma";

type Clave = "nombre" | "email" | "telefono";
type Errores = Partial<Record<Clave, string>>;

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CAMPO =
  "mt-2 w-full border border-hairline bg-elevated px-3 py-2 text-base text-bone placeholder:text-dim transition-colors duration-300 focus:border-rojo";

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
  const { t } = useIdioma();

  return (
    <div>
      <label
        htmlFor={id}
        className="type-normal text-graphite block text-xs font-semibold uppercase"
      >
        {t(etiqueta)}
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
        <p id={`err-${id}`} className="text-rojo mt-2 text-sm">
          {t(error)}
        </p>
      )}
    </div>
  );
}

export default function Reservar() {
  const { t } = useIdioma();
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"inicial" | "enviando" | "listo">("inicial");
  const [nombreEnviado, setNombreEnviado] = useState("");
  const [urlWa, setUrlWa] = useState("");

  function enviar(evento: FormEvent<HTMLFormElement>) {
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

    /* Sin servidor ni CRM: la consulta sale por donde ya atiende el
       local, WhatsApp, con los datos del formulario escritos en el
       mensaje. Se abre solo y, si el navegador bloquea la ventana, el
       botón de la confirmación hace lo mismo. */
    const unidad = AUTOS.find((a) => a.id === String(datos.get("unidad") ?? ""));
    const mensaje =
      `Hola, soy ${nombre}. Quiero reservar una visita` +
      (unidad ? ` para ver el ${unidad.marca} ${unidad.nombre}` : "") +
      `. Mi teléfono es ${telefono} y mi mail ${email}.`;
    const url = `${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    setUrlWa(url);
    setNombreEnviado(nombre.split(" ")[0]);
    setEstado("listo");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="reservar" className="bg-ink py-8 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="display-tight text-bone text-4xl font-bold md:text-6xl lg:text-7xl">
              {t("Reservá tu")}
              <br />
              {t("prueba")}
            </h2>
            <p className="text-graphite mt-8 max-w-[44ch] text-lg">
              {t(
                "Dejanos tus datos y coordinamos tu visita para ver y probar el auto. Te respondemos por WhatsApp.",
              )}
            </p>
            <ul className="text-graphite border-hairline mt-10 space-y-3 border-t pt-8 text-sm">
              <li>{t("Sin costo y sin obligación de compra.")}</li>
              <li>{t("Para probar un auto hace falta el registro de conducir vigente.")}</li>
              <li>{t("Estamos en La Cumbre, Córdoba.")}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <Plano3D inclinacion={8}>
            {/* Panel flotante: el formulario se apoya sobre el negro con
                un borde de luz arriba y sombra profunda abajo. Giro
                mínimo (3°): es un formulario, tiene que quedarse quieto
                para poder escribir. */}
            <Tilt3D grados={3} escala={1.005} brillo={false} className="rounded-sm">
            <div
              className="bg-surface border-hairline rounded-sm border p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_30px_60px_-24px_rgb(0_0_0/0.9)] md:p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
            {estado === "listo" ? (
              <div role="status" className="flex h-full flex-col justify-center">
                <CheckCircle size={32} weight="light" className="text-rojo" aria-hidden="true" />
                <p className="type-condensed text-bone mt-5 text-3xl font-bold uppercase">
                  {t("Listo,")} {nombreEnviado}
                </p>
                <p className="text-graphite mt-3 max-w-[40ch] text-base">
                  {t(
                    "Abrimos WhatsApp con tus datos para coordinar el día y el horario de tu visita.",
                  )}
                </p>
                <a
                  href={urlWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rojo type-normal destello mt-6 inline-flex w-fit px-5 py-3 text-sm font-semibold text-white uppercase transition-transform duration-300 hover:scale-[1.03]"
                >
                  {t("Abrir WhatsApp")}
                </a>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="space-y-6">
                <Campo id="nombre" etiqueta="Nombre y apellido" type="text" autoComplete="name" placeholder="Nombre y apellido" error={errores.nombre} />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Campo id="email" etiqueta="Mail" type="email" autoComplete="email" placeholder="nombre@correo.com" error={errores.email} />
                  <Campo id="telefono" etiqueta="Teléfono" type="tel" autoComplete="tel" placeholder="3548 40-0000" error={errores.telefono} />
                </div>
                <div>
                  <label htmlFor="unidad" className="type-normal text-graphite block text-xs font-semibold uppercase">
                    {t("Unidad que querés probar")}
                  </label>
                  <select id="unidad" name="unidad" defaultValue="" className={CAMPO}>
                    <option value="">{t("Todavía no sé")}</option>
                    {AUTOS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.marca} {a.nombre} · {a.anio}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-rojo type-normal destello w-full px-3 py-3 text-base font-semibold text-white uppercase transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98]"
                >
                  {t("Reservar prueba")}
                </button>
                <p className="text-dim text-sm">
                  {t("Usamos tus datos sólo para coordinar el turno. Más en la ")}
                  <a href="/privacidad" className="text-graphite underline">{t("política de privacidad")}</a>.
                </p>
              </form>
            )}
            </div>
            </Tilt3D>
            </Plano3D>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
