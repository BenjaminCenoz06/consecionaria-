import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TemaScroll from "./TemaScroll";

/**
 * Esqueleto de toda página interior: barra, contenido y el footer en
 * cortina. El `<main>` lleva `relative z-10` y fondo sólido para tapar al
 * footer (ver `Footer.tsx`), igual que la home.
 */
export default function PaginaBase({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido" className="bg-lienzo relative z-10 flex-1">
        <TemaScroll />
        {children}
      </main>
      <Footer />
    </>
  );
}
