export type Vehiculo = {
  id: string;
  marca: string;
  modelo: string;
  version: string;
  anio: number;
  km: number;
  precioUSD: number;
  transmision: "Manual" | "Automática";
  carroceria: "Sedán" | "SUV" | "Coupé" | "Pick-up";
  destacado: boolean;
  /** Ruta en /public. Si falta, la tarjeta usa el bloque tipográfico. */
  foto?: string;
};

/**
 * Stock de muestra. Reemplazar por la respuesta del CMS o del ERP.
 * Los precios van en dólares porque es la moneda de referencia del
 * mercado automotor argentino.
 */
export const VEHICULOS: Vehiculo[] = [
  {
    id: "mb-c200-2023",
    marca: "Mercedes-Benz",
    modelo: "C200",
    version: "AMG Line",
    anio: 2023,
    km: 19800,
    precioUSD: 62500,
    transmision: "Automática",
    carroceria: "Sedán",
    destacado: true,
  },
  {
    id: "porsche-macan-2020",
    marca: "Porsche",
    modelo: "Macan",
    version: "S 3.0 V6",
    anio: 2020,
    km: 68900,
    precioUSD: 78400,
    transmision: "Automática",
    carroceria: "SUV",
    destacado: true,
  },
  {
    id: "bmw-320i-2022",
    marca: "BMW",
    modelo: "320i",
    version: "M Sport",
    anio: 2022,
    km: 28400,
    precioUSD: 47900,
    transmision: "Automática",
    carroceria: "Sedán",
    destacado: true,
  },
  {
    id: "audi-q5-2021",
    marca: "Audi",
    modelo: "Q5",
    version: "45 TFSI quattro",
    anio: 2021,
    km: 51200,
    precioUSD: 54300,
    transmision: "Automática",
    carroceria: "SUV",
    destacado: true,
  },
  {
    id: "vw-amarok-2023",
    marca: "Volkswagen",
    modelo: "Amarok",
    version: "V6 Extreme",
    anio: 2023,
    km: 34100,
    precioUSD: 58700,
    transmision: "Automática",
    carroceria: "Pick-up",
    destacado: true,
  },
  {
    id: "volvo-xc60-2021",
    marca: "Volvo",
    modelo: "XC60",
    version: "T5 Inscription",
    anio: 2021,
    km: 39700,
    precioUSD: 49600,
    transmision: "Automática",
    carroceria: "SUV",
    destacado: false,
  },
  {
    id: "bmw-x3-2021",
    marca: "BMW",
    modelo: "X3",
    version: "xDrive30i",
    anio: 2021,
    km: 47300,
    precioUSD: 56800,
    transmision: "Automática",
    carroceria: "SUV",
    destacado: false,
  },
  {
    id: "audi-a3-2022",
    marca: "Audi",
    modelo: "A3",
    version: "Sportback 1.4 TFSI",
    anio: 2022,
    km: 23500,
    precioUSD: 42100,
    transmision: "Automática",
    carroceria: "Sedán",
    destacado: false,
  },
  {
    id: "toyota-hilux-2022",
    marca: "Toyota",
    modelo: "Hilux",
    version: "SRX 4x4",
    anio: 2022,
    km: 42600,
    precioUSD: 51200,
    transmision: "Automática",
    carroceria: "Pick-up",
    destacado: false,
  },
  {
    id: "bmw-m240-2021",
    marca: "BMW",
    modelo: "M240i",
    version: "xDrive Coupé",
    anio: 2021,
    km: 31900,
    precioUSD: 69300,
    transmision: "Automática",
    carroceria: "Coupé",
    destacado: false,
  },
];

export const CARROCERIAS = [
  "Todos",
  "Sedán",
  "SUV",
  "Coupé",
  "Pick-up",
] as const;

export const precio = (usd: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);

export const kilometros = (km: number) =>
  new Intl.NumberFormat("es-AR").format(km) + " km";
