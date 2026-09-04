import type { Metadata } from "next";
import QuotationForm from "@/components/forms/QuotationForm";

export const metadata: Metadata = {
  title: "ขอใบเสนอราคา",
  description: "ขอใบเสนอราคารถยนต์จากทั้ง 7 แบรนด์ในเครือ Maporn Autogroup พร้อมข้อมูลไฟแนนซ์และโปรโมชั่นล่าสุด",
};

export default async function QuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const model = typeof sp.model === "string" ? sp.model : "";

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-2">Request Quotation</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">ขอใบเสนอราคา</h1>
          <p className="mt-2 text-brand-slate text-sm">เลือกรุ่นรถที่สนใจ ทีมฝ่ายขายจะจัดทำใบเสนอราคาให้คุณโดยเร็วที่สุด</p>
        </div>
        <div className="card-elevated p-6 sm:p-8">
          <QuotationForm defaultModel={model} />
        </div>
      </div>
    </div>
  );
}
