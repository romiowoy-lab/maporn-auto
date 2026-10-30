// Wuling Starlight Darion EV — single source of truth for the /brands/wuling showroom.
// Specs sourced from autospinn.com (Mar 2026). Photography: Wuling studio renders supplied by the client (Oct 2026).

export interface DarionCallout {
  title: string;
  text: string | null;
}

export interface DarionData {
  images: {
    heroBanner: string | null;
    hero: string | null;
    design: string | null;
    callouts: string | null;
    interior: string | null;
    specsCar: string | null;
    lifestyle: string | null;
    modelCar: string | null;
    cta: string | null;
    headlight: string | null;
    wheel: string | null;
    screen: string | null;
    captain: string | null;
    cargo: string | null;
  };
  callouts: { left: DarionCallout[]; right: DarionCallout[] };
  specs: {
    powerKw: number | null;
    torqueNm: number | null;
    rangeKm: number | null;
    rangeStandard: string | null;
    displayInch: number | null;
  };
  model: {
    startPrice: number | null;
    features: string[];
  };
  variants: { name: string; price: number }[];
  colors: { name: string; swatch: string; image: string }[];
}

export const darion: DarionData = {
  images: {
    heroBanner: null,
    hero: "/brand/wuling-darion/v2/hero.webp",
    design: "/brand/wuling-darion/v2/design.webp",
    callouts: "/brand/wuling-darion/v2/callouts.webp",
    interior: "/brand/wuling-darion/v2/interior.webp",
    specsCar: "/brand/wuling-darion/v2/specs.webp",
    lifestyle: "/brand/wuling-darion/v2/lifestyle.webp",
    modelCar: "/brand/wuling-darion/v2/color-white.webp",
    cta: "/brand/wuling-darion/v2/cta.webp",
    headlight: "/brand/wuling-darion/v2/design.webp",
    wheel: null,
    screen: null,
    captain: "/brand/wuling-darion/v2/interior.webp",
    cargo: null,
  },
  callouts: {
    left: [
      { title: "LED Lighting", text: "ไฟหน้า LED พร้อม IHMA (ระบบไฟสูงอัจฉริยะ) และไฟกลางวัน DRL" },
      { title: "Sliding Doors", text: "ประตูสไลด์ไฟฟ้า (รุ่น Premium) เปิด-ปิดอัตโนมัติสะดวกทุกการเดินทาง" },
      { title: "7 Seats Captain", text: "7 ที่นั่ง เบาะแถวสองแบบ Captain Seat ปรับไฟฟ้า (Premium)" },
    ],
    right: [
      { title: "Dual Screen", text: "จอกลาง 12.8 นิ้ว HD · มาตรวัดดิจิทัล 8.8 นิ้ว · Apple CarPlay / Android Auto" },
      { title: "ADAS 11 ระบบ", text: "ACC, AEB, IDA, LDW, BSD, LCA, DOW, RCTA, RCW, FCW, IHMA" },
      { title: "EV 150 kW", text: "มอเตอร์ขับล้อหน้า 150 kW · แบตเตอรี่ 69.2 kWh · วิ่งไกล 540 กม. (CLTC)" },
    ],
  },
  specs: {
    powerKw: 150,
    torqueNm: 310,
    rangeKm: 540,
    rangeStandard: "CLTC",
    displayInch: 12.8,
  },
  model: {
    startPrice: 839000,
    features: [
      "ซันรูฟพาโนรามิคไฟฟ้า (รุ่น Premium)",
      "กล้องรอบทิศทาง 360° (Premium) / กล้องมองหลัง (Comfort)",
      "เบาะปรับไฟฟ้า 6 ทิศทาง คนขับ (Premium) + แถวที่ 2",
      "ชาร์จมือถือไร้สาย 50 วัตต์ (Premium)",
      "กระจกกันความร้อน 2 ชั้น (Premium)",
      "ขนาดตัวถัง 4,910 × 1,870 × 1,770 มม. ฐานล้อ 2,910 มม.",
      "รับประกันแบตเตอรี่ 8 ปี / 150,000 กม.",
      "รับประกันตัวรถ 6 ปี / 150,000 กม.",
    ],
  },
  variants: [
    { name: "Comfort", price: 839000 },
    { name: "Premium", price: 899000 },
  ],
  colors: [
    { name: "Frosty White", swatch: "#E9EBF0", image: "/brand/wuling-darion/v2/color-white.webp" },
    { name: "Haze Grey", swatch: "#CFC4B8", image: "/brand/wuling-darion/v2/color-grey.webp" },
    { name: "Orchid Purple", swatch: "#3B2340", image: "/brand/wuling-darion/v2/color-purple.webp" },
    { name: "Starry Black", swatch: "#111214", image: "/brand/wuling-darion/v2/color-black.webp" },
  ],
};

export const PENDING = "รอข้อมูลจริง";
