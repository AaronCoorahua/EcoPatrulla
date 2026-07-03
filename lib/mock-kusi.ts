import { DATOS_CURIOSOS, MINI_RETOS } from "./datos";

// Respuestas simuladas de Kusi para texto libre: se usan cuando no hay
// GEMINI_API_KEY o como respaldo si la llamada real falla.

const alAzar = (lista: string[]) => lista[Math.floor(Math.random() * lista.length)];

const REGLAS: [RegExp, () => string][] = [
  [/pila|bater[ií]a|celular|foco|electr[oó]nico/i, () =>
    "¡Cuidado! Eso es residuo peligroso 🔴. Nunca va a la basura común: llévalo a un punto de acopio especial. En el mapa de la app puedes ver los más cercanos."],
  [/tecnopor|tecknopor|poliestireno/i, () =>
    "El tecnopor va al tacho negro 🖤 porque casi no se puede reciclar. ¡Mejor usa envases reusables cuando puedas!"],
  [/vidrio|frasco|botella de vidrio|copa/i, () =>
    "El vidrio va al tacho verde 💚. Enjuágalo y quítale la tapa. Si está roto, pide ayuda a alguien mayor y envuélvelo en papel."],
  [/botella|pl[aá]stico|pet|taper|bolsa/i, () =>
    "El plástico va al tacho blanco 🤍. Enjuaga la botella y aplástala: así entran 3 veces más en el tacho. ¡Escanéala y gana puntos!"],
  [/papel|cart[oó]n|caja|cuaderno|peri[oó]dico/i, () =>
    "El papel y cartón van al tacho azul 💙. Tienen que estar secos y limpios. Las cajas van desarmadas y planas."],
  [/lata|metal|aluminio|conserva/i, () =>
    "Los metales van al tacho amarillo 💛. Enjuaga la lata y aplástala con el pie. ¡Reciclar una lata ahorra energía para 3 horas de tele!"],
  [/c[aá]scara|fruta|verdura|comida|org[aá]nico|restos/i, () =>
    "Los restos de comida van al tacho marrón 🤎. Y las cáscaras de fruta pueden volverse compost para las plantas 🌱"],
  [/compost|abono/i, () =>
    "¡El compost es magia! Junta cáscaras de fruta en un balde, mezcla con hojas secas y tierra, revuelve cada semana… y en unos meses tendrás abono para tus plantas 🪴"],
  [/pizza/i, () =>
    "La caja de pizza con grasa va al tacho negro, pero la tapa limpia ¡sí se recicla en el azul! 🍕"],
  [/tapita|tapa/i, () =>
    "¡Las tapitas se reciclan súper bien! Júntalas en un frasco: hay campañas que las cambian por ayuda para hospitales 💛"],
  [/co2|clima|planeta|calentamiento|contaminaci[oó]n/i, () =>
    "Cuando reciclas, se gasta menos energía en fabricar cosas nuevas, y eso significa menos humo (CO₂) en el aire 🌎. ¡Cada botella cuenta!"],
  [/reto|desaf[ií]o|misi[oó]n/i, () => alAzar(MINI_RETOS)],
  [/dato|curioso|sab[ií]as/i, () => alAzar(DATOS_CURIOSOS)],
  [/tacho|color|d[oó]nde va|donde va|donde boto/i, () =>
    "Cada color tiene su residuo: blanco plástico 🤍, azul papel 💙, verde vidrio 💚, amarillo metal 💛, marrón orgánico 🤎, rojo peligrosos ❤️ y negro lo que no se aprovecha 🖤."],
  [/hola|buenas|hey|hi/i, () =>
    "¡Hola! 🦙 Qué bueno verte por aquí. Pregúntame sobre reciclaje: por ejemplo, ¿dónde van las pilas?"],
  [/gracias|genial|chévere|chevere|te quiero/i, () =>
    "¡De nada! 💚 Para eso estamos los amigos. ¿Quieres un reto o un dato curioso?"],
  [/qui[eé]n eres|c[oó]mo te llamas|tu nombre/i, () =>
    "Soy Kusi, una llama andina 🦙. Mi nombre significa 'alegre' en quechua, ¡y me alegro mucho cuando reciclas!"],
];

export function mockKusi(mensaje: string): string {
  for (const [regex, respuesta] of REGLAS) {
    if (regex.test(mensaje)) return respuesta();
  }
  return alAzar([
    "¡Uy! Eso todavía lo estoy aprendiendo 🦙 Yo sé un montón de reciclaje: pregúntame dónde va algún residuo, o pídeme un dato curioso.",
    "Mmm, no estoy segura de eso 🌿 Pero si me preguntas sobre tachos, compost o reciclaje, ¡soy experta!",
  ]);
}
