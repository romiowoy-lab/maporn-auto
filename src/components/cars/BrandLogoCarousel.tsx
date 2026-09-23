import Link from "next/link";
import Image from "next/image";

export interface BrandChip {
  key: string;
  name: string;
  logo?: string;
  href: string;
  active: boolean;
}

// Horizontal brand filter: real logos on white chips (the logo files are colour-on-transparent,
// so they need a light ground to stay legible on the dark catalog page).
export default function BrandLogoCarousel({ items }: { items: BrandChip[] }) {
  return (
    <nav aria-label="กรองตามแบรนด์" className="-mx-4 sm:mx-0 overflow-x-auto no-scrollbar">
      <ul className="flex snap-x items-stretch gap-3 px-4 sm:px-0 pb-2">
        {items.map((b) => (
          <li key={b.key} className="snap-start shrink-0">
            <Link
              href={b.href}
              aria-current={b.active ? "true" : undefined}
              className={`flex h-14 min-w-[104px] items-center justify-center rounded-xl border px-4 transition-all duration-300 ${
                b.active
                  ? "border-brand-red bg-white shadow-[0_0_0_1px_rgba(223,0,0,0.6),0_10px_30px_rgba(223,0,0,0.25)]"
                  : "border-white/10 bg-white/90 opacity-80 hover:opacity-100 hover:-translate-y-0.5"
              }`}
            >
              {b.logo ? (
                <span className="relative block h-8 w-20">
                  <Image src={b.logo} alt={b.name} fill sizes="80px" className="object-contain" />
                </span>
              ) : (
                <span className="text-xs font-bold text-[#1c1e20]">{b.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
