import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "ตัวจริงด้านซ่อมสี",
  description: "งานซ่อมสีและตัวถังจาก Maporn Autogroup",
};

export default function BodyShopPage() {
  return (
    <ComingSoon
      eyebrow="Body & Paint"
      title="ตัวจริงด้านซ่อมสี"
      description="ผลงานและมาตรฐานงานซ่อมสี-ตัวถังของศูนย์บริการ Maporn Autogroup กำลังจะมาเร็วๆ นี้"
    />
  );
}
