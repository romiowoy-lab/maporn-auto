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
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="Why Maporn Autogroup" title="จุดเด่นของเรา" align="center" />
        <ScrollFx effect="fade-up" stagger={0.1} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companyValues.map((v) => (
            <div key={v.title} className="card-elevated p-6">
              <div className="h-10 w-10 rounded-full bg-brand-red/15 flex items-center justify-center mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
              </div>
              <h3 className="font-bold text-brand-navy mb-1.5">{v.title}</h3>
              <p className="text-sm text-brand-slate leading-relaxed">{v.description}</p>
            </div>
          ))}
        </ScrollFx>

        <ScrollFx effect="blur" className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl bg-[#f7f7f5] p-8 sm:p-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-brand-navy">{s.value}</p>
              <p className="text-xs sm:text-sm text-brand-slate mt-1">{s.label}</p>
            </div>
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
