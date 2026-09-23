import Image from "next/image";
import Link from "next/link";
import { getBrandGroups } from "@/lib/data/brandGroups";

export default function PartnerNetwork() {
  const groups = getBrandGroups();

  return (
    <section className="bg-slate-950 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 mb-3">Multi-Brand Partnership Network</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">7 แบรนด์ระดับโลก ในเครือเดียว</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {groups.map((g) => (
            <Link
              key={g.key}
              href={g.href}
              className="group flex items-center gap-3 pl-3 pr-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md transition-all hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white overflow-hidden">
                {g.logo ? (
                  <Image src={g.logo} alt={g.name} fill className="object-contain p-1.5" />
                ) : (
                  <span className="text-[10px] font-black text-slate-900">{g.name.slice(0, 2).toUpperCase()}</span>
                )}
              </span>
              <span className="font-semibold text-white text-sm group-hover:text-sky-400 transition-colors">{g.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
