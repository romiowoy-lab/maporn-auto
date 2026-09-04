import type { Metadata } from "next";
import { photoCredits } from "@/lib/data/photo-credits";
import { getBrand } from "@/lib/data/brands";

export const metadata: Metadata = {
  title: "เครดิตภาพ",
  description: "แหล่งที่มาและเครดิตภาพถ่ายรถยนต์ที่ใช้บนเว็บไซต์ Maporn Autogroup",
};

export default function PhotoCreditsPage() {
  return (
    <div className="container-page py-10 sm:py-14 max-w-3xl">
      <p className="section-eyebrow mb-2">Photo Credits</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">เครดิตภาพ</h1>
      <p className="mt-3 text-brand-slate text-sm leading-relaxed">
        ภาพรถยนต์บนเว็บไซต์นี้ส่วนหนึ่งนำมาจาก Wikimedia Commons ภายใต้สัญญาอนุญาตแบบเปิด (Creative Commons)
        และอีกส่วนเป็นภาพประชาสัมพันธ์ผลิตภัณฑ์ที่บริษัทได้รับสิทธิ์ในฐานะตัวแทนจำหน่ายอย่างเป็นทางการ
        ขอขอบคุณแหล่งที่มาทุกท่านดังนี้
      </p>

      <div className="mt-8 divide-y divide-brand-line border border-brand-line rounded-2xl overflow-hidden">
        {photoCredits.map((c) => {
          const brand = c.brandSlug ? getBrand(c.brandSlug) : undefined;
          return (
            <div key={c.fileName} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="font-bold text-brand-navy text-sm">
                  {brand ? `${brand.name} — ` : ""}
                  {c.subject}
                </p>
                <p className="text-xs text-brand-slate mt-1">
                  ภาพโดย {c.author} · สัญญาอนุญาต {c.license}
                </p>
              </div>
              {c.sourceUrl && (
                <a
                  href={c.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-brand-navy underline underline-offset-2 shrink-0"
                >
                  ดูต้นฉบับบน Wikimedia Commons →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
