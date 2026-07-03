"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MATERIALES, type MaterialId } from "./residuos";
import { FAMILIA } from "./datos";
import { INSIGNIAS, MISIONES_HOY, type EstadoJuego } from "./gamificacion";

// ── Tipos ─────────────────────────────────────────────────────────────────
export type AvatarId = "llama" | "condor" | "rana";

export interface Perfil {
  nombre: string;
  avatar: AvatarId;
}

export interface Escaneo {
  objeto: string;
  material: MaterialId;
  puntos: number;
  fecha: number;
}

export interface Estado {
  perfil: Perfil | null;
  puntos: number;
  racha: number;
  conteos: Partial<Record<MaterialId, number>>;
  escaneos: Escaneo[];
  totalEscaneos: number;
  misiones: Record<string, number>;
  misionesCobradas: string[];
  insignias: string[];
  mapaVisitado: boolean;
  chatsKusi: number;
  co2: number; // kg
  agua: number; // litros
}

export interface Toast {
  id: number;
  tipo: "insignia" | "mision" | "info";
  titulo: string;
  detalle?: string;
  emoji?: string;
}

// Estado inicial de demo: la cuenta ya tiene historia para que se sienta viva.
// Calibrado para que superar a Mamá Rosa (320 pts) ocurra siempre durante un
// escaneo: los bonos de misión de mapa y chat (+10 y +10) llegan máximo a 315,
// y el primer vidrio escaneado (+15 +15 de misión) cruza los 320 con toast y
// desbloquea "Cristalino" (ya hay 4 vidrios reciclados).
const SEMILLA: Estado = {
  perfil: null,
  puntos: 295,
  racha: 4,
  conteos: { plastico: 14, papel: 9, vidrio: 4, metal: 5, organico: 8, peligroso: 1 },
  escaneos: [
    { objeto: "Botella de plástico PET", material: "plastico", puntos: 10, fecha: Date.now() - 3600_000 * 3 },
    { objeto: "Caja de cartón", material: "papel", puntos: 8, fecha: Date.now() - 3600_000 * 20 },
    { objeto: "Lata de aluminio", material: "metal", puntos: 20, fecha: Date.now() - 3600_000 * 26 },
    { objeto: "Cáscara de plátano", material: "organico", puntos: 5, fecha: Date.now() - 3600_000 * 44 },
  ],
  totalEscaneos: 41,
  misiones: { "escanea-3": 1 },
  misionesCobradas: [],
  insignias: ["primer-escaneo", "racha-3", "puntos-100", "plastico-10", "metal-5", "organico-5", "peligroso-1", "explorador-mapa"],
  mapaVisitado: true,
  chatsKusi: 0,
  co2: 4.6,
  agua: 132,
};

const CLAVE_LS = "ecopatrulla-v1";

// ── Contexto ──────────────────────────────────────────────────────────────
export interface ResultadoEscaneo {
  puntosGanados: number;
  nuevasInsignias: string[];
  misionesCompletadas: string[];
  superasteA: string | null;
}

interface StoreCtx {
  estado: Estado;
  hidratado: boolean;
  toasts: Toast[];
  crearPerfil: (nombre: string, avatar: AvatarId) => void;
  registrarEscaneo: (objeto: string, material: MaterialId) => ResultadoEscaneo;
  visitarMapa: () => void;
  charlarConKusi: () => void;
  reiniciarDemo: () => void;
  quitarToast: (id: number) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

let toastId = 0;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>(SEMILLA);
  const [hidratado, setHidratado] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const estadoRef = useRef(estado);
  estadoRef.current = estado;

  // Cargar de localStorage al montar
  useEffect(() => {
    try {
      const crudo = localStorage.getItem(CLAVE_LS);
      if (crudo) {
        const guardado = JSON.parse(crudo) as Estado;
        setEstado({ ...SEMILLA, ...guardado });
      }
    } catch {
      // estado corrupto: se queda la semilla
    }
    setHidratado(true);
  }, []);

