"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { MATERIALES } from "@/lib/residuos";
import { TIPS_KUSI } from "@/lib/datos";
import { rangoActual, rangoSiguiente } from "@/lib/gamificacion";
import { Mascota } from "@/components/Mascota";
import { ListaMisiones } from "@/components/Misiones";
import { CountUp } from "@/components/CountUp";
import { IconoEscanear, IconoFuego, IconoHoja, IconoNube, IconoGota, IconoReciclar, IconoFlecha } from "@/components/Icons";

function tiempoRelativo(fecha: number): string {
  const min = Math.round((Date.now() - fecha) / 60000);
  if (min < 2) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const horas = Math.round(min / 60);
  if (horas < 24) return `hace ${horas} h`;
  const dias = Math.round(horas / 24);
  return dias === 1 ? "ayer" : `hace ${dias} días`;
}

export default function Inicio() {
  const { estado } = useStore();
  const [tip] = useState(() => TIPS_KUSI[Math.floor(Math.random() * TIPS_KUSI.length)]);

  const rango = rangoActual(estado.puntos);
  const siguiente = rangoSiguiente(estado.puntos);
  const avance = siguiente
    ? Math.round(((estado.puntos - rango.min) / (siguiente.min - rango.min)) * 100)
    : 100;

  return (
    <>
      <div className="heroe">
        <div className="saludo-tarjeta">
          <button
            className="mascota-caja mascota-boton"
            onClick={() => window.dispatchEvent(new CustomEvent("abrir-kusi"))}
            aria-label="Habla con Kusi"
            type="button"
          >
            <Mascota animo="feliz" />
            <span className="habla-hint">¡Háblame!</span>
          </button>
          <div>
            <h1>¡Hola, {estado.perfil?.nombre}!</h1>
            <div className="burbuja-tip">Kusi dice: “{tip}”</div>
          </div>
        </div>

        <div className="stats-fila">
          <div className="stat">
            <div className="stat-valor" style={{ color: "var(--verde-oscuro)" }}>
              <CountUp valor={estado.puntos} />
            </div>
            <div className="stat-nombre">EcoPuntos</div>
          </div>
          <div className="stat">
            <div className="stat-valor" style={{ color: "var(--coral)" }}>
              <IconoFuego style={{ width: 18, height: 18, verticalAlign: "-2px" }} /> {estado.racha}
            </div>
            <div className="stat-nombre">Días de racha</div>
          </div>
          <div className="stat">
            <div className="stat-valor" style={{ color: "var(--azul)" }}>{estado.totalEscaneos}</div>
            <div className="stat-nombre">Escaneos</div>
          </div>
          <div className="stat rango-caja">
            <div className="rango-fila">
              <span className="rango-nombre">🛡️ Rango: {rango.nombre}</span>
              {siguiente && (
                <span className="rango-meta">
                  {siguiente.min - estado.puntos} pts para {siguiente.nombre}
                </span>
              )}
            </div>
            <div className="progreso progreso-amarillo">
              <div style={{ width: `${avance}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="seccion">
        <Link href="/escanear" className="boton boton-verde boton-grande">
          <IconoEscanear /> Escanear un residuo
        </Link>
      </div>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>Misiones de hoy</h2>
          <Link href="/retos">Ver retos <IconoFlecha style={{ width: 14, height: 14, verticalAlign: "-2px" }} /></Link>
        </div>
        <ListaMisiones />
      </section>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>Tu huella verde</h2>
          <Link href="/mapa">Ver el mapa</Link>
        </div>
        <div className="impacto-fila">
          <div className="impacto-celda co2">
            <IconoNube style={{ width: 30, height: 30, color: "var(--azul)", flexShrink: 0 }} />
            <div>
              <div className="grande">{estado.co2.toLocaleString("es-PE")} kg</div>
              <div className="chico">de CO₂ evitado</div>
            </div>
          </div>
          <div className="impacto-celda agua">
            <IconoGota style={{ width: 30, height: 30, color: "var(--verde-oscuro)", flexShrink: 0 }} />
            <div>
              <div className="grande">{estado.agua.toLocaleString("es-PE")} L</div>
              <div className="chico">de agua ahorrada</div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>Actividad reciente</h2>
        </div>
        <div className="actividad">
          {estado.escaneos.slice(0, 4).map((e, i) => {
            const mat = MATERIALES[e.material];
            return (
              <div key={`${e.fecha}-${i}`} className="actividad-item">
                <span className="actividad-punto" style={{ background: mat.hex }} />
                <span style={{ fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {e.objeto}
                </span>
                <span className="mas">+{e.puntos}</span>
                <span className="cuando">{tiempoRelativo(e.fecha)}</span>
              </div>
            );
          })}
          {estado.escaneos.length === 0 && (
            <p className="texto-suave centrado" style={{ fontWeight: 700, padding: "12px 0" }}>
              <IconoReciclar style={{ verticalAlign: "-5px" }} /> Aún no hay escaneos. ¡Empieza tu patrulla!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
