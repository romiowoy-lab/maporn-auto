import Image from "next/image";
import ScrollFx from "@/components/ui/ScrollFx";

export default function ShowroomBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "1536 / 318" }}>
      <ScrollFx effect="reveal" className="absolute inset-0">
        <Image
          src="/brand/showroom-banner.jpg"
          alt="โชว์รูมเรือธง Maporn Autogroup พร้อมรถยนต์ทั้ง 7 แบรนด์"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </ScrollFx>
    </section>
  );
}
