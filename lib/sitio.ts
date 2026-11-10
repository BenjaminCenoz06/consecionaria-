/**
 * Mapa del sitio: el menú y todas las páginas salen de acá.
 *
 * Sigue la estructura del menú de la referencia (Modelos, Eléctricos e
 * híbridos, Asesoramiento y compra, Servicios, Experiencia, Concesionario).
 * Cada texto lleva su par {es, en}: se lee con `l()` de `useIdioma()`.
 *
 * Lo que se afirma sobre Bárcena Automotores sale de su perfil de
 * Instagram (@barcena.automotores): compra, venta y consignación,
 * financiación exclusiva, 0 km multimarcas, usados seleccionados,
 * sorteos, La Cumbre (Córdoba) y el WhatsApp. El resto del texto es
 * editorial y evita cifras y condiciones comerciales que no estén
 * confirmadas: antes de publicar conviene que lo revise el dueño.
 */
export type Texto = { es: string; en: string };

const T = (es: string, en: string): Texto => ({ es, en });

/** WhatsApp y teléfono del local (perfil de Instagram). */
export const WHATSAPP = "https://wa.me/5493548409755";
export const TELEFONO = "3548 40-9755";
export const TELEFONO_TEL = "+5493548409755";
export const INSTAGRAM = "https://www.instagram.com/barcena.automotores/";
export const DIRECCION = "La Cumbre, Córdoba";
export const MAPA =
  "https://www.google.com/maps/search/?api=1&query=B%C3%A1rcena+Automotores+La+Cumbre+C%C3%B3rdoba";

/* ------------------------------------------------------------------ */
/* Categorías del menú                                                 */
/* ------------------------------------------------------------------ */

export type Categoria = {
  id: string;
  etiqueta: Texto;
  href: string;
  bajada: Texto;
  /** Auto (id de `lib/catalogo.ts`) que ilustra la portada. */
  auto: string;
};

