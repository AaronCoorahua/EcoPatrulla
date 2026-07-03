import { NextResponse } from "next/server";
import { mockIdentificar } from "@/lib/mock-vision";
import type { MaterialId, ResultadoIdentificacion } from "@/lib/residuos";

// Identificación de residuos.
// Si existe GEMINI_API_KEY en .env.local se usa la API real de Gemini;
// si no (o si falla), responde el simulador para que la demo nunca se caiga.

const MATERIALES_VALIDOS: MaterialId[] = [
  "plastico", "papel", "vidrio", "metal", "organico", "peligroso", "general",
];

export async function POST(req: Request) {
  let imagen = "";
  let nombreArchivo = "";
  try {
    const body = await req.json();
    imagen = body.imagen ?? "";
    nombreArchivo = body.nombreArchivo ?? "";
  } catch {
    // cuerpo vacío: cae al simulador
  }

  const key = process.env.GEMINI_API_KEY;
  if (key && imagen.startsWith("data:")) {
    try {
      const resultado = await identificarConGemini(imagen, key);
      return NextResponse.json(resultado);
    } catch (err) {
      console.error("Gemini falló, usando simulador:", err);
    }
  }

  // Simulador: pequeña espera para que la experiencia sea realista
  await new Promise((r) => setTimeout(r, 1400));
  return NextResponse.json(mockIdentificar(nombreArchivo));
}

async function identificarConGemini(dataUrl: string, key: string): Promise<ResultadoIdentificacion> {
  const match = dataUrl.match(/^data:(image\/[a-z+.-]+);base64,(.+)$/s);
  if (!match) throw new Error("Formato de imagen inválido");
  const [, mimeType, data] = match;

  const prompt = `Eres un clasificador de residuos domésticos para una app educativa peruana.
Observa la imagen e identifica el residuo principal. Responde SOLO un JSON con esta forma:
{"objeto": "nombre corto del objeto en español", "material": "una de: plastico|papel|vidrio|metal|organico|peligroso|general", "confianza": número entre 0 y 100}
Reglas: pilas/baterías/electrónicos/medicinas => "peligroso". Tecnopor, papel sucio, toallas => "general".`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [
          { parts: [{ inline_data: { mime_type: mimeType, data } }, { text: prompt }] },
        ],
        generationConfig: { response_mime_type: "application/json", temperature: 0.1 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

  const json = await res.json();
  const texto = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const parsed = JSON.parse(texto);

  const material: MaterialId = MATERIALES_VALIDOS.includes(parsed.material)
    ? parsed.material
    : "general";
  return {
    objeto: String(parsed.objeto ?? "Residuo"),
    material,
    confianza: Math.min(100, Math.max(0, Number(parsed.confianza) || 80)),
  };
}
