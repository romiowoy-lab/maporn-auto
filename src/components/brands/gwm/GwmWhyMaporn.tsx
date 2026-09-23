import { ShieldCheck, Gauge, Landmark, Wrench } from "lucide-react";
import ScrollFx from "@/components/ui/ScrollFx";

export const WHY_ITEMS = [
  { icon: ShieldCheck, title: "Authorized Dealer", description: "ตัวแทนจำหน่ายอย่างเป็นทางการ" },
  { icon: Gauge, title: "Test Drive", description: "ทดลองขับก่อนตัดสินใจ" },
  { icon: Landmark, title: "Finance Consultation", description: "ให้คำปรึกษาด้านสินเชื่อ" },
  { icon: Wrench, title: "After Sales Service", description: "บริการหลังการขายครบวงจร" },
];

// On lg+ this content lives inside the Tank 300 photo (GwmFeaturedVehicle) instead.
export default function GwmWhyMaporn() {
  return (
    <section className="bg-[#080808] py-20 sm:py-28 border-t border-white/[0.06] lg:hidden">
      <div className="container-page">
        <ScrollFx effect="fade-up">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Why Buy With Maporn?</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">มากกว่าการขายรถ คือการดูแลทุกเส้นทาง</h2>
        </ScrollFx>

        <ScrollFx
          effect="fade-up"
          stagger={0.1}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
        >
          {WHY_ITEMS.map(({ icon: Icon, title, description }, i) => (
            <div key={title}>
              <p className="text-xs font-semibold text-white/30 mb-3">{String(i + 1).padStart(2, "0")}</p>
              <Icon className="h-6 w-6 text-brand-red" />
              <h3 className="mt-4 text-base sm:text-lg font-bold text-white">{title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-white/50">{description}</p>
            </div>
          ))}
        </ScrollFx>
      </div>
    </section>
  );
}
