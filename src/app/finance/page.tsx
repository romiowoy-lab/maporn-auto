import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "สินเชื่อรถยนต์",
  description: "หน้าคำนวณสินเชื่อรถยนต์กำลังปรับปรุง เร็วๆ นี้",
};

export default function FinancePage() {
  return (
    <ComingSoon
      eyebrow="Finance / Car Loan"
      title="สินเชื่อรถยนต์"
      description="หน้าคำนวณค่างวดและโปรโมชั่นไฟแนนซ์กำลังปรับปรุง ระหว่างนี้ติดต่อฝ่ายขายเพื่อสอบถามเงื่อนไขสินเชื่อได้โดยตรงผ่านช่องทางโทรศัพท์หรือ Line"
    />
  );
}
