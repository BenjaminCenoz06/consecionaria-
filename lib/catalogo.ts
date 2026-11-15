import { MODELOS } from "./modelos";
import { DESTACADOS } from "./destacados";
import type { Texto } from "./sitio";

/**
 * Catálogo de la tienda: cada auto con su precio, su ficha y su texto de
 * venta. Une las dos colecciones de fotos del sitio (`modelos.ts` y
 * `destacados.ts`) con la ficha comercial de abajo.
 *
 * ⚠️  DATOS DE REFERENCIA — REEMPLAZAR ANTES DE PUBLICAR.
 * Los precios (USD), los años y las cifras técnicas son valores de
 * ejemplo para que la tienda se vea completa. Los números técnicos son
 * los de fábrica de cada modelo en una versión típica; la versión exacta
 * de cada unidad puede diferir. Hay que cargar acá el precio y los datos
 * reales de cada unidad que se vende.
 */
const T = (es: string, en: string): Texto => ({ es, en });

type Ficha = {
  precio: number;
  anio: number;
  clase: Texto;
  combustible: string[];
  /** Segundos de 0 a 100 km/h. */
  aceleracion: number;
  kw: number;
  cv: number;
  vmax: number;
  /** Color de fondo de la sección de cifras: sale del color del auto. */
  tono: string;
  descripcion: Texto;
  rasgos: { titulo: Texto; texto: Texto }[];
};

