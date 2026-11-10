/**
 * Mapa del sitio: el menú y todas las páginas salen de acá.
 *
 * Sigue la estructura del menú de la referencia (Modelos, Eléctricos e
 * híbridos, Asesoramiento y compra, Servicios, Experiencia, Concesionario).
 * Cada texto lleva su par {es, en}: se lee con `l()` de `useIdioma()`.
 *
 * Los datos duros (12 meses de garantía, 180 puntos, 48 cuotas, horarios…)
 * son los que ya publica la home. El resto del texto es editorial y está
 * pensado para que lo revise quien conoce el negocio.
 */
export type Texto = { es: string; en: string };

const T = (es: string, en: string): Texto => ({ es, en });

export const WHATSAPP = "https://wa.me/5491150000000";
export const MAPA =
  "https://www.google.com/maps/search/?api=1&query=Av.+del+Libertador+4874%2C+N%C3%BA%C3%B1ez%2C+Buenos+Aires";

/* ------------------------------------------------------------------ */
/* Categorías del menú                                                 */
/* ------------------------------------------------------------------ */

export type Categoria = {
  id: string;
  etiqueta: Texto;
  href: string;
  bajada: Texto;
  /** Auto (id de `lib/modelos.ts`) que ilustra la portada. */
  auto: string;
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "modelos",
    etiqueta: T("Modelos", "Models"),
    href: "/modelos",
    bajada: T(
      "Cada auto que ves acá pasó 180 puntos de control. Elegí uno y conocelo en detalle.",
      "Every car you see here passed 180 checkpoints. Pick one and get to know it.",
    ),
    auto: "ferrari-488-spider",
  },
  {
    id: "electricos-hibridos",
    etiqueta: T("Eléctricos e híbridos", "Electric & hybrid"),
    href: "/electricos-hibridos",
    bajada: T(
      "Modelos eléctricos e híbridos, con la información que necesitás para dar el salto.",
      "Electric and hybrid cars, with the information you need to make the switch.",
    ),
    auto: "tesla-model-s",
  },
  {
    id: "compra",
    etiqueta: T("Asesoramiento y compra", "Advice & buying"),
    href: "/compra",
    bajada: T(
      "Todo lo que hace falta para comprar tranquilo: precio cerrado, financiación, permuta y garantía.",
      "Everything you need to buy with peace of mind: fixed price, financing, trade-in and warranty.",
    ),
    auto: "bentley-continental-gt",
  },
  {
    id: "servicios",
    etiqueta: T("Servicios", "Services"),
    href: "/servicios",
    bajada: T(
      "Del control previo a la entrega, nos ocupamos de lo que viene después de elegir.",
      "From the pre-delivery inspection to the paperwork, we take care of what comes after you choose.",
    ),
    auto: "audi-r8",
  },
  {
    id: "experiencia",
    etiqueta: T("Experiencia", "Experience"),
    href: "/experiencia",
    bajada: T(
      "Los autos se manejan antes de comprarse. Conocé cómo lo hacemos y quiénes somos.",
      "Cars are driven before they are bought. See how we do it and who we are.",
    ),
    auto: "porsche-356",
  },
  {
    id: "concesionario",
    etiqueta: T("Concesionario", "Dealership"),
    href: "/concesionario",
    bajada: T(
      "Visitanos en Núñez, Buenos Aires.",
      "Come and see us in Núñez, Buenos Aires.",
    ),
    auto: "mercedes-amg-s63-cabrio",
  },
];

/* ------------------------------------------------------------------ */
/* Modelos: combustible                                                */
/* ------------------------------------------------------------------ */

/** Etiquetas de cada modelo. Son las mismas palabras que usa la home. */
export const COMBUSTIBLE: Record<string, string[]> = {
  "ferrari-488-spider": ["Nafta"],
  "bmw-i8": ["Híbrido", "Nafta"],
  "bentley-continental-gt": ["Nafta"],
  "lamborghini-miura": ["Nafta", "Clásico"],
  "mercedes-amg-s63-cabrio": ["Nafta"],
  "porsche-356": ["Nafta", "Clásico"],
  "tesla-model-s": ["Eléctrico"],
  "audi-r8": ["Nafta"],
  "jaguar-f-type": ["Nafta"],
  "mazda-mx5": ["Nafta"],
  "nissan-370z": ["Nafta"],
};

