import Image from "next/image";

// Real photo when `src` is set; otherwise an explicit, honest placeholder — never a
// different Wuling model standing in for Darion EV.
export default function ImageSlot({
  src,
  label,
  alt,
  className = "",
  fit = "cover",
  priority = false,
  position = "center",
}: {
  src: string | null;
  label: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  position?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          priority={priority}
          sizes="100vw"
          style={{ objectPosition: position }}
          className={fit === "cover" ? "object-cover" : "object-contain"}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#111a28] ${className}`}
      role="img"
      aria-label={`${label} — รอภาพจริง`}
    >
      <div className="absolute inset-3 sm:inset-5 rounded-xl border border-dashed border-white/15" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
        <svg viewBox="0 0 200 80" className="w-24 sm:w-32 text-white/20" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M10 56h180M22 56l8-22c2-6 7-10 13-10h74c6 0 11 3 15 8l16 24M52 56a12 12 0 1 0 24 0M124 56a12 12 0 1 0 24 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{label}</p>
        <p className="text-[10px] sm:text-[11px] text-white/25">รอภาพจริงจาก Maporn Autogroup</p>
      </div>
    </div>
  );
}
