import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function ModelStorySection({
  index,
  eyebrow,
  title,
  description,
  points,
  colorHex,
  imageLabel,
  image,
  reverse = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  colorHex?: string;
  imageLabel: string;
  image?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        {image ? (
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-brand-red/60" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
              <Image src={image} alt={imageLabel} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        ) : (
          <PlaceholderImage label={imageLabel} colorHex={colorHex} className="aspect-[4/3] rounded-2xl" />
        )}
      </div>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A5A]">
          <span className="h-px w-8 bg-brand-red" /> {eyebrow}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{title}</h3>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/65">{description}</p>

        <div className="mt-6 grid gap-3">
          {points.map((p) => (
            <div key={p} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1C1E22] px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red/20 text-[#FF5A5A]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-white">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
