import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "จองทดลองขับ",
  description: "ระบบจองทดลองขับกำลังปรับปรุง เร็วๆ นี้",
};

export default function TestDrivePage() {
  return (
    <ComingSoon
      eyebrow="Test Drive"
      title="จองทดลองขับ"
      description="ระบบจองทดลองขับออนไลน์กำลังปรับปรุง ระหว่างนี้ติดต่อทีมขายได้โดยตรงผ่านช่องทางโทรศัพท์หรือ Line"
    />
  );
}
