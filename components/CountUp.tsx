"use client";

import { useEffect, useRef, useState } from "react";

// Número que anima suavemente hacia su nuevo valor.
export function CountUp({ valor, duracion = 700 }: { valor: number; duracion?: number }) {
  const [mostrado, setMostrado] = useState(valor);
  const anterior = useRef(valor);

  useEffect(() => {
    const desde = anterior.current;
    if (desde === valor) return;
    anterior.current = valor;
    const inicio = performance.now();
    let raf = 0;
    const paso = (t: number) => {
      const p = Math.min(1, (t - inicio) / duracion);
      const suave = 1 - Math.pow(1 - p, 3);
      setMostrado(Math.round(desde + (valor - desde) * suave));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [valor, duracion]);

  return <>{mostrado.toLocaleString("es-PE")}</>;
}
