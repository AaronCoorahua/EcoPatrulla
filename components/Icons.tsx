// Set de iconos propios (trazo redondeado, 24x24) para mantener una
// identidad consistente sin depender de librerías externas.

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconoCasa(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10.5V20h11v-9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function IconoEscanear(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
      <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
      <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function IconoTrofeo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h8v6a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4" />
      <path d="M12 14v3M9 20h6M10 17h4" />
    </svg>
  );
}

export function IconoMapa(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5 4 7v12l5-2 6 2 5-2V5l-5 2-6-2Z" />
      <path d="M9 5v12M15 7v12" />
    </svg>
  );
}

export function IconoCamara(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h3l1.5-2.5h7L17 8h3v11H4V8Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

export function IconoSubir(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 16V5M7.5 9 12 4.5 16.5 9" />
      <path d="M4.5 15.5V19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-3.5" />
    </svg>
  );
}

export function IconoHoja(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13c0-5 4-8.5 14-9-0.5 10-4 15-9 15a5 5 0 0 1-5-6Z" />
      <path d="M5.5 19c3-4.5 6.5-7.5 10-9.5" />
    </svg>
  );
}

export function IconoFuego(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c1 3-3.5 4.5-3.5 9a4.7 4.7 0 0 0 9.4.3c0-2.3-1.4-3.6-2.4-5.3-.6 1-.8 1.7-.7 2.8-1.6-1.4-3-4-2.8-6.8Z" />
    </svg>
  );
}

export function IconoReciclar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m7 9 2.5-4.2a1.6 1.6 0 0 1 2.8 0L14 8.5" />
      <path d="m16.8 9.6 2.4 4.2a1.6 1.6 0 0 1-1.4 2.4H15" />
      <path d="M9.5 19.5H6.2a1.6 1.6 0 0 1-1.4-2.4L6.5 14" />
      <path d="M14 6.5v2h2M17 16.2l-2 .1.1 2M7.5 14.2 6.5 16l1.8 1" />
    </svg>
  );
}

export function IconoCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function IconoGota(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4c3.5 4.2 5.5 7 5.5 9.8a5.5 5.5 0 0 1-11 0C6.5 11 8.5 8.2 12 4Z" />
    </svg>
  );
}

export function IconoNube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6 1.2A3.5 3.5 0 0 1 16.5 18H7Z" />
    </svg>
  );
}

export function IconoPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function IconoEstrella(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m12 4 2.2 4.8 5.2.6-3.9 3.6 1.1 5.2L12 15.5l-4.6 2.7 1.1-5.2L4.6 9.4l5.2-.6L12 4Z" />
    </svg>
  );
}

export function IconoFlecha(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconoEnviar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11 19 4.5 13.5 19l-2.6-6L4.5 11Z" />
      <path d="m11 13 4-4" />
    </svg>
  );
}

export function IconoChat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-6l-4.5 4v-4A2.5 2.5 0 0 1 4.5 13.5v-7Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </svg>
  );
}
