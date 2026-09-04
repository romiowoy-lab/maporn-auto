import type { Metadata } from "next";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "ข้อกำหนดและเงื่อนไข",
  description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ Maporn Autogroup",
};

const SECTIONS = [
  {
    title: "1. การยอมรับข้อกำหนด",
    body: "การเข้าใช้งานเว็บไซต์นี้ถือว่าท่านยอมรับและตกลงปฏิบัติตามข้อกำหนดและเงื่อนไขการใช้งานทั้งหมดที่ระบุไว้",
  },
  {
    title: "2. ข้อมูลผลิตภัณฑ์และราคา",
    body: "ราคา สเปก และรายละเอียดผลิตภัณฑ์ที่แสดงบนเว็บไซต์เป็นข้อมูลเบื้องต้น อาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งล่วงหน้า กรุณาติดต่อฝ่ายขายเพื่อยืนยันข้อมูลล่าสุดก่อนตัดสินใจซื้อ",
  },
  {
    title: "3. โปรโมชั่นและเงื่อนไข",
    body: "โปรโมชั่นแต่ละรายการมีระยะเวลาและเงื่อนไขเฉพาะตามที่ระบุไว้ในหน้าโปรโมชั่นนั้น ๆ บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งล่วงหน้า",
  },
  {
    title: "4. ทรัพย์สินทางปัญญา",
    body: "เนื้อหา รูปภาพ โลโก้ และเครื่องหมายการค้าทั้งหมดบนเว็บไซต์นี้เป็นทรัพย์สินของบริษัทหรือเจ้าของแบรนด์ที่เกี่ยวข้อง ห้ามคัดลอกหรือนำไปใช้โดยไม่ได้รับอนุญาต",
  },
  {
    title: "5. ข้อจำกัดความรับผิดชอบ",
    body: "บริษัทจะไม่รับผิดชอบต่อความเสียหายใด ๆ ที่เกิดจากการใช้งานข้อมูลบนเว็บไซต์นี้ รวมถึงการคำนวณค่างวดสินเชื่อที่เป็นเพียงการประมาณการเบื้องต้นเท่านั้น",
  },
];

export default function TermsPage() {
  return (
    <div className="container-page py-14 sm:py-20 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-brand-navy mb-2">ข้อกำหนดและเงื่อนไข</h1>
      <p className="text-sm text-brand-slate mb-10">ปรับปรุงล่าสุด: 1 สิงหาคม 2569</p>
      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-brand-navy mb-2">{s.title}</h2>
            <p className="text-sm text-brand-slate leading-relaxed">{s.body}</p>
          </div>
        ))}
        <div>
          <h2 className="font-bold text-brand-navy mb-2">6. ติดต่อสอบถาม</h2>
          <p className="text-sm text-brand-slate leading-relaxed">
            หากท่านมีข้อสงสัยเกี่ยวกับข้อกำหนดและเงื่อนไขนี้ กรุณาติดต่อ {company.email} หรือโทร {company.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
