// Wuling Starlight Darion EV — single source of truth for the /brands/wuling showcase.
//
// Nothing here is verified yet: the project has no Darion EV photography, catalog entry,
// specs or prices, and the design mockups' numbers/feature copy are illustrative. Every
// field is null/empty on purpose. The page renders a clear "waiting for real data" state
// for each one and lights up automatically once a real value or image path is added here
// (e.g. "/images/darion/hero.jpg" under public/).

export interface DarionCallout {
  title: string;
  /** Real feature description — null until confirmed with source material. */
  text: string | null;
}

export interface DarionData {
  images: {
    /** Finished poster-style banner. When set it replaces the hero (image + headline) and fills the whole hero area, cropped to cover. */
    heroBanner: string | null;
    hero: string | null;
    design: string | null;
    callouts: string | null;
    interior: string | null;
    specsCar: string | null;
    lifestyle: string | null;
    modelCar: string | null;
    cta: string | null;
  };
  callouts: { left: DarionCallout[]; right: DarionCallout[] };
  specs: {
    powerKw: number | null;
    torqueNm: number | null;
    rangeKm: number | null;
    /** Test standard for the range figure (e.g. CLTC / NEDC) — never mix standards. */
    rangeStandard: string | null;
    displayInch: number | null;
  };
  model: {
    startPrice: number | null;
    features: string[];
  };
}

// Facts from autospinn.com's Starlight Darion EV article (Mar 2026) — power/torque/battery/range
// (CLTC)/dimensions/screens/ADAS. Launch prices in that article were introductory and time-limited,
// so no price is shown. Photos are the client's own Darion EV shots.
export const darion: DarionData = {
  images: {
    heroBanner: null,
    hero: "/brand/wuling-darion/front34.jpg",
    design: "/brand/wuling-darion/side.jpg",
    callouts: "/brand/wuling-darion/rear34.jpg",
    interior: "/brand/wuling-darion/cabin.jpg",
    specsCar: "/brand/wuling-darion/rear.jpg",
    lifestyle: "/brand/wuling-darion/seats.jpg",
    modelCar: "/brand/wuling-darion/front.jpg",
    cta: "/brand/wuling-darion/seat-front.jpg",
  },
  callouts: {
    left: [
      { title: "Lighting", text: "ระบบไฟสูงอัจฉริยะ (Intelligent High-beam Assist)" },
      { title: "Sliding Doors", text: "ประตูสไลด์ด้านหลัง (ไฟฟ้าในรุ่น Premium)" },
      { title: "7 Seats", text: "7 ที่นั่ง เบาะแถวที่ 2 แบบ Captain Seat" },
    ],
    right: [
      { title: "Technology", text: "จอกลาง 12.8 นิ้ว HD · มาตรวัด 8.8 นิ้ว · CarPlay / Android Auto" },
      { title: "Safety", text: "ADAS: ACC, AEB, เตือนออกนอกเลน, เตือนจุดอับสายตา · กล้อง 360°" },
      { title: "EV Platform", text: "มอเตอร์เดี่ยวขับล้อหน้า 150 kW · แบตเตอรี่ลิเธียมไอออน 69.2 kWh" },
    ],
  },
  specs: { powerKw: 150, torqueNm: 310, rangeKm: 540, rangeStandard: "CLTC", displayInch: 12.8 },
  model: {
    startPrice: null,
    features: [
      "ซันรูฟพาโนรามิคไฟฟ้า (รุ่น Premium)",
      "กล้องรอบทิศทาง 360°",
      "เบาะปรับไฟฟ้า (คนขับและแถวที่ 2)",
      "ชาร์จมือถือไร้สาย 50 วัตต์",
      "กระจกกันความร้อน 2 ชั้น",
      "ขนาดตัวถัง 4,910 × 1,870 × 1,770 มม. ฐานล้อ 2,910 มม.",
    ],
  },
};

export const PENDING = "รอข้อมูลจริง";
