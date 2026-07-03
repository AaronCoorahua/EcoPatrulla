"use client";

import { useStore } from "@/lib/store";
import { INSIGNIAS } from "@/lib/gamificacion";
import { FAMILIA, RETO_SEMANAL } from "@/lib/datos";
import { ListaMisiones } from "@/components/Misiones";

const CARAS: Record<string, string> = { llama: "🦙", condor: "🦅", rana: "🐸" };

export default function Retos() {
  const { estado } = useStore();

  const ranking = [
    ...FAMILIA.map((f) => ({ nombre: f.nombre, rol: f.rol, puntos: f.puntos, yo: false })),
    {
      nombre: estado.perfil?.nombre ?? "Tú",
      rol: `Tú ${CARAS[estado.perfil?.avatar ?? "llama"]}`,
      puntos: estado.puntos,
      yo: true,
    },
  ].sort((a, b) => b.puntos - a.puntos);

  const avanceReto = Math.round((RETO_SEMANAL.progreso / RETO_SEMANAL.meta) * 100);
  const logradas = estado.insignias.length;

  return (
    <>
      <h1>Retos y logros</h1>
      <p className="texto-suave" style={{ fontWeight: 700, margin: "4px 0 18px" }}>
        Completa misiones, gana insignias y compite con tu familia.
      </p>

      <div className="tarjeta" style={{ background: "var(--azul-claro)" }}>
        <div className="seccion-titulo" style={{ marginBottom: 8 }}>
          <h2>🌎 {RETO_SEMANAL.titulo}</h2>
          <span style={{ fontFamily: "var(--fuente-titulo)", fontWeight: 800 }}>{avanceReto}%</span>
        </div>
        <p style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 10 }}>{RETO_SEMANAL.descripcion}</p>
        <div className="progreso">
          <div style={{ width: `${avanceReto}%` }} />
        </div>
        <p className="texto-suave" style={{ fontWeight: 700, fontSize: "0.8rem", marginTop: 8 }}>
          {RETO_SEMANAL.progreso.toLocaleString("es-PE")} de {RETO_SEMANAL.meta.toLocaleString("es-PE")} vidrios ·
          ¡cada escaneo tuyo suma!
        </p>
      </div>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>Misiones de hoy</h2>
        </div>
        <ListaMisiones />
      </section>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>Ranking de mi casa</h2>
        </div>
        {ranking.map((r, i) => (
          <div key={r.nombre} className={`ranking-fila ${r.yo ? "yo" : ""}`}>
            <span className="ranking-pos">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</span>
            <span className="ranking-nombre">
              {r.nombre}
              <small>{r.rol}</small>
            </span>
            <span className="ranking-puntos">{r.puntos.toLocaleString("es-PE")} pts</span>
          </div>
        ))}
        <p className="texto-suave centrado" style={{ fontWeight: 700, fontSize: "0.8rem", marginTop: 10 }}>
          Cada residuo que escaneas te acerca al primer puesto 🚀
        </p>
      </section>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>Insignias</h2>
          <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "var(--verde-oscuro)" }}>
            {logradas} de {INSIGNIAS.length}
          </span>
        </div>
        <div className="insignias-grilla">
          {INSIGNIAS.map((ins) => {
            const tiene = estado.insignias.includes(ins.id);
            return (
              <div key={ins.id} className={`insignia ${tiene ? "" : "bloqueada"}`} title={ins.descripcion}>
                <div className="insignia-emoji">{tiene ? ins.emoji : "🔒"}</div>
                <div className="insignia-nombre">{ins.nombre}</div>
                <div className="insignia-desc">{ins.descripcion}</div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
