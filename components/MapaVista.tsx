"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DISTRITOS, PUNTOS_ACOPIO } from "@/lib/datos";
import { MATERIALES } from "@/lib/residuos";

export type Capa = "impacto" | "acopio";

interface Props {
  capa: Capa;
  distritoSel: string | null;
  onSelectDistrito: (id: string) => void;
}

const PIN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="#29382e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m7 9 2.5-4.2a1.6 1.6 0 0 1 2.8 0L14 8.5"/><path d="m16.8 9.6 2.4 4.2a1.6 1.6 0 0 1-1.4 2.4H15"/><path d="M9.5 19.5H6.2a1.6 1.6 0 0 1-1.4-2.4L6.5 14"/></svg>`;

export default function MapaVista({ capa, distritoSel, onSelectDistrito }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<L.Map | null>(null);
  const capaImpactoRef = useRef<L.LayerGroup | null>(null);
  const capaAcopioRef = useRef<L.LayerGroup | null>(null);
  const marcadoresRef = useRef<Record<string, L.Marker>>({});
  const onSelectRef = useRef(onSelectDistrito);
  onSelectRef.current = onSelectDistrito;

  // Crear el mapa una sola vez
  useEffect(() => {
    if (!divRef.current || mapaRef.current) return;

    const mapa = L.map(divRef.current, {
      center: [-12.07, -77.0],
      zoom: 11,
      scrollWheelZoom: true,
    });
    mapaRef.current = mapa;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
      maxZoom: 18,
    }).addTo(mapa);

    // ── Capa: impacto por distrito ──
    const maxKg = Math.max(...DISTRITOS.map((d) => d.kgMes));
    const impacto = L.layerGroup();
    for (const d of DISTRITOS) {
      const diametro = Math.round(38 + (d.kgMes / maxKg) * 34);
      const icono = L.divIcon({
        className: "",
        html: `<div class="burbuja-distrito" style="width:${diametro}px;height:${diametro}px;font-size:${diametro > 55 ? 14 : 11.5}px">${(d.kgMes / 1000).toFixed(1)}t</div>`,
        iconSize: [diametro, diametro],
        iconAnchor: [diametro / 2, diametro / 2],
      });
      const marcador = L.marker([d.lat, d.lng], { icon: icono }).bindPopup(
        `<div class="popup-titulo">${d.nombre}</div>
         <div class="popup-dato">♻️ ${d.kgMes.toLocaleString("es-PE")} kg recuperados este mes</div>
         <div class="popup-dato">🏠 ${d.hogares.toLocaleString("es-PE")} hogares participan</div>
         <div class="popup-dato">📈 +${d.tendencia}% vs. mes anterior</div>`
      );
      marcador.on("click", () => onSelectRef.current(d.id));
      marcadoresRef.current[d.id] = marcador;
      impacto.addLayer(marcador);
    }
    capaImpactoRef.current = impacto;

    // ── Capa: puntos de acopio ──
    const acopio = L.layerGroup();
    for (const p of PUNTOS_ACOPIO) {
      const icono = L.divIcon({
        className: "",
        html: `<div class="marcador-acopio">${PIN_SVG}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 30],
      });
      const chips = p.materiales
        .map((m) => {
          const mat = MATERIALES[m];
          return `<span class="etiqueta" style="background:${mat.hex};color:${mat.textoHex}">${mat.nombre}</span>`;
        })
        .join("");
      acopio.addLayer(
        L.marker([p.lat, p.lng], { icon: icono }).bindPopup(
          `<div class="popup-titulo">${p.nombre}</div>
           <div class="popup-dato">🕐 ${p.horario}</div>
           <div class="popup-chips">${chips}</div>`
        )
      );
    }
    capaAcopioRef.current = acopio;

    impacto.addTo(mapa);

    return () => {
      mapa.remove();
      mapaRef.current = null;
      marcadoresRef.current = {};
    };
  }, []);

  // Alternar capas
  useEffect(() => {
    const mapa = mapaRef.current;
    const impacto = capaImpactoRef.current;
    const acopio = capaAcopioRef.current;
    if (!mapa || !impacto || !acopio) return;
    if (capa === "impacto") {
      mapa.removeLayer(acopio);
      impacto.addTo(mapa);
    } else {
      mapa.removeLayer(impacto);
      acopio.addTo(mapa);
    }
  }, [capa]);

  // Volar al distrito seleccionado
  useEffect(() => {
    if (!distritoSel) return;
    const mapa = mapaRef.current;
    const marcador = marcadoresRef.current[distritoSel];
    const d = DISTRITOS.find((x) => x.id === distritoSel);
    if (!mapa || !d) return;
    mapa.flyTo([d.lat, d.lng], 13, { duration: 0.9 });
    if (marcador && capa === "impacto") {
      setTimeout(() => marcador.openPopup(), 950);
    }
  }, [distritoSel, capa]);

  return <div ref={divRef} className="mapa-lienzo" />;
}
