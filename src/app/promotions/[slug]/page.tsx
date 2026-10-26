import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

// Individual promotions are on hold with the promotions list (see app/promotions/page.tsx).
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "โปรโมชั่น",
};

export default function PromotionDetailPage() {
  return (
    <ComingSoon
      eyebrow="Promotions"
      title="โปรโมชั่น"
      description="โปรโมชั่นและแคมเปญพิเศษจากทุกแบรนด์ในเครือกำลังจะมาเร็วๆ นี้ ระหว่างนี้สอบถามโปรโมชั่นล่าสุดกับฝ่ายขายได้โดยตรงทางโทรศัพท์หรือ LINE"
    />
  );
}
