"use client";

import { StoreProvider, useStore } from "@/lib/store";
import { Cabecera, BarraInferior } from "./Nav";
import { Toasts } from "./Toasts";
import { Onboarding } from "./Onboarding";
import { ChatKusi } from "./ChatKusi";

function Compuerta({ children }: { children: React.ReactNode }) {
  const { estado, hidratado, reiniciarDemo } = useStore();

  if (!hidratado) {
    return <div className="splash">Cargando EcoPatrulla…</div>;
  }
  if (!estado.perfil) {
    return <Onboarding />;
  }
  return (
    <>
      <Cabecera />
      <main className="marco">
        {children}
        <footer className="pie">
          <span>EcoPatrulla · Hackathon QuipuSoft 2026 · Datos de demostración</span>
          <button onClick={() => reiniciarDemo()} type="button">
            Reiniciar demo
          </button>
        </footer>
      </main>
      <BarraInferior />
      <ChatKusi />
      <Toasts />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Compuerta>{children}</Compuerta>
    </StoreProvider>
  );
}
