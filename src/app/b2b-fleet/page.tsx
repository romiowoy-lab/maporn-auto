import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ROICalculator from "@/components/b2b/ROICalculator";
import FleetShowcase from "@/components/b2b/FleetShowcase";
import B2BInquiryForm from "@/components/b2b/B2BInquiryForm";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollFx from "@/components/ui/ScrollFx";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "ฟลีทธุรกิจ (B2B Fleet)",
  description:
    "โซลูชันยานพาหนะสำหรับธุรกิจและองค์กร จาก Maporn Autogroup ตัวแทนจำหน่ายรถยนต์ 7 แบรนด์ พร้อมเครื่องคำนวณต้นทุนพลังงานเปรียบเทียบรถน้ำมันกับรถยนต์ไฟฟ้า",
};

export default function B2BFleetPage() {
  notFound(); // hidden for now — remove this line to re-enable the page
  return (
    <div>
      <section className="bg-brand-navy text-white py-20 sm:py-28">
        <div className="container-page">
          <ScrollFx effect="fade-up">
            <p className="section-eyebrow-light mb-4">B2B Fleet Solutions</p>
            <h1 className="text-display text-white max-w-2xl">โซลูชันยานพาหนะสำหรับธุรกิจของคุณ</h1>
            <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
              Maporn Autogroup พร้อมดูแลฟลีทของธุรกิจคุณตั้งแต่รถส่งพัสดุ รถรับส่งพนักงาน ไปจนถึงการเปลี่ยนผ่านสู่รถยนต์ไฟฟ้าเชิงพาณิชย์
              ครบทั้ง 7 แบรนด์ในเครือ พร้อมทีมขายองค์กรดูแลใบเสนอราคาและเอกสารสำหรับนิติบุคคลโดยเฉพาะ
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#roi-calculator" className="btn-red">
                คำนวณต้นทุนพลังงาน
              </a>
              <a href="#inquiry" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy">
                ขอใบเสนอราคาองค์กร
              </a>
            </div>
          </ScrollFx>
        </div>
      </section>

      <section id="roi-calculator" className="container-page py-16 sm:py-24 scroll-mt-24">
        <SectionHeading
          eyebrow="ROI / TCO Calculator"
          title="เปรียบเทียบต้นทุนพลังงาน น้ำมัน vs ไฟฟ้า"
          description="ปรับตัวเลขให้ตรงกับรูปแบบการใช้งานฟลีทของธุรกิจคุณ เพื่อประเมินว่าการเปลี่ยนไปใช้รถยนต์ไฟฟ้าคุ้มค่ากับธุรกิจคุณแค่ไหน"
        />
        <div className="mt-10">
          <ROICalculator />
        </div>
      </section>

      <section className="bg-[#f7f7f5] py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Fleet Showcase" title="เลือกรถให้เหมาะกับธุรกิจคุณ" />
          <div className="mt-12 sm:mt-16">
            <FleetShowcase />
          </div>
        </div>
      </section>

      <section id="inquiry" className="container-page py-16 sm:py-24 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              eyebrow="Corporate Inquiry"
              title="ขอใบเสนอราคาสำหรับองค์กร"
              description="กรอกข้อมูลเบื้องต้น ทีมขายองค์กรของเราจะติดต่อกลับพร้อมข้อเสนอที่เหมาะกับฟลีทธุรกิจคุณ"
            />
            <div className="mt-8 space-y-3 text-sm text-brand-slate">
              <p>หรือติดต่อทีม B2B โดยตรง:</p>
              <p className="font-semibold text-brand-navy">โทร: {company.salesPhone}</p>
              <p className="font-semibold text-brand-navy">
                Line:{" "}
                <Link href={`https://line.me/ti/p/${company.line}`} target="_blank" className="hover:text-brand-red">
                  {company.line}
                </Link>
              </p>
            </div>
          </div>
          <div className="card-elevated p-6 sm:p-8">
            <B2BInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
