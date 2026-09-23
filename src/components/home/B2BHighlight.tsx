import Link from "next/link";
import { Truck, ArrowRight } from "lucide-react";
import { branches } from "@/lib/data/branches";

const EEC_BRANCH_SLUGS = ["sriracha", "rayong"];

export default function B2BHighlight() {
  const eecBranches = branches.filter((b) => EEC_BRANCH_SLUGS.includes(b.slug));

  return (
    <section className="bg-slate-950 pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel relative overflow-hidden p-8 sm:p-12 grid lg:grid-cols-2 gap-8 items-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-5">
              <Truck className="w-3.5 h-3.5" />
              B2B Fleet & EEC Strategic Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              โซลูชันรถบรรทุกไฟฟ้าเพื่อธุรกิจโลจิสติกส์ในภาคตะวันออก
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              ศูนย์บริการ {eecBranches.map((b) => b.province).join(" และ ")} (พื้นที่ EEC) พร้อมดูแลฟลีทธุรกิจของคุณด้วยรถยนต์ไฟฟ้าเชิงพาณิชย์จาก
              Farizon และ NEX ตั้งแต่รถส่งพัสดุ Last-mile ไปจนถึงรถรับส่งพนักงาน พร้อมเครื่องคำนวณต้นทุนพลังงานสำหรับองค์กร
            </p>
            <Link
              href="/b2b-fleet"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-[0_0_25px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
            >
              ดูโซลูชัน B2B Fleet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            {eecBranches.map((b) => (
              <div key={b.slug} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{b.province}</p>
                <p className="font-bold text-white text-sm">{b.name.replace("Maporn Autogroup ", "")}</p>
                <p className="mt-2 text-xs text-slate-400">{b.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
