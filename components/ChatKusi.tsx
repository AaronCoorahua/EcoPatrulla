"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { GUION, RAICES, saludoDeKusi } from "@/lib/kusi-guiones";
import { preguntarAKusi, type MensajeChat } from "@/lib/kusi-cliente";
import { MascotaCara } from "./Mascota";
import { IconoEnviar } from "./Icons";

// Chat con Kusi: conversación guiada con opciones claras (chips) +
// texto libre respondido por IA. Se abre desde el botón flotante o
// haciendo clic en la mascota (evento global "abrir-kusi").

export function ChatKusi() {
  const { estado, charlarConKusi } = useStore();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [opciones, setOpciones] = useState<string[]>([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [texto, setTexto] = useState("");
  const finRef = useRef<HTMLDivElement>(null);
  const saludado = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener("abrir-kusi", abrir);
    return () => window.removeEventListener("abrir-kusi", abrir);
  }, []);

  // Saludo la primera vez que se abre
  useEffect(() => {
    if (!abierto || saludado.current) return;
    saludado.current = true;
    kusiDice(saludoDeKusi(estado.perfil?.nombre ?? "amiguito"), RAICES, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto]);

  // Autoscroll al final
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, escribiendo, opciones, abierto]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const kusiDice = useCallback((textoKusi: string, siguientes: string[], demora = 850) => {
    setOpciones([]);
    setEscribiendo(true);
    timerRef.current = setTimeout(() => {
      setEscribiendo(false);
      setMensajes((m) => [...m, { de: "kusi", texto: textoKusi }]);
      setOpciones(siguientes);
    }, demora);
  }, []);

  const elegirOpcion = (id: string) => {
    const nodo = GUION[id];
    if (!nodo || escribiendo) return;
    setMensajes((m) => [...m, { de: "yo", texto: nodo.etiqueta }]);
    charlarConKusi();
    kusiDice(nodo.respuesta(), nodo.siguientes);
  };

  const enviarTexto = async () => {
    const t = texto.trim();
    if (!t || escribiendo) return;
    setTexto("");
    const historial = [...mensajes];
    setMensajes((m) => [...m, { de: "yo", texto: t }]);
    charlarConKusi();
    setOpciones([]);
    setEscribiendo(true);
    const respuesta = await preguntarAKusi(t, historial);
    setEscribiendo(false);
    setMensajes((m) => [...m, { de: "kusi", texto: respuesta }]);
    setOpciones(RAICES);
  };

  return (
    <>
      {!abierto && (
        <button className="kusi-flotante" onClick={() => setAbierto(true)} aria-label="Habla con Kusi">
          <span className="kusi-carita" aria-hidden="true">
            <MascotaCara style={{ width: 30 }} />
          </span>
          Habla con Kusi
        </button>
      )}

      {abierto && (
        <div className="chat-panel" role="dialog" aria-label="Chat con Kusi">
          <div className="chat-cabecera">
            <span className="kusi-carita" aria-hidden="true">
              <MascotaCara style={{ width: 30 }} />
            </span>
            <div>
              <strong>Kusi</strong>
              <small>Tu guía de reciclaje · siempre en línea 🌿</small>
            </div>
            <button className="chat-cerrar" onClick={() => setAbierto(false)} aria-label="Cerrar chat">
              ✕
            </button>
          </div>

          <div className="chat-mensajes">
            {mensajes.map((m, i) => (
              <div key={i} className={`chat-fila ${m.de}`}>
                {m.de === "kusi" && (
                  <span className="chat-avatar" aria-hidden="true">
                    <MascotaCara style={{ width: 24 }} />
                  </span>
                )}
                <div className="burbuja-chat">{m.texto}</div>
              </div>
            ))}

            {escribiendo && (
              <div className="chat-fila kusi">
                <span className="chat-avatar" aria-hidden="true">
                  <MascotaCara animo="pensando" style={{ width: 24 }} />
                </span>
                <div className="burbuja-chat escribiendo" aria-label="Kusi está escribiendo">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {opciones.length > 0 && !escribiendo && (
              <div className="chat-chips">
                {opciones.map((id, i) => (
                  <button
                    key={id}
                    className="chip-chat"
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={() => elegirOpcion(id)}
                  >
                    {GUION[id].etiqueta}
                  </button>
                ))}
              </div>
            )}
            <div ref={finRef} />
          </div>

          <form
            className="chat-entrada"
            onSubmit={(e) => {
              e.preventDefault();
              enviarTexto();
            }}
          >
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escríbele a Kusi…"
              maxLength={300}
              aria-label="Tu mensaje para Kusi"
            />
            <button type="submit" className="chat-enviar" disabled={!texto.trim() || escribiendo} aria-label="Enviar">
              <IconoEnviar style={{ width: 20, height: 20 }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
