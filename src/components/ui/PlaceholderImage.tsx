function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0xff) + percent));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function PlaceholderImage({
  label,
  sublabel,
  colorHex = "#0b1220",
  className = "",
  dark = true,
}: {
  label: string;
  sublabel?: string;
  colorHex?: string;
  className?: string;
  dark?: boolean;
}) {
  const from = colorHex;
  const to = shade(colorHex, -40);
  return (
    <div
      className={`relative overflow-hidden flex items-end ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-15"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M20 190 L55 190 L75 150 Q90 130 120 128 L260 128 Q290 130 305 150 L325 190 L380 190 L380 210 L20 210 Z"
          fill="white"
        />
        <circle cx="95" cy="205" r="22" fill="white" />
        <circle cx="305" cy="205" r="22" fill="white" />
      </svg>
      <div className={`relative z-10 p-4 sm:p-5 ${dark ? "text-white" : "text-brand-navy"}`}>
        <p className="text-base sm:text-lg font-bold leading-tight">{label}</p>
        {sublabel && <p className="text-xs sm:text-sm opacity-80 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}
