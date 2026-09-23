import Image from "next/image";
import ScrollFx from "@/components/ui/ScrollFx";

// Real Suzy Fix photos (Minburi service centre). Copy only describes what the photos
// actually show — no invented certifications or numbers.
const ROWS = [
  {
    image: "/brand/suzyfix/suzyfix-garage.jpg",
    alt: "โรงซ่อม Suzy Fix พร้อมแท่นยกรถหลายจุด",
    eyebrow: "Service Bay",
    title: "โรงซ่อมโปร่ง กว้าง พร้อมแท่นยกรถหลายจุด",
    text: "พื้นที่ซ่อมบำรุงจัดเป็นระเบียบ แสงสว่างทั่วถึง รองรับการตรวจเช็กและซ่อมบำรุงรถได้พร้อมกันหลายคัน",
    position: "50% 50%",
  },
  {
    image: "/brand/suzyfix/suzyfix-mechanic.jpg",
    alt: "ช่าง Suzy Fix ตรวจเช็กเครื่องยนต์",
    eyebrow: "Maintenance",
    title: "ตรวจเช็กและซ่อมบำรุงโดยทีมช่าง",
    text: "ทีมช่างดูแลตั้งแต่การตรวจเช็กเครื่องยนต์ ไปจนถึงงานซ่อมบำรุงตามระยะ ทำงานใกล้ชิดกับรถของคุณในทุกขั้นตอน",
    position: "50% 35%",
  },
  {
    image: "/brand/suzyfix/suzyfix-bodywork.jpg",
    alt: "ช่างซ่อมสีและตัวถังที่ Suzy Fix",
    eyebrow: "Body & Paint",
    title: "งานซ่อมสีและตัวถัง",
    text: "ศูนย์ซ่อมสีและตัวถัง ดูแลงานเคาะ ปรับรูปทรง และพ่นสีให้รถกลับมาสวยอีกครั้ง",
    position: "50% 50%",
  },
  {
    image: "/brand/suzyfix/suzyfix-lounge.jpg",
    alt: "ห้องรับรองลูกค้า Suzy Fix",
    eyebrow: "Customer Lounge",
    title: "ห้องรับรองลูกค้า นั่งรอสบาย",
    text: "ระหว่างรอรถ มีห้องรับรองให้นั่งพักผ่อน พร้อมเคาน์เตอร์ต้อนรับและเจ้าหน้าที่คอยดูแล",
    position: "50% 50%",
  },
];

export default function SuzyFixGallery() {
  return (
    <div className="mt-14 sm:mt-20 space-y-16 sm:space-y-24">
      {ROWS.map((r, i) => {
        const flip = i % 2 === 1;
        return (
          <ScrollFx key={r.image} effect={flip ? "slide-right" : "slide-left"}>
            <div className={`grid items-center gap-8 lg:gap-14 lg:grid-cols-[1.15fr_1fr] ${flip ? "lg:[&>*:first-child]:order-2 lg:grid-cols-[1fr_1.15fr]" : ""}`}>
              {/* photo with an offset orange frame */}
              <div className="relative">
                <div className={`absolute inset-0 rounded-2xl border-2 border-[#F26A1B]/70 ${flip ? "-translate-x-3 translate-y-3" : "translate-x-3 translate-y-3"}`} />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: r.position }}
                  />
                </div>
              </div>

              <div className="px-1">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#FF9A57]">
                  <span className="h-px w-8 bg-[#F26A1B]" />
                  {r.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl sm:text-4xl font-black leading-tight tracking-tight text-white">{r.title}</h3>
                <p className="mt-4 max-w-md text-base sm:text-lg leading-relaxed text-white/85">{r.text}</p>
              </div>
            </div>
          </ScrollFx>
        );
      })}
    </div>
  );
}
