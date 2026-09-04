import type { Metadata } from "next";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "PDPA",
  description: "นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของ Maporn Autogroup",
};

const SECTIONS = [
  {
    title: "1. ฐานทางกฎหมายในการเก็บรวบรวมข้อมูล",
    body: "บริษัทเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่านโดยอาศัยฐานความยินยอม (Consent) และ/หรือฐานสัญญา (Contract) ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
  },
  {
    title: "2. ประเภทข้อมูลส่วนบุคคลที่เก็บรวบรวม",
    body: "ชื่อ-นามสกุล เบอร์โทรศัพท์ อีเมล Line ID ทะเบียนรถ และข้อมูลอื่นที่ท่านให้ไว้ผ่านแบบฟอร์มต่าง ๆ บนเว็บไซต์นี้",
  },
  {
    title: "3. ความยินยอม",
    body: "ก่อนการส่งแบบฟอร์มใด ๆ บนเว็บไซต์ ท่านจะต้องกดยอมรับความยินยอมในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตามวัตถุประสงค์ที่ระบุไว้ ท่านสามารถถอนความยินยอมได้ตลอดเวลา",
  },
  {
    title: "4. สิทธิของเจ้าของข้อมูลส่วนบุคคล",
    body: "ท่านมีสิทธิขอเข้าถึง ขอสำเนา ขอแก้ไข ขอลบ ขอระงับการใช้ หรือคัดค้านการประมวลผลข้อมูลส่วนบุคคลของท่าน รวมถึงสิทธิในการขอให้โอนย้ายข้อมูลตามที่กฎหมายกำหนด",
  },
  {
    title: "5. เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)",
    body: `ท่านสามารถติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของบริษัทได้ที่ ${company.email} หรือโทร ${company.phone}`,
  },
];

export default function PdpaPage() {
  return (
    <div className="container-page py-14 sm:py-20 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-brand-navy mb-2">นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA)</h1>
      <p className="text-sm text-brand-slate mb-10">ปรับปรุงล่าสุด: 1 สิงหาคม 2569</p>
      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-brand-navy mb-2">{s.title}</h2>
            <p className="text-sm text-brand-slate leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
