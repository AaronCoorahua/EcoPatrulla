import type { MaterialId } from "./residuos";

// ── Datos de demostración: impacto por distrito (Lima Metropolitana) ─────
// En producción, estos datos vendrían de las municipalidades / programa
// de segregación en la fuente. Aquí están mockeados para la demo.

export interface Distrito {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  kgMes: number; // kg recuperados este mes
  hogares: number; // hogares participando
  tendencia: number; // % vs mes anterior
}

export const DISTRITOS: Distrito[] = [
  { id: "surco", nombre: "Santiago de Surco", lat: -12.145, lng: -76.993, kgMes: 14200, hogares: 1930, tendencia: 12 },
  { id: "miraflores", nombre: "Miraflores", lat: -12.121, lng: -77.03, kgMes: 12450, hogares: 1710, tendencia: 8 },
  { id: "sanisidro", nombre: "San Isidro", lat: -12.098, lng: -77.036, kgMes: 10820, hogares: 1385, tendencia: 5 },
  { id: "sanborja", nombre: "San Borja", lat: -12.108, lng: -76.999, kgMes: 9340, hogares: 1260, tendencia: 15 },
  { id: "lamolina", nombre: "La Molina", lat: -12.086, lng: -76.944, kgMes: 8760, hogares: 1120, tendencia: 4 },
  { id: "sanmiguel", nombre: "San Miguel", lat: -12.077, lng: -77.093, kgMes: 7480, hogares: 1035, tendencia: 18 },
  { id: "jesusmaria", nombre: "Jesús María", lat: -12.078, lng: -77.048, kgMes: 6930, hogares: 940, tendencia: 9 },
  { id: "sjl", nombre: "San Juan de Lurigancho", lat: -12.002, lng: -77.008, kgMes: 6540, hogares: 890, tendencia: 22 },
  { id: "losolivos", nombre: "Los Olivos", lat: -11.971, lng: -77.073, kgMes: 5890, hogares: 810, tendencia: 11 },
  { id: "ate", nombre: "Ate", lat: -12.026, lng: -76.918, kgMes: 5210, hogares: 705, tendencia: 14 },
  { id: "ves", nombre: "Villa El Salvador", lat: -12.213, lng: -76.937, kgMes: 4980, hogares: 680, tendencia: 19 },
  { id: "comas", nombre: "Comas", lat: -11.942, lng: -77.062, kgMes: 4320, hogares: 590, tendencia: 7 },
];

export const FACTOR_CO2_POR_KG = 0.0015; // toneladas de CO₂ evitadas por kg (aprox.)

// ── Puntos de acopio (mock) ───────────────────────────────────────────────
export interface PuntoAcopio {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  materiales: MaterialId[];
  horario: string;
}

export const PUNTOS_ACOPIO: PuntoAcopio[] = [
  { id: "kennedy", nombre: "Punto Limpio Parque Kennedy", lat: -12.1219, lng: -77.0297, materiales: ["plastico", "vidrio", "papel"], horario: "L–S 8:00–18:00" },
  { id: "pentagonito", nombre: "EcoPunto El Pentagonito", lat: -12.1015, lng: -76.9987, materiales: ["plastico", "papel", "metal"], horario: "L–D 7:00–19:00" },
  { id: "olivar", nombre: "Punto Verde El Olivar", lat: -12.0982, lng: -77.0374, materiales: ["vidrio", "papel"], horario: "L–V 9:00–17:00" },
  { id: "lomas", nombre: "Acopio Lomas de Surco", lat: -12.1487, lng: -76.9871, materiales: ["plastico", "vidrio", "metal", "papel"], horario: "L–S 8:00–17:00" },
  { id: "campomar", nombre: "EcoPunto Campo de Marte", lat: -12.0705, lng: -77.0416, materiales: ["plastico", "papel", "peligroso"], horario: "Mi–D 9:00–18:00" },
  { id: "mediauna", nombre: "Punto Limpio Media Luna", lat: -12.0788, lng: -76.9475, materiales: ["plastico", "vidrio"], horario: "L–S 8:00–16:00" },
  { id: "megaplaza", nombre: "Acopio MegaPlaza", lat: -11.9925, lng: -77.061, materiales: ["plastico", "metal", "peligroso"], horario: "L–D 10:00–20:00" },
  { id: "sarita", nombre: "EcoPunto Sarita Colonia", lat: -12.0055, lng: -77.012, materiales: ["papel", "plastico"], horario: "L–V 8:00–15:00" },
];

