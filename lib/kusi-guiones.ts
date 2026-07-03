import { DATOS_CURIOSOS, MINI_RETOS } from "./datos";

// Conversación guiada del chat de Kusi: opciones claras tipo "chips"
// que llevan a respuestas cortas y cálidas, con siguientes pasos.

export interface NodoGuion {
  etiqueta: string; // texto del chip
  respuesta: () => string;
  siguientes: string[]; // ids de los chips que se ofrecen después
}

const alAzar = (lista: string[]) => lista[Math.floor(Math.random() * lista.length)];

export const RAICES = ["tacho", "dato", "reto", "compost"];
const DESPUES = ["tacho", "dato", "reto"];

export const GUION: Record<string, NodoGuion> = {
  tacho: {
    etiqueta: "¿En qué tacho va…? 🗑️",
    respuesta: () => "¡Buenísima pregunta! Dime qué encontraste y te digo exactamente dónde va 👇",
    siguientes: ["tecnopor", "pilas", "vidrio-roto", "caja-pizza", "tapitas"],
  },
  tecnopor: {
    etiqueta: "Tecnopor",
    respuesta: () =>
      "El tecnopor va al tacho negro (no aprovechable) 🖤. Es muy difícil de reciclar… por eso el mejor truco es pedir menos tecnopor. ¡Tu lonchera reusable es más poderosa!",
    siguientes: DESPUES,
  },
  pilas: {
    etiqueta: "Pilas 🔋",
    respuesta: () =>
      "¡Alerta roja! Las pilas son residuo peligroso: van al tacho rojo o, mejor aún, a un punto de acopio especial. Una sola pila puede contaminar 600 litros de agua 😮. En el mapa te muestro dónde llevarlas.",
    siguientes: DESPUES,
  },
  "vidrio-roto": {
    etiqueta: "Vidrio roto",
    respuesta: () =>
      "El vidrio va al tacho verde 💚, pero si está roto ¡mucho cuidado! Pide ayuda a alguien mayor y envuélvanlo en papel o cartón antes de botarlo, para que nadie se corte.",
    siguientes: DESPUES,
  },
  "caja-pizza": {
    etiqueta: "Caja de pizza 🍕",
    respuesta: () =>
      "¡Truco de experto! La parte con grasa va al tacho negro porque el papel sucio ya no se recicla. Pero la tapa, si está limpia, ¡va al tacho azul! Puedes cortarla y separar las dos partes.",
    siguientes: DESPUES,
  },
  tapitas: {
    etiqueta: "Tapitas",
    respuesta: () =>
      "¡Las tapitas valen oro! 💛 Son de un plástico especial que se recicla muy bien. Júntalas en un frasco y la botella aplastada va al tacho blanco. Hay campañas que las cambian por ayuda para hospitales.",
    siguientes: DESPUES,
  },
  dato: {
    etiqueta: "Cuéntame un dato 🌎",
    respuesta: () => alAzar(DATOS_CURIOSOS),
    siguientes: ["dato", "reto", "tacho"],
  },
  reto: {
    etiqueta: "¡Dame un reto! ⭐",
    respuesta: () => alAzar(MINI_RETOS),
    siguientes: ["reto", "dato", "tacho"],
  },
  compost: {
    etiqueta: "¿Cómo hago compost? 🌱",
    respuesta: () =>
      "¡Me encanta! 1) Consigue un balde con tapa. 2) Echa cáscaras de fruta y verdura (nada de carne). 3) Mezcla con hojas secas y un poco de tierra. 4) Revuelve cada semana. En unos meses tendrás comida para tus plantas 🪴",
    siguientes: DESPUES,
  },
};

export function saludoDeKusi(nombre: string): string {
  const saludos = [
    `¡Hola, ${nombre}! 💚 Soy Kusi, tu llama guía. Pregúntame lo que quieras sobre reciclaje, o elige una opción:`,
    `¡${nombre}! Qué alegría verte 🦙 ¿Qué quieres descubrir hoy?`,
    `¡Hola, ${nombre}! Estaba masticando pasto… 🌿 ¿En qué te ayudo?`,
  ];
  return alAzar(saludos);
}
