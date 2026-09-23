import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "ร่วมงานกับเรา",
  description: "ตำแหน่งงานว่างที่ Maporn Autogroup",
};

export default function CareersPage() {
  return (
    <ComingSoon
      eyebrow="Careers"
      title="ร่วมงานกับเรา"
      description="ตำแหน่งงานว่างและโอกาสร่วมงานกับ Maporn Autogroup กำลังจะมาเร็วๆ นี้"
    />
  );
}
