// Kusi, la llama guardiana de EcoPatrulla ("kusi" = alegre en quechua).
// Dibujada a mano en SVG, con tres estados de ánimo y grupos animados
// por CSS (ver "Animaciones de Kusi" en globals.css).

export type Animo = "feliz" | "pensando" | "celebrando";

// Solo la cabeza de Kusi: para avatares circulares (chat, botón flotante).
export function MascotaCara({
  animo = "feliz",
  style,
}: {
  animo?: Animo;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="60 3 50 48"
      className={`mascota-svg animo-${animo}`}
      style={style}
      role="img"
      aria-label="Kusi"
    >
      {/* orejas */}
      <path d="M76 22 c-1 -9 3 -13 6 -12 c2 3 2 9 0 13 Z" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
      <path d="M94 22 c1 -9 -3 -13 -6 -12 c-2 3 -2 9 0 13 Z" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
      {/* cabeza */}
      <ellipse cx="85" cy="33" rx="18" ry="15" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
      {/* flequillo */}
      <path d="M75 21 q5 -6 10 -1 q5 -5 9 1" fill="none" stroke="#29382e" strokeWidth="2.5" />
      {/* hocico */}
      <ellipse cx="88" cy="40" rx="8.5" ry="6" fill="#fdf8ec" stroke="#29382e" strokeWidth="2.2" />
      {/* cachetes */}
      <circle cx="74" cy="37" r="3.4" fill="#ffb3a6" opacity="0.75" />
      <circle cx="99" cy="36" r="3" fill="#ffb3a6" opacity="0.75" />
      {animo === "pensando" ? (
        <>
          <path d="M77 29 q2 -2.5 4.5 0" fill="none" stroke="#29382e" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M91 29 q2 -2.5 4.5 0" fill="none" stroke="#29382e" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="88" cy="42" r="2" fill="#29382e" />
        </>
      ) : (
        <>
          <g className="kusi-ojos">
            <circle cx="79" cy="30" r="2.4" fill="#29382e" />
            <circle cx="93" cy="30" r="2.4" fill="#29382e" />
          </g>
          <path d="M85 41 q3 3 6 0" fill="none" stroke="#29382e" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function Mascota({
  animo = "feliz",
  className,
  style,
}: {
  animo?: Animo;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={`mascota-svg animo-${animo} ${className ?? ""}`}
      style={style}
      role="img"
      aria-label="Kusi, la llama de EcoPatrulla"
    >
      <g className="kusi-cuerpo-g">
        {/* patas */}
        <rect x="36" y="112" width="9" height="20" rx="4.5" fill="#f4ead2" stroke="#29382e" strokeWidth="2.5" />
        <rect x="52" y="114" width="9" height="19" rx="4.5" fill="#f4ead2" stroke="#29382e" strokeWidth="2.5" />
        <rect x="70" y="114" width="9" height="19" rx="4.5" fill="#f4ead2" stroke="#29382e" strokeWidth="2.5" />
        <rect x="84" y="112" width="9" height="20" rx="4.5" fill="#f4ead2" stroke="#29382e" strokeWidth="2.5" />
        {/* cola */}
        <circle cx="30" cy="98" r="8" fill="#f4ead2" stroke="#29382e" strokeWidth="2.5" />
        {/* cuerpo */}
        <ellipse cx="62" cy="100" rx="34" ry="23" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
        {/* manta andina sobre el lomo */}
        <path d="M44 82 h26 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-26 a4 4 0 0 1 -4 -4 v-10 a4 4 0 0 1 4 -4 Z" fill="#2e9e6b" stroke="#29382e" strokeWidth="2.5" />
        <path d="M40 89 h34" stroke="#ffc53d" strokeWidth="3" />
        <path d="M40 95 h34" stroke="#ff6b57" strokeWidth="3" />
        {/* cuello */}
        <rect x="74" y="34" width="21" height="70" rx="10.5" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />

        <g className="kusi-cabeza-g">
          {/* orejas */}
          <path className="kusi-oreja" d="M76 22 c-1 -9 3 -13 6 -12 c2 3 2 9 0 13 Z" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
          <path className="kusi-oreja kusi-oreja-der" d="M94 22 c1 -9 -3 -13 -6 -12 c-2 3 -2 9 0 13 Z" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
          {/* cabeza */}
          <ellipse cx="85" cy="33" rx="18" ry="15" fill="#f7efdc" stroke="#29382e" strokeWidth="2.5" />
          {/* flequillo */}
          <path d="M75 21 q5 -6 10 -1 q5 -5 9 1" fill="none" stroke="#29382e" strokeWidth="2.5" />
          {/* hocico */}
          <ellipse cx="88" cy="40" rx="8.5" ry="6" fill="#fdf8ec" stroke="#29382e" strokeWidth="2.2" />
          {/* cachetes */}
          <circle cx="74" cy="37" r="3.4" fill="#ffb3a6" opacity="0.75" />
          <circle cx="99" cy="36" r="3" fill="#ffb3a6" opacity="0.75" />

          {/* ojos y boca según el ánimo */}
          {animo === "feliz" && (
            <>
              <g className="kusi-ojos">
                <circle cx="79" cy="30" r="2.4" fill="#29382e" />
                <circle cx="93" cy="30" r="2.4" fill="#29382e" />
              </g>
              <path d="M85 41 q3 3 6 0" fill="none" stroke="#29382e" strokeWidth="2.2" strokeLinecap="round" />
            </>
          )}
          {animo === "pensando" && (
            <>
              <path d="M77 29 q2 -2.5 4.5 0" fill="none" stroke="#29382e" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M91 29 q2 -2.5 4.5 0" fill="none" stroke="#29382e" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="88" cy="42" r="2" fill="#29382e" />
            </>
          )}
          {animo === "celebrando" && (
            <>
              <path d="M76 30.5 l2.4 -3 2.4 3 M90 30.5 l2.4 -3 2.4 3" fill="none" stroke="#29382e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="88" cy="42" rx="3.2" ry="2.6" fill="#29382e" />
            </>
          )}
        </g>
      </g>

      {/* burbuja de idea (pensando) */}
      {animo === "pensando" && (
        <g className="kusi-burbuja">
          <circle cx="108" cy="16" r="6" fill="#fffdf7" stroke="#29382e" strokeWidth="2" />
          <circle cx="101" cy="24" r="2.4" fill="#fffdf7" stroke="#29382e" strokeWidth="1.8" />
          <path d="M108 13.5 v3 M106.5 16 h3" stroke="#2e9e6b" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {/* confeti (celebrando) */}
      {animo === "celebrando" && (
        <g className="kusi-confeti">
          <circle cx="65" cy="14" r="2.5" fill="#ffc53d" />
          <rect x="103" y="8" width="5" height="5" rx="1.5" fill="#ff6b57" transform="rotate(20 105 10)" />
          <circle cx="112" cy="28" r="2.4" fill="#3e8ede" />
          <rect x="58" y="26" width="4.6" height="4.6" rx="1.4" fill="#2e9e6b" transform="rotate(-15 60 28)" />
        </g>
      )}
    </svg>
  );
}
