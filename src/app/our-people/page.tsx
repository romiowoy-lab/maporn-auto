import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "ตัวจริงรถ",
  description: "เรื่องราวจากลูกค้าตัวจริงของ Maporn Autogroup ทั้งลูกค้าบุคคลและลูกค้าธุรกิจ",
};

export default function OurPeoplePage() {
  return (
    <ComingSoon
      eyebrow="Our People"
      title="ตัวจริงรถ"
      description="เรื่องราวจากลูกค้าตัวจริงของ Maporn Autogroup ทั้งลูกค้าบุคคลและลูกค้าธุรกิจ กำลังจะมาเร็วๆ นี้"
    />
  );
}