const FICHAS: Record<string, Ficha> = {
  "ferrari-488-spider": {
    precio: 285000,
    anio: 2018,
    clase: T("Spider", "Spider"),
    combustible: ["Nafta"],
    aceleracion: 3.0,
    kw: 492,
    cv: 670,
    vmax: 325,
    tono: "#3a1f22",
    descripcion: T(
      "Dos plazas, techo rígido retráctil y un V8 biturbo central que sube de vueltas sin pausa. Es de los autos que se manejan con las ventanillas abajo para escucharlo.",
      "Two seats, a retractable hard top and a central twin-turbo V8 that revs without a pause. It's the kind of car you drive with the windows down just to hear it.",
    ),
    rasgos: [
      { titulo: T("V8 biturbo central", "Central twin-turbo V8"), texto: T("Respuesta inmediata y un sonido que se escucha a cuadras.", "Instant response and a sound you can hear from blocks away.") },
      { titulo: T("Techo retráctil", "Retractable roof"), texto: T("Cierra y abre en segundos, con el auto en marcha.", "Opens and closes in seconds, even on the move.") },
      { titulo: T("Chasis de aluminio", "Aluminium chassis"), texto: T("Liviano y rígido: se siente pegado al piso.", "Light and stiff: it feels glued to the road.") },
    ],
  },
  "bmw-i8": {
    precio: 98000,
    anio: 2017,
    clase: T("Coupé híbrido", "Hybrid coupé"),
    combustible: ["Híbrido", "Nafta"],
    aceleracion: 4.4,
    kw: 266,
    cv: 362,
    vmax: 250,
    tono: "#3a2a1c",
    descripcion: T(
      "Un híbrido enchufable que parece del futuro: puertas de ala, motor naftero de tres cilindros y un eléctrico que lo empuja desde cero.",
      "A plug-in hybrid that looks like it's from the future: gull-wing doors, a three-cylinder petrol engine and an electric motor that pushes it from standstill.",
    ),
    rasgos: [
      { titulo: T("Híbrido enchufable", "Plug-in hybrid"), texto: T("Podés moverte en eléctrico en la ciudad y usar el motor naftero en ruta.", "Go electric in town and use the petrol engine on the highway.") },
      { titulo: T("Puertas de ala", "Gull-wing doors"), texto: T("Se abren hacia arriba y se llevan todas las miradas.", "They open upward and turn every head.") },
      { titulo: T("Fibra de carbono", "Carbon fibre"), texto: T("Estructura liviana que ayuda al consumo y al manejo.", "A lightweight structure that helps both economy and handling.") },
    ],
  },
  "bentley-continental-gt": {
    precio: 119000,
    anio: 2013,
    clase: T("Gran turismo", "Grand tourer"),
    combustible: ["Nafta"],
    aceleracion: 4.5,
    kw: 423,
    cv: 575,
    vmax: 318,
    tono: "#2c3036",
    descripcion: T(
      "El gran turismo de los viajes largos: motor W12, tracción integral y una cabina de cuero y madera donde los kilómetros pasan sin que se note.",
      "The grand tourer for long journeys: a W12 engine, all-wheel drive and a leather-and-wood cabin where the miles pass unnoticed.",
    ),
    rasgos: [
      { titulo: T("Motor W12", "W12 engine"), texto: T("Potencia pareja desde muy abajo, con una suavidad poco común.", "Smooth power from very low revs, with unusual refinement.") },
      { titulo: T("Tracción integral", "All-wheel drive"), texto: T("Agarre y confianza con cualquier clima.", "Grip and confidence in any weather.") },
      { titulo: T("Interior artesanal", "Handcrafted interior"), texto: T("Cuero, madera y metal trabajados a mano.", "Leather, wood and metal worked by hand.") },
    ],
  },
  "lamborghini-miura": {
    precio: 1950000,
    anio: 1971,
    clase: T("Clásico", "Classic"),
    combustible: ["Nafta", "Clásico"],
    aceleracion: 6.7,
    kw: 276,
    cv: 375,
    vmax: 280,
    tono: "#3d2a18",
    descripcion: T(
      "Considerado el primer superdeportivo moderno: motor V12 central, líneas bajas y una silueta que cambió para siempre cómo se dibujan los autos.",
      "Widely regarded as the first modern supercar: a central V12, low lines and a silhouette that changed how cars are drawn forever.",
    ),
    rasgos: [
      { titulo: T("V12 central", "Central V12"), texto: T("Una disposición que en su época nadie se animaba a usar en un auto de calle.", "A layout nobody dared use on a road car at the time.") },
      { titulo: T("Pieza de colección", "Collector's piece"), texto: T("Restaurada, con documentación y trazabilidad.", "Restored, with paperwork and provenance.") },
      { titulo: T("Diseño de época", "Period design"), texto: T("Líneas que todavía hoy se estudian.", "Lines that are still studied today.") },
    ],
  },
  "mercedes-amg-s63-cabrio": {
    precio: 89000,
    anio: 2017,
    clase: T("Cabrio", "Cabriolet"),
    combustible: ["Nafta"],
    aceleracion: 3.9,
    kw: 430,
    cv: 585,
    vmax: 250,
    tono: "#2b3138",
    descripcion: T(
      "Cuatro plazas de verdad, techo de lona y un V8 biturbo de 585 CV. Lujo para viajar con la familia sin renunciar a la aceleración.",
      "Four real seats, a soft top and a 585 hp twin-turbo V8. Luxury for travelling as a family without giving up the acceleration.",
    ),
    rasgos: [
      { titulo: T("V8 biturbo AMG", "AMG twin-turbo V8"), texto: T("Potencia de sobra y un sonido inconfundible.", "Plenty of power and an unmistakable sound.") },
      { titulo: T("Cuatro plazas", "Four seats"), texto: T("Espacio real atrás, no de adorno.", "Real room in the back, not just for show.") },
      { titulo: T("Techo de lona", "Soft top"), texto: T("Silencioso cerrado y espectacular abierto.", "Quiet when closed and spectacular when open.") },
    ],
  },
  "porsche-356": {
    precio: 175000,
    anio: 1962,
    clase: T("Clásico", "Classic"),
    combustible: ["Nafta", "Clásico"],
    aceleracion: 13.0,
    kw: 55,
    cv: 75,
    vmax: 175,
    tono: "#3a2222",
    descripcion: T(
      "El primer Porsche de producción. Pequeño, liviano y mecánicamente simple: se maneja con las manos y los oídos, como se hacía antes.",
      "The first production Porsche. Small, light and mechanically simple: you drive it with your hands and your ears, the way it used to be done.",
    ),
    rasgos: [
      { titulo: T("Motor bóxer trasero", "Rear boxer engine"), texto: T("La arquitectura que definió a la marca.", "The layout that defined the brand.") },
      { titulo: T("Liviano y directo", "Light and direct"), texto: T("Una dirección que habla con el conductor.", "Steering that talks to the driver.") },
      { titulo: T("Historia rodante", "Rolling history"), texto: T("Un clásico que se puede usar todos los días.", "A classic you can actually use every day.") },
    ],
  },
  "tesla-model-s": {
    precio: 42000,
    anio: 2016,
    clase: T("Sedán eléctrico", "Electric saloon"),
    combustible: ["Eléctrico"],
    aceleracion: 3.3,
    kw: 515,
    cv: 700,
    vmax: 250,
    tono: "#1f2a3d",
    descripcion: T(
      "Un sedán grande, silencioso y brutalmente rápido, sin motor naftero y sin pasar por la estación de servicio. Se carga de noche en casa.",
      "A big, quiet and brutally fast saloon with no petrol engine and no trips to the filling station. You charge it overnight at home.",
    ),
    rasgos: [
      { titulo: T("100 % eléctrico", "100% electric"), texto: T("Cero emisiones al circular y torque inmediato.", "Zero tailpipe emissions and instant torque.") },
      { titulo: T("Pantalla central", "Central display"), texto: T("Casi todo se controla desde una sola pantalla.", "Almost everything is controlled from a single screen.") },
      { titulo: T("Espacio y baúl doble", "Space and two boots"), texto: T("Cinco plazas y lugar adelante y atrás para el equipaje.", "Five seats and luggage room front and back.") },
    ],
  },
  "audi-r8": {
    precio: 135000,
    anio: 2017,
    clase: T("Superdeportivo", "Supercar"),
    combustible: ["Nafta"],
    aceleracion: 3.2,
    kw: 449,
    cv: 610,
    vmax: 330,
    tono: "#2a3430",
    descripcion: T(
      "Un V10 atmosférico detrás de las dos plazas, tracción integral y una terminación de auto de todos los días. Un superdeportivo que no te deja a pie.",
      "A naturally aspirated V10 behind two seats, all-wheel drive and everyday-car build quality. A supercar that doesn't leave you stranded.",
    ),
    rasgos: [
      { titulo: T("V10 atmosférico", "Naturally aspirated V10"), texto: T("Sube de vueltas hasta el corte con un sonido de carrera.", "It revs to the limiter with a racing soundtrack.") },
      { titulo: T("Tracción quattro", "Quattro drive"), texto: T("Agarre en curva y en mojado.", "Grip in corners and in the wet.") },
      { titulo: T("Uso diario", "Daily usable"), texto: T("Cómodo, con buena visibilidad y baúl.", "Comfortable, with good visibility and a boot.") },
    ],
  },
  "jaguar-f-type": {
    precio: 62000,
    anio: 2016,
    clase: T("Coupé", "Coupé"),
    combustible: ["Nafta"],
    aceleracion: 4.9,
    kw: 280,
    cv: 380,
    vmax: 275,
    tono: "#2d2f34",
    descripcion: T(
      "Carácter británico en un coupé de dos plazas: líneas largas, un V6 sobrealimentado y un escape que se hace escuchar.",
      "British character in a two-seat coupé: long lines, a supercharged V6 and an exhaust that makes itself heard.",
    ),
    rasgos: [
      { titulo: T("V6 sobrealimentado", "Supercharged V6"), texto: T("Entrega de potencia lineal y contundente.", "Linear, punchy power delivery.") },
      { titulo: T("Escape activo", "Active exhaust"), texto: T("Más grave y más fuerte cuando lo pedís.", "Deeper and louder when you ask for it.") },
      { titulo: T("Diseño", "Design"), texto: T("Proporciones de deportivo clásico, hechas hoy.", "Classic sports-car proportions, built today.") },
    ],
  },
  "mazda-mx5": {
    precio: 21500,
    anio: 2015,
    clase: T("Roadster", "Roadster"),
    combustible: ["Nafta"],
    aceleracion: 7.3,
    kw: 118,
    cv: 160,
    vmax: 214,
    tono: "#3a2024",
    descripcion: T(
      "La receta más simple del placer de manejar: liviano, tracción trasera, techo que se abre a mano y una caja que da gusto usar.",
      "The simplest recipe for the joy of driving: light, rear-wheel drive, a roof you open by hand and a gearbox that's a pleasure to use.",
    ),
    rasgos: [
      { titulo: T("Tracción trasera", "Rear-wheel drive"), texto: T("Equilibrio y diversión a cualquier velocidad.", "Balance and fun at any speed.") },
      { titulo: T("Liviano", "Lightweight"), texto: T("Menos peso: más sensaciones y menos consumo.", "Less weight: more feel and lower consumption.") },
      { titulo: T("Techo manual", "Manual roof"), texto: T("Se abre y se cierra con una mano, parado en un semáforo.", "Opens and closes one-handed at a traffic light.") },
    ],
  },
  "nissan-370z": {
    precio: 28900,
    anio: 2016,
    clase: T("Coupé", "Coupé"),
    combustible: ["Nafta"],
    aceleracion: 5.3,
    kw: 245,
    cv: 333,
    vmax: 250,
    tono: "#2c2f36",
    descripcion: T(
      "Un deportivo de motor V6 atmosférico y tracción trasera, con respuesta directa y un precio que lo hace el más accesible de la selección.",
      "A sports car with a naturally aspirated V6 and rear-wheel drive, with direct response and a price that makes it the most accessible in the selection.",
    ),
    rasgos: [
      { titulo: T("V6 atmosférico", "Naturally aspirated V6"), texto: T("Respuesta lineal, sin turbos de por medio.", "Linear response, no turbos in between.") },
      { titulo: T("Tracción trasera", "Rear-wheel drive"), texto: T("Un deportivo de los de antes.", "An old-school sports car.") },
      { titulo: T("Precio accesible", "Accessible price"), texto: T("Mucho auto por el dinero.", "A lot of car for the money.") },
    ],
  },

  "vw-polo": {
    precio: 18500,
    anio: 2019,
    clase: T("Hatchback", "Hatchback"),
    combustible: ["Nafta"],
    aceleracion: 10.5,
    kw: 81,
    cv: 110,
    vmax: 190,
    tono: "#2a2d33",
    descripcion: T(
      "El hatchback para todos los días: ágil en la ciudad, cómodo en ruta y con la terminación de la marca. Un auto fácil de usar y de mantener.",
      "The everyday hatchback: nimble in town, comfortable on the road and with the brand's build quality. An easy car to use and maintain.",
    ),
    rasgos: [
      { titulo: T("Fácil de manejar", "Easy to drive"), texto: T("Tamaño ideal para ciudad y para estacionar sin vueltas.", "A size that's ideal for town and for easy parking.") },
      { titulo: T("Buena terminación", "Solid build"), texto: T("Interior cuidado y pantalla de infoentretenimiento.", "A neat interior and an infotainment screen.") },
      { titulo: T("Consumo razonable", "Reasonable economy"), texto: T("Un motor pensado para el uso diario.", "An engine designed for daily use.") },
    ],
  },
  "jeep-cj-renegade": {
    precio: 38000,
    anio: 1983,
    clase: T("Clásico 4x4", "Classic 4x4"),
    combustible: ["Nafta", "Clásico"],
    aceleracion: 14.0,
    kw: 82,
    cv: 112,
    vmax: 130,
    tono: "#3a2418",
    descripcion: T(
      "Un 4x4 clásico de los de verdad: carrocería abierta, tracción en las cuatro ruedas y una presencia que no pasa desapercibida. Ideal para caminos de sierra.",
      "A proper classic 4x4: an open body, four-wheel drive and a presence that doesn't go unnoticed. Ideal for mountain tracks.",
    ),
    rasgos: [
      { titulo: T("Tracción 4x4", "4x4 drive"), texto: T("Para salir del asfalto con confianza.", "To leave the tarmac with confidence.") },
      { titulo: T("Carrocería abierta", "Open body"), texto: T("Manejar al aire libre, como antes.", "Driving in the open air, like it used to be.") },
      { titulo: T("Pieza de colección", "Collector's piece"), texto: T("Un clásico con mucha demanda.", "A classic in high demand.") },
    ],
  },

  /* --- Selección de la semana --- */
  "mercedes-amg-gt-r": {
    precio: 168000,
    anio: 2018,
    clase: T("Coupé", "Coupé"),
    combustible: ["Nafta"],
    aceleracion: 3.6,
    kw: 430,
    cv: 585,
    vmax: 318,
    tono: "#26352b",
    descripcion: T(
      "El AMG pensado para la pista con patente de calle: V8 biturbo con motor delantero central, alerón activo y una dirección trasera que lo hace girar como un auto más chico.",
      "The AMG built for the track with a road licence plate: a twin-turbo V8 mounted behind the front axle, an active rear wing and rear-axle steering that makes it turn like a smaller car.",
    ),
    rasgos: [
      { titulo: T("V8 biturbo de 585 CV", "585 hp twin-turbo V8"), texto: T("Motor delantero central para un equilibrio de pista.", "Front-mid mounted for track-grade balance.") },
      { titulo: T("Aerodinámica activa", "Active aerodynamics"), texto: T("Alerón y fondo que se ajustan según la velocidad.", "Wing and underbody that adjust with speed.") },
      { titulo: T("Dirección trasera", "Rear-axle steering"), texto: T("Más ágil en curva y más estable en recta.", "More agile in corners and more stable on the straight.") },
    ],
  },
  "ferrari-812": {
    precio: 399000,
    anio: 2019,
    clase: T("Gran turismo", "Grand tourer"),
    combustible: ["Nafta"],
    aceleracion: 2.9,
    kw: 588,
    cv: 800,
    vmax: 340,
    tono: "#3a1f20",
    descripcion: T(
      "Un V12 atmosférico de 800 CV adelante y dos plazas atrás. Es el Ferrari de motor delantero más potente de su generación y suena como pocos autos en el mundo.",
      "An 800 hp naturally aspirated V12 up front and two seats behind. It's the most powerful front-engined Ferrari of its generation and sounds like few cars on earth.",
    ),
    rasgos: [
      { titulo: T("V12 atmosférico", "Naturally aspirated V12"), texto: T("800 CV y un régimen de giro altísimo.", "800 hp and a sky-high rev ceiling.") },
      { titulo: T("Dirección trasera", "Rear-wheel steering"), texto: T("Ágil como un auto mucho más corto.", "Agile like a much shorter car.") },
      { titulo: T("Gran turismo de verdad", "A real grand tourer"), texto: T("Se puede usar para viajar, no solo para exhibir.", "You can travel in it, not just show it off.") },
    ],
  },
  "lamborghini-huracan-tecnica": {
    precio: 265000,
    anio: 2023,
    clase: T("Superdeportivo", "Supercar"),
    combustible: ["Nafta"],
    aceleracion: 3.2,
    kw: 470,
    cv: 640,
    vmax: 325,
    tono: "#3d2b1a",
    descripcion: T(
      "V10 atmosférico de 640 CV, tracción trasera y aerodinámica de pista en un auto que se puede usar en la calle. El punto medio entre el Huracán y el STO.",
      "A 640 hp naturally aspirated V10, rear-wheel drive and track aerodynamics in a car you can use on the road. The midpoint between the Huracán and the STO.",
    ),
    rasgos: [
      { titulo: T("V10 de 640 CV", "640 hp V10"), texto: T("Atmosférico, con un sonido que no se parece a nada.", "Naturally aspirated, with a sound like nothing else.") },
      { titulo: T("Tracción trasera", "Rear-wheel drive"), texto: T("Puro y directo, para quien le gusta manejar.", "Pure and direct, for people who love to drive.") },
      { titulo: T("Aerodinámica nueva", "New aerodynamics"), texto: T("Más apoyo y mejor refrigeración que el Huracán base.", "More downforce and better cooling than the standard Huracán.") },
    ],
  },
  "audi-rs5": {
    precio: 78000,
    anio: 2019,
    clase: T("Coupé", "Coupé"),
    combustible: ["Nafta"],
    aceleracion: 3.9,
    kw: 331,
    cv: 450,
    vmax: 250,
    tono: "#1f2638",
    descripcion: T(
      "Un coupé deportivo para todos los días: V6 biturbo de 450 CV, tracción quattro y una cabina cómoda y tecnológica. Rápido sin hacerse notar de más.",
      "A sporty coupé for every day: a 450 hp twin-turbo V6, quattro drive and a comfortable, high-tech cabin. Fast without shouting about it.",
    ),
    rasgos: [
      { titulo: T("V6 biturbo", "Twin-turbo V6"), texto: T("450 CV con entrega pareja.", "450 hp with an even delivery.") },
      { titulo: T("Tracción quattro", "Quattro drive"), texto: T("Seguridad y tracción en cualquier clima.", "Safety and traction in any weather.") },
      { titulo: T("Cabina tecnológica", "High-tech cabin"), texto: T("Pantalla digital y buena terminación.", "Digital display and solid build quality.") },
    ],
  },
  "lexus-lfa": {
    precio: 950000,
    anio: 2012,
    clase: T("Superdeportivo", "Supercar"),
    combustible: ["Nafta"],
    aceleracion: 3.7,
    kw: 412,
    cv: 560,
    vmax: 325,
    tono: "#30333a",
    descripcion: T(
      "Solo se fabricaron 500. Un V10 de 4,8 litros que sube de vueltas casi al instante, carrocería de fibra de carbono y un escape afinado por una empresa de instrumentos musicales.",
      "Only 500 were built. A 4.8-litre V10 that revs almost instantly, a carbon-fibre body and an exhaust tuned with help from a musical-instrument company.",
    ),
    rasgos: [
      { titulo: T("500 unidades", "500 units"), texto: T("Una de las pocas producciones limitadas realmente escasas.", "One of the few truly scarce limited productions.") },
      { titulo: T("V10 de 4,8 litros", "4.8-litre V10"), texto: T("Gira tan rápido que el tablero es digital.", "It revs so fast the gauge had to be digital.") },
      { titulo: T("Fibra de carbono", "Carbon fibre"), texto: T("Carrocería y estructura livianas y rígidas.", "A light, stiff body and structure.") },
    ],
  },
};

