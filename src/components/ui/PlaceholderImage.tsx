function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0xff) + percent));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function CarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      <path
        d="M20 68 L30 68 L38 50 Q44 40 58 39 L132 39 Q146 40 152 50 L160 68 L180 68 L180 78 L20 78 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <circle cx="55" cy="78" r="10" fill="none" stroke="currentColor" strokeWidth={2.5} />
      <circle cx="145" cy="78" r="10" fill="none" stroke="currentColor" strokeWidth={2.5} />
      <line x1="70" y1="39" x2="70" y2="49" stroke="currentColor" strokeWidth={2.5} />
      <line x1="120" y1="39" x2="120" y2="49" stroke="currentColor" strokeWidth={2.5} />
    </svg>
  );
}

export default function PlaceholderImage({
  label,
  sublabel,
  colorHex = "#0b1220",
  className = "",
  dark = true,
  hideLabel = false,
}: {
  label: string;
  sublabel?: string;
  colorHex?: string;
  className?: string;
  dark?: boolean;
  hideLabel?: boolean;
}) {
  if (hideLabel) {
    return (
      <div className={`relative flex items-center justify-center bg-[#f0f0ee] ${className}`}>
        <CarIcon className="w-2/5 max-w-[140px] text-brand-line" />
      </div>
    );
  }

  const from = colorHex;
  const to = shade(colorHex, -40);
  return (
    <div
      className={`relative overflow-hidden flex items-end ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <CarIcon className="absolute inset-0 h-full w-full p-8 opacity-20 text-white" />
      <div className={`relative z-10 p-4 sm:p-5 ${dark ? "text-white" : "text-brand-navy"}`}>
        <p className="text-base sm:text-lg font-bold leading-tight">{label}</p>
        {sublabel && <p className="text-xs sm:text-sm opacity-80 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}
