import type { Metadata } from "next";
import CompareView from "@/components/compare/CompareView";

export const metadata: Metadata = {
  title: "เปรียบเทียบรถยนต์ สเปก ราคา 3 รุ่นพร้อมกัน",
  description: "เปรียบเทียบสเปกรถยนต์สูงสุด 3 รุ่น ราคา เครื่องยนต์ กำลัง แรงบิด และความปลอดภัย จาก Maporn Autogroup",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const add = typeof sp.add === "string" ? sp.add : "";
  const add2 = typeof sp.add2 === "string" ? sp.add2 : "";

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Car Comparison</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">เปรียบเทียบรถยนต์</h1>
        <p className="mt-2 text-brand-slate text-sm">เลือกรถยนต์ 2-3 รุ่นเพื่อเปรียบเทียบสเปกแบบเคียงข้างกัน</p>
      </div>
      <CompareView initialSlug={add} initialSlug2={add2} />
    </div>
  );
}