export type Auto = {
  id: string;
  marca: string;
  nombre: string;
  foto: string;
  ancho: number;
  alto: number;
  alt: string;
  /** "perfil" o "frente": decide cómo se encuadra en la portada. */
  vista: "perfil" | "frente";
  lema?: string;
} & Ficha;

export const AUTOS: Auto[] = [
  ...MODELOS.map((m) => ({
    id: m.id,
    marca: m.marca,
    nombre: m.nombre,
    foto: m.foto,
    ancho: m.ancho,
    alto: m.alto,
    alt: m.alt,
    lema: m.lema,
    vista: "perfil" as const,
    ...FICHAS[m.id],
  })),
  ...DESTACADOS.map((d) => ({
    id: d.id,
    marca: d.marca,
    nombre: d.nombre,
    foto: d.foto,
    ancho: d.ancho,
    alto: d.alto,
    alt: d.alt,
    vista: "frente" as const,
    ...FICHAS[d.id],
  })),
].filter((a) => a.precio !== undefined);

export const autoPorId = (id: string) => AUTOS.find((a) => a.id === id);

/** Enlace que lleva directo a la sección de compra de la ficha de un auto. */
export const hrefCompra = (id: string) => `/modelos/${id}#comprar`;

/** "USD 233.300" en español, "USD 233,300" en inglés. */
export const formatoUSD = (valor: number, idioma: "es" | "en") =>
  `USD ${valor.toLocaleString(idioma === "en" ? "en-US" : "es-AR")}`;

/** Un decimal con coma en español y con punto en inglés. */
export const formatoDecimal = (valor: number, idioma: "es" | "en") =>
  valor.toLocaleString(idioma === "en" ? "en-US" : "es-AR", {
    minimumFractionDigits: Number.isInteger(valor) ? 0 : 1,
    maximumFractionDigits: 1,
  });

export const MARCAS = Array.from(new Set(AUTOS.map((a) => a.marca))).sort();
export const COMBUSTIBLES = ["Nafta", "Híbrido", "Eléctrico", "Clásico"] as const;
