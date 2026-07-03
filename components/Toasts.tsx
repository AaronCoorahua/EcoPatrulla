"use client";

import { useStore } from "@/lib/store";

export function Toasts() {
  const { toasts, quitarToast } = useStore();
  if (toasts.length === 0) return null;
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.tipo}`} onClick={() => quitarToast(t.id)} role="status">
          {t.emoji && <span className="toast-emoji">{t.emoji}</span>}
          <div>
            <strong>{t.titulo}</strong>
            {t.detalle && <small>{t.detalle}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}
