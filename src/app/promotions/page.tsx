import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

// Promotions are on hold until the client supplies current campaigns (data stays in lib/data/promotions.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "โปรโมชั่น",
  description: "โปรโมชั่นรถยนต์ใหม่จาก Maporn Autogroup เร็วๆ นี้",
};

export default function PromotionsPage() {
  return (
    <ComingSoon
      eyebrow="Promotions"
      title="โปรโมชั่น"
      description="โปรโมชั่นและแคมเปญพิเศษจากทุกแบรนด์ในเครือกำลังจะมาเร็วๆ นี้ ระหว่างนี้สอบถามโปรโมชั่นล่าสุดกับฝ่ายขายได้โดยตรงทางโทรศัพท์หรือ LINE"
    />
  );
}
