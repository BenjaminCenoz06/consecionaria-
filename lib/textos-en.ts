/**
 * Diccionario español → inglés.
 *
 * La clave es el texto en español tal como está escrito en el componente:
 * así el código sigue leyéndose en español y, si falta una traducción, el
 * sitio muestra el original en vez de una clave rota. Para sumar un texto
 * nuevo: escribilo en el componente con `t("…")` y agregá acá su par.
 */
export const EN: Record<string, string> = {
  /* --- Barra, selector y accesibilidad --- */
  "Menú": "Menu",
  "Abrir menú": "Open menu",
  "Cerrar menú": "Close menu",
  "Menú principal": "Main menu",
  "Vértice, inicio": "Vértice, home",
  "Idioma": "Language",
  "Elegir idioma": "Choose language",
  "Saltar al contenido": "Skip to content",
  "Reservar prueba": "Book a test drive",

  /* --- Menú en panel --- */
  "Secciones": "Sections",
  "Modelos": "Models",
  "Selección de la semana": "Selection of the week",
  "Cómo funciona": "How it works",
  "Showroom": "Showroom",
  "Preguntas": "FAQ",
  "Visión general": "Overview",
  "Volver": "Back",
  "Reservar una prueba de manejo": "Book a test drive",
  "Elegís la unidad": "You choose the car",
  "La probás 40 minutos": "You test it for 40 minutes",
  "Te la llevás en 48 horas": "You drive it home in 48 hours",
  "Visitá el showroom.": "Visit the showroom.",
  "Núñez, Buenos Aires": "Núñez, Buenos Aires",
  "Interior del showroom de Vértice Automotores":
    "Inside the Vértice Automotores showroom",
  "Cómo llegar y horarios": "Directions and opening hours",
  "¿Qué cubre la garantía?": "What does the warranty cover?",
  "Permuta y financiación": "Trade-in and financing",
  "¿Necesito turno?": "Do I need an appointment?",

  /* --- Hero --- */
  "Vértice Automotores — autos seleccionados en Buenos Aires":
    "Vértice Automotores — hand-picked cars in Buenos Aires",
  "Ir a los modelos": "Go to the models",

  /* --- Modelos --- */
  "Descubrir": "Discover",
  " todos los modelos": " all models",
  "Elegir modelo": "Choose a model",
  "Modelo anterior": "Previous model",
  "Modelo siguiente": "Next model",
  "carrusel": "carousel",
  "Imágenes ilustrativas. Las unidades están sujetas a disponibilidad; precio, historial y estado se informan por nuestros asesores, con el informe de los 180 puntos de control firmado.":
    "Images are illustrative. Cars are subject to availability; price, history and condition are provided by our advisors, with the signed 180-point inspection report.",
  "Modelo": "Model",
  "de": "of",

  "Cielo abierto": "Open sky",
  "Electrizante por diseño": "Electrifying by design",
  "Lujo en movimiento": "Luxury in motion",
  "Un clásico vivo": "A living classic",
  "Potencia con clase": "Power with class",
  "Pura herencia": "Pure heritage",
  "El silencio acelera": "Silence accelerates",
  "Instinto V10": "V10 instinct",
  "Carácter británico": "British character",
  "Pura diversión": "Pure fun",
  "Pulso deportivo": "Sporty pulse",

  "Ferrari 488 Spider rojo visto de perfil": "Red Ferrari 488 Spider, side view",
  "BMW i8 naranja visto de perfil": "Orange BMW i8, side view",
  "Bentley Continental GT gris visto de perfil":
    "Grey Bentley Continental GT, side view",
  "Lamborghini Miura naranja de época visto de perfil":
    "Vintage orange Lamborghini Miura, side view",
  "Mercedes-AMG S 63 Cabrio plateado visto de perfil":
    "Silver Mercedes-AMG S 63 Cabriolet, side view",
  "Porsche 356 rojo clásico visto de perfil":
    "Classic red Porsche 356, side view",
  "Tesla Model S azul visto de perfil": "Blue Tesla Model S, side view",
  "Audi R8 gris con pinzas verdes visto de perfil":
    "Grey Audi R8 with green calipers, side view",
  "Jaguar F-Type blanco visto de perfil": "White Jaguar F-Type, side view",
  "Mazda MX-5 rojo visto de perfil": "Red Mazda MX-5, side view",
  "Nissan 370Z blanco visto de perfil": "White Nissan 370Z, side view",

  /* --- Ubicación --- */
  "Visitá el showroom": "Visit the showroom",
  "Cómo llegar": "Get directions",
  " (se abre en una pestaña nueva)": " (opens in a new tab)",

  /* --- Tagline --- */
  "Cada unidad pasa 180 puntos de control. Si uno solo falla, no entra al showroom.":
    "Every car goes through 180 checkpoints. If even one fails, it doesn't make it to the showroom.",

  /* --- Destacados --- */
  "Elegir auto de la selección": "Choose a car from the selection",
  "Solicitar información": "Request information",
  "Hola, quiero información sobre el": "Hi, I'd like information about the",
  "La selección cambia cada semana y está sujeta a disponibilidad. Imágenes ilustrativas: precio, historial y estado de cada unidad se informan por nuestros asesores.":
    "The selection changes every week and is subject to availability. Images are illustrative: price, history and condition of each car are provided by our advisors.",
  "Mercedes-AMG GT R verde visto de frente en tres cuartos":
    "Green Mercedes-AMG GT R, front three-quarter view",
  "Ferrari 812 rojo visto de frente en tres cuartos":
    "Red Ferrari 812, front three-quarter view",
  "Lamborghini Huracán Tecnica naranja visto de frente en tres cuartos":
    "Orange Lamborghini Huracán Tecnica, front three-quarter view",
  "Audi RS5 azul oscuro visto de frente en tres cuartos":
    "Dark blue Audi RS5, front three-quarter view",
  "Lexus LFA blanco visto de frente": "White Lexus LFA, front view",

  /* --- Explorar y Gama --- */
  "Seguí explorando": "Keep exploring",
  "Consultar por WhatsApp (se abre en una pestaña nueva)":
    "Ask on WhatsApp (opens in a new tab)",
  "Tu próximo auto empieza acá.": "Your next car starts here.",
  "Nafta": "Petrol",
  "Híbrido": "Hybrid",
  "Clásico": "Classic",
  "Spider de dos plazas con V8 biturbo central.":
    "Two-seat spider with a central twin-turbo V8.",
  "Coupé híbrido enchufable con puertas de ala.":
    "Plug-in hybrid coupé with gull-wing doors.",
  "Deportivo de motor V10 atmosférico central.":
    "Sports car with a central naturally aspirated V10.",
  "Unidad de colección: no entra a pedido. Consultá disponibilidad.":
    "Collector's car: not available to order. Ask about availability.",
  "Berlinetta V12 de los años sesenta, restaurada.":
    "Restored 1960s V12 berlinetta.",

  /* --- Cómo funciona --- */
  "Tres pasos": "Three steps",
  "Todo el stock está online con el informe de 180 puntos y el historial de service adjuntos. Sin turno previo, sin dejar tus datos para ver un precio.":
    "All our stock is online with the 180-point report and service history attached. No appointment needed, and no need to leave your details to see a price.",
  "Te damos la llave y te vas solo. Ruta, ciudad, el recorrido que quieras. Nadie va de acompañante diciéndote lo bien que anda.":
    "We hand you the key and you go alone. Highway, city, whatever route you like. Nobody rides along telling you how well it runs.",
  "Transferencia, verificación policial y patente nueva los hacemos nosotros. El precio publicado ya los incluye.":
    "We take care of the transfer, police verification and new plates. The listed price already includes them.",

  /* --- Preguntas --- */
  "Si falta la tuya, escribinos por WhatsApp y te contestamos sin pedirte los datos primero.":
    "If yours is missing, message us on WhatsApp and we'll answer without asking for your details first.",
  "¿Qué cubre la garantía de 12 meses?": "What does the 12-month warranty cover?",
  "Motor, caja y diferencial, sin límite de kilómetros. Se entrega por escrito el día de la transferencia y es válida en cualquier taller de la red, no sólo en el nuestro.":
    "Engine, gearbox and differential, with no mileage limit. It is handed over in writing on the day of the transfer and is valid at any workshop in the network, not just ours.",
  "¿Puedo llevar el auto a mi mecánico antes de comprarlo?":
    "Can I take the car to my mechanic before buying it?",
  "Sí, y lo recomendamos. Coordinás el día, te damos la unidad y la llevás al taller que elijas dentro de AMBA. Lo único que pedimos es el DNI y una constancia de seguro.":
    "Yes, and we recommend it. You pick the day, we hand you the car and you take it to the workshop of your choice within Greater Buenos Aires. All we ask for is your ID and proof of insurance.",
  "¿Cómo funciona la permuta?": "How does the trade-in work?",
  "Traés tu auto al showroom, lo tasamos en el día y te damos la oferta por escrito con 7 días de validez. No estás obligado a comprar acá para recibir la tasación.":
    "You bring your car to the showroom, we appraise it the same day and give you a written offer valid for 7 days. You don't have to buy from us to get the appraisal.",
  "¿Trabajan con financiación?": "Do you offer financing?",
  "Sí. Prendarios con Banco Galicia, Santander y Macro, hasta 48 cuotas y hasta el 50% del valor. La preaprobación la gestionamos nosotros y tarda entre 48 y 72 horas.":
    "Yes. Secured loans with Banco Galicia, Santander and Macro, up to 48 instalments and up to 50% of the value. We handle the pre-approval, which takes 48 to 72 hours.",
  "¿El precio publicado es el precio final?": "Is the listed price the final price?",
  "Sí. Incluye transferencia, verificación policial, informe de dominio y gestoría. Lo único que se suma es el patentamiento si la unidad es 0km.":
    "Yes. It includes the transfer, police verification, title report and paperwork. The only extra is registration if the car is brand new.",
  "¿Envían unidades al interior del país?": "Do you ship cars within the country?",
  "Sí, con camión cerrado y seguro contratado. El costo depende del destino y se cotiza aparte. A Córdoba, Rosario y Mendoza el envío está bonificado.":
    "Yes, by enclosed truck with insurance. The cost depends on the destination and is quoted separately. Shipping to Córdoba, Rosario and Mendoza is free.",
  "¿Qué pasa si el auto no era lo que esperaba?":
    "What if the car isn't what I expected?",
  "Tenés 7 días corridos o 300 kilómetros, lo que ocurra primero, para devolverlo. Se reintegra el total menos los gastos de transferencia ya realizados.":
    "You have 7 calendar days or 300 kilometres, whichever comes first, to return it. You get a full refund minus any transfer costs already paid.",
  "¿Necesito turno para ir al showroom?": "Do I need an appointment to visit the showroom?",
  "Para recorrer el stock no. Para una prueba de manejo sí, porque preparamos la unidad y la documentación con anticipación.":
    "Not to browse the stock. For a test drive, yes, because we prepare the car and the paperwork in advance.",

  /* --- Reservar --- */
  "Reservá tu": "Book your",
  "prueba": "test drive",
  "40 minutos con la unidad, sin acompañamiento. Te confirmamos el turno el mismo día.":
    "40 minutes with the car, unaccompanied. We confirm your slot the same day.",
  "Sin costo y sin obligación de compra.": "Free, with no obligation to buy.",
  "Hace falta registro vigente y DNI.": "A valid driving licence and ID are required.",
  "Se puede cancelar hasta 2 horas antes.": "You can cancel up to 2 hours before.",
  "Nombre y apellido": "Full name",
  "Mail": "Email",
  "Teléfono": "Phone",
  "Unidad que querés probar": "Car you want to test",
  "Todavía no sé": "I don't know yet",
  "Enviando…": "Sending…",
  "Escribí tu nombre y apellido.": "Enter your full name.",
  "Revisá el mail. Falta el arroba o el punto final.":
    "Check your email. The @ or the final dot is missing.",
  "Poné el teléfono con característica, sin 0 ni 15.":
    "Enter your phone with area code, without 0 or 15.",
  "Listo,": "All set,",
  "Te llamamos dentro de las próximas 2 horas hábiles para cerrar el día y el horario.":
    "We'll call you within the next 2 business hours to confirm the day and time.",
  "Usamos tus datos sólo para coordinar el turno. Más en la ":
    "We only use your details to arrange your slot. More in our ",
  "política de privacidad": "privacy policy",

  /* --- Footer --- */
  "Catálogo": "Catalogue",
  "Empresa": "Company",
  "Legales": "Legal",
  "Privacidad": "Privacy",
  "Términos": "Terms",
  "Acá": "Here",
  "se": "you",
  "maneja": "drive",
  "Acá se maneja": "Here you drive",
  "© Vértice Automotores. CUIT 30-71000000-4.":
    "© Vértice Automotores. Tax ID (CUIT) 30-71000000-4.",
  "Agencia registrada DNRPA 0000.": "Dealership registered with DNRPA 0000.",
};
