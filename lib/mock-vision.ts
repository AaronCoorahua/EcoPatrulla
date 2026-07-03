import type { MaterialId, ResultadoIdentificacion } from "./residuos";

// Identificación simulada: se usa cuando no hay GEMINI_API_KEY configurada
// o como respaldo si la llamada real falla. Intenta adivinar por el nombre
// del archivo; si no, rota entre objetos comunes.

const PISTAS: [RegExp, MaterialId, string][] = [
  [/botella|plastic|pet|envase|taper|bolsa/i, "plastico", "Botella de plástico PET"],
  [/papel|carton|cart[oó]n|caja|box|cuaderno|periodico|revista/i, "papel", "Caja de cartón"],
  [/vidrio|frasco|glass|jar|copa/i, "vidrio", "Frasco de vidrio"],
  [/lata|metal|can|aluminio|conserva|chapa/i, "metal", "Lata de aluminio"],
  [/platano|banana|cascara|c[aá]scara|manzana|fruta|organico|org[aá]nico|comida/i, "organico", "Cáscara de plátano"],
  [/pila|bateria|bater[ií]a|battery|foco|celular/i, "peligroso", "Pila alcalina"],
];

const ROTACION: { material: MaterialId; objeto: string }[] = [
  { material: "plastico", objeto: "Botella de plástico PET" },
  { material: "papel", objeto: "Caja de cartón" },
  { material: "metal", objeto: "Lata de aluminio" },
  { material: "vidrio", objeto: "Frasco de vidrio" },
  { material: "organico", objeto: "Restos de fruta" },
  { material: "plastico", objeto: "Envase de yogurt" },
];

export function mockIdentificar(nombreArchivo: string): ResultadoIdentificacion {
  for (const [regex, material, objeto] of PISTAS) {
    if (regex.test(nombreArchivo)) {
      return { objeto, material, confianza: 90 + Math.floor(Math.random() * 8) };
    }
  }
  const pick = ROTACION[Math.floor(Math.random() * ROTACION.length)];
  return { ...pick, confianza: 84 + Math.floor(Math.random() * 12) };
}
