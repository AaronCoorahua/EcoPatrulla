import type { MaterialId } from "./residuos";

// ── Rangos ────────────────────────────────────────────────────────────────
export interface Rango {
  min: number;
  nombre: string;
}

export const RANGOS: Rango[] = [
  { min: 0, nombre: "Semilla" },
  { min: 100, nombre: "Brote" },
  { min: 250, nombre: "Explorador" },
  { min: 500, nombre: "Guardián" },
  { min: 1000, nombre: "Héroe del Planeta" },
  { min: 2000, nombre: "Leyenda Verde" },
];

export function rangoActual(puntos: number): Rango {
  let actual = RANGOS[0];
  for (const r of RANGOS) if (puntos >= r.min) actual = r;
  return actual;
}

export function rangoSiguiente(puntos: number): Rango | null {
  for (const r of RANGOS) if (puntos < r.min) return r;
  return null;
}

// ── Insignias ─────────────────────────────────────────────────────────────
export interface EstadoJuego {
  puntos: number;
  racha: number;
  conteos: Partial<Record<MaterialId, number>>;
  totalEscaneos: number;
  mapaVisitado: boolean;
  primerLugar: boolean; // primer puesto en el ranking de casa
  chatsKusi: number;
}

export interface Insignia {
  id: string;
  nombre: string;
  descripcion: string;
  emoji: string;
  logrado: (e: EstadoJuego) => boolean;
}

export const INSIGNIAS: Insignia[] = [
  { id: "primer-escaneo", nombre: "Primer paso", descripcion: "Escanea tu primer residuo", emoji: "🔍", logrado: (e) => e.totalEscaneos >= 1 },
  { id: "racha-3", nombre: "Constante", descripcion: "Racha de 3 días seguidos", emoji: "🔥", logrado: (e) => e.racha >= 3 },
  { id: "racha-7", nombre: "Imparable", descripcion: "Racha de 7 días seguidos", emoji: "⚡", logrado: (e) => e.racha >= 7 },
  { id: "plastico-10", nombre: "Caza-botellas", descripcion: "Recicla 10 plásticos", emoji: "🥤", logrado: (e) => (e.conteos.plastico ?? 0) >= 10 },
  { id: "vidrio-5", nombre: "Cristalino", descripcion: "Recicla 5 vidrios", emoji: "🫙", logrado: (e) => (e.conteos.vidrio ?? 0) >= 5 },
  { id: "metal-5", nombre: "Chatarrita", descripcion: "Recicla 5 metales", emoji: "🥫", logrado: (e) => (e.conteos.metal ?? 0) >= 5 },
  { id: "organico-5", nombre: "Compostero", descripcion: "Separa 5 orgánicos", emoji: "🍂", logrado: (e) => (e.conteos.organico ?? 0) >= 5 },
  { id: "peligroso-1", nombre: "Alerta roja", descripcion: "Identifica un residuo peligroso", emoji: "🚨", logrado: (e) => (e.conteos.peligroso ?? 0) >= 1 },
  { id: "puntos-100", nombre: "Centenario", descripcion: "Alcanza 100 EcoPuntos", emoji: "💯", logrado: (e) => e.puntos >= 100 },
  { id: "explorador-mapa", nombre: "Cartógrafo", descripcion: "Explora el mapa de tu ciudad", emoji: "🗺️", logrado: (e) => e.mapaVisitado },
  { id: "primer-lugar", nombre: "Estrella de casa", descripcion: "Llega al 1er puesto de tu familia", emoji: "🏆", logrado: (e) => e.primerLugar },
  { id: "curioso", nombre: "Preguntón", descripcion: "Conversa con Kusi", emoji: "💬", logrado: (e) => e.chatsKusi >= 1 },
  { id: "guardian", nombre: "Guardián", descripcion: "Alcanza el rango Guardián", emoji: "🛡️", logrado: (e) => e.puntos >= 500 },
];

// ── Misiones diarias ──────────────────────────────────────────────────────
export interface Mision {
  id: string;
  titulo: string;
  meta: number;
  bono: number;
  tipo: "escaneos" | "material" | "mapa" | "kusi";
  material?: MaterialId;
}

export const MISIONES_HOY: Mision[] = [
  { id: "escanea-3", titulo: "Escanea 3 residuos", meta: 3, bono: 15, tipo: "escaneos" },
  { id: "vidrio-1", titulo: "Recicla algo de vidrio", meta: 1, bono: 15, tipo: "material", material: "vidrio" },
  { id: "mapa-1", titulo: "Mira el impacto de tu distrito", meta: 1, bono: 10, tipo: "mapa" },
  { id: "kusi-1", titulo: "Pregúntale algo a Kusi", meta: 1, bono: 10, tipo: "kusi" },
];
