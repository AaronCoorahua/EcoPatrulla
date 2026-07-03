"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore, type ResultadoEscaneo } from "@/lib/store";
import { EJEMPLOS, MATERIALES, type ResultadoIdentificacion } from "@/lib/residuos";
import { identificarResiduo, reducirImagen } from "@/lib/vision";
import { companero } from "@/lib/datos";
import { MascotaAvatar } from "@/components/Mascota";
import { Confeti } from "@/components/Confeti";
import { CamaraCaptura } from "@/components/CamaraCaptura";
import { IconoCamara, IconoSubir, IconoEscanear, IconoCheck, IconoFlecha } from "@/components/Icons";

const MENSAJES_ANALISIS = [
  "Mirando colores y formas…",
  "Preguntando a la IA…",
  "Comparando con miles de residuos…",
  "¡Ya casi lo tengo!",
];

type Paso =
  | { tipo: "elegir" }
  | { tipo: "camara" }
  | { tipo: "analizando"; imagen: string | null; emoji?: string }
  | { tipo: "resultado"; imagen: string | null; emoji?: string; resultado: ResultadoIdentificacion };

function TachoSVG({ color, texto }: { color: string; texto: string }) {
  return (
    <svg viewBox="0 0 64 72" style={{ width: 58, flexShrink: 0 }} aria-hidden="true">
      <rect x="10" y="18" width="44" height="48" rx="7" fill={color} stroke="#29382e" strokeWidth="3" />
      <rect x="6" y="10" width="52" height="10" rx="5" fill={color} stroke="#29382e" strokeWidth="3" />
      <rect x="26" y="4" width="12" height="8" rx="3" fill={color} stroke="#29382e" strokeWidth="3" />
      <path d="M22 28v28M32 28v28M42 28v28" stroke={texto} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export default function Escanear() {
  const { estado, registrarEscaneo } = useStore();
  const comp = companero(estado.perfil?.avatar);
  const avatar = estado.perfil?.avatar ?? "llama";
  const [paso, setPaso] = useState<Paso>({ tipo: "elegir" });
  const [arrastrando, setArrastrando] = useState(false);
  const [mensajeIdx, setMensajeIdx] = useState(0);
  const [celebracion, setCelebracion] = useState<ResultadoEscaneo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotar mensajes mientras se analiza
  useEffect(() => {
    if (paso.tipo !== "analizando") return;
    setMensajeIdx(0);
    const t = setInterval(() => setMensajeIdx((i) => (i + 1) % MENSAJES_ANALISIS.length), 1100);
    return () => clearInterval(t);
  }, [paso.tipo]);

  const analizarImagen = async (dataUrl: string, nombreArchivo: string) => {
    setCelebracion(null);
    setPaso({ tipo: "analizando", imagen: dataUrl });
    const [resultado] = await Promise.all([
      identificarResiduo(dataUrl, nombreArchivo),
      new Promise((r) => setTimeout(r, 2400)), // que se aprecie el escaneo
    ]);
    setPaso({ tipo: "resultado", imagen: dataUrl, resultado });
  };

  const analizarEjemplo = async (id: string) => {
    const ej = EJEMPLOS.find((e) => e.id === id)!;
    setCelebracion(null);
    setPaso({ tipo: "analizando", imagen: null, emoji: ej.emoji });
    await new Promise((r) => setTimeout(r, 2200));
    setPaso({
      tipo: "resultado",
      imagen: null,
      emoji: ej.emoji,
      resultado: { objeto: ej.objeto, material: ej.material, confianza: 92 + Math.floor(Math.random() * 6) },
    });
  };

  const alElegirArchivo = async (archivo: File | undefined | null) => {
    if (!archivo || !archivo.type.startsWith("image/")) return;
    try {
      const dataUrl = await reducirImagen(archivo);
      await analizarImagen(dataUrl, archivo.name);
    } catch {
      // si el archivo no se pudo leer, seguimos en "elegir"
    }
  };

  const confirmarReciclaje = () => {
    if (paso.tipo !== "resultado" || celebracion) return;
    const r = registrarEscaneo(paso.resultado.objeto, paso.resultado.material);
    setCelebracion(r);
  };

  // ── Render por paso ──────────────────────────────────────────────────
  if (paso.tipo === "camara") {
    return (
      <>
        <h1>Apunta al residuo</h1>
        <p className="texto-suave" style={{ fontWeight: 700, margin: "4px 0 16px" }}>
          Centra el objeto y toma la foto.
        </p>
        <CamaraCaptura
          onCaptura={(dataUrl) => analizarImagen(dataUrl, "captura-camara.jpg")}
          onCerrar={() => setPaso({ tipo: "elegir" })}
        />
      </>
    );
  }

  if (paso.tipo === "analizando") {
    return (
      <div className="analizando-caja">
        <div className="analizando-marco">
          {paso.imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={paso.imagen} alt="Residuo en análisis" />
          ) : (
            <div className="marco-vacio">{paso.emoji}</div>
          )}
          <span className="linea-escaner" />
          <span className="esquina tl" /><span className="esquina tr" />
          <span className="esquina bl" /><span className="esquina br" />
        </div>
        <div style={{ width: 90, margin: "0 auto 6px" }}>
          <MascotaAvatar avatar={avatar} animo="pensando" />
        </div>
        <p className="analizando-mensaje">
          <span className="puntitos">{MENSAJES_ANALISIS[mensajeIdx]}</span>
        </p>
      </div>
    );
  }

  if (paso.tipo === "resultado") {
    const mat = MATERIALES[paso.resultado.material];
    return (
      <>
        {celebracion && <Confeti />}
        <div className="tarjeta" style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="resultado-cabeza">
            {paso.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="foto" src={paso.imagen} alt={paso.resultado.objeto} />
            ) : (
              <div className="foto-emoji">{paso.emoji}</div>
            )}
            <div>
              <h1 style={{ fontSize: "1.35rem" }}>{paso.resultado.objeto}</h1>
              <span className="etiqueta" style={{ background: mat.hex, color: mat.textoHex, marginTop: 5 }}>
                {mat.nombre}
              </span>
              <div className="confianza mt-8">La IA está {paso.resultado.confianza}% segura</div>
            </div>
          </div>

          <div className="tacho-panel" style={{ background: `${mat.hex}22` }}>
            <TachoSVG color={mat.hex} texto={mat.textoHex} />
            <div className="tacho-texto">
              <div className="donde">Va en el</div>
              <div className="nombre-tacho">{mat.contenedor}</div>
            </div>
          </div>

          <div className="consejo-kusi">
            <div style={{ width: 46, flexShrink: 0 }}>
              <MascotaAvatar avatar={avatar} animo={celebracion ? "celebrando" : "feliz"} />
            </div>
            <div>
              <strong>{comp.nombre} dice:</strong> {mat.consejo}
              <div className="texto-suave" style={{ fontSize: "0.8rem", marginTop: 4 }}>{mat.dato}</div>
            </div>
          </div>

          {celebracion ? (
            <>
              <div className="puntos-ganados">+{celebracion.puntosGanados} EcoPuntos</div>
              <div className="zona-botones">
                <button className="boton boton-verde" onClick={() => setPaso({ tipo: "elegir" })}>
                  <IconoEscanear /> Escanear otro
                </button>
                <Link href="/" className="boton">
                  Ir al inicio <IconoFlecha />
                </Link>
              </div>
            </>
          ) : (
            <div className="mt-16">
              <button className="boton boton-amarillo boton-grande" onClick={confirmarReciclaje}>
                <IconoCheck /> ¡Ya lo puse en su tacho! (+{mat.puntos})
              </button>
              <div className="centrado mt-12">
                <button className="boton boton-fantasma" onClick={() => setPaso({ tipo: "elegir" })}>
                  Escanear otra cosa
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // Paso "elegir"
  return (
    <>
      <h1>¿Qué encontraste?</h1>
      <p className="texto-suave" style={{ fontWeight: 700, margin: "4px 0 16px" }}>
        Toma una foto del residuo y la IA te dirá en qué tacho va.
      </p>

      <div
        className={`zona-soltar ${arrastrando ? "arrastrando" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setArrastrando(true); }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastrando(false);
          alElegirArchivo(e.dataTransfer.files?.[0]);
        }}
      >
        <div style={{ width: 92, margin: "0 auto 8px" }}>
          <MascotaAvatar avatar={avatar} animo="feliz" />
        </div>
        <p style={{ fontWeight: 800 }}>Arrastra una foto aquí</p>
        <p className="texto-suave" style={{ fontSize: "0.85rem", fontWeight: 700 }}>o usa los botones</p>
        <div className="zona-botones">
          <button className="boton boton-verde" onClick={() => setPaso({ tipo: "camara" })}>
            <IconoCamara /> Usar cámara
          </button>
          <button className="boton" onClick={() => inputRef.current?.click()}>
            <IconoSubir /> Subir foto
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="oculto-visual"
          onChange={(e) => {
            alElegirArchivo(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      <section className="seccion">
        <div className="seccion-titulo">
          <h2>O prueba con un ejemplo</h2>
        </div>
        <div className="ejemplos-grilla">
          {EJEMPLOS.map((ej) => (
            <button key={ej.id} className="ejemplo-boton" onClick={() => analizarEjemplo(ej.id)}>
              <span className="ejemplo-emoji">{ej.emoji}</span>
              {ej.etiqueta}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
