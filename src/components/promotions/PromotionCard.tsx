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

export default function PromotionCard({ promotion }: { promotion: Promotion }) {
  const status = getPromotionStatus(promotion);
  const brand = promotion.brandSlug ? getBrand(promotion.brandSlug) : undefined;
  return (
    <Link
      href={`/promotions/${promotion.slug}`}
      className="card-elevated overflow-hidden flex flex-col h-full group"
    >
      <div className="relative">
        <PlaceholderImage
          label={promotion.category}
          sublabel={brand?.name}
          colorHex={brand?.colorHex ?? "#0b1220"}
          className="aspect-[16/9]"
        />
        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-[11px] font-semibold text-brand-red uppercase tracking-wide">{promotion.category}</p>
        <h3 className="font-bold text-brand-navy mt-1 group-hover:text-brand-red transition-colors line-clamp-2">
          {promotion.title}
        </h3>
        <p className="text-xs text-brand-slate mt-2 line-clamp-2 flex-1">{promotion.description}</p>
        <p className="text-[11px] text-brand-slate mt-3">
          {formatDateTH(promotion.startDate)} — {formatDateTH(promotion.endDate)}
        </p>
      </div>
    </Link>
  );
}