export const CATEGORIAS: Categoria[] = [
  {
    id: "modelos",
    etiqueta: T("Modelos", "Models"),
    href: "/modelos",
    bajada: T(
      "0 km multimarcas y usados seleccionados. Elegí el tuyo y conocelo en detalle.",
      "Brand-new multi-brand cars and hand-picked used ones. Pick yours and get to know it.",
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
      "Compra, venta y consignación, con financiación exclusiva y asesoramiento en cada paso.",
      "Buying, selling and consignment, with exclusive financing and advice at every step.",
    ),
    auto: "bentley-continental-gt",
  },
  {
    id: "servicios",
    etiqueta: T("Servicios", "Services"),
    href: "/servicios",
    bajada: T(
      "Lo que hacemos en Bárcena Automotores: 0 km, usados seleccionados y sorteos.",
      "What we do at Bárcena Automotores: brand-new cars, hand-picked used cars and prize draws.",
    ),
    auto: "audi-r8",
  },
  {
    id: "experiencia",
    etiqueta: T("Experiencia", "Experience"),
    href: "/experiencia",
    bajada: T(
      "Conocé cómo trabajamos, quiénes somos y las novedades de la concesionaria.",
      "See how we work, who we are and the latest news from the dealership.",
    ),
    auto: "porsche-356",
  },
  {
    id: "concesionario",
    etiqueta: T("Concesionario", "Dealership"),
    href: "/concesionario",
    bajada: T(
      "Visitanos en La Cumbre, Córdoba.",
      "Come and see us in La Cumbre, Córdoba.",
    ),
    auto: "mercedes-amg-s63-cabrio",
  },
];

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
      "Comprar tu auto tiene que ser simple: elegís, consultás, lo ves y te asesoramos hasta que salís manejando.",
      "Buying your car should be simple: you choose, you ask, you see it, and we advise you until you drive away.",
    ),
    auto: "bentley-continental-gt",
    datos: [
      { valor: T("0 km", "New"), rotulo: T("multimarcas", "multi-brand") },
      { valor: T("Usados", "Used"), rotulo: T("seleccionados", "hand-picked") },
      { valor: T("Financiación", "Financing"), rotulo: T("exclusiva", "exclusive") },
    ],
    bloques: [
      {
        titulo: T("Elegí tu auto", "Choose your car"),
        texto: T(
          "Mirá el catálogo y pedinos información de la unidad que te gustó. Te respondemos por WhatsApp.",
          "Browse the catalogue and ask us about the car you liked. We reply on WhatsApp.",
        ),
      },
      {
        titulo: T("Vení a verlo", "Come and see it"),
        texto: T(
          "Coordinamos una visita en La Cumbre para que lo veas y lo pruebes con tiempo.",
          "We arrange a visit in La Cumbre so you can see it and try it without rushing.",
        ),
      },
      {
        titulo: T("Financiá a tu medida", "Finance it your way"),
        texto: T(
          "Tenemos financiación exclusiva. Consultanos las opciones disponibles para tu auto.",
          "We offer exclusive financing. Ask us about the options available for your car.",
        ),
      },
      {
        titulo: T("Salí manejando", "Drive away"),
        texto: T(
          "Te acompañamos con la documentación para que te lleves el auto con tranquilidad.",
          "We help you with the paperwork so you can take the car home with peace of mind.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },
  {
    slug: "compra/financiacion",
    categoria: "compra",
    nombre: T("Financiación exclusiva", "Exclusive financing"),
    titulo: T("Financiación exclusiva", "Exclusive financing"),
    bajada: T(
      "Planes de financiación pensados para que el auto que querés sea el que te llevás.",
      "Financing plans designed so the car you want is the one you take home.",
    ),
    auto: "jaguar-f-type",
    datos: [{ valor: T("Exclusiva", "Exclusive"), rotulo: T("financiación", "financing") }],
    bloques: [
      {
        titulo: T("Opciones a tu medida", "Options that fit you"),
        texto: T(
          "Armamos la opción de financiación que mejor se adapta a tu situación y al auto que elegiste.",
          "We put together the financing option that best fits your situation and the car you chose.",
        ),
      },
      {
        titulo: T("Te asesoramos", "We advise you"),
        texto: T(
          "Te explicamos cada paso y resolvemos tus dudas antes de que decidas.",
          "We explain each step and answer your questions before you decide.",
        ),
      },
      {
        titulo: T("Consultá las condiciones", "Ask about the terms"),
        texto: T(
          "Las condiciones y los requisitos se informan por WhatsApp, según la unidad.",
          "Terms and requirements are provided on WhatsApp, depending on the car.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },
  {
    slug: "compra/vende-tu-auto",
    categoria: "compra",
    nombre: T("Vendé tu auto", "Sell your car"),
    titulo: T("Vendé tu auto", "Sell your car"),
    bajada: T(
      "Compramos tu auto o lo vendemos por vos con nuestro servicio de consignación.",
      "We buy your car, or sell it for you through our consignment service.",
    ),
    auto: "audi-r8",
    datos: [
      { valor: T("Compra", "Buying"), rotulo: T("de tu usado", "your used car") },
      { valor: T("Consignación", "Consignment"), rotulo: T("de tu auto", "of your car") },
    ],
    bloques: [
      {
        titulo: T("Compramos tu auto", "We buy your car"),
        texto: T(
          "Si querés venderlo ya, lo evaluamos y te hacemos una propuesta.",
          "If you want to sell it right away, we assess it and make you an offer.",
        ),
      },
      {
        titulo: T("Consignación", "Consignment"),
        texto: T(
          "Si preferís esperar el mejor momento, lo exhibimos y lo vendemos por vos.",
          "If you'd rather wait for the right moment, we showcase it and sell it for you.",
        ),
      },
      {
        titulo: T("Tomamos tu usado", "We take your used car"),
        texto: T(
          "También podés entregarlo como parte de pago de tu próximo auto.",
          "You can also hand it in as part payment for your next car.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },

  /* --- Servicios --- */
  {
    slug: "servicios/cero-km-multimarcas",
    categoria: "servicios",
    nombre: T("0 km multimarcas", "New multi-brand cars"),
    titulo: T("0 km multimarcas", "New multi-brand cars"),
    bajada: T(
      "Varias marcas en un solo lugar, para que compares y elijas el 0 km que más te convenga.",
      "Several brands in one place, so you can compare and pick the new car that suits you best.",
    ),
    auto: "nissan-370z",
    bloques: [
      {
        titulo: T("Todas las marcas en un lugar", "All brands in one place"),
        texto: T(
          "Trabajamos 0 km de distintas marcas: consultanos por el modelo que buscás.",
          "We work with new cars from several brands: ask us about the model you're after.",
        ),
      },
      {
        titulo: T("Asesoramiento sin presión", "Advice with no pressure"),
        texto: T(
          "Te ayudamos a comparar versiones y precios para que elijas con información.",
          "We help you compare versions and prices so you can choose with the facts.",
        ),
      },
      {
        titulo: T("Con financiación exclusiva", "With exclusive financing"),
        texto: T(
          "Podés combinar tu 0 km con nuestras opciones de financiación.",
          "You can combine your new car with our financing options.",
        ),
      },
    ],
    cta: { texto: T("Consultar por WhatsApp", "Ask on WhatsApp"), href: WHATSAPP, externo: true },
  },
  {
    slug: "servicios/usados-seleccionados",
    categoria: "servicios",
    nombre: T("Usados seleccionados", "Hand-picked used cars"),
    titulo: T("Usados seleccionados", "Hand-picked used cars"),
    bajada: T(
      "No tenemos de todo: elegimos unidades usadas que valen la pena.",
      "We don't stock everything: we choose used cars that are worth it.",
    ),
    auto: "ferrari-488-spider",
    bloques: [
      {
        titulo: T("Elegidos uno por uno", "Chosen one by one"),
        texto: T(
          "Seleccionamos cada unidad antes de ofrecerla, para que compres con confianza.",
          "We choose each car before offering it, so you can buy with confidence.",
        ),
      },
      {
        titulo: T("Mirá antes de decidir", "Look before you decide"),
        texto: T(
          "Podés ver la unidad en La Cumbre y consultarnos todo lo que quieras saber.",
          "You can see the car in La Cumbre and ask us anything you want to know.",
        ),
      },
      {
        titulo: T("Vendé el tuyo", "Sell yours"),
        texto: T(
          "Si tenés un auto para vender, lo evaluamos o lo tomamos en consignación.",
          "If you have a car to sell, we assess it or take it on consignment.",
        ),
      },
    ],
    cta: { texto: T("Ver los modelos", "See the models"), href: "/modelos" },
  },
  {
    slug: "servicios/sorteos",
    categoria: "servicios",
    nombre: T("Sorteos", "Prize draws"),
    titulo: T("Sorteos", "Prize draws"),
    bajada: T(
      "En Bárcena también sorteamos premios. Seguinos en Instagram para enterarte.",
      "At Bárcena we also run prize draws. Follow us on Instagram to find out.",
    ),
    auto: "lamborghini-miura",
    datos: [{ valor: T("Sorteos", "Draws"), rotulo: T("en nuestras redes", "on our social media") }],
    bloques: [
      {
        titulo: T("Participá", "Take part"),
        texto: T(
          "Los sorteos se anuncian en nuestro perfil de Instagram, @barcena.automotores.",
          "Draws are announced on our Instagram profile, @barcena.automotores.",
        ),
      },
      {
        titulo: T("Seguinos", "Follow us"),
        texto: T(
          "Activá las notificaciones para no perderte ninguno.",
          "Turn on notifications so you don't miss any.",
        ),
      },
      {
        titulo: T("Consultá las bases", "Check the rules"),
        texto: T(
          "Las bases y condiciones de cada sorteo se publican junto con cada uno.",
          "The rules of each draw are published along with it.",
        ),
      },
    ],
    cta: { texto: T("Ver el Instagram", "See our Instagram"), href: INSTAGRAM, externo: true },
  },

  /* --- Experiencia --- */
  {
    slug: "experiencia/prueba-de-manejo",
    categoria: "experiencia",
    nombre: T("Visita y prueba", "Visit and test drive"),
    titulo: T("Visitá y probá", "Visit and test drive"),
    bajada: T(
      "Los autos se eligen mejor en persona. Coordiná tu visita y probalo.",
      "Cars are chosen better in person. Arrange your visit and try it.",
    ),
    auto: "porsche-356",
    bloques: [
      {
        titulo: T("Reservá tu visita", "Book your visit"),
        texto: T(
          "Completá el formulario o escribinos por WhatsApp y coordinamos el día.",
          "Fill in the form or message us on WhatsApp and we'll arrange the day.",
        ),
      },
      {
        titulo: T("Qué llevar", "What to bring"),
        texto: T(
          "Para probar un auto necesitás el registro de conducir vigente.",
          "To try a car you'll need a valid driving licence.",
        ),
      },
      {
        titulo: T("Sin compromiso", "No strings attached"),
        texto: T(
          "Venir a ver y probar no te obliga a nada.",
          "Coming to see and try a car doesn't oblige you to anything.",
        ),
      },
    ],
    cta: { texto: T("Reservar prueba", "Book a test drive"), href: "/#reservar" },
  },
  {
    slug: "experiencia/novedades",
    categoria: "experiencia",
    nombre: T("Nuevo espacio", "New space"),
    titulo: T("Nuestro nuevo espacio", "Our new space"),
    bajada: T(
      "Estamos preparando un nuevo espacio: la atención de siempre, en un lugar a la altura.",
      "We're getting a new space ready: the same service as always, in a place that does it justice.",
    ),
    auto: "ferrari-488-spider",
    fondo: "/showroom/showroom.webp",
    bloques: [
      {
        titulo: T("En construcción", "Under construction"),
        texto: T(
          "El nuevo local de Bárcena Automotores está en obra. Pronto vas a poder visitarlo.",
          "The new Bárcena Automotores premises are under construction. You'll be able to visit soon.",
        ),
      },
      {
        titulo: T("La atención de siempre", "The same service as always"),
        texto: T(
          "Seguimos atendiendo por WhatsApp y en La Cumbre mientras tanto.",
          "In the meantime we keep serving you on WhatsApp and in La Cumbre.",
        ),
      },
      {
        titulo: T("Enterate primero", "Be the first to know"),
        texto: T(
          "Las novedades las publicamos en Instagram, @barcena.automotores.",
          "We post news on Instagram, @barcena.automotores.",
        ),
      },
    ],
    cta: { texto: T("Seguinos en Instagram", "Follow us on Instagram"), href: INSTAGRAM, externo: true },
  },
  {
    slug: "experiencia/quienes-somos",
    categoria: "experiencia",
    nombre: T("Quiénes somos", "About us"),
    titulo: T("Quiénes somos", "About us"),
    bajada: T(
      "Bárcena Automotores: compra, venta y consignación de autos en La Cumbre, Córdoba.",
      "Bárcena Automotores: buying, selling and consigning cars in La Cumbre, Córdoba.",
    ),
    auto: "lamborghini-miura",
    datos: [
      { valor: T("Compra", "Buying"), rotulo: T("venta y consignación", "selling and consignment") },
      { valor: T("0 km", "New"), rotulo: T("y usados seleccionados", "and hand-picked used cars") },
    ],
    bloques: [
      {
        titulo: T("Qué hacemos", "What we do"),
        texto: T(
          "Compramos, vendemos y tomamos autos en consignación. Trabajamos 0 km multimarcas y usados seleccionados.",
          "We buy, sell and take cars on consignment. We work with new multi-brand cars and hand-picked used ones.",
        ),
      },
      {
        titulo: T("Financiación exclusiva", "Exclusive financing"),
        texto: T(
          "Te ofrecemos financiación para que accedas al auto que querés.",
          "We offer financing so you can get the car you want.",
        ),
      },
      {
        titulo: T("Atención cercana", "Close attention"),
        texto: T(
          "Estamos en La Cumbre y te respondemos directo por WhatsApp.",
          "We're in La Cumbre and reply directly on WhatsApp.",
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
          "Suma un motor naftero a uno eléctrico y se puede cargar.",
          "It pairs a petrol engine with an electric one and can be plugged in.",
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
    nombre: T("Ubicación y contacto", "Location & contact"),
    titulo: T("Concesionario", "Dealership"),
    bajada: T(
      "Bárcena Automotores, en La Cumbre, Córdoba. Escribinos y coordinamos tu visita.",
      "Bárcena Automotores, in La Cumbre, Córdoba. Message us and we'll arrange your visit.",
    ),
    auto: "mercedes-amg-s63-cabrio",
    fondo: "/showroom/showroom.webp",
    bloques: [
      {
        titulo: T("Dónde estamos", "Where to find us"),
        texto: T("La Cumbre, Córdoba.", "La Cumbre, Córdoba."),
      },
      {
        titulo: T("Teléfono y WhatsApp", "Phone and WhatsApp"),
        texto: T("3548 40-9755", "3548 40-9755"),
      },
      {
        titulo: T("Instagram", "Instagram"),
        texto: T(
          "@barcena.automotores: novedades, sorteos y las últimas unidades.",
          "@barcena.automotores: news, prize draws and our latest cars.",
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
          "Nombre, mail y teléfono, y la unidad que querés ver.",
          "Your name, email and phone, and the car you want to see.",
        ),
      },
      {
        titulo: T("Para qué los usamos", "What we use it for"),
        texto: T(
          "Usamos tus datos solo para responder tu consulta y coordinar tu visita.",
          "We only use your details to answer your enquiry and arrange your visit.",
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
          "Los precios y datos del sitio son de referencia. Precio, historial y estado de cada unidad se informan por nuestros asesores. Las imágenes son ilustrativas.",
          "Prices and data on this site are for reference. Price, history and condition of each car are provided by our advisors. Images are illustrative.",
        ),
      },
      {
        titulo: T("Disponibilidad", "Availability"),
        texto: T(
          "Las unidades están sujetas a disponibilidad.",
          "Cars are subject to availability.",
        ),
      },
      {
        titulo: T("Consultas", "Questions"),
        texto: T(
          "Para cualquier consulta sobre una operación, escribinos por WhatsApp.",
          "For any question about a transaction, message us on WhatsApp.",
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
