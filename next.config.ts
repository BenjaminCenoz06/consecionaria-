import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    /* 75 es la calidad por defecto (tarjetas); 90 es la de la vitrina
       de modelos, donde el auto es el protagonista y se mira de cerca.
       Next 16 exige declarar cada calidad que se use. */
    qualities: [75, 90],
    /* AVIF primero: con transparencia pesa ~40% menos que WebP. */
    formats: ["image/avif", "image/webp"],
    /* Las fotos no cambian: un mes de caché evita re-optimizar. */
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
