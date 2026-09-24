import type { Metadata } from "next";

import { company } from "@/lib/data/company";

import ContactForm from "@/components/forms/ContactForm";



export const metadata: Metadata = {

  title: "ติดต่อเรา โทร Line และแบบฟอร์มฝ่ายขาย",

  description: "ติดต่อ Maporn Autogroup สำนักงานใหญ่ เบอร์โทร Email และ Line พร้อมแบบฟอร์มติดต่อฝ่ายขายสำหรับรถยนต์ทุกแบรนด์",

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

      <div className="text-center mb-10">

        <p className="section-eyebrow mb-2">Contact Us</p>

        <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">ติดต่อเรา</h1>

        <p className="mt-2 text-brand-slate text-sm">มีคำถามหรือต้องการคำแนะนำ ทีมงานของเราพร้อมให้บริการ</p>

      </div>



      <div className="grid lg:grid-cols-5 gap-10">

        <div className="lg:col-span-2 space-y-6">

          <div className="card-elevated p-6">

            <h2 className="font-bold text-brand-navy mb-4">ข้อมูลติดต่อ</h2>

            <dl className="space-y-3 text-sm">

              {info.map((i) => (

                <div key={i.label} className="flex flex-col gap-0.5">

                  <dt className="text-brand-slate text-xs">{i.label}</dt>

                  <dd className="text-brand-navy font-medium">{i.value}</dd>

                </div>

              ))}

            </dl>

            <div className="flex gap-3 mt-5">

              <a href={company.facebook} target="_blank" rel="noreferrer" className="text-xs font-semibold text-brand-navy underline">

                Facebook

              </a>

              <a href={company.instagram} target="_blank" rel="noreferrer" className="text-xs font-semibold text-brand-navy underline">

                Instagram

              </a>

              <a href={company.youtube} target="_blank" rel="noreferrer" className="text-xs font-semibold text-brand-navy underline">

                YouTube

              </a>

            </div>

          </div>

          <div className="rounded-2xl overflow-hidden border border-brand-line aspect-[4/3]">

            <iframe

              title="แผนที่สำนักงานใหญ่"

              className="h-full w-full"

              loading="lazy"

              src={`https://www.google.com/maps?q=${encodeURIComponent(company.hqAddress)}&output=embed`}

            />

          </div>

        </div>



        <div className="lg:col-span-3">

          <div className="card-elevated p-6 sm:p-8">

            <h2 className="font-bold text-brand-navy mb-5">ส่งข้อความถึงเรา</h2>

            <ContactForm defaultBrand={brand} />

          </div>

        </div>

      </div>

    </div>

  );

}