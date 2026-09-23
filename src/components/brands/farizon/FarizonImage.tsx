import Image from "next/image";

// Real image when a path is set in farizonData; otherwise a clear placeholder tile.
export default function FarizonImage({
  src,
  label,
  className = "",
  fit = "cover",
  priority = false,
}: {
  src: string | null;
  label: string;
  className?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={label} fill priority={priority} sizes="100vw" className={fit === "cover" ? "object-cover" : "object-contain"} />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-[#1A1F24] ${className}`} role="img" aria-label={`${label} — รอภาพจริง`}>
      <div className="absolute inset-3 rounded-lg border border-dashed border-white/15" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <svg viewBox="0 0 200 80" className="w-20 text-white/20" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M10 56h180M20 56V30c0-4 3-7 7-7h100c5 0 9 2 12 6l14 20M50 56a12 12 0 1 0 24 0M132 56a12 12 0 1 0 24 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">{label}</p>
        <p className="text-[10px] text-white/25">รอภาพจริง</p>
      </div>
    </div>
  );
}
