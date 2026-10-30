// One small line drawing per service. Drawn in the brand sky blue on navy,
// echoing the round dots of the logo's "i"s.
const stroke = {
  fill: "none",
  stroke: "var(--sky)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const glyphs: Record<string, React.ReactNode> = {
  menaxhim: (
    <>
      <rect x="20" y="24" width="160" height="112" rx="10" {...stroke} />
      <path d="M20 50h160M60 50v86" {...stroke} opacity={0.5} />
      <path d="M78 116l22-30 20 14 26-38 18 20" {...stroke} />
      <circle cx="40" cy="70" r="5" fill="var(--sky)" />
      <path d="M32 90h16M32 104h16" {...stroke} opacity={0.5} />
    </>
  ),
  automatizim: (
    <>
      <circle cx="44" cy="80" r="18" {...stroke} />
      <circle cx="156" cy="40" r="14" {...stroke} />
      <circle cx="156" cy="120" r="14" {...stroke} />
      <path d="M62 80h30l20-40h30M92 80l20 40h30" {...stroke} />
      <circle cx="44" cy="80" r="5" fill="var(--sky)" />
      <path d="M126 36l6 4-6 4M126 116l6 4-6 4" {...stroke} />
    </>
  ),
  web: (
    <>
      <rect x="16" y="22" width="168" height="116" rx="10" {...stroke} />
      <path d="M16 44h168" {...stroke} opacity={0.5} />
      <circle cx="30" cy="33" r="3" fill="var(--sky)" />
      <circle cx="42" cy="33" r="3" {...stroke} />
      <rect x="32" y="60" width="64" height="60" rx="6" {...stroke} />
      <path d="M112 62h56M112 78h40M112 94h50" {...stroke} opacity={0.6} />
      <rect x="112" y="106" width="34" height="14" rx="7" fill="var(--sky)" />
    </>
  ),
  ai: (
    <>
      <circle cx="100" cy="80" r="22" {...stroke} />
      <circle cx="100" cy="80" r="6" fill="var(--sky)" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        // Rounded so server and client render identical attribute strings
        const r = (a * Math.PI) / 180;
        const x1 = (100 + Math.cos(r) * 22).toFixed(2);
        const y1 = (80 + Math.sin(r) * 22).toFixed(2);
        const x2 = (100 + Math.cos(r) * 58).toFixed(2);
        const y2 = (80 + Math.sin(r) * 58).toFixed(2);
        return (
          <g key={a}>
            <path d={`M${x1} ${y1}L${x2} ${y2}`} {...stroke} opacity={0.6} />
            <circle cx={x2} cy={y2} r="7" {...stroke} />
          </g>
        );
      })}
    </>
  ),
  personalizuar: (
    <>
      <rect x="24" y="30" width="96" height="100" rx="8" {...stroke} />
      <rect x="132" y="44" width="44" height="86" rx="8" {...stroke} />
      <path d="M44 56l-12 14 12 14M100 56l12 14-12 14M80 50l-16 44" {...stroke} />
      <circle cx="154" cy="118" r="4" fill="var(--sky)" />
      <path d="M144 60h20M144 72h14" {...stroke} opacity={0.5} />
    </>
  ),
  ide: (
    <>
      <circle cx="40" cy="80" r="10" fill="var(--sky)" />
      <path d="M50 80c30 0 30-44 60-44s30 88 60 88" {...stroke} strokeDasharray="4 6" />
      <rect x="150" y="104" width="40" height="40" rx="8" {...stroke} />
      <path d="M40 58v-14M24 64l-9-9M56 64l9-9" {...stroke} />
    </>
  ),
  dixhital: (
    <>
      <rect x="18" y="40" width="58" height="76" rx="4" {...stroke} opacity={0.5} />
      <path d="M30 60h34M30 74h34M30 88h22" {...stroke} opacity={0.5} />
      <path d="M88 78h26" {...stroke} />
      <path d="M106 70l8 8-8 8" {...stroke} />
      <rect x="126" y="34" width="58" height="88" rx="8" {...stroke} />
      <rect x="138" y="48" width="34" height="20" rx="4" fill="var(--sky)" />
      <path d="M138 84h34M138 98h22" {...stroke} />
    </>
  ),
  mirembajtje: (
    <>
      <path d="M100 22l58 22v36c0 34-26 52-58 62-32-10-58-28-58-62V44z" {...stroke} />
      <path d="M58 84h20l10-18 14 32 10-20h30" {...stroke} />
      <circle cx="142" cy="78" r="5" fill="var(--sky)" />
    </>
  ),
};

export default function ServiceGlyph({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" className={className}>
      {glyphs[id]}
    </svg>
  );
}
