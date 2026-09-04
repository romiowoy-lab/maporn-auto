export function SpecList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card-elevated p-5">
      <h3 className="font-bold text-brand-navy mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-brand-slate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 mt-0.5 text-brand-red shrink-0">
              <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-brand-line last:border-none text-sm">
      <span className="text-brand-slate">{label}</span>
      <span className="font-semibold text-brand-navy">{value}</span>
    </div>
  );
}
