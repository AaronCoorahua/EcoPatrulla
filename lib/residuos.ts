// Catálogo de materiales según el código de colores peruano (NTP 900.058)
// usado en colegios y municipalidades para la segregación en la fuente.

export type MaterialId =
  | "plastico"
  | "papel"
  | "vidrio"
  | "metal"
  | "organico"
  | "peligroso"
  | "general";

export interface Material {
  id: MaterialId;
  nombre: string;
  contenedor: string; // nombre del color del tacho
  hex: string; // color del tacho
  textoHex: string; // color de texto legible sobre el tacho
  puntos: number;
  co2PorItem: number; // kg de CO₂ evitado (aprox. educativa)
  aguaPorItem: number; // litros de agua ahorrada (aprox. educativa)
  consejo: string;
  dato: string; // dato curioso que dice la mascota
}

export const MATERIALES: Record<MaterialId, Material> = {
  plastico: {
    id: "plastico",
    nombre: "Plástico",
    contenedor: "Tacho blanco",
    hex: "#F1EFEA",
    textoHex: "#23342B",
    puntos: 10,
    co2PorItem: 0.08,
    aguaPorItem: 2,
    consejo: "Enjuágalo y aplástalo para que ocupe menos espacio.",
    dato: "Una botella de plástico puede tardar 450 años en degradarse.",
  },
  papel: {
    id: "papel",
    nombre: "Papel y cartón",
    contenedor: "Tacho azul",
    hex: "#3E8EDE",
    textoHex: "#FFFFFF",
    puntos: 8,
    co2PorItem: 0.05,
    aguaPorItem: 10,
    consejo: "Que esté seco y limpio. Las cajas van desarmadas y planas.",
    dato: "Reciclar 1 tonelada de papel salva 17 árboles.",
  },
  vidrio: {
    id: "vidrio",
    nombre: "Vidrio",
    contenedor: "Tacho verde",
    hex: "#2E9E6B",
    textoHex: "#FFFFFF",
    puntos: 15,
    co2PorItem: 0.3,
    aguaPorItem: 1,
    consejo: "Quítale la tapa y enjuágalo. ¡Cuidado, pide ayuda a un adulto!",
    dato: "El vidrio se puede reciclar infinitas veces sin perder calidad.",
  },
  metal: {
    id: "metal",
    nombre: "Metal",
    contenedor: "Tacho amarillo",
    hex: "#FFC53D",
    textoHex: "#23342B",
    puntos: 20,
    co2PorItem: 0.15,
    aguaPorItem: 4,
    consejo: "Las latas van enjuagadas. Puedes aplastarlas con el pie.",
    dato: "Reciclar una lata ahorra energía para 3 horas de televisión.",
  },
  organico: {
    id: "organico",
    nombre: "Orgánico",
    contenedor: "Tacho marrón",
    hex: "#8C5A2B",
    textoHex: "#FFFFFF",
    puntos: 5,
    co2PorItem: 0.02,
    aguaPorItem: 0,
    consejo: "Cáscaras y restos de fruta pueden volverse compost para plantas.",
    dato: "Con compost, tus cáscaras alimentan a las plantas del jardín.",
  },
  peligroso: {
    id: "peligroso",
    nombre: "Residuo peligroso",
    contenedor: "Tacho rojo",
    hex: "#E5484D",
    textoHex: "#FFFFFF",
    puntos: 25,
    co2PorItem: 0.5,
    aguaPorItem: 0,
    consejo: "¡No lo botes a la basura común! Llévalo a un punto de acopio especial con un adulto.",
    dato: "Una sola pila puede contaminar 600 litros de agua.",
  },
  general: {
    id: "general",
    nombre: "No aprovechable",
    contenedor: "Tacho negro",
    hex: "#3B3B3B",
    textoHex: "#FFFFFF",
    puntos: 3,
    co2PorItem: 0,
    aguaPorItem: 0,
    consejo: "Este residuo no se recicla, pero botarlo en su sitio también ayuda.",
    dato: "Separar bien evita que lo reciclable termine en el relleno sanitario.",
  },
};

export interface ResultadoIdentificacion {
  objeto: string;
  material: MaterialId;
  confianza: number; // 0-100
}

// Ejemplos ilustrados para probar el escáner sin cámara (funcionan offline).
export const EJEMPLOS: { id: string; etiqueta: string; objeto: string; material: MaterialId; emoji: string }[] = [
  { id: "botella", etiqueta: "Botella", objeto: "Botella de plástico PET", material: "plastico", emoji: "🥤" },
  { id: "caja", etiqueta: "Caja", objeto: "Caja de cartón", material: "papel", emoji: "📦" },
  { id: "frasco", etiqueta: "Frasco", objeto: "Frasco de vidrio", material: "vidrio", emoji: "🫙" },
  { id: "lata", etiqueta: "Lata", objeto: "Lata de aluminio", material: "metal", emoji: "🥫" },
  { id: "platano", etiqueta: "Cáscara", objeto: "Cáscara de plátano", material: "organico", emoji: "🍌" },
  { id: "pila", etiqueta: "Pila", objeto: "Pila alcalina AA", material: "peligroso", emoji: "🔋" },
];
