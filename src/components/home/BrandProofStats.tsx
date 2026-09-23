import { CheckCircle2 } from "lucide-react";
import { company } from "@/lib/data/company";

export default function BrandProofStats() {
  const yearsTrusted = new Date().getFullYear() - Number(company.foundedYear);

  return (
    <section className="bg-[#0B1120] py-16 sm:py-20 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 sm:p-8 text-center">
            <p className="text-3xl sm:text-4xl font-black text-white">
              {yearsTrusted}
              <span className="text-sky-400">+</span>
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">ปีแห่งมรดกและความเชี่ยวชาญ (ตั้งแต่ พ.ศ. {Number(company.foundedYear) + 543})</p>
          </div>
          <div className="glass-panel p-6 sm:p-8 text-center">
            <p className="text-3xl sm:text-4xl font-black text-white">{company.branchCount}</p>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">สาขาทั่วประเทศ ครอบคลุมกรุงเทพฯ ปริมณฑล ชลบุรี และระยอง</p>
          </div>
          <div className="glass-panel p-6 sm:p-8 text-center">
            <p className="text-3xl sm:text-4xl font-black text-white">7</p>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">แบรนด์รถยนต์ชั้นนำในเครือ ครบทุกไลฟ์สไตล์</p>
          </div>
          <div className="glass-panel p-6 sm:p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-teal-400 mb-2" />
            <p className="text-xs sm:text-sm text-slate-400">ครบวงจร EV & B2B Fleet Solutions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
