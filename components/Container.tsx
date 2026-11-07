import type { ReactNode } from "react";

/** 1320px, el ancho medido en la referencia. Gutter de 24px. */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-6 ${className}`}>
      {children}
    </div>
  );
}
