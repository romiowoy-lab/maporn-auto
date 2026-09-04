import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBrandGroups, getModelsForGroup } from "@/lib/data/brandGroups";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export const metadata: Metadata = {
  title: "แบรนด์รถยนต์ทั้งหมด",
  description: "รวม 7 แบรนด์รถยนต์ในเครือ Maporn Autogroup Suzuki, Farizon, Nex, OMODA | JAECOO, Lepas, Wuling และ GWM",
};

export default function BrandsPage() {
  const groups = getBrandGroups();

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-10">
        <p className="section-eyebrow mb-2">Our Brands</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">แบรนด์รถยนต์ทั้งหมด</h1>
        <p className="mt-2 text-brand-slate text-sm max-w-2xl">
          Maporn Autogroup เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ 7 แบรนด์รถยนต์ชั้นนำ ครอบคลุมทุกไลฟ์สไตล์การเดินทาง
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {groups.map((g) => {
          const modelCount = getModelsForGroup(g).length;
          return (
            <Link key={g.key} href={g.href} className="card-elevated overflow-hidden flex flex-col group">
              <div className="relative aspect-[16/9] overflow-hidden">
                {g.heroImage ? (
                  <Image
                    src={g.heroImage}
                    alt={g.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`transition-transform duration-500 group-hover:scale-105 ${
                      g.isCombined ? "object-contain bg-white" : "object-cover"
                    }`}
                  />
                ) : (
                  <PlaceholderImage label="" colorHex={g.colorHex} className="h-full w-full" />
                )}
                {!g.isCombined && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <p className="text-white font-bold text-lg leading-tight">{g.name}</p>
                      <p className="text-white/75 text-xs">{g.tagline}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brand-navy group-hover:text-brand-red transition-colors">
                    {g.name}
                  </h2>
                  <span className="text-xs font-semibold text-brand-slate">{modelCount} รุ่น</span>
                </div>
                <p className="text-sm text-brand-slate mt-2 line-clamp-2">{g.description}</p>
                <span className="inline-block mt-4 text-sm font-semibold text-brand-navy border-b border-brand-red">
                  ดูรายละเอียดแบรนด์ →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
