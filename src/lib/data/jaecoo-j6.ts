// JAECOO 6 EV — single source of truth for the "JAECOO 6 EV" tab of /brands/omoda-jaecoo.
// Specs from the official spec sheet JAECOO_6_EV_SPEC_TH (JAECOO6EV(KD)V1-032026) and prices
// from omodajaecoo.co.th/th/model/jaecoo-6-ev (Oct 2026). Photography: OMODA & JAECOO Thailand.

const DIR = "/brand/jaecoo-j6";

export const j6 = {
  video: `${DIR}/j6-hero.mp4`,
  images: {
    side: `${DIR}/side-silver.webp`,
    structure: `${DIR}/body-structure.webp`,
    battery: `${DIR}/battery-lfp.webp`,
    dash: `${DIR}/interior-dash.webp`,
    dashGreen: `${DIR}/interior-green.webp`,
    seats: `${DIR}/seats-massage.webp`,
  },
  variants: [
    {
      name: "2WD MAX",
      price: 859000,
      drive: "ขับเคลื่อนล้อหลัง · มอเตอร์ 1 ตัว",
      powerKw: 135,
      hp: 184,
      torqueNm: 220,
      accel: 10.5,
      rangeKm: 455,
      dimensions: "1,910 × 4,342 × 1,715",
      wheel: "225/60 R18",
      camera: "360°",
      audio: "PIONEER 6 ลำโพง",
      driveModes: "4 โหมด",
    },
    {
      name: "LONG RANGE 4WD",
      price: 1249000,
      drive: "ขับเคลื่อนสี่ล้อ · มอเตอร์ 2 ตัว",
      powerKw: 205,
      hp: 279,
      torqueNm: 385,
      accel: 6.5,
      rangeKm: 418,
      dimensions: "1,910 × 4,406 × 1,715",
      wheel: "225/55 R19",
      camera: "540°",
      audio: "INFINITY 12 ลำโพง",
      driveModes: "9 โหมด",
    },
  ],
  // Shared by both variants
  common: [
    { label: "แบตเตอรี่", value: "68 kWh LFP" },
    { label: "ชาร์จ AC สูงสุด", value: "6.6 kW" },
    { label: "ชาร์จ DC สูงสุด", value: "80 kW (โดยประมาณ)" },
    { label: "จ่ายไฟภายนอก V2L", value: "3.3 kW" },
    { label: "ความเร็วสูงสุด", value: "150 กม./ชม." },
    { label: "พื้นที่สัมภาระ", value: "450 ลิตร" },
    { label: "ระยะฐานล้อ", value: "2,715 มม." },
    { label: "ระยะต่ำสุดจากพื้น", value: "195 มม." },
  ],
  design: [
    "ONE BOX STYLE · OFF-ROAD TRENDY — ดีไซน์ทรงกล่องสไตล์ออฟโรด",
    "โครงสร้างตัวถังอะลูมิเนียม แข็งแรงและน้ำหนักเบา",
    "ระยะยื่นหน้า-หลังสั้น ช่วยให้ขับออฟโรดได้คล่องตัว",
    "ระยะต่ำสุดจากพื้น 195 มม.",
  ],
  battery: [
    "แบตเตอรี่ LFP ความจุ 68 kWh ปลอดภัยสูง อายุการใช้งานยาวนาน",
    "วิ่งไกลสูงสุด 455 กม. (2WD) / 418 กม. (4WD) มาตรฐาน NEDC",
    "ชาร์จเร็ว DC สูงสุดประมาณ 80 kW · AC สูงสุด 6.6 kW",
    "V2L จ่ายไฟให้อุปกรณ์ภายนอก 3.3 kW — เหมาะกับสายแคมป์ปิ้ง",
  ],
  interior: [
    "จอสัมผัสกลาง 15.6 นิ้ว + จอมาตรวัด 9.2 นิ้ว",
    "ฟังก์ชันนวดผ่อนคลายผู้โดยสารคู่หน้า และที่รองขาผู้โดยสารด้านหน้า (4WD)",
    "เครื่องเสียง INFINITY 12 ลำโพง (4WD) / PIONEER 6 ลำโพง (2WD)",
    "แท่นชาร์จมือถือไร้สาย 50 วัตต์ · ระบบกรองฝุ่น PM2.5",
    "ระบบปรับอากาศแยกอิสระ 2 โซน · สั่งงานแอร์ผ่านรีโมท",
    "โหมดแคมป์ปิ้ง และโหมดสัตว์เลี้ยง",
  ],
  driveModes: ["Eco", "Normal", "Sport", "Custom", "All Road", "Slippery", "Beach", "Muddy", "Bumpy"],
  // fourWdOnly: not on 2WD MAX per the spec sheet
  adas: [
    { code: "ACC", name: "ควบคุมความเร็วอัตโนมัติ", img: `${DIR}/adas-acc.webp`, fourWdOnly: false },
    { code: "AEB", name: "เบรกฉุกเฉินอัตโนมัติ", img: `${DIR}/adas-aeb.webp`, fourWdOnly: false },
    { code: "BSD", name: "เตือนจุดอับสายตา", img: `${DIR}/adas-bsd.webp`, fourWdOnly: false },
    { code: "DOW", name: "เตือนเมื่อเปิดประตู", img: `${DIR}/adas-dow.webp`, fourWdOnly: false },
    { code: "FCW", name: "เตือนการชนด้านหน้า", img: `${DIR}/adas-fcw.webp`, fourWdOnly: false },
    { code: "RCW", name: "เตือนการชนด้านหลัง", img: `${DIR}/adas-rcw.webp`, fourWdOnly: false },
    { code: "RCTA", name: "เตือนจุดอับสายตาขณะถอยหลัง", img: `${DIR}/adas-rcta.webp`, fourWdOnly: false },
    { code: "LCW", name: "เตือนเมื่อจะเปลี่ยนเลน", img: `${DIR}/adas-lcw.webp`, fourWdOnly: false },
    { code: "LDW", name: "เตือนการออกนอกเลน", img: `${DIR}/adas-ldw.webp`, fourWdOnly: true },
    { code: "LDP", name: "ป้องกันการออกนอกเลน", img: `${DIR}/adas-ldp.webp`, fourWdOnly: true },
    { code: "ELK", name: "ช่วยควบคุมรถให้อยู่ในเลน", img: `${DIR}/adas-elk.webp`, fourWdOnly: true },
    { code: "TJA", name: "ช่วยขับในสภาพความเร็วต่ำ", img: `${DIR}/adas-tja.webp`, fourWdOnly: true },
    { code: "DAI", name: "แจ้งเตือนการออกตัว", img: `${DIR}/adas-dai.webp`, fourWdOnly: true },
    { code: "HMA", name: "ไฟหน้า Matrix ปรับสูง-ต่ำอัตโนมัติ", img: `${DIR}/adas-hma.webp`, fourWdOnly: true },
  ],
  colors: [
    { name: "Arctic White", swatch: "#EEEEEC", img: `${DIR}/color-white.webp` },
    { name: "Urban Grey", swatch: "#6E7173", img: `${DIR}/color-grey.webp` },
    { name: "Night Black", swatch: "#1B1C1E", img: `${DIR}/color-black.webp` },
    { name: "Honey Yellow", swatch: "#E3B53C", img: `${DIR}/color-yellow.webp` },
  ],
};
