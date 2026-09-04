import type { Metadata } from "next";
import TestDriveForm from "@/components/forms/TestDriveForm";

export const metadata: Metadata = {
  title: "จองทดลองขับ",
  description: "จองทดลองขับรถยนต์จากทั้ง 7 แบรนด์ในเครือ Maporn Autogroup เลือกวัน เวลา และสาขาที่คุณสะดวก",
};

export default async function TestDrivePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const brand = typeof sp.brand === "string" ? sp.brand : "";
  const model = typeof sp.model === "string" ? sp.model : "";
  const branch = typeof sp.branch === "string" ? sp.branch : "";

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-2">Test Drive</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">จองทดลองขับ</h1>
          <p className="mt-2 text-brand-slate text-sm">กรอกข้อมูลเพื่อจองคิวทดลองขับ ทีมงานจะติดต่อกลับเพื่อยืนยันนัดหมาย</p>
        </div>
        <div className="card-elevated p-6 sm:p-8">
          <TestDriveForm defaultBrand={brand} defaultModel={model} defaultBranch={branch} />
        </div>
      </div>
    </div>
  );
}
