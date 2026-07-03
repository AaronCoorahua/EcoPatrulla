"use client";

import { useEffect, useRef, useState } from "react";
import { IconoCamara } from "./Icons";

// Captura con la cámara del dispositivo (getUserMedia).
export function CamaraCaptura({
  onCaptura,
  onCerrar,
}: {
  onCaptura: (dataUrl: string) => void;
  onCerrar: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 } },
          audio: false,
        });
        if (cancelado) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch {
        if (!cancelado) setError("No pudimos abrir la cámara. Puedes subir una foto en su lugar.");
      }
    })();
    return () => {
      cancelado = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const tomarFoto = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const escala = Math.min(1, 900 / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * escala);
    canvas.height = Math.round(video.videoHeight * escala);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    onCaptura(canvas.toDataURL("image/jpeg", 0.85));
  };

  if (error) {
    return (
      <div className="tarjeta centrado">
        <p style={{ fontWeight: 700 }}>{error}</p>
        <button className="boton mt-16" onClick={onCerrar}>Volver</button>
      </div>
    );
  }

  return (
    <div className="camara-caja">
      <video ref={videoRef} playsInline muted />
      <div className="camara-controles">
        <button className="boton boton-verde" onClick={tomarFoto}>
          <IconoCamara /> Tomar foto
        </button>
        <button className="boton boton-fantasma" onClick={onCerrar}>Cancelar</button>
      </div>
    </div>
  );
}
