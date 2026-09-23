import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

const ITEMS = [
  { href: "/branches", title: "ค้นหาโชว์รูม", description: "ค้นหาสาขาที่ใกล้คุณที่สุดทั่วประเทศ" },
  { href: "/test-drive", title: "จองทดลองขับ", description: "นัดหมายทดลองขับรถรุ่นที่คุณสนใจ" },
  { href: "/quotation", title: "เทิร์นรถเก่า / ขอใบเสนอราคา", description: "ประเมินราคารถเก่าเพื่อเทิร์น พร้อมรับใบเสนอราคารถคันใหม่" },
  { href: "/contact", title: "ติดต่อฝ่ายขาย", description: "พูดคุยกับทีมขายเพื่อขอคำแนะนำ" },
  { href: "/service", title: "ศูนย์บริการ", description: "นัดหมายเข้ารับบริการหลังการขาย" },
];

export default function DealerExperience() {
  return (
    <section className="bg-white py-20 sm:py-28 border-t border-black/5">
      <div className="container-page">
        <SectionHeading eyebrow="Dealer Experience" title="พร้อมดูแลคุณทุกขั้นตอน" />

        <ScrollFx effect="fade-up" stagger={0.1} className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-black/8 border-t border-b border-black/8">
          {ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="group px-1 py-8 sm:px-6 first:pl-0 last:pr-0 block">
              <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-red transition-colors">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-slate leading-relaxed">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy">
                ดูรายละเอียด
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
