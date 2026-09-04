import { companyValues, company } from "@/lib/data/company";
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
          {companyValues.map((v) => (
            <div key={v.title} className="card-elevated p-7">
              <div className="h-11 w-11 rounded-full bg-brand-red/10 flex items-center justify-center mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
              </div>
              <h3 className="font-bold text-lg text-brand-navy mb-2">{v.title}</h3>
              <p className="text-sm text-brand-slate leading-relaxed">{v.description}</p>
            </div>
          ))}
        </ScrollFx>

        <ScrollFx effect="blur" className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 rounded-3xl bg-brand-navy text-white p-10 sm:p-14">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${i > 0 ? "md:border-l md:border-white/10" : ""}`}
            >
              <p className="text-4xl sm:text-5xl font-black tracking-tight">{s.value}</p>
              <p className="text-xs sm:text-sm text-white/60 mt-2">{s.label}</p>
            </div>
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
