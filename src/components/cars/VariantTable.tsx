import { Variant } from "@/lib/types";
import { formatTHB } from "@/lib/utils";

export default function VariantTable({ variants }: { variants: Variant[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1C1E22]">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.04] text-left text-white">
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
            <tr key={v.name} className={i % 2 ? "bg-white/[0.03]" : ""}>
              <td className="whitespace-nowrap px-4 py-3 font-semibold text-white">{v.name}</td>
              <td className="whitespace-nowrap px-4 py-3 font-bold text-[#FF5A5A]">{formatTHB(v.price)}</td>
              <td className="whitespace-nowrap px-4 py-3 text-white/70">{v.engine}</td>
              <td className="whitespace-nowrap px-4 py-3 text-white/70">{v.power}</td>
              <td className="whitespace-nowrap px-4 py-3 text-white/70">{v.torque}</td>
              <td className="whitespace-nowrap px-4 py-3 text-white/70">{v.transmission}</td>
              <td className="whitespace-nowrap px-4 py-3 text-white/70">{v.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
