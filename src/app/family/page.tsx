import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "ครอบครัวมาพร",
  description: "เรื่องราวของครอบครัว Maporn Autogroup",
};

export default function FamilyPage() {
  return (
    <ComingSoon
      eyebrow="Maporn Family"
      title="ครอบครัวมาพร"
      description="เรื่องราวและวัฒนธรรมองค์กรของครอบครัว Maporn Autogroup กำลังจะมาเร็วๆ นี้"
    />
  );
}
