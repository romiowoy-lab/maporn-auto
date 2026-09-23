export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      {eyebrow && <p className="section-eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-h2 text-brand-navy text-balance">{title}</h2>
      {description && (
        <p className="mt-4 text-brand-slate text-base sm:text-lg font-light leading-relaxed text-pretty">{description}</p>
      )}
    </div>
  );
}
