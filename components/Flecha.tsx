import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/**
 * El CTA de la referencia no es un botón: es texto con una flecha.
 * Fondo transparente, sin borde, sin radio. Confía en la jerarquía.
 */
export default function CtaTexto({
  children,
  href,
  tono = "claro",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  tono?: "claro" | "oscuro";
  className?: string;
}) {
  const color = tono === "claro" ? "text-bone" : "text-near";
  const linea = tono === "claro" ? "bg-bone" : "bg-near";

  return (
    <a
      href={href}
      className={`group type-normal inline-flex items-center gap-2 py-2 text-sm font-semibold uppercase ${color} ${className}`}
    >
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${linea}`}
        />
      </span>
      <ArrowRight
        size={16}
        weight="bold"
        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      />
    </a>
  );
}
