import type { ReactNode } from "react";

/**
 * Franja que se vuelve blanca. `TemaScroll` la detecta por el atributo
 * `data-zona="claro"` y cambia el tema de toda la página mientras cruza
 * la pantalla.
 *
 * En vez de un corte seco contra lo oscuro, entra y sale con un degradado
 * de varias paradas (curva suave, no lineal) y un halo latón apenas
 * visible. Sobre el fondo negro, antes del cambio de tema, es invisible.
 */
const ENTRADA =
  "radial-gradient(ellipse 55% 90% at 50% 0%, rgba(216,31,38,0.2), transparent 70%), linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.88) 16%, rgba(0,0,0,0.66) 38%, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.14) 82%, rgba(0,0,0,0) 100%)";

const SALIDA =
  "radial-gradient(ellipse 55% 90% at 50% 100%, rgba(216,31,38,0.2), transparent 70%), linear-gradient(to top, #000 0%, rgba(0,0,0,0.88) 16%, rgba(0,0,0,0.66) 38%, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.14) 82%, rgba(0,0,0,0) 100%)";

export default function ZonaClara({ children }: { children: ReactNode }) {
  return (
    <div data-zona="claro">
      <div
        aria-hidden="true"
        className="h-36 lg:h-52"
        style={{ backgroundImage: ENTRADA }}
      />
      {children}
      <div
        aria-hidden="true"
        className="h-36 lg:h-52"
        style={{ backgroundImage: SALIDA }}
      />
    </div>
  );
}
