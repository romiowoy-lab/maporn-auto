import Link from "next/link";
import { companyValues, company } from "@/lib/data/company";
import { branches } from "@/lib/data/branches";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

const STATS = [
  { label: "แบรนด์ในเครือ", value: "7" },
  { label: "สาขาทั่วประเทศ", value: `${company.branchCount}` },
  { label: "ศูนย์บริการ", value: `${company.serviceCenterCount}` },
  { label: "ปีแห่งความไว้วางใจ", value: `${new Date().getFullYear() - Number(company.foundedYear)}+` },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="Why Maporn Autogroup" title="จุดเด่นของเรา" align="center" />
        <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyValues.map((v, i) => (
            <div key={v.title} className="card-elevated p-7">
              <span className="block text-xs font-semibold text-brand-slate tracking-[0.2em] mb-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bold text-lg text-brand-navy mb-2">{v.title}</h3>
              <p className="text-sm text-brand-slate font-light leading-relaxed">{v.description}</p>
            </div>
          ))}
        </ScrollFx>

        <ScrollFx
          effect="blur"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 bg-brand-navy text-white rounded-sm overflow-hidden"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-10 sm:px-8 sm:py-14 ${
                i % 2 === 1 ? "border-l border-white/12" : ""
              } ${i >= 2 ? "border-t border-white/12 md:border-t-0" : ""} ${
                i > 0 ? "md:border-l md:border-white/12" : ""
              }`}
            >
              <p className="text-4xl sm:text-6xl font-black tracking-[-0.03em] tabular-nums">{s.value}</p>
              <div className="hairline-light my-4" />
              <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.18em] text-white/55">{s.label}</p>
            </div>
          ))}
        </ScrollFx>

        <ScrollFx effect="fade-up" className="mt-10 flex flex-wrap justify-center gap-2.5">
          {branches.map((b) => (
            <Link
              key={b.slug}
              href={`/branches/${b.slug}`}
              className="text-xs font-semibold rounded-full px-3.5 py-1.5 border border-brand-line text-brand-slate hover:border-brand-navy hover:text-brand-navy transition-colors"
            >
              {b.name.replace("Maporn Autogroup สาขา", "")} · {b.province}
            </Link>
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