  // Persistir en cada cambio (después de hidratar)
  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(CLAVE_LS, JSON.stringify(estado));
    } catch {
      // sin espacio: la app sigue funcionando en memoria
    }
  }, [estado, hidratado]);

  const empujarToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  const quitarToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const crearPerfil = useCallback((nombre: string, avatar: AvatarId) => {
    setEstado((prev) => ({ ...prev, perfil: { nombre: nombre.trim(), avatar } }));
  }, []);

  const evaluarInsignias = useCallback(
    (e: Estado): string[] => {
      const juego: EstadoJuego = {
        puntos: e.puntos,
        racha: e.racha,
        conteos: e.conteos,
        totalEscaneos: e.totalEscaneos,
        mapaVisitado: e.mapaVisitado,
        primerLugar: e.puntos > Math.max(...FAMILIA.map((f) => f.puntos)),
        chatsKusi: e.chatsKusi,
      };
      return INSIGNIAS.filter((i) => !e.insignias.includes(i.id) && i.logrado(juego)).map((i) => i.id);
    },
    []
  );

  const registrarEscaneo = useCallback(
    (objeto: string, material: MaterialId): ResultadoEscaneo => {
      const prev = estadoRef.current;
      const mat = MATERIALES[material];
      let puntosGanados = mat.puntos;

      const conteos = { ...prev.conteos, [material]: (prev.conteos[material] ?? 0) + 1 };
      const misiones = { ...prev.misiones };
      misiones["escanea-3"] = (misiones["escanea-3"] ?? 0) + 1;
      if (material === "vidrio") misiones["vidrio-1"] = (misiones["vidrio-1"] ?? 0) + 1;

      // Bonos de misiones recién completadas
      const misionesCompletadas: string[] = [];
      const misionesCobradas = [...prev.misionesCobradas];
      for (const m of MISIONES_HOY) {
        const progreso = misiones[m.id] ?? 0;
        if (progreso >= m.meta && !misionesCobradas.includes(m.id)) {
          misionesCobradas.push(m.id);
          misionesCompletadas.push(m.id);
          puntosGanados += m.bono;
        }
      }

      const adultosAntes = FAMILIA.filter((f) => f.esAdulto && prev.puntos <= f.puntos);

      const nuevo: Estado = {
        ...prev,
        puntos: prev.puntos + puntosGanados,
        conteos,
        misiones,
        misionesCobradas,
        totalEscaneos: prev.totalEscaneos + 1,
        escaneos: [{ objeto, material, puntos: mat.puntos, fecha: Date.now() }, ...prev.escaneos].slice(0, 12),
        co2: +(prev.co2 + mat.co2PorItem).toFixed(2),
        agua: +(prev.agua + mat.aguaPorItem).toFixed(1),
      };

      const nuevasInsignias = evaluarInsignias(nuevo);
      nuevo.insignias = [...nuevo.insignias, ...nuevasInsignias];

      const superado = adultosAntes.find((f) => nuevo.puntos > f.puntos);

      // Sincronizar el ref de inmediato: llamadas consecutivas en el mismo
      // tick (p. ej. StrictMode o doble clic) ven el estado ya actualizado.
      estadoRef.current = nuevo;
      setEstado(nuevo);

      // Toasts de celebración
      for (const id of nuevasInsignias) {
        const ins = INSIGNIAS.find((i) => i.id === id)!;
        empujarToast({ tipo: "insignia", titulo: `¡Insignia: ${ins.nombre}!`, detalle: ins.descripcion, emoji: ins.emoji });
      }
      for (const id of misionesCompletadas) {
        const m = MISIONES_HOY.find((x) => x.id === id)!;
        empujarToast({ tipo: "mision", titulo: "¡Misión cumplida!", detalle: `${m.titulo} · +${m.bono} bonus`, emoji: "✅" });
      }
      if (superado) {
        empujarToast({ tipo: "info", titulo: `¡Superaste a ${superado.rol}!`, detalle: "¡Toda tu casa te aplaude!", emoji: "🏆" });
      }

      return {
        puntosGanados,
        nuevasInsignias,
        misionesCompletadas,
        superasteA: superado ? superado.rol : null,
      };
    },
    [empujarToast, evaluarInsignias]
  );

  const visitarMapa = useCallback(() => {
    const prev = estadoRef.current;
    if ((prev.misiones["mapa-1"] ?? 0) >= 1 && prev.mapaVisitado) return;
    const misiones = { ...prev.misiones, "mapa-1": 1 };
    const misionesCobradas = [...prev.misionesCobradas];
    let puntos = prev.puntos;
    const m = MISIONES_HOY.find((x) => x.id === "mapa-1")!;
    if (!misionesCobradas.includes("mapa-1")) {
      misionesCobradas.push("mapa-1");
      puntos += m.bono;
      empujarToast({ tipo: "mision", titulo: "¡Misión cumplida!", detalle: `${m.titulo} · +${m.bono} bonus`, emoji: "✅" });
    }
    const nuevo: Estado = { ...prev, mapaVisitado: true, misiones, misionesCobradas, puntos };
    const nuevas = evaluarInsignias(nuevo);
    nuevo.insignias = [...nuevo.insignias, ...nuevas];
    estadoRef.current = nuevo;
    setEstado(nuevo);
  }, [empujarToast, evaluarInsignias]);

  const charlarConKusi = useCallback(() => {
    const prev = estadoRef.current;
    const misiones = { ...prev.misiones, "kusi-1": Math.max(prev.misiones["kusi-1"] ?? 0, 1) };
    const misionesCobradas = [...prev.misionesCobradas];
    let puntos = prev.puntos;
    if (!misionesCobradas.includes("kusi-1")) {
      const m = MISIONES_HOY.find((x) => x.id === "kusi-1")!;
      misionesCobradas.push("kusi-1");
      puntos += m.bono;
      empujarToast({ tipo: "mision", titulo: "¡Misión cumplida!", detalle: `${m.titulo} · +${m.bono} bonus`, emoji: "✅" });
    }
    const nuevo: Estado = { ...prev, chatsKusi: prev.chatsKusi + 1, misiones, misionesCobradas, puntos };
    const nuevas = evaluarInsignias(nuevo);
    nuevo.insignias = [...nuevo.insignias, ...nuevas];
    for (const id of nuevas) {
      const ins = INSIGNIAS.find((i) => i.id === id)!;
      empujarToast({ tipo: "insignia", titulo: `¡Insignia: ${ins.nombre}!`, detalle: ins.descripcion, emoji: ins.emoji });
    }
    estadoRef.current = nuevo;
    setEstado(nuevo);
  }, [empujarToast, evaluarInsignias]);

  const reiniciarDemo = useCallback(() => {
    localStorage.removeItem(CLAVE_LS);
    setEstado(SEMILLA);
  }, []);

  return (
    <Ctx.Provider
      value={{ estado, hidratado, toasts, crearPerfil, registrarEscaneo, visitarMapa, charlarConKusi, reiniciarDemo, quitarToast }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
