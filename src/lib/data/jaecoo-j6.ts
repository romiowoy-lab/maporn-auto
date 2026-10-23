// JAECOO 6 EV — data for the "JAECOO 6 EV" tab of /brands/omoda-jaecoo (rendered by JaecooEvShowroom).
// Specs from the official spec sheet JAECOO_6_EV_SPEC_TH (JAECOO6EV(KD)V1-032026) and prices
// from omodajaecoo.co.th/th/model/jaecoo-6-ev (Oct 2026). Photography: OMODA & JAECOO Thailand.

import type { JaecooEvData } from "@/components/brands/jaecoo/JaecooEvShowroom";
import { formatTHB } from "@/lib/utils";

const DIR = "/brand/jaecoo-j6";
const ADAS = (code: string) => `${DIR}/adas-${code.toLowerCase()}.webp`;
const ONLY_4WD = "เฉพาะ 4WD";

export const j6: JaecooEvData = {
  id: "j6",
  name: "JAECOO 6 EV",
  tagline: "100% Electric · One Box Style Off-Road",
  headline: "ฉีกกฎงานดีไซน์ทุกการเดินทาง",
  startPrice: 859000,
  hero: { video: `${DIR}/j6-hero.mp4`, image: `${DIR}/side-silver.webp` },
  highlights: [
    { value: 279, unit: "hp", label: "Power", note: "4WD · 2WD 184 แรงม้า" },
    { value: 385, unit: "Nm", label: "Torque", note: "4WD · 2WD 220 Nm" },
    { value: 6.5, unit: "s", label: "0-100 km/h", note: "4WD · 2WD 10.5 วินาที" },
    { value: 455, unit: "km", label: "Range*", note: "* NEDC 2WD · 4WD 418 กม." },
  ],
  design: {
    eyebrow: "One Box Style · Off-Road Trendy",
    title: "ฉีกกฎงานดีไซน์ทุกการเดินทาง",
    wide: `${DIR}/side-silver.webp`,
    wideAlt: "JAECOO 6 EV ด้านข้าง",
    wideAspect: "1320 / 540",
    points: [
      "ONE BOX STYLE · OFF-ROAD TRENDY — ดีไซน์ทรงกล่องสไตล์ออฟโรด",
      "โครงสร้างตัวถังอะลูมิเนียม แข็งแรงและน้ำหนักเบา",
      "ระยะยื่นหน้า-หลังสั้น ช่วยให้ขับออฟโรดได้คล่องตัว",
      "ระยะต่ำสุดจากพื้น 195 มม.",
    ],
    detail: `${DIR}/body-structure.webp`,
    detailAlt: "โครงสร้างตัวถังอะลูมิเนียม JAECOO 6 EV",
    detailAspect: "648 / 520",
  },
  battery: {
    title: "ไฟฟ้า 100% วิ่งไกล ชาร์จไว",
    image: `${DIR}/battery-lfp.webp`,
    imageAlt: "แบตเตอรี่ LFP 68 kWh",
    imageAspect: "648 / 520",
    stats: [
      { value: 68, unit: "kWh", label: "Battery", note: "LFP" },
      { value: 80, unit: "kW", label: "DC charge", note: "สูงสุดโดยประมาณ" },
      { value: 6.6, unit: "kW", label: "AC charge", note: "สูงสุด" },
      { value: 3.3, unit: "kW", label: "V2L", note: "จ่ายไฟภายนอก" },
    ],
    points: [
      "แบตเตอรี่ LFP ความจุ 68 kWh ปลอดภัยสูง อายุการใช้งานยาวนาน",
      "วิ่งไกลสูงสุด 455 กม. (2WD) / 418 กม. (4WD) มาตรฐาน NEDC",
      "ชาร์จเร็ว DC สูงสุดประมาณ 80 kW · AC สูงสุด 6.6 kW",
      "V2L จ่ายไฟให้อุปกรณ์ภายนอก 3.3 kW — เหมาะกับสายแคมป์ปิ้ง",
    ],
  },
  interior: {
    title: "เติมเต็มสุนทรียภาพแห่งการขับขี่",
    main: `${DIR}/interior-dash.webp`,
    mainAlt: "ห้องโดยสาร JAECOO 6 EV จอกลาง 15.6 นิ้ว",
    tiles: [
      { src: `${DIR}/seats-massage.webp`, alt: "เบาะคู่หน้าพร้อมฟังก์ชันนวด" },
      { src: `${DIR}/interior-green.webp`, alt: "ห้องโดยสารโทนสีเขียว" },
    ],
    points: [
      "จอสัมผัสกลาง 15.6 นิ้ว + จอมาตรวัด 9.2 นิ้ว",
      "ฟังก์ชันนวดผ่อนคลายผู้โดยสารคู่หน้า และที่รองขาผู้โดยสารด้านหน้า (4WD)",
      "เครื่องเสียง INFINITY 12 ลำโพง (4WD) / PIONEER 6 ลำโพง (2WD)",
      "แท่นชาร์จมือถือไร้สาย 50 วัตต์ · ระบบกรองฝุ่น PM2.5",
      "ระบบปรับอากาศแยกอิสระ 2 โซน · สั่งงานแอร์ผ่านรีโมท",
      "โหมดแคมป์ปิ้ง และโหมดสัตว์เลี้ยง",
    ],
  },
  driveModes: {
    title: "สนุกและปลอดภัยด้วย 9 โหมดการขับขี่",
    note: "LONG RANGE 4WD 9 โหมด · 2WD MAX 4 โหมด (Eco, Normal, Sport, Custom)",
    modes: ["Eco", "Normal", "Sport", "Custom", "All Road", "Slippery", "Beach", "Muddy", "Bumpy"],
    highlightFirst: 4,
  },
  safety: {
    eyebrow: "ADAS · 14 ระบบ",
    title: "มั่นใจทุกการขับขี่ ด้วยเทคโนโลยีความปลอดภัยเหนือระดับ",
    note: "LONG RANGE 4WD ครบ 14 ระบบ · 2WD MAX 8 ระบบ · ถุงลมนิรภัย 6 ใบ ทั้ง 2 รุ่น",
    // badge: not on 2WD MAX per the spec sheet
    items: [
      { code: "ACC", name: "ควบคุมความเร็วอัตโนมัติ", img: ADAS("acc") },
      { code: "AEB", name: "เบรกฉุกเฉินอัตโนมัติ", img: ADAS("aeb") },
      { code: "BSD", name: "เตือนจุดอับสายตา", img: ADAS("bsd") },
      { code: "DOW", name: "เตือนเมื่อเปิดประตู", img: ADAS("dow") },
      { code: "FCW", name: "เตือนการชนด้านหน้า", img: ADAS("fcw") },
      { code: "RCW", name: "เตือนการชนด้านหลัง", img: ADAS("rcw") },
      { code: "RCTA", name: "เตือนจุดอับสายตาขณะถอยหลัง", img: ADAS("rcta") },
      { code: "LCW", name: "เตือนเมื่อจะเปลี่ยนเลน", img: ADAS("lcw") },
      { code: "LDW", name: "เตือนการออกนอกเลน", img: ADAS("ldw"), badge: ONLY_4WD },
      { code: "LDP", name: "ป้องกันการออกนอกเลน", img: ADAS("ldp"), badge: ONLY_4WD },
      { code: "ELK", name: "ช่วยควบคุมรถให้อยู่ในเลน", img: ADAS("elk"), badge: ONLY_4WD },
      { code: "TJA", name: "ช่วยขับในสภาพความเร็วต่ำ", img: ADAS("tja"), badge: ONLY_4WD },
      { code: "DAI", name: "แจ้งเตือนการออกตัว", img: ADAS("dai"), badge: ONLY_4WD },
      { code: "HMA", name: "ไฟหน้า Matrix ปรับสูง-ต่ำอัตโนมัติ", img: ADAS("hma"), badge: ONLY_4WD },
    ],
  },
  colors: {
    title: "ความโดดเด่นที่เหมาะกับไลฟ์สไตล์ของคุณ",
    items: [
      { name: "Arctic White", swatch: "#EEEEEC", img: `${DIR}/color-white.webp` },
      { name: "Urban Grey", swatch: "#6E7173", img: `${DIR}/color-grey.webp` },
      { name: "Night Black", swatch: "#1B1C1E", img: `${DIR}/color-black.webp` },
      { name: "Honey Yellow", swatch: "#E3B53C", img: `${DIR}/color-yellow.webp` },
    ],
    note: "รุ่น LONG RANGE 4WD มีสี Forest Green เพิ่มเติม",
  },
  specs: {
    columns: ["2WD MAX", "LONG RANGE 4WD"],
    rows: [
      { label: "ราคาแนะนำ", values: [formatTHB(859000), formatTHB(1249000)] },
      { label: "ระบบขับเคลื่อน", values: ["ขับเคลื่อนล้อหลัง · มอเตอร์ 1 ตัว", "ขับเคลื่อนสี่ล้อ · มอเตอร์ 2 ตัว"] },
      { label: "กำลังสูงสุด", values: ["135 kW (184 แรงม้า)", "205 kW (279 แรงม้า)"] },
      { label: "แรงบิดสูงสุด", values: ["220 Nm", "385 Nm"] },
      { label: "0-100 กม./ชม.", values: ["10.5 วินาที", "6.5 วินาที"] },
      { label: "ระยะทาง (NEDC)", values: ["455 กม.", "418 กม."] },
      { label: "มิติตัวถัง กว้าง×ยาว×สูง (มม.)", values: ["1,910 × 4,342 × 1,715", "1,910 × 4,406 × 1,715"] },
      { label: "ล้อและยาง", values: ["225/60 R18", "225/55 R19"] },
      { label: "กล้องรอบทิศทาง", values: ["360°", "540°"] },
      { label: "เครื่องเสียง", values: ["PIONEER 6 ลำโพง", "INFINITY 12 ลำโพง"] },
      { label: "โหมดการขับขี่", values: ["4 โหมด", "9 โหมด"] },
      { label: "แบตเตอรี่", values: ["68 kWh LFP", "68 kWh LFP"] },
      { label: "ชาร์จ AC สูงสุด", values: ["6.6 kW", "6.6 kW"] },
      { label: "ชาร์จ DC สูงสุด", values: ["80 kW (โดยประมาณ)", "80 kW (โดยประมาณ)"] },
      { label: "จ่ายไฟภายนอก V2L", values: ["3.3 kW", "3.3 kW"] },
      { label: "ความเร็วสูงสุด", values: ["150 กม./ชม.", "150 กม./ชม."] },
      { label: "พื้นที่สัมภาระ", values: ["450 ลิตร", "450 ลิตร"] },
      { label: "ระยะฐานล้อ", values: ["2,715 มม.", "2,715 มม."] },
      { label: "ระยะต่ำสุดจากพื้น", values: ["195 มม.", "195 มม."] },
    ],
    source: "ที่มา: ตารางสเปก JAECOO 6 EV อย่างเป็นทางการ (มี.ค. 2026) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม",
  },
  cta: { title: "พร้อมออกเดินทางกับ JAECOO 6 EV?", image: `${DIR}/interior-dash.webp` },
};
