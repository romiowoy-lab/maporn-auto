import type { Metadata } from "next";
import { company } from "@/lib/data/company";
import { branches } from "@/lib/data/branches";
import ContactForm from "@/components/forms/ContactForm";
import { Phone, MessageCircle, Clock, MapPin, Navigation, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "ติดต่อเรา โทร Line และแบบฟอร์มฝ่ายขาย",
  description:
    "ติดต่อ Maporn Autogroup สำนักงานใหญ่ เบอร์โทร Email และ Line พร้อมแบบฟอร์มติดต่อฝ่ายขายสำหรับรถยนต์ทุกแบรนด์",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const brand = typeof sp.brand === "string" ? sp.brand : "";

  const info = [
    { label: "สำนักงานใหญ่", value: company.hqAddress },
    { label: "โทรศัพท์", value: company.phone },
    { label: "โทรฝ่ายขาย", value: company.salesPhone },
    { label: "Email", value: company.email },
    { label: "Line", value: company.line },
    { label: "เวลาทำการ", value: company.officeHours },
  ];

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Header Section */}
      <div className="text-center mb-10">
        <p className="section-eyebrow mb-2">Contact Us</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">ติดต่อเรา</h1>
        <p className="mt-2 text-brand-slate text-sm">
          มีคำถามหรือต้องการคำแนะนำ ทีมงานของเราพร้อมให้บริการ
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left Column: HQ Info & Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-elevated p-6">
            <h2 className="font-bold text-brand-navy mb-4 text-lg border-b border-brand-line pb-2">
              ข้อมูลติดต่อสำนักงานใหญ่
            </h2>
            <dl className="space-y-3.5 text-sm">
              {info.map((i) => (
                <div key={i.label} className="flex flex-col gap-0.5">
                  <dt className="text-brand-slate text-xs font-medium">{i.label}</dt>
                  <dd className="text-brand-navy font-semibold">{i.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-4 mt-6 pt-4 border-t border-brand-line">
              <a
                href={company.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-navy hover:text-brand-red transition-colors underline flex items-center gap-1"
              >
                Facebook <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={company.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-navy hover:text-brand-red transition-colors underline flex items-center gap-1"
              >
                Instagram <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={company.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-navy hover:text-brand-red transition-colors underline flex items-center gap-1"
              >
                YouTube <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* HQ Map Embed */}
          <div className="rounded-2xl overflow-hidden border border-brand-line aspect-[4/3] shadow-sm">
            <iframe
              title="แผนที่สำนักงานใหญ่"
              className="h-full w-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(company.hqAddress)}&output=embed`}
            />
          </div>
        </div>

        {/* Right Column: Sales Form */}
        <div className="lg:col-span-3">
          <div className="card-elevated p-6 sm:p-8">
            <h2 className="font-bold text-brand-navy mb-5 text-xl border-b border-brand-line pb-3">
              ส่งข้อความถึงเรา
            </h2>
            <ContactForm defaultBrand={brand} />
          </div>
        </div>
      </div>

      {/* All Branches Section */}
      <div className="mt-16">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-2">Our Locations</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">ติดต่อสาขาทั้งหมด</h2>
          <p className="mt-2 text-brand-slate text-sm">
            เลือกสาขาที่ใกล้คุณเพื่อติดต่อสอบถามเส้นทางหรือคุยกับฝ่ายขายโดยตรง
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b) => {
            const short = b.name
              .replace("Maporn Autogroup ", "")
              .replace("Suzuki ", "")
              .replace("GWM ", "")
              .replace("Wuling ", "")
              .replace("Lepas ", "")
              .replace("OMODA & JAECOO ", "");

            const mapUrl =
              b.googleMapsUrl ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`;

            return (
              <div
                key={b.slug}
                className="card-elevated p-5 flex flex-col justify-between rounded-xl hover:shadow-md transition-shadow duration-200 border border-brand-line/60 bg-white"
              >
                <div className="space-y-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-navy bg-brand-line/30 rounded">
                      {b.province}
                    </span>
                    <h3 className="mt-1.5 font-bold text-brand-navy text-base leading-snug">
                      {b.name}
                    </h3>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-brand-slate leading-relaxed">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                    <span>{b.address}</span>
                  </div>

                  {b.hours && (
                    <div className="flex items-center gap-2.5 text-xs text-brand-slate">
                      <Clock className="h-4 w-4 shrink-0 text-brand-slate/70" />
                      <span>{b.hours}</span>
                    </div>
                  )}
                </div>

                {/* Call-to-action Action Buttons */}
                <div className="pt-4 mt-4 border-t border-brand-line/40 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Phone Button */}
                    <a
                      href={`tel:${b.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-line px-3 py-2 text-xs font-medium text-brand-navy hover:bg-brand-navy hover:text-white transition-all text-center"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>โทรคุยฝ่ายขาย</span>
                    </a>

                    {/* Google Maps Button */}
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-600 hover:text-white transition-all text-center"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <span>นำทาง Map</span>
                    </a>
                  </div>

                  {/* LINE Button */}
                  {b.lineUrl && (
                    <a
                      href={b.lineUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-[#06C755] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#05b34c] text-center"
                    >
                      <MessageCircle className="h-4 w-4 fill-white text-[#06C755]" />
                      <span>แชท LINE {short}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}