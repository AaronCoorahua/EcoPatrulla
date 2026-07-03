"use client";

import { useStore } from "@/lib/store";
import { MISIONES_HOY } from "@/lib/gamificacion";
import { IconoCheck } from "./Icons";

export function ListaMisiones() {
  const { estado } = useStore();
  return (
    <div>
      {MISIONES_HOY.map((m) => {
        const progreso = Math.min(estado.misiones[m.id] ?? 0, m.meta);
        const completada = progreso >= m.meta;
        return (
          <div key={m.id} className={`mision ${completada ? "completada" : ""}`}>
            <span className="mision-check" aria-hidden="true">
              {completada && <IconoCheck style={{ width: 18, height: 18 }} />}
            </span>
            <div className="mision-cuerpo">
              <strong>{m.titulo}</strong>
              <span className="mision-progreso">
                {completada ? "¡Completada!" : `${progreso} de ${m.meta}`}
              </span>
            </div>
            <span className="mision-bono">+{m.bono}</span>
          </div>
        );
      })}
    </div>
  );
}
