"use client";

import { useEffect } from "react";

/**
 * Cambio de tema por scroll, negro ↔ blanco.
 *
 * Mecanismo tomado de la referencia: ninguna sección pinta su propio
 * fondo. El `<body>` lleva un `data-tema` y es el que cambia, con una
 * transición de 1.2s; el fondo y TODOS los textos (que leen las mismas
 * variables) se mueven a la vez y con la misma curva, así que la página
 * entera se oscurece o se aclara como una sola superficie, no a saltos
 * entre bloques.
 *
 * Las secciones claras se marcan con `data-zona="claro"`. Se observa
 * cuándo cruzan una línea imaginaria al 40% de la pantalla (no el borde
 * de la pantalla: el cambio ocurre cuando la sección ya se está
 * leyendo, no cuando recién asoma). `IntersectionObserver`, nunca un
 * listener de scroll.
 *
 * En la carga inicial se aplica SIN transición: si el visitante vuelve
 * a una página recargada a mitad de recorrido, no tiene que ver cómo
 * clarea desde el negro.
 */
export default function TemaScroll() {
  useEffect(() => {
    const zonas = Array.from(
      document.querySelectorAll<HTMLElement>('[data-zona="claro"]'),
    );
    if (zonas.length === 0) return;

    const cuerpo = document.body;
    const linea = () => window.innerHeight * 0.4;

    const aplicar = (claro: boolean) => {
      const tema = claro ? "claro" : "oscuro";
      if (cuerpo.dataset.tema !== tema) cuerpo.dataset.tema = tema;
    };

    /* Primera pasada, sin animar. */
    const previa = cuerpo.style.transition;
    cuerpo.style.transition = "none";
    aplicar(
      zonas.some((z) => {
        const r = z.getBoundingClientRect();
        return r.top <= linea() && r.bottom >= linea();
      }),
    );
    void cuerpo.offsetHeight; // fuerza el estilo antes de reactivar
    cuerpo.style.transition = previa;

    const dentro = new Set<Element>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) dentro.add(e.target);
          else dentro.delete(e.target);
        }
        aplicar(dentro.size > 0);
      },
      /* Una franja de 1px al 40% desde arriba. */
      { rootMargin: "-40% 0px -59.9% 0px", threshold: 0 },
    );
    zonas.forEach((z) => observador.observe(z));

    return () => observador.disconnect();
  }, []);

  return null;
}
