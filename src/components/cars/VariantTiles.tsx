import Link from "next/link";
import { Variant } from "@/lib/types";
import { formatTHB } from "@/lib/utils";

export default function VariantTiles({ modelSlug, variants }: { modelSlug: string; variants: Variant[] }) {
  const recommendedIndex = variants.length >= 2 ? Math.min(1, variants.length - 1) : -1;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {variants.map((v, i) => {
        const recommended = i === recommendedIndex;
        return (
          <div
            key={v.name}
            className={`relative rounded-2xl border p-5 flex flex-col ${
              recommended ? "border-brand-red bg-brand-navy text-white shadow-xl" : "border-brand-line bg-white"
            }`}
          >
            {recommended && (
              <span className="absolute -top-3 left-5 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full">
                รุ่นแนะนำ
              </span>
            )}
            <p className={`text-xs font-semibold uppercase tracking-wide ${recommended ? "text-white/70" : "text-brand-slate"}`}>
              รุ่นย่อย
            </p>
            <h3 className="text-lg font-bold mt-0.5">{v.name}</h3>
            <p className={`text-2xl font-black mt-3 ${recommended ? "text-brand-red-soft" : "text-brand-navy"}`}>
              {formatTHB(v.price)}
            </p>

            <ul className={`mt-4 space-y-1.5 text-xs flex-1 ${recommended ? "text-white/70" : "text-brand-slate"}`}>
              <li className="flex justify-between">
                <span>เครื่องยนต์ / มอเตอร์</span>
                <span className="font-medium">{v.engine}</span>
              </li>
              <li className="flex justify-between">
                <span>กำลังสูงสุด</span>
                <span className="font-medium">{v.power}</span>
              </li>
              <li className="flex justify-between">
                <span>แรงบิด</span>
                <span className="font-medium">{v.torque}</span>
              </li>
              <li className="flex justify-between">
                <span>เกียร์</span>
                <span className="font-medium">{v.transmission}</span>
              </li>
              <li className="flex justify-between">
                <span>ที่นั่ง</span>
                <span className="font-medium">{v.seats} ที่นั่ง</span>
              </li>
            </ul>

            <Link
              href={`/quotation?model=${modelSlug}&variant=${encodeURIComponent(v.name)}`}
              className={recommended ? "btn-red mt-5 text-xs" : "btn-outline mt-5 text-xs"}
            >
              ขอใบเสนอราคารุ่นนี้
            </Link>
          </div>
        );
      })}
    </div>
  );
}
