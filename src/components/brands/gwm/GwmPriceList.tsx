import type { Variant } from "@/lib/types";
import { formatTHB } from "@/lib/utils";

// Trim price list for the GWM showrooms: MSRP, and the central campaign price when one is running.
export default function GwmPriceList({ variants }: { variants: Variant[]; accent?: string }) {
  const hasCampaign = variants.some((v) => v.campaignPrice);
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 bg-white/[0.06] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white/55">
          <span>รุ่นย่อย</span>
          <span className="w-24 text-right">ราคา MSRP</span>
          <span className="w-24 text-right">{hasCampaign ? "ราคาแคมเปญ" : ""}</span>
        </div>
        <ul className="divide-y divide-white/[0.08]">
          {variants.map((v) => (
            <li key={v.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-3">
              <span className="text-sm font-semibold text-white">{v.name}</span>
              <span className={`w-24 text-right text-sm ${v.campaignPrice ? "text-white/45 line-through" : "font-bold text-white"}`}>{formatTHB(v.price)}</span>
              <span className="w-24 text-right text-sm font-extrabold" style={{ color: v.campaignPrice ? "#FF4D4D" : undefined }}>
                {v.campaignPrice ? formatTHB(v.campaignPrice) : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 text-[11px] text-white/45">{hasCampaign ? "ราคาแคมเปญกลาง · " : ""}สอบถามเงื่อนไขและราคาล่าสุดที่โชว์รูม</p>
    </div>
  );
}
