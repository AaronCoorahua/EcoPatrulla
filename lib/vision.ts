import { mockIdentificar } from "./mock-vision";
import type { ResultadoIdentificacion } from "./residuos";

// Cliente de identificación: llama a la API interna. Si algo sale mal
// (sin red, servidor caído), usa el simulador local: la demo nunca se rompe.

export async function identificarResiduo(
  imagenDataUrl: string | null,
  nombreArchivo?: string
): Promise<ResultadoIdentificacion> {
  try {
    const res = await fetch("/api/identificar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagen: imagenDataUrl, nombreArchivo }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ResultadoIdentificacion;
  } catch {
    await new Promise((r) => setTimeout(r, 1200));
    return mockIdentificar(nombreArchivo ?? "");
  }
}

// Reduce la foto antes de enviarla (más rápido y suficiente para clasificar)
export function reducirImagen(archivo: File, maxLado = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas no disponible"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}
