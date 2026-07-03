"use client";

import { useState } from "react";
import { useStore, type AvatarId } from "@/lib/store";
import { Mascota } from "./Mascota";

const AVATARES: { id: AvatarId; nombre: string; cara: string }[] = [
  { id: "llama", nombre: "Llama", cara: "🦙" },
  { id: "condor", nombre: "Cóndor", cara: "🦅" },
  { id: "rana", nombre: "Rana", cara: "🐸" },
];

export function Onboarding() {
  const { crearPerfil } = useStore();
  const [nombre, setNombre] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("llama");

  const listo = nombre.trim().length >= 2;
  const elegido = AVATARES.find((a) => a.id === avatar)!;

  return (
    <div className="onboarding-fondo">
      <div className="tarjeta onboarding-tarjeta">
        {avatar === "llama" ? (
          <div key="llama" className="companero-grande" style={{ background: "transparent", border: "none" }}>
            <Mascota animo="feliz" style={{ width: 116 }} />
          </div>
        ) : (
          <div key={avatar} className="companero-grande" role="img" aria-label={elegido.nombre}>
            {elegido.cara}
          </div>
        )}
        <h1 style={{ marginTop: 6 }}>¡Hola! Soy Kusi</h1>
        <p className="texto-suave" style={{ fontWeight: 700, marginTop: 4 }}>
          Bienvenido a la EcoPatrulla. ¿Cómo te llamas, futuro guardián del planeta?
        </p>
        <div className="mt-16">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe tu nombre"
            maxLength={18}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && listo && crearPerfil(nombre, avatar)}
          />
        </div>
        <p style={{ fontWeight: 800, fontSize: "0.85rem", marginTop: 14 }}>Elige tu compañero:</p>
        <div className="avatares">
          {AVATARES.map((a) => (
            <button
              key={a.id}
              className={`avatar-opcion ${avatar === a.id ? "elegido" : ""}`}
              onClick={() => setAvatar(a.id)}
              type="button"
            >
              <div className="avatar-cara">{a.cara}</div>
              {a.nombre}
            </button>
          ))}
        </div>
        <button
          className="boton boton-verde boton-grande mt-16"
          disabled={!listo}
          onClick={() => crearPerfil(nombre, avatar)}
        >
          ¡A patrullar!
        </button>
      </div>
    </div>
  );
}
