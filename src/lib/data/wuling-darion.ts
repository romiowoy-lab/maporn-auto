// Wuling Starlight Darion EV — single source of truth for the /brands/wuling showroom.
// Specs sourced from autospinn.com (Mar 2026). Photography: Maporn Autogroup + AutoLifeThailand.

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
}

export const darion: DarionData = {
  images: {
    heroBanner: null,
    hero: "/brand/wuling-darion/darion-hero.jpg",
    design: "/brand/wuling-darion/darion-headlight.jpg",
    callouts: "/brand/wuling-darion/darion-night.jpg",
    interior: "/brand/wuling-darion/darion-cockpit.jpg",
    specsCar: "/brand/wuling-darion/darion-white.jpg",
    lifestyle: "/brand/wuling-darion/darion-captain.jpg",
    modelCar: "/brand/wuling-darion/darion-rear34.jpg",
    cta: "/brand/wuling-darion/darion-hero.jpg",
    headlight: "/brand/wuling-darion/darion-headlight.jpg",
    wheel: "/brand/wuling-darion/darion-wheel.jpg",
    screen: "/brand/wuling-darion/darion-screen.jpg",
    captain: "/brand/wuling-darion/darion-captain.jpg",
    cargo: "/brand/wuling-darion/darion-cargo.jpg",
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
};

export const PENDING = "รอข้อมูลจริง";
