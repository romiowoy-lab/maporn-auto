import { Variant } from "@/lib/types";
import { formatTHB } from "@/lib/utils";

export default function VariantTable({ variants }: { variants: Variant[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-brand-line">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="bg-slate-50 text-left text-brand-navy">
            <th className="px-4 py-3 font-semibold">รุ่นย่อย</th>
            <th className="px-4 py-3 font-semibold">ราคา</th>
            <th className="px-4 py-3 font-semibold">เครื่องยนต์</th>
            <th className="px-4 py-3 font-semibold">กำลัง</th>
            <th className="px-4 py-3 font-semibold">แรงบิด</th>
            <th className="px-4 py-3 font-semibold">เกียร์</th>
            <th className="px-4 py-3 font-semibold">ที่นั่ง</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v, i) => (
            <tr key={v.name} className={i % 2 ? "bg-white" : "bg-slate-50/50"}>
              <td className="px-4 py-3 font-semibold text-brand-navy whitespace-nowrap">{v.name}</td>
              <td className="px-4 py-3 font-bold text-brand-red whitespace-nowrap">{formatTHB(v.price)}</td>
              <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{v.engine}</td>
              <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{v.power}</td>
              <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{v.torque}</td>
              <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{v.transmission}</td>
              <td className="px-4 py-3 text-brand-slate whitespace-nowrap">{v.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
