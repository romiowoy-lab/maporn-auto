import Link from "next/link";
import Image from "next/image";
import { Gem, Gauge, Compass, Cpu } from "lucide-react";
import ScrollFx from "@/components/ui/ScrollFx";
import { getModel } from "@/lib/data/models";
import { WHY_ITEMS } from "@/components/brands/gwm/GwmWhyMaporn";

const SPECS = [
  { label: "Luxury", icon: Gem },
  { label: "Performance", icon: Gauge },
  { label: "4WD", icon: Compass },
  { label: "Technology", icon: Cpu },
];

export default function GwmFeaturedVehicle() {
  // Real flagship model — the same one that opens the Hero (Tank 500), shown here in its
  // real outdoor environment shot for variety instead of repeating the studio photo.
  const model = getModel("gwm-tank-300");
  if (!model) return null;

  return (
    <section className="relative bg-[#0b0c0d] pb-16 lg:pb-0 overflow-hidden">
      {/* Full-bleed edge to edge at the photo's native 16:9 ratio — no side margins, no crop,
          and the heading sits ON the photo (text-shadow only, no dark wash) so the image
          butts directly against the section above with no black band. */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src="/brand/studio/gwm-tank300-forest-hero.jpg"
          alt="GWM Tank 300"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 top-0 z-10 pt-6 sm:pt-12"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.55)" }}
        >
          <div className="container-page">
            <ScrollFx effect="fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/90">Featured Model</p>
              <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">TANK 300</h2>
              <p
                className="mt-3 inline-block rounded-md bg-black/65 px-3.5 py-1.5 text-sm sm:text-base font-extrabold uppercase tracking-[0.15em] text-[#ff4545] backdrop-blur-sm"
                style={{ textShadow: "none" }}
              >
                Power Beyond Limits
              </p>
            </ScrollFx>

            <ScrollFx effect="fade-up" stagger={0.08} className="mt-5 hidden lg:flex flex-wrap gap-x-8 gap-y-3">
              {SPECS.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2.5 text-white">
                  <Icon className="h-5 w-5 text-[#ff4545] shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </ScrollFx>

            <Link
              href={`/cars/${model.slug}`}
              className="mt-5 hidden lg:inline-flex items-center gap-2 rounded-lg border border-white/40 bg-black/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#0b0c0d]"
              style={{ textShadow: "none" }}
            >
              ดูรายละเอียดเพิ่มเติม
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* "Why buy with Maporn" — compact panel on the empty sky/trees side of the photo,
            clear of both cars; lg+ only (smaller screens keep the standalone section). */}
        <div className="absolute inset-x-0 top-0 z-10 hidden lg:block pt-10 xl:pt-12 pointer-events-none">
          <div className="container-page flex justify-end">
            <div className="pointer-events-auto w-full max-w-[520px] rounded-xl bg-black/60 p-4 xl:p-5 backdrop-blur-md">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#ff4545]">Why buy with Maporn?</p>
              <p className="mt-1 text-base xl:text-lg font-bold text-white">มากกว่าการขายรถ คือการดูแลทุกเส้นทาง</p>
              <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3">
                {WHY_ITEMS.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4545]" />
                    <div>
                      <p className="text-[13px] font-bold leading-tight text-white">{title}</p>
                      <p className="text-[11px] leading-snug text-white/70">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page lg:hidden">
        <ScrollFx effect="fade-up" stagger={0.08} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
          {SPECS.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2.5 text-white/80">
              <Icon className="h-5 w-5 text-brand-red shrink-0" />
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </ScrollFx>

        <Link
          href={`/cars/${model.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#0b0c0d]"
        >
          ดูรายละเอียดเพิ่มเติม
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
