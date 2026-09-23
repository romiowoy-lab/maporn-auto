import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "นัดหมายเข้าศูนย์บริการ",
  description: "ระบบนัดหมายเข้าศูนย์บริการกำลังปรับปรุง เร็วๆ นี้",
};

export default function ServiceAppointmentPage() {
  return (
    <ComingSoon
      eyebrow="Service Appointment"
      title="นัดหมายเข้าศูนย์บริการ"
      description="ระบบนัดหมายออนไลน์กำลังปรับปรุง ระหว่างนี้ติดต่อศูนย์บริการที่สาขาใกล้บ้านได้โดยตรงผ่านช่องทางโทรศัพท์หรือ Line"
    />
  );
}
