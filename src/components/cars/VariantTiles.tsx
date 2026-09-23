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
            className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
              recommended
                ? "border-brand-red/70 bg-gradient-to-b from-[#2a1416] to-[#1C1E22] shadow-[0_18px_50px_rgba(223,0,0,0.18)]"
                : "border-white/10 bg-[#1C1E22] shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-white/25"
            }`}
          >
            {recommended && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold text-white">รุ่นแนะนำ</span>
            )}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">รุ่นย่อย</p>
            <h3 className="mt-1 text-xl font-bold text-white">{v.name}</h3>
            <p className="mt-3 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
              {formatTHB(v.price)}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
              {[
                ["เครื่องยนต์ / มอเตอร์", v.engine],
                ["กำลังสูงสุด", v.power],
                ["แรงบิด", v.torque],
                ["เกียร์", v.transmission],
                ["ที่นั่ง", `${v.seats} ที่นั่ง`],
              ].map(([k, val]) => (
                <li key={k} className="flex justify-between gap-3 border-b border-white/[0.07] pb-2 last:border-none">
                  <span className="text-white/55">{k}</span>
                  <span className="font-semibold text-white">{val}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/quotation?model=${modelSlug}&variant=${encodeURIComponent(v.name)}`}
              className={
                recommended
                  ? "btn-red mt-6 text-xs"
                  : "mt-6 inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-xs font-medium text-white transition-colors hover:bg-white hover:text-[#101113]"
              }
            >
              ขอใบเสนอราคารุ่นนี้
            </Link>
          </div>
        );
      })}
    </div>
  );
}
