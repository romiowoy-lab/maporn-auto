import type { Metadata } from "next";
import ServiceAppointmentForm from "@/components/forms/ServiceAppointmentForm";

export const metadata: Metadata = {
  title: "นัดหมายเข้าศูนย์บริการ",
  description: "นัดหมายเข้าศูนย์บริการ Maporn Autogroup ล่วงหน้า เลือกสาขา วันที่ และประเภทบริการที่ต้องการ",
};

export default async function ServiceAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const branch = typeof sp.branch === "string" ? sp.branch : "";

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-eyebrow mb-2">Service Appointment</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-navy">นัดหมายเข้าศูนย์บริการ</h1>
          <p className="mt-2 text-brand-slate text-sm">จองคิวเข้าศูนย์บริการล่วงหน้า ลดเวลารอคอย</p>
        </div>
        <div className="card-elevated p-6 sm:p-8">
          <ServiceAppointmentForm defaultBranch={branch} />
        </div>
      </div>
    </div>
  );
}
