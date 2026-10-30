// Wuling Porta EV — single source of truth for the Porta EV view of /brands/wuling.
// Specs and prices from the client's brief (Wuling Thailand launch, 2026: autolifethailand.tv,
// checkraka.com, zigwheels.co.th, grandprix.co.th). Photography supplied by the client.

export const porta = {
  images: {
    banner: "/brand/wuling-porta/porta-banner.webp",
    studio: "/brand/wuling-porta/porta-34.webp",
    city: "/brand/wuling-porta/porta-city.jpg",
    capacity: "/brand/wuling-porta/porta-capacity.jpg",
    frontDetail: "/brand/wuling-porta/porta-front-detail.jpg",
    cabin: "/brand/wuling-porta/porta-cabin.jpg",
    steering: "/brand/wuling-porta/porta-steering.jpg",
  },
  highlights: [
    { value: 400, unit: "km", label: "Range*", note: "* มาตรฐาน CLTC", decimals: 0 },
    { value: 6.5, unit: "m³", label: "Cargo", note: "พื้นที่บรรทุก", decimals: 1 },
    { value: 1249, unit: "kg", label: "Payload", note: "บรรทุกสูงสุด", decimals: 0 },
    { value: 0.56, unit: "฿/km", label: "Energy cost", note: "ค่าใช้จ่ายพลังงาน", decimals: 2 },
  ],
  dimensions: [
    { label: "ความยาว", value: "5,010 มม." },
    { label: "ความกว้าง", value: "1,800 มม." },
    { label: "ความสูง", value: "1,975 มม." },
    { label: "ระยะฐานล้อ", value: "3,050 มม." },
  ],
  cargo: [
    "พื้นที่บรรทุก 6.5 ลูกบาศก์เมตร — ใส่พาเลทสินค้ามาตรฐานได้ 2 พาเลท",
    "น้ำหนักบรรทุกสูงสุด 1,249 กก. (ประมาณ 1.2 ตัน)",
    "ประตูสไลด์ด้านข้าง 2 ฝั่ง ขอบประตูล่างต่ำ ยกของขึ้น-ลงสะดวก",
    "ประตูท้ายบานพับเปิดแยกฝั่ง กว้างสุด 270° — ฟอร์คลิฟต์เสียบพาเลทเข้าตู้ได้โดยตรง",
    "ห้องโดยสาร 2 ที่นั่ง (ผู้ขับขี่ และผู้โดยสารตอนหน้า)",
  ],
  performance: [
    { value: 75, unit: "kW", label: "Power", note: "102 แรงม้า" },
    { value: 180, unit: "Nm", label: "Torque", note: null },
    { value: 115, unit: "km/h", label: "Top speed", note: null },
    { value: 56.2, unit: "kWh", label: "Battery", note: "LFP · Wuling MAGIC Battery" },
  ],
  powertrain: [
    "มอเตอร์ไฟฟ้า Permanent Magnet Synchronous ขับเคลื่อนล้อหลัง (RWD)",
    "เกียร์อัตโนมัติ Single Speed · โหมดขับขี่ Eco / Normal / Sport",
    "DC Fast Charge จาก 30% ถึง 80% ภายใน 30 นาที",
    "ระบบจัดการความร้อนอัจฉริยะ ควบคุมอุณหภูมิแบตเตอรี่ให้เหมาะกับอากาศร้อนของไทย",
  ],
  chassis: [
    { label: "ช่วงล่างหน้า", value: "แม็คเฟอร์สันสตรัท (McPherson Strut)" },
    { label: "ช่วงล่างหลัง", value: "แหนบแผ่น (Leaf Spring) รองรับงานบรรทุกหนัก" },
    { label: "ระบบเกียร์", value: "อัตโนมัติ Single Speed" },
    { label: "ระบบขับเคลื่อน", value: "ขับเคลื่อนล้อหลัง (RWD)" },
  ],
  variants: [
    { name: "Standard", price: 599000, perks: [] as string[] },
    { name: "Premium", price: 629000, perks: ["ประกันภัยชั้น 1 ระยะเวลา 1 ปี"] },
  ],
  color: "Polar White",
  // Studio renders supplied by the client (Oct 2026)
  angles: [
    { label: "ด้านหน้า", image: "/brand/wuling-porta/porta-34.webp" },
    { label: "มุม 3/4", image: "/brand/wuling-porta/porta-front.webp" },
    { label: "ด้านข้าง", image: "/brand/wuling-porta/porta-side.webp" },
  ],
};
