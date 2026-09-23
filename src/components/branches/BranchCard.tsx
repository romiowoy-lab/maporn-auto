import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { Branch } from "@/lib/types";
import { getBrand } from "@/lib/data/brands";

// Real showroom / service-centre photos, one per branch (public/brand/branches/).
export const BRANCH_PHOTO: Record<string, string> = {
  srinakarin: "/brand/branches/srinakarin.jpg",
  minburi: "/brand/branches/minburi.jpg",
  lamlukka: "/brand/branches/lamlukka.jpg",
  sriracha: "/brand/branches/sriracha.jpg",
  rayong: "/brand/branches/rayong.jpg",
};

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <Link
      href={`/branches/${branch.slug}`}
      className="card-elevated overflow-hidden flex flex-col h-full group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(223,0,0,0.25),0_24px_48px_-16px_rgba(223,0,0,0.35)]"
    >
      {BRANCH_PHOTO[branch.slug] ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={BRANCH_PHOTO[branch.slug]}
            alt={branch.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <PlaceholderImage label={branch.name} sublabel={branch.province} colorHex="#0b1220" className="aspect-[16/10]" />
      )}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-bold text-brand-navy group-hover:text-brand-red transition-colors">{branch.name}</h3>
        <p className="text-xs text-brand-slate mt-1.5 flex-1">{branch.address}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {branch.brands.slice(0, 4).map((slug) => {
            const b = getBrand(slug);
            if (!b) return null;
            return (
              <span
                key={slug}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: b.colorHex }}
              >
                {b.name}
              </span>
            );
          })}
          {branch.brands.length > 4 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-brand-navy">
              +{branch.brands.length - 4}
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-brand-slate">
          <span>{branch.phone}</span>
          {branch.isServiceCenter && <span className="text-brand-red font-semibold">มีศูนย์บริการ</span>}
        </div>
      </div>
    </Link>
  );
}
