"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { DISTRITOS, PUNTOS_ACOPIO, FACTOR_CO2_POR_KG } from "@/lib/datos";
import type { Capa } from "@/components/MapaVista";

const MapaVista = dynamic(() => import("@/components/MapaVista"), {
  ssr: false,
  loading: () => (
    <div className="mapa-lienzo" style={{ display: "grid", placeItems: "center", fontWeight: 800 }}>
      Cargando mapa…
    </div>
  ),
});

export default function Mapa() {
  const { visitarMapa } = useStore();
  const [capa, setCapa] = useState<Capa>("impacto");
  const [distritoSel, setDistritoSel] = useState<string | null>(null);

  // Visitar el mapa cuenta para la misión del día
  useEffect(() => {
    visitarMapa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { totalKg, totalHogares, co2Ton } = useMemo(() => {
    const totalKg = DISTRITOS.reduce((s, d) => s + d.kgMes, 0);
    const totalHogares = DISTRITOS.reduce((s, d) => s + d.hogares, 0);
    return { totalKg, totalHogares, co2Ton: totalKg * FACTOR_CO2_POR_KG };
  }, []);

  const ordenados = useMemo(() => [...DISTRITOS].sort((a, b) => b.kgMes - a.kgMes), []);

  return (
    <>
      <h1>El mapa de tu ciudad</h1>
      <p className="texto-suave" style={{ fontWeight: 700, margin: "4px 0 16px" }}>
        Mira cuánto recupera cada distrito y dónde llevar tus residuos.
      </p>

      <div className="totales-grilla">
        <div className="stat">
          <div className="stat-valor" style={{ color: "var(--verde-oscuro)" }}>
            {(totalKg / 1000).toLocaleString("es-PE", { maximumFractionDigits: 1 })} t
          </div>
          <div className="stat-nombre">Recuperadas este mes</div>
        </div>
        <div className="stat">
          <div className="stat-valor" style={{ color: "var(--azul)" }}>
            {co2Ton.toLocaleString("es-PE", { maximumFractionDigits: 1 })} t
          </div>
          <div className="stat-nombre">CO₂ evitado</div>
        </div>
      </div>

      <div className="mapa-conmutador">
        <button
          className={`conmutador-boton ${capa === "impacto" ? "activo" : ""}`}
          onClick={() => setCapa("impacto")}
        >
          🌎 Impacto por distrito
        </button>
        <button
          className={`conmutador-boton ${capa === "acopio" ? "activo" : ""}`}
          onClick={() => setCapa("acopio")}
        >
          📍 Puntos de acopio ({PUNTOS_ACOPIO.length})
        </button>
      </div>

      <div className="mapa-layout">
        <div className="mapa-caja">
          <MapaVista capa={capa} distritoSel={distritoSel} onSelectDistrito={setDistritoSel} />
        </div>

        <aside>
          <div className="seccion-titulo" style={{ marginBottom: 10 }}>
            <h2>Ranking de distritos</h2>
          </div>
          <div>
            {ordenados.map((d, i) => (
              <button
                key={d.id}
                className={`distrito-fila ${distritoSel === d.id ? "activo" : ""}`}
                onClick={() => {
                  setCapa("impacto");
                  setDistritoSel(d.id);
                }}
              >
                <span className="ranking-pos">{i + 1}</span>
                <span className="distrito-nombre">{d.nombre}</span>
                <span className="distrito-tend">↑ {d.tendencia}%</span>
                <span className="distrito-kg">{(d.kgMes / 1000).toFixed(1)} t</span>
              </button>
            ))}
          </div>
          <p className="texto-suave" style={{ fontWeight: 700, fontSize: "0.78rem", marginTop: 12 }}>
            {totalHogares.toLocaleString("es-PE")} hogares participan. Panel pensado para el programa de
            segregación de cada municipalidad · datos de demostración.
          </p>
        </aside>
      </div>
    </>
  );
}
