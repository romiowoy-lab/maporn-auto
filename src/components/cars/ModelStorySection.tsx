import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function ModelStorySection({
  index,
  eyebrow,
  title,
  description,
  points,
  colorHex,
  imageLabel,
  reverse = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  colorHex?: string;
  imageLabel: string;
  reverse?: boolean;
}) {
  return (
    <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        <PlaceholderImage label={imageLabel} colorHex={colorHex} className="aspect-[4/3] rounded-2xl" />
      </div>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl font-black text-brand-line">{index}</span>
          <span className="section-eyebrow">{eyebrow}</span>
        </div>
        <h3 className="text-2xl font-bold text-brand-navy">{title}</h3>
        <p className="mt-3 text-brand-slate text-sm leading-relaxed">{description}</p>

        <div className="mt-6 grid sm:grid-cols-1 gap-3">
          {points.map((p) => (
            <div key={p} className="flex items-center gap-3 rounded-xl border border-brand-line px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-brand-red">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-brand-navy">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
