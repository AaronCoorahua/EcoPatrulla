import { NextResponse } from "next/server";
import { mockKusi } from "@/lib/mock-kusi";

// Chat con Kusi. Con GEMINI_API_KEY responde la IA real; sin clave
// (o si falla), responde el simulador basado en reglas.

interface MensajeChat {
  de: "kusi" | "yo";
  texto: string;
}

const PROMPT_KUSI = `Eres Kusi, una llama andina amigable que enseña reciclaje a niños peruanos de 6 a 12 años en la app EcoPatrulla.
Reglas:
- Responde SIEMPRE en español, con tono cálido, alegre y sencillo.
- Máximo 3 frases cortas (unas 50 palabras). Puedes usar 1 o 2 emojis.
- Tus temas: reciclaje, los tachos de colores del Perú (blanco=plástico, azul=papel y cartón, verde=vidrio, amarillo=metales, marrón=orgánicos, rojo=peligrosos, negro=no aprovechables), compost, cuidado del agua y del planeta.
- Si te preguntan algo fuera de esos temas, di con cariño que tú solo sabes de reciclaje y propón una pregunta sobre eso.
- Con residuos peligrosos (pilas, baterías, medicinas) o vidrio roto, recuerda pedir ayuda a una persona mayor.
- Nunca pidas datos personales ni des consejos médicos.`;

export async function POST(req: Request) {
  let mensaje = "";
  let historial: MensajeChat[] = [];
  try {
    const body = await req.json();
    mensaje = String(body.mensaje ?? "").slice(0, 500);
    if (Array.isArray(body.historial)) historial = body.historial.slice(-6);
  } catch {
    // cuerpo inválido: cae al simulador
  }

  if (!mensaje.trim()) {
    return NextResponse.json({ texto: mockKusi("hola") });
  }

  const key = process.env.GEMINI_API_KEY;
  if (key) {
    try {
      const texto = await preguntarAGemini(mensaje, historial, key);
      if (texto) return NextResponse.json({ texto });
    } catch (err) {
      console.error("Gemini (chat) falló, usando simulador:", err);
    }
  }

  // Simulador: pequeña espera para que se sienta natural
  await new Promise((r) => setTimeout(r, 900));
  return NextResponse.json({ texto: mockKusi(mensaje) });
}

async function preguntarAGemini(
  mensaje: string,
  historial: MensajeChat[],
  key: string
): Promise<string> {
  const contents = [
    ...historial.map((m) => ({
      role: m.de === "yo" ? "user" : "model",
      parts: [{ text: m.texto }],
    })),
    { role: "user", parts: [{ text: mensaje }] },
  ];

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: PROMPT_KUSI }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 220 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

  const json = await res.json();
  const texto: string = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return texto.trim();
}
