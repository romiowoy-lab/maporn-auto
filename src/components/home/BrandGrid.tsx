import Link from "next/link";
import Image from "next/image";
import { getBrandGroups } from "@/lib/data/brandGroups";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";

const REAL_CUTOUTS: Record<string, string> = {
  suzuki: "/brand/cutouts/suzuki-fronx-cutout.png",
};

export default function BrandGrid() {
  const groups = getBrandGroups();

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Our Brands" title="7 แบรนด์ในเครือ Maporn Autogroup" />
          <Link
            href="/brands"
            className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-slate shrink-0 transition-colors duration-500 hover:text-brand-navy"
          >
            ดูแบรนด์ทั้งหมด
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="hairline mt-8" />

        <ScrollFx effect="fade-up" stagger={0.08} className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
          {groups.map((g) => {
              const cutout = REAL_CUTOUTS[g.key];
              const isRealAsset = g.isCombined || Boolean(cutout);
              const image = cutout ?? g.heroImage;
              return (
                <Link
                  key={g.key}
                  href={g.href}
                  className="group relative flex flex-col overflow-hidden rounded-sm aspect-[3/4] shadow-[0_1px_2px_rgba(17,17,17,0.05)] transition-[transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_55px_-28px_rgba(17,17,17,0.55)]"
                  style={{ backgroundColor: g.colorHex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60" aria-hidden="true" />

                  {g.logo && !g.isCombined && (
                    <span className="absolute top-3 left-3 z-10 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/95 shadow flex items-center justify-center p-1.5">
                      <span className="relative h-full w-full">
                        <Image src={g.logo} alt="" fill className="object-contain" />
                      </span>
                    </span>
                  )}

                  <div className="relative flex-1 flex items-end justify-center px-2 pt-9">
                    {image && (
                      <div className="relative h-[72%] w-full">
                        <Image
                          src={image}
                          alt={g.name}
                          fill
                          sizes="(max-width: 640px) 45vw, 15vw"
                          className={`transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] ${
                            isRealAsset ? "object-contain drop-shadow-xl" : "object-cover"
                          }`}
                          style={
                            isRealAsset
                              ? undefined
                              : {
                                  maskImage: "radial-gradient(ellipse 60% 55% at 50% 55%, black 40%, transparent 78%)",
                                  WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 55%, black 40%, transparent 78%)",
                                }
                          }
                        />
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 px-2.5 pb-2.5 pt-1.5 text-center">
                    <p className="text-white font-bold text-xs sm:text-sm uppercase tracking-tight leading-tight line-clamp-1">
                      {g.name}
                    </p>
                    <span className="mt-2 inline-flex w-full items-center justify-center rounded-sm bg-white text-brand-navy text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] py-2 group-hover:bg-brand-navy group-hover:text-white transition-colors duration-500">
                      ทดลองขับ
                    </span>
                  </div>
                </Link>
              );
            })}
        </ScrollFx>
      </div>
    </section>
  );
}
