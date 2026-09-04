import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { Promotion } from "@/lib/types";
import { getPromotionStatus } from "@/lib/data/promotions";
import { getBrand } from "@/lib/data/brands";
import { formatDateTH } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  Active: "bg-emerald-500 text-white",
  Expired: "bg-slate-400 text-white",
  Upcoming: "bg-blue-500 text-white",
};

const STATUS_LABEL: Record<string, string> = {
  Active: "กำลังดำเนินการ",
  Expired: "หมดอายุแล้ว",
  Upcoming: "เร็ว ๆ นี้",
};

export default function PromotionFeatured({ promotion, dark = false }: { promotion: Promotion; dark?: boolean }) {
  const status = getPromotionStatus(promotion);
  const brand = promotion.brandSlug ? getBrand(promotion.brandSlug) : undefined;

  return (
    <Link
      href={`/promotions/${promotion.slug}`}
      className={`group grid md:grid-cols-2 gap-6 md:gap-10 items-center rounded-3xl overflow-hidden ${
        dark ? "" : "border border-brand-line"
      }`}
    >
      <div className="relative">
        <PlaceholderImage
          label={promotion.category}
          sublabel={brand?.name}
          colorHex={brand?.colorHex ?? "#0b1220"}
          className="aspect-[16/10] rounded-2xl md:rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="px-1 md:px-0 pb-6 md:pb-0">
        <p className={`text-[11px] font-bold uppercase tracking-widest ${dark ? "text-brand-red-soft" : "text-brand-red"}`}>
          {promotion.category}
        </p>
        <h3
          className={`mt-2 text-2xl sm:text-3xl font-bold leading-tight transition-colors ${
            dark ? "text-white" : "text-brand-navy group-hover:text-brand-red"
          }`}
        >
          {promotion.title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed line-clamp-3 ${dark ? "text-white/70" : "text-brand-slate"}`}>
          {promotion.description}
        </p>
        <p className={`mt-4 text-xs ${dark ? "text-white/50" : "text-brand-slate"}`}>
          {formatDateTH(promotion.startDate)} — {formatDateTH(promotion.endDate)}
        </p>
        <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-white" : "text-brand-navy"}`}>
          ดูรายละเอียดโปรโมชั่น
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
