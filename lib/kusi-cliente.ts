import { mockKusi } from "./mock-kusi";

// Cliente del chat: llama a la API interna; si algo falla (sin red,
// servidor caído), responde el simulador local. El chat nunca se queda mudo.

export interface MensajeChat {
  de: "kusi" | "yo";
  texto: string;
}

export async function preguntarAKusi(mensaje: string, historial: MensajeChat[]): Promise<string> {
  try {
    const res = await fetch("/api/kusi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje, historial: historial.slice(-6) }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (typeof json.texto === "string" && json.texto.trim()) return json.texto;
    throw new Error("respuesta vacía");
  } catch {
    await new Promise((r) => setTimeout(r, 700));
    return mockKusi(mensaje);
  }
}
