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
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && <p className="section-eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy tracking-tight">{title}</h2>
      {description && <p className="mt-3 text-brand-slate text-sm sm:text-base leading-relaxed">{description}</p>}
    </div>
  );
}