/* ------------------------------------------------------------------ */
/* Páginas de contenido                                                */
/* ------------------------------------------------------------------ */

export type Bloque = { titulo: Texto; texto: Texto };
export type Dato = { valor: Texto; rotulo: Texto };

export type Pagina = {
  /** "compra/financiacion" o, suelta, "concesionario". */
  slug: string;
  /** Id de categoría: decide dónde aparece en el índice y las migas. */
  categoria: string;
  /** Texto del menú y de las tarjetas. */
  nombre: Texto;
  titulo: Texto;
  bajada: Texto;
  auto: string;
  /** Foto a sangre en vez del auto recortado. */
  fondo?: string;
  datos?: Dato[];
  bloques: Bloque[];
  cta: { texto: Texto; href: string; externo?: boolean };
};

export const PAGINAS: Pagina[] = [
  /* --- Asesoramiento y compra --- */
  {
    slug: "compra/como-comprar",
    categoria: "compra",
    nombre: T("Cómo comprar", "How to buy"),
    titulo: T("Cómo comprar", "How to buy"),
    bajada: T(
      "Del primer vistazo a las llaves en 48 horas. Sin presión, sin letra chica y con el precio cerrado desde el principio.",
      "From the first look to the keys in 48 hours. No pressure, no fine print, and a fixed price from the start.",
    ),
    auto: "bentley-continental-gt",
    datos: [
      { valor: T("180", "180"), rotulo: T("puntos de control", "checkpoints") },
      { valor: T("12", "12"), rotulo: T("meses de garantía", "months of warranty") },
      { valor: T("48 h", "48 h"), rotulo: T("hasta la entrega", "until delivery") },
    ],
    bloques: [
      {
        titulo: T("Elegí con toda la información", "Choose with all the information"),
        texto: T(
          "Cada unidad está publicada con el informe de 180 puntos y el historial de service. Ves el precio sin dejar tus datos.",
          "Every car is listed with its 180-point report and service history. You see the price without leaving your details.",
        ),
      },
      {
        titulo: T("Probala sin acompañante", "Test it unaccompanied"),
        texto: T(
          "Reservá 40 minutos con la unidad y hacé el recorrido que quieras. Nadie va al lado diciéndote lo bien que anda.",
          "Book 40 minutes with the car and drive whatever route you like. Nobody rides along telling you how well it runs.",
        ),
      },
      {
        titulo: T("Cerrá con el precio publicado", "Close at the listed price"),
        texto: T(
          "Incluye transferencia, verificación policial, informe de dominio y gestoría. Lo único que se suma es el patentamiento en un 0 km.",
          "It includes the transfer, police verification, title report and paperwork. The only extra is registration on a brand-new car.",
        ),
      },
      {
        titulo: T("Llevátela en 48 horas", "Drive it home in 48 hours"),
        texto: T(
          "Nos ocupamos de los trámites. Si no era lo que esperabas, tenés 7 días o 300 kilómetros para devolverla.",
          "We handle the paperwork. If it isn't what you expected, you have 7 days or 300 kilometres to return it.",
        ),
      },
    ],
    cta: { texto: T("Reservar una prueba", "Book a test drive"), href: "/#reservar" },
  },
  {
    slug: "compra/financiacion",
    categoria: "compra",
    nombre: T("Financiación", "Financing"),
    titulo: T("Financiación", "Financing"),
    bajada: T(
      "Prendarios con los principales bancos, preaprobación gestionada por nosotros y el plazo que mejor te quede.",
      "Secured loans with the main banks, pre-approval handled by us, and the term that suits you best.",
    ),
    auto: "jaguar-f-type",
    datos: [
      { valor: T("48", "48"), rotulo: T("cuotas como máximo", "instalments at most") },
      { valor: T("50 %", "50%"), rotulo: T("del valor del auto", "of the car's value") },
      { valor: T("48–72 h", "48–72 h"), rotulo: T("de preaprobación", "for pre-approval") },
    ],
    bloques: [
      {
        titulo: T("Bancos aliados", "Partner banks"),
        texto: T(
          "Trabajamos con Banco Galicia, Santander y Macro, con créditos prendarios hasta 48 cuotas.",
          "We work with Banco Galicia, Santander and Macro, with secured loans of up to 48 instalments.",
        ),
      },
      {
        titulo: T("Preaprobación sin vueltas", "Hassle-free pre-approval"),
        texto: T(
          "La gestionamos nosotros y tarda entre 48 y 72 horas. Vos solo elegís el auto.",
          "We handle it and it takes 48 to 72 hours. All you do is choose the car.",
        ),
      },
      {
        titulo: T("Combinala con tu permuta", "Combine it with your trade-in"),
        texto: T(
          "Podés entregar tu auto como parte de pago y financiar la diferencia, hasta el 50 % del valor.",
          "You can hand in your car as part payment and finance the difference, up to 50% of the value.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },
  {
    slug: "compra/permuta",
    categoria: "compra",
    nombre: T("Permuta", "Trade-in"),
    titulo: T("Permuta", "Trade-in"),
    bajada: T(
      "Traé tu auto, lo tasamos en el día y te damos la oferta por escrito. Sin obligación de comprar.",
      "Bring your car, we appraise it the same day and give you a written offer. No obligation to buy.",
    ),
    auto: "audi-r8",
    datos: [
      { valor: T("1 día", "1 day"), rotulo: T("para la tasación", "for the appraisal") },
      { valor: T("7 días", "7 days"), rotulo: T("de validez de la oferta", "offer validity") },
      { valor: T("0", "0"), rotulo: T("obligación de compra", "obligation to buy") },
    ],
    bloques: [
      {
        titulo: T("Traé tu auto al showroom", "Bring your car to the showroom"),
        texto: T(
          "Lo revisamos y lo tasamos en el día, con el auto adelante.",
          "We inspect and appraise it the same day, with the car right in front of us.",
        ),
      },
      {
        titulo: T("Oferta por escrito", "Written offer"),
        texto: T(
          "Te damos la oferta por escrito, con 7 días de validez para que decidas sin apuro.",
          "We give you the offer in writing, valid for 7 days so you can decide without rushing.",
        ),
      },
      {
        titulo: T("Sin compromiso", "No strings attached"),
        texto: T(
          "No estás obligado a comprar acá para recibir la tasación.",
          "You don't have to buy from us to get the appraisal.",
        ),
      },
    ],
    cta: { texto: T("Cómo llegar", "Get directions"), href: "/concesionario" },
  },
  {
    slug: "compra/garantia",
    categoria: "compra",
    nombre: T("Garantía", "Warranty"),
    titulo: T("Garantía de 12 meses", "12-month warranty"),
    bajada: T(
      "Por escrito, sin límite de kilómetros en lo que más importa y válida en cualquier taller de la red.",
      "In writing, with no mileage limit on what matters most and valid at any workshop in the network.",
    ),
    auto: "mercedes-amg-s63-cabrio",
    datos: [
      { valor: T("12", "12"), rotulo: T("meses", "months") },
      { valor: T("Sin límite", "No limit"), rotulo: T("de kilómetros", "on mileage") },
      { valor: T("7 días", "7 days"), rotulo: T("para devolverla", "to return it") },
    ],
    bloques: [
      {
        titulo: T("Qué cubre", "What it covers"),
        texto: T(
          "Motor, caja y diferencial, sin límite de kilómetros.",
          "Engine, gearbox and differential, with no mileage limit.",
        ),
      },
      {
        titulo: T("Por escrito", "In writing"),
        texto: T(
          "Se entrega el día de la transferencia, firmada, para que la tengas siempre a mano.",
          "It is handed over on the day of the transfer, signed, so you always have it on hand.",
        ),
      },
      {
        titulo: T("En cualquier taller de la red", "At any workshop in the network"),
        texto: T(
          "Es válida en cualquier taller de la red, no solo en el nuestro.",
          "It is valid at any workshop in the network, not just ours.",
        ),
      },
      {
        titulo: T("Y si no era lo que esperabas", "And if it wasn't what you expected"),
        texto: T(
          "Tenés 7 días corridos o 300 kilómetros, lo que ocurra primero, para devolverlo.",
          "You have 7 calendar days or 300 kilometres, whichever comes first, to return it.",
        ),
      },
    ],
    cta: { texto: T("Reservar una prueba", "Book a test drive"), href: "/#reservar" },
  },

  /* --- Servicios --- */
  {
    slug: "servicios/mantenimiento",
    categoria: "servicios",
    nombre: T("Mantenimiento y service", "Maintenance & service"),
    titulo: T("Mantenimiento y service", "Maintenance & service"),
    bajada: T(
      "Mantené tu auto como el primer día, con el historial siempre al día.",
      "Keep your car as good as the first day, with its history always up to date.",
    ),
    auto: "nissan-370z",
    bloques: [
      {
        titulo: T("Service programado", "Scheduled service"),
        texto: T(
          "Coordinamos el service en talleres de la red, con registro en el historial de cada unidad.",
          "We arrange the service at workshops in the network, recorded in each car's history.",
        ),
      },
      {
        titulo: T("Revisión antes de comprar", "Check before you buy"),
        texto: T(
          "Podés llevar la unidad a tu mecánico dentro de AMBA antes de decidir. Solo pedimos DNI y constancia de seguro.",
          "You can take the car to your mechanic within Greater Buenos Aires before deciding. We only ask for ID and proof of insurance.",
        ),
      },
      {
        titulo: T("Historial a la vista", "History in plain sight"),
        texto: T(
          "Cada unidad se entrega con el historial de service adjunto.",
          "Every car is delivered with its service history attached.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },
  {
    slug: "servicios/peritaje-180-puntos",
    categoria: "servicios",
    nombre: T("Peritaje de 180 puntos", "180-point inspection"),
    titulo: T("Peritaje de 180 puntos", "180-point inspection"),
    bajada: T(
      "Si un solo punto falla, el auto no entra al showroom. Así de simple.",
      "If a single checkpoint fails, the car doesn't make it to the showroom. It's that simple.",
    ),
    auto: "ferrari-488-spider",
    datos: [
      { valor: T("180", "180"), rotulo: T("puntos de control", "checkpoints") },
      { valor: T("1 de 9", "1 in 9"), rotulo: T("unidades seleccionadas", "cars selected") },
    ],
    bloques: [
      {
        titulo: T("Un control, 180 puntos", "One inspection, 180 checkpoints"),
        texto: T(
          "Cada unidad pasa 180 puntos de control. Si uno solo falla, no entra al showroom.",
          "Every car goes through 180 checkpoints. If even one fails, it doesn't make it to the showroom.",
        ),
      },
      {
        titulo: T("Informe abierto", "Open report"),
        texto: T(
          "El informe se publica junto a la unidad, para que lo leas antes de ir.",
          "The report is published alongside the car so you can read it before visiting.",
        ),
      },
      {
        titulo: T("Selección exigente", "A demanding selection"),
        texto: T(
          "Seleccionamos 1 de cada 9 unidades que evaluamos.",
          "We select 1 out of every 9 cars we evaluate.",
        ),
      },
    ],
    cta: { texto: T("Ver los modelos", "See the models"), href: "/modelos" },
  },
  {
    slug: "servicios/gestoria",
    categoria: "servicios",
    nombre: T("Gestoría y transferencia", "Paperwork & transfer"),
    titulo: T("Gestoría y transferencia", "Paperwork & transfer"),
    bajada: T(
      "Los trámites los hacemos nosotros, y el precio publicado ya los incluye.",
      "We take care of the paperwork, and the listed price already includes it.",
    ),
    auto: "lamborghini-miura",
    datos: [{ valor: T("Incluido", "Included"), rotulo: T("en el precio publicado", "in the listed price") }],
    bloques: [
      {
        titulo: T("Transferencia", "Transfer"),
        texto: T(
          "Hacemos la transferencia de dominio completa.",
          "We handle the full title transfer.",
        ),
      },
      {
        titulo: T("Verificación policial e informe de dominio", "Police verification and title report"),
        texto: T(
          "Están incluidos en el precio, junto con la gestoría.",
          "They are included in the price, along with the paperwork.",
        ),
      },
      {
        titulo: T("Patentamiento en 0 km", "Registration on new cars"),
        texto: T(
          "Es lo único que se suma al precio publicado, y solo si la unidad es 0 km.",
          "It is the only extra on top of the listed price, and only if the car is brand new.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },
  {
    slug: "servicios/envios",
    categoria: "servicios",
    nombre: T("Envíos al interior", "Shipping nationwide"),
    titulo: T("Envíos al interior", "Shipping nationwide"),
    bajada: T(
      "Te llevamos el auto a donde estés, en camión cerrado y con seguro.",
      "We bring the car to wherever you are, in an enclosed truck with insurance.",
    ),
    auto: "mazda-mx5",
    bloques: [
      {
        titulo: T("Camión cerrado y seguro", "Enclosed truck and insurance"),
        texto: T(
          "La unidad viaja protegida y asegurada de punta a punta.",
          "The car travels protected and insured all the way.",
        ),
      },
      {
        titulo: T("Todo el país", "Anywhere in the country"),
        texto: T(
          "El costo depende del destino y se cotiza aparte.",
          "The cost depends on the destination and is quoted separately.",
        ),
      },
      {
        titulo: T("Envío bonificado", "Free shipping"),
        texto: T(
          "A Córdoba, Rosario y Mendoza el envío está bonificado.",
          "Shipping to Córdoba, Rosario and Mendoza is free.",
        ),
      },
    ],
    cta: { texto: T("Cotizar un envío", "Get a shipping quote"), href: WHATSAPP, externo: true },
  },

  /* --- Experiencia --- */
  {
    slug: "experiencia/prueba-de-manejo",
    categoria: "experiencia",
    nombre: T("Prueba de manejo", "Test drive"),
    titulo: T("Prueba de manejo", "Test drive"),
    bajada: T(
      "40 minutos con la unidad, sin vendedor al lado. Los autos se manejan antes de comprarse.",
      "40 minutes with the car, with no salesperson beside you. Cars are driven before they are bought.",
    ),
    auto: "porsche-356",
    datos: [
      { valor: T("40 min", "40 min"), rotulo: T("con la unidad", "with the car") },
      { valor: T("Sin costo", "Free"), rotulo: T("ni obligación de compra", "and no obligation to buy") },
      { valor: T("2 h", "2 h"), rotulo: T("para cancelar", "to cancel") },
    ],
    bloques: [
      {
        titulo: T("Reservá tu turno", "Book your slot"),
        texto: T(
          "Completá el formulario y te confirmamos el turno el mismo día.",
          "Fill in the form and we'll confirm your slot the same day.",
        ),
      },
      {
        titulo: T("Qué necesitás", "What you need"),
        texto: T(
          "Registro vigente y DNI. Preparamos la unidad y la documentación con anticipación.",
          "A valid driving licence and ID. We prepare the car and paperwork in advance.",
        ),
      },
      {
        titulo: T("Cancelá cuando quieras", "Cancel whenever you like"),
        texto: T(
          "Podés cancelar hasta 2 horas antes, sin costo.",
          "You can cancel up to 2 hours before, at no cost.",
        ),
      },
    ],
    cta: { texto: T("Reservar prueba", "Book a test drive"), href: "/#reservar" },
  },
  {
    slug: "experiencia/showroom",
    categoria: "experiencia",
    nombre: T("Showroom", "Showroom"),
    titulo: T("Showroom", "Showroom"),
    bajada: T(
      "Recorré el stock con calma. Para mirar no hace falta turno.",
      "Browse the stock at your own pace. No appointment needed just to look.",
    ),
    auto: "ferrari-488-spider",
    fondo: "/showroom/showroom.webp",
    bloques: [
      {
        titulo: T("Dónde estamos", "Where to find us"),
        texto: T(
          "Av. del Libertador 4874, Núñez, Buenos Aires.",
          "Av. del Libertador 4874, Núñez, Buenos Aires.",
        ),
      },
      {
        titulo: T("Horarios", "Opening hours"),
        texto: T(
          "Lunes a viernes de 9 a 19 h. Sábados de 10 a 14 h.",
          "Monday to Friday, 9 am to 7 pm. Saturdays, 10 am to 2 pm.",
        ),
      },
      {
        titulo: T("Cuándo hace falta turno", "When you need an appointment"),
        texto: T(
          "Para recorrer el stock no. Para una prueba de manejo sí, porque preparamos la unidad con anticipación.",
          "Not to browse the stock. For a test drive, yes, because we prepare the car in advance.",
        ),
      },
    ],
    cta: { texto: T("Cómo llegar", "Get directions"), href: MAPA, externo: true },
  },
  {
    slug: "experiencia/quienes-somos",
    categoria: "experiencia",
    nombre: T("Quiénes somos", "About us"),
    titulo: T("Quiénes somos", "About us"),
    bajada: T(
      "Una concesionaria de autos seleccionados en Buenos Aires. Menos autos, mejor elegidos.",
      "A dealership of hand-picked cars in Buenos Aires. Fewer cars, better chosen.",
    ),
    auto: "lamborghini-miura",
    datos: [
      { valor: T("1 de 9", "1 in 9"), rotulo: T("unidades seleccionadas", "cars selected") },
      { valor: T("180", "180"), rotulo: T("puntos de control", "checkpoints") },
    ],
    bloques: [
      {
        titulo: T("Menos autos, mejores autos", "Fewer cars, better cars"),
        texto: T(
          "Seleccionamos 1 de cada 9 unidades que evaluamos, y las revisamos en 180 puntos.",
          "We select 1 in every 9 cars we evaluate, and inspect them across 180 points.",
        ),
      },
      {
        titulo: T("Todo a la vista", "Everything in plain sight"),
        texto: T(
          "Informe abierto, precio cerrado y garantía por escrito.",
          "Open report, fixed price and written warranty.",
        ),
      },
      {
        titulo: T("Autos que se manejan antes de comprarse", "Cars you drive before you buy"),
        texto: T(
          "40 minutos de prueba, sin acompañamiento y sin presión.",
          "A 40-minute test drive, unaccompanied and with no pressure.",
        ),
      },
    ],
    cta: { texto: T("Ver los modelos", "See the models"), href: "/modelos" },
  },

  /* --- Eléctricos e híbridos --- */
  {
    slug: "electricos-hibridos/carga-y-autonomia",
    categoria: "electricos-hibridos",
    nombre: T("Carga y autonomía", "Charging & range"),
    titulo: T("Carga y autonomía", "Charging & range"),
    bajada: T(
      "Lo que conviene saber antes de pasarte a un eléctrico o a un híbrido.",
      "What is worth knowing before switching to an electric or hybrid car.",
    ),
    auto: "tesla-model-s",
    bloques: [
      {
        titulo: T("Dónde cargar", "Where to charge"),
        texto: T(
          "La mayor parte de la carga puede hacerse en casa. Te asesoramos para que sepas qué necesitás instalar.",
          "Most charging can be done at home. We advise you on what you would need to install.",
        ),
      },
      {
        titulo: T("Autonomía real", "Real-world range"),
        texto: T(
          "Depende del uso, la velocidad y el clima. Lo hablamos con la unidad adelante, no solo con una cifra de folleto.",
          "It depends on use, speed and weather. We talk it through with the car in front of us, not just a brochure figure.",
        ),
      },
      {
        titulo: T("El híbrido como puente", "Hybrids as a bridge"),
        texto: T(
          "Si todavía no tenés dónde cargar, un híbrido combina motor naftero y eléctrico sin cambiar tus hábitos.",
          "If you don't have anywhere to charge yet, a hybrid combines petrol and electric power without changing your habits.",
        ),
      },
    ],
    cta: { texto: T("Reservar una prueba", "Book a test drive"), href: "/#reservar" },
  },
  {
    slug: "electricos-hibridos/guia",
    categoria: "electricos-hibridos",
    nombre: T("Guía de eléctricos e híbridos", "Electric & hybrid guide"),
    titulo: T("Guía de eléctricos e híbridos", "Electric & hybrid guide"),
    bajada: T(
      "Tres tipos de motor, explicados sin vueltas, para que elijas el que va con tu uso.",
      "Three types of powertrain, explained plainly, so you can choose the one that fits how you drive.",
    ),
    auto: "bmw-i8",
    bloques: [
      {
        titulo: T("Eléctrico", "Electric"),
        texto: T(
          "Se mueve solo con electricidad: silencioso, con respuesta inmediata y sin pasar por la estación de servicio.",
          "It runs on electricity alone: quiet, instantly responsive and no trips to the petrol station.",
        ),
      },
      {
        titulo: T("Híbrido enchufable", "Plug-in hybrid"),
        texto: T(
          "Suma un motor naftero a uno eléctrico y se puede cargar. Como el BMW i8 de nuestra selección.",
          "It pairs a petrol engine with an electric one and can be plugged in, like the BMW i8 in our selection.",
        ),
      },
      {
        titulo: T("Cómo elegir", "How to choose"),
        texto: T(
          "Contanos cuánto manejás y dónde guardás el auto, y te recomendamos el que mejor te queda.",
          "Tell us how much you drive and where you park, and we'll recommend the one that suits you best.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },

  /* --- Concesionario --- */
  {
    slug: "concesionario",
    categoria: "concesionario",
    nombre: T("Ubicación y horarios", "Location & hours"),
    titulo: T("Concesionario", "Dealership"),
    bajada: T(
      "Vértice Automotores, en Núñez. Vení a ver los autos y probalos.",
      "Vértice Automotores, in Núñez. Come and see the cars and drive them.",
    ),
    auto: "mercedes-amg-s63-cabrio",
    fondo: "/showroom/showroom.webp",
    datos: [
      { valor: T("9–19 h", "9 am–7 pm"), rotulo: T("lunes a viernes", "Monday to Friday") },
      { valor: T("10–14 h", "10 am–2 pm"), rotulo: T("sábados", "Saturdays") },
    ],
    bloques: [
      {
        titulo: T("Dirección", "Address"),
        texto: T(
          "Av. del Libertador 4874, Núñez, Buenos Aires (C1426).",
          "Av. del Libertador 4874, Núñez, Buenos Aires (C1426).",
        ),
      },
      {
        titulo: T("Teléfono", "Phone"),
        texto: T("11 5000 0000", "11 5000 0000"),
      },
      {
        titulo: T("WhatsApp", "WhatsApp"),
        texto: T(
          "Escribinos y te contestamos sin pedirte los datos primero.",
          "Message us and we'll answer without asking for your details first.",
        ),
      },
    ],
    cta: { texto: T("Cómo llegar", "Get directions"), href: MAPA, externo: true },
  },

  /* --- Legales (enlazadas desde el pie) --- */
  {
    slug: "privacidad",
    categoria: "legales",
    nombre: T("Privacidad", "Privacy"),
    titulo: T("Política de privacidad", "Privacy policy"),
    bajada: T(
      "Qué datos pedimos y para qué los usamos.",
      "What data we ask for and what we use it for.",
    ),
    auto: "audi-r8",
    bloques: [
      {
        titulo: T("Qué datos pedimos", "What data we ask for"),
        texto: T(
          "Nombre, mail y teléfono, y la unidad que querés probar.",
          "Your name, email and phone, and the car you want to test.",
        ),
      },
      {
        titulo: T("Para qué los usamos", "What we use it for"),
        texto: T(
          "Usamos tus datos solo para coordinar el turno.",
          "We only use your details to arrange your slot.",
        ),
      },
      {
        titulo: T("Consultas", "Questions"),
        texto: T(
          "Si querés saber qué datos tenemos tuyos o pedir que los borremos, escribinos por WhatsApp.",
          "If you want to know what data we hold about you, or ask us to delete it, message us on WhatsApp.",
        ),
      },
    ],
    cta: { texto: T("Escribinos", "Message us"), href: WHATSAPP, externo: true },
  },
  {
    slug: "terminos",
    categoria: "legales",
    nombre: T("Términos", "Terms"),
    titulo: T("Términos y condiciones", "Terms and conditions"),
    bajada: T(
      "Las condiciones generales de la información publicada en este sitio.",
      "The general conditions that apply to the information published on this site.",
    ),
    auto: "bentley-continental-gt",
    bloques: [
      {
        titulo: T("Información y precios", "Information and prices"),
        texto: T(
          "Precio, historial y estado de cada unidad se informan por nuestros asesores. Las imágenes son ilustrativas.",
          "Price, history and condition of each car are provided by our advisors. Images are illustrative.",
        ),
      },
      {
        titulo: T("Disponibilidad", "Availability"),
        texto: T(
          "Las unidades están sujetas a disponibilidad y la selección cambia cada semana.",
          "Cars are subject to availability and the selection changes every week.",
        ),
      },
      {
        titulo: T("Devolución", "Returns"),
        texto: T(
          "Tenés 7 días corridos o 300 kilómetros, lo que ocurra primero, para devolver la unidad.",
          "You have 7 calendar days or 300 kilometres, whichever comes first, to return the car.",
        ),
      },
    ],
    cta: { texto: T("Volver al inicio", "Back to home"), href: "/" },
  },
];

export const paginaPorSlug = (slug: string) =>
  PAGINAS.find((p) => p.slug === slug);

export const paginasDe = (categoria: string) =>
  PAGINAS.filter((p) => p.categoria === categoria);

export const categoriaPorId = (id: string) =>
  CATEGORIAS.find((c) => c.id === id);