// ── Familia (ranking en casa, mock) ───────────────────────────────────────
export interface Familiar {
  nombre: string;
  rol: string;
  puntos: number;
  esAdulto: boolean;
}

export const FAMILIA: Familiar[] = [
  { nombre: "Mamá Rosa", rol: "Mamá", puntos: 320, esAdulto: true },
  { nombre: "Papá Juan", rol: "Papá", puntos: 210, esAdulto: true },
  { nombre: "Valeria", rol: "Prima", puntos: 150, esAdulto: false },
];

// ── Tips que dice la mascota ──────────────────────────────────────────────
export const TIPS_KUSI: string[] = [
  "¿Sabías que el vidrio se recicla infinitas veces? ¡Es inmortal!",
  "Si aplastas las botellas, entran 3 veces más en el tacho.",
  "El papel mojado ya no se puede reciclar. ¡Mantenlo seco!",
  "Las pilas nunca van a la basura común. ¡Son residuo peligroso!",
  "Con 25 botellas de plástico se puede hacer un polo nuevo.",
  "Con tus cáscaras de fruta puedes hacer compost para plantas.",
  "Cada lata que reciclas ahorra energía para 3 horas de tele.",
];

// ── Datos curiosos y mini-retos que Kusi comparte en el chat ─────────────
export const DATOS_CURIOSOS: string[] = [
  "Una botella de plástico puede tardar 450 años en degradarse 😱 ¡Por eso reciclarla importa tanto!",
  "El vidrio se puede reciclar infinitas veces sin perder calidad. ¡Es casi inmortal! ✨",
  "Con 25 botellas de plástico recicladas se puede fabricar un polo nuevo 👕",
  "El papel se puede reciclar hasta 7 veces antes de que sus fibras se gasten 📄",
  "Reciclar 1 tonelada de papel salva 17 árboles 🌳",
  "Reciclar una sola lata de aluminio ahorra energía para 3 horas de tele 📺",
  "Una pila puede contaminar 600 litros de agua. ¡Siempre va a un punto especial! 🔋",
  "En el Perú se recicla menos del 4% de los residuos… ¡tú puedes ayudar a cambiar eso! 💚",
];

export const MINI_RETOS: string[] = [
  "Reto de hoy: junta 3 botellas de plástico, aplástalas y escanéalas. ¡Puntos triples de diversión! 💪",
  "Reto detective: busca en tu casa algo de vidrio para reciclar y escanéalo. ¡Vale 15 EcoPuntos! 🫙",
  "Reto del agua: cierra el caño mientras te cepillas los dientes. ¡Ahorras hasta 12 litros! 🚿",
  "Reto creativo: convierte una lata limpia en un portalápices. ¡Reusar también cuenta! ✏️",
  "Reto verde: guarda las cáscaras de fruta de hoy y empieza tu mini compost 🌱",
  "Reto explorador: abre el mapa y descubre qué distrito recicla más este mes 🗺️",
];

// ── Reto semanal comunitario (mock) ───────────────────────────────────────
export const RETO_SEMANAL = {
  titulo: "Semana del Vidrio",
  descripcion: "Entre toda la comunidad EcoPatrulla: reciclar 5,000 vidrios",
  meta: 5000,
  progreso: 3410,
};

// ── Compañeros: nombre y especie de cada mascota según el avatar elegido ──
export interface Companero {
  nombre: string;
  especie: string; // "la llama", "el cóndor", "la rana"
}

export const COMPANEROS: Record<string, Companero> = {
  llama: { nombre: "Kusi", especie: "la llama" },
  condor: { nombre: "Illa", especie: "el cóndor" },
  rana: { nombre: "Wayra", especie: "la rana" },
};

export function companero(avatar: string | undefined): Companero {
  return COMPANEROS[avatar ?? "llama"] ?? COMPANEROS.llama;
}
