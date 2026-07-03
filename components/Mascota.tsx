// Mascotas de EcoPatrulla, dibujadas a mano en SVG con tres estados de ánimo
// y grupos animados por CSS (ver "Animaciones de Kusi" en globals.css).
//   · Kusi   — la llama  ("kusi" = alegre en quechua)
//   · Illa   — el cóndor ("illa" = luz/amuleto)
//   · Wayra  — la rana   ("wayra" = viento)
// Todas comparten las clases kusi-* para heredar respiración, parpadeo y ladeo,
// y añaden animaciones propias por especie (aleteo, salto).

import type { AvatarId } from "@/lib/store";

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

// Solo la cabeza de Illa (cóndor): para avatares circulares.
export function CondorCara({
  animo = "feliz",
  style,
}: {
  animo?: Animo;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="34 14 56 56"
      className={`mascota-svg animo-${animo}`}
      style={style}
      role="img"
      aria-label="Illa"
    >
      {/* collar blanco */}
      <path d="M46 62 q16 12 32 0 q-4 12 -16 12 q-12 0 -16 -12 Z" fill="#f7f3e8" stroke="#20242f" strokeWidth="2.4" strokeLinejoin="round" />
      {/* cabeza */}
      <ellipse cx="62" cy="46" rx="16" ry="15" fill="#5a4632" stroke="#20242f" strokeWidth="2.5" />
      {/* cresta */}
      <path d="M62 31 q-4 -8 0 -12 q4 4 0 12" fill="#7a3b2e" stroke="#20242f" strokeWidth="2.2" strokeLinejoin="round" />
      {/* cachetes */}
      <circle cx="52" cy="50" r="3" fill="#ffb3a6" opacity="0.6" />
      <circle cx="72" cy="50" r="3" fill="#ffb3a6" opacity="0.6" />
      {/* pico */}
      <path d="M56 50 h12 l-3 8 q-3 3 -6 0 Z" fill="#e9a13c" stroke="#20242f" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M56 50 q6 3 12 0" fill="none" stroke="#20242f" strokeWidth="1.6" />
      {animo === "pensando" ? (
        <>
          <path d="M52 43 q3 -2.5 5.5 0" fill="none" stroke="#20242f" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M66 43 q3 -2.5 5.5 0" fill="none" stroke="#20242f" strokeWidth="2.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <g className="kusi-ojos">
            <circle cx="55" cy="44" r="2.6" fill="#20242f" />
            <circle cx="69" cy="44" r="2.6" fill="#20242f" />
          </g>
          <path d="M50 39 q5 -3 9 0 M65 39 q5 -3 9 0" fill="none" stroke="#20242f" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// Solo la cabeza de Wayra (rana): para avatares circulares.
export function RanaCara({
  animo = "feliz",
  style,
}: {
  animo?: Animo;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="30 24 64 62"
      className={`mascota-svg animo-${animo}`}
      style={style}
      role="img"
      aria-label="Wayra"
    >
      {/* cabeza */}
      <ellipse cx="62" cy="60" rx="28" ry="22" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
      {/* cachetes */}
      <circle cx="40" cy="66" r="4" fill="#ffb3a6" opacity="0.7" />
      <circle cx="84" cy="66" r="4" fill="#ffb3a6" opacity="0.7" />
      {/* ojos saltones */}
      <g className="rana-ojo">
        <circle cx="46" cy="40" r="12" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
        <circle cx="46" cy="40" r="7.5" fill="#fdf8ec" stroke="#1f5a3a" strokeWidth="1.6" />
      </g>
      <g className="rana-ojo">
        <circle cx="78" cy="40" r="12" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
        <circle cx="78" cy="40" r="7.5" fill="#fdf8ec" stroke="#1f5a3a" strokeWidth="1.6" />
      </g>
      {animo === "pensando" ? (
        <>
          <circle cx="49" cy="42" r="3.2" fill="#1f2b22" />
          <circle cx="81" cy="42" r="3.2" fill="#1f2b22" />
          <path d="M52 70 q10 4 20 -2" fill="none" stroke="#1f5a3a" strokeWidth="2.6" strokeLinecap="round" />
        </>
      ) : (
        <>
          <g className="kusi-ojos">
            <circle cx="47" cy="41" r="3.4" fill="#1f2b22" />
            <circle cx="79" cy="41" r="3.4" fill="#1f2b22" />
            <circle cx="48.5" cy="39.5" r="1.2" fill="#fff" />
            <circle cx="80.5" cy="39.5" r="1.2" fill="#fff" />
          </g>
          <path d="M50 68 q12 10 24 0" fill="none" stroke="#1f5a3a" strokeWidth="2.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// Selector de cabeza según el avatar (para avatares circulares del chat).
export function MascotaCaraAvatar({
  avatar,
  animo = "feliz",
  style,
}: {
  avatar: AvatarId;
  animo?: Animo;
  style?: React.CSSProperties;
}) {
  if (avatar === "condor") return <CondorCara animo={animo} style={style} />;
  if (avatar === "rana") return <RanaCara animo={animo} style={style} />;
  return <MascotaCara animo={animo} style={style} />;
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

// ── Illa, el cóndor ─────────────────────────────────────────────────────────
export function Condor({
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
      aria-label="Illa, el cóndor de EcoPatrulla"
    >
      <g className="kusi-cuerpo-g">
        {/* ala izquierda */}
        <g className="condor-ala condor-ala-izq">
          <path d="M52 78 C24 62 8 70 4 86 C22 82 34 88 46 100 C40 90 44 84 52 84 Z" fill="#3a3f52" stroke="#20242f" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M14 80 l8 6 M26 80 l7 8 M38 84 l6 8" stroke="#20242f" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* ala derecha */}
        <g className="condor-ala condor-ala-der">
          <path d="M72 78 C100 62 116 70 120 86 C102 82 90 88 78 100 C84 90 80 84 72 84 Z" fill="#3a3f52" stroke="#20242f" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M110 80 l-8 6 M98 80 l-7 8 M86 84 l-6 8" stroke="#20242f" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* patas */}
        <rect x="54" y="112" width="6" height="16" rx="3" fill="#e9a13c" stroke="#20242f" strokeWidth="2.2" />
        <rect x="64" y="112" width="6" height="16" rx="3" fill="#e9a13c" stroke="#20242f" strokeWidth="2.2" />
        <path d="M50 128 h12 M60 128 h12" stroke="#e9a13c" strokeWidth="3" strokeLinecap="round" />
        {/* cola */}
        <path d="M52 108 l10 20 l10 -20 Z" fill="#2c303e" stroke="#20242f" strokeWidth="2.5" strokeLinejoin="round" />
        {/* cuerpo */}
        <ellipse cx="62" cy="96" rx="24" ry="26" fill="#3a3f52" stroke="#20242f" strokeWidth="2.5" />
        {/* pecho (plumón claro) */}
        <ellipse cx="62" cy="98" rx="14" ry="17" fill="#f4f0e6" stroke="#20242f" strokeWidth="2" />

        <g className="kusi-cabeza-g">
          {/* collar blanco */}
          <path d="M46 62 q16 12 32 0 q-4 12 -16 12 q-12 0 -16 -12 Z" fill="#f7f3e8" stroke="#20242f" strokeWidth="2.4" strokeLinejoin="round" />
          {/* cabeza */}
          <ellipse cx="62" cy="46" rx="16" ry="15" fill="#5a4632" stroke="#20242f" strokeWidth="2.5" />
          {/* cresta / carúncula */}
          <path d="M62 31 q-4 -8 0 -12 q4 4 0 12" fill="#7a3b2e" stroke="#20242f" strokeWidth="2.2" strokeLinejoin="round" />
          {/* cachetes rosados */}
          <circle cx="52" cy="50" r="3" fill="#ffb3a6" opacity="0.6" />
          <circle cx="72" cy="50" r="3" fill="#ffb3a6" opacity="0.6" />
          {/* pico */}
          <path d="M56 50 h12 l-3 8 q-3 3 -6 0 Z" fill="#e9a13c" stroke="#20242f" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M56 50 q6 3 12 0" fill="none" stroke="#20242f" strokeWidth="1.6" />

          {/* ojos y cejas según el ánimo */}
          {animo === "feliz" && (
            <>
              <g className="kusi-ojos">
                <circle cx="55" cy="44" r="2.6" fill="#20242f" />
                <circle cx="69" cy="44" r="2.6" fill="#20242f" />
              </g>
              <path d="M50 39 q5 -3 9 0 M65 39 q5 -3 9 0" fill="none" stroke="#20242f" strokeWidth="2.2" strokeLinecap="round" />
            </>
          )}
          {animo === "pensando" && (
            <>
              <path d="M52 43 q3 -2.5 5.5 0" fill="none" stroke="#20242f" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M66 43 q3 -2.5 5.5 0" fill="none" stroke="#20242f" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M50 39 q5 -2 9 -3" fill="none" stroke="#20242f" strokeWidth="2.2" strokeLinecap="round" />
            </>
          )}
          {animo === "celebrando" && (
            <>
              <path d="M51.5 44.5 l3 -3.5 3 3.5 M63.5 44.5 l3 -3.5 3 3.5" fill="none" stroke="#20242f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </g>
      </g>

      {/* burbuja de idea (pensando) */}
      {animo === "pensando" && (
        <g className="kusi-burbuja">
          <circle cx="102" cy="20" r="6" fill="#fffdf7" stroke="#20242f" strokeWidth="2" />
          <circle cx="95" cy="28" r="2.4" fill="#fffdf7" stroke="#20242f" strokeWidth="1.8" />
          <path d="M102 17.5 v3 M100.5 20 h3" stroke="#2e9e6b" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {/* confeti (celebrando) */}
      {animo === "celebrando" && (
        <g className="kusi-confeti">
          <circle cx="30" cy="20" r="2.5" fill="#ffc53d" />
          <rect x="92" y="14" width="5" height="5" rx="1.5" fill="#ff6b57" transform="rotate(20 94 16)" />
          <circle cx="100" cy="34" r="2.4" fill="#3e8ede" />
          <rect x="24" y="36" width="4.6" height="4.6" rx="1.4" fill="#2e9e6b" transform="rotate(-15 26 38)" />
        </g>
      )}
    </svg>
  );
}

// ── Wayra, la rana ──────────────────────────────────────────────────────────
export function Rana({
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
      aria-label="Wayra, la rana de EcoPatrulla"
    >
      <g className="kusi-cuerpo-g">
        {/* patas traseras (dobladas, listas para saltar) */}
        <path className="rana-pata rana-pata-izq" d="M34 100 q-14 4 -16 20 q-1 8 6 10 q4 -12 14 -16 Z" fill="#4bbf73" stroke="#1f5a3a" strokeWidth="2.5" strokeLinejoin="round" />
        <path className="rana-pata rana-pata-der" d="M90 100 q14 4 16 20 q1 8 -6 10 q-4 -12 -14 -16 Z" fill="#4bbf73" stroke="#1f5a3a" strokeWidth="2.5" strokeLinejoin="round" />
        {/* pies palmeados */}
        <path d="M20 128 q-4 6 2 8 q4 -1 6 -6 M14 126 q-4 5 0 8" fill="none" stroke="#1f5a3a" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M100 128 q4 6 -2 8 q-4 -1 -6 -6 M106 126 q4 5 0 8" fill="none" stroke="#1f5a3a" strokeWidth="2.2" strokeLinecap="round" />
        {/* patas delanteras */}
        <path d="M44 116 q-4 10 -2 16 q3 3 6 0 q0 -8 4 -14 Z" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.3" strokeLinejoin="round" />
        <path d="M80 116 q4 10 2 16 q-3 3 -6 0 q0 -8 -4 -14 Z" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.3" strokeLinejoin="round" />
        {/* cuerpo */}
        <ellipse cx="62" cy="100" rx="30" ry="24" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
        {/* barriga clara */}
        <ellipse cx="62" cy="106" rx="18" ry="14" fill="#e8f7d8" stroke="#1f5a3a" strokeWidth="2" />

        <g className="kusi-cabeza-g">
          {/* cabeza */}
          <ellipse cx="62" cy="60" rx="28" ry="22" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
          {/* cachetes */}
          <circle cx="40" cy="66" r="4" fill="#ffb3a6" opacity="0.7" />
          <circle cx="84" cy="66" r="4" fill="#ffb3a6" opacity="0.7" />

          {/* ojos saltones (globos) */}
          <g className="rana-ojo">
            <circle cx="46" cy="40" r="12" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
            <circle cx="46" cy="40" r="7.5" fill="#fdf8ec" stroke="#1f5a3a" strokeWidth="1.6" />
          </g>
          <g className="rana-ojo">
            <circle cx="78" cy="40" r="12" fill="#57ce80" stroke="#1f5a3a" strokeWidth="2.5" />
            <circle cx="78" cy="40" r="7.5" fill="#fdf8ec" stroke="#1f5a3a" strokeWidth="1.6" />
          </g>

          {/* pupilas y boca según el ánimo */}
          {animo === "feliz" && (
            <>
              <g className="kusi-ojos">
                <circle cx="47" cy="41" r="3.4" fill="#1f2b22" />
                <circle cx="79" cy="41" r="3.4" fill="#1f2b22" />
                <circle cx="48.5" cy="39.5" r="1.2" fill="#fff" />
                <circle cx="80.5" cy="39.5" r="1.2" fill="#fff" />
              </g>
              <path d="M50 68 q12 10 24 0" fill="none" stroke="#1f5a3a" strokeWidth="2.6" strokeLinecap="round" />
            </>
          )}
          {animo === "pensando" && (
            <>
              <circle cx="49" cy="42" r="3.2" fill="#1f2b22" />
              <circle cx="81" cy="42" r="3.2" fill="#1f2b22" />
              <path d="M52 70 q10 4 20 -2" fill="none" stroke="#1f5a3a" strokeWidth="2.6" strokeLinecap="round" />
            </>
          )}
          {animo === "celebrando" && (
            <>
              <g className="kusi-ojos">
                <circle cx="47" cy="41" r="3.4" fill="#1f2b22" />
                <circle cx="79" cy="41" r="3.4" fill="#1f2b22" />
                <circle cx="48.5" cy="39.5" r="1.2" fill="#fff" />
                <circle cx="80.5" cy="39.5" r="1.2" fill="#fff" />
              </g>
              <path d="M48 66 q14 14 28 0 q-14 6 -28 0 Z" fill="#c0426a" stroke="#1f5a3a" strokeWidth="2.4" strokeLinejoin="round" />
            </>
          )}
        </g>
      </g>

      {/* burbuja de idea (pensando) */}
      {animo === "pensando" && (
        <g className="kusi-burbuja">
          <circle cx="102" cy="22" r="6" fill="#fffdf7" stroke="#1f5a3a" strokeWidth="2" />
          <circle cx="95" cy="30" r="2.4" fill="#fffdf7" stroke="#1f5a3a" strokeWidth="1.8" />
          <path d="M102 19.5 v3 M100.5 22 h3" stroke="#2e9e6b" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {/* confeti (celebrando) */}
      {animo === "celebrando" && (
        <g className="kusi-confeti">
          <circle cx="30" cy="18" r="2.5" fill="#ffc53d" />
          <rect x="92" y="12" width="5" height="5" rx="1.5" fill="#ff6b57" transform="rotate(20 94 14)" />
          <circle cx="100" cy="32" r="2.4" fill="#3e8ede" />
          <rect x="24" y="34" width="4.6" height="4.6" rx="1.4" fill="#2e9e6b" transform="rotate(-15 26 36)" />
        </g>
      )}
    </svg>
  );
}

// Selector: devuelve la mascota SVG animada según el avatar elegido.
export function MascotaAvatar({
  avatar,
  animo = "feliz",
  className,
  style,
}: {
  avatar: AvatarId;
  animo?: Animo;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (avatar === "condor") return <Condor animo={animo} className={className} style={style} />;
  if (avatar === "rana") return <Rana animo={animo} className={className} style={style} />;
  return <Mascota animo={animo} className={className} style={style} />;
}
