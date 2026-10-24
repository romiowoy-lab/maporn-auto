// JAECOO 6T REEV — sub-model of the JAECOO 6 family on /brands/omoda-jaecoo (rendered by JaecooEvShowroom).
// Specs from the official spec sheet JAECOO_6_T_REEV_SPEC_TH (JAECOO6TREEVV1-062026) and prices from
// omodajaecoo.co.th/th/model/jaecoo-6t-reev (Oct 2026). Photography: OMODA & JAECOO Thailand.

import type { JaecooEvData } from "@/components/brands/jaecoo/JaecooEvShowroom";
import { formatTHB } from "@/lib/utils";

const DIR = "/brand/jaecoo-6t-reev";
const ADAS = (file: string) => `${DIR}/${file}.webp`;

export const j6tReev: JaecooEvData = {
  id: "j6treev",
  name: "JAECOO 6T REEV",
  tagline: "Range Extended EV · When Life Happens, Keep Moving",
  headline: "ทุกเส้นทาง ทุกความเป็นไปได้",
  startPrice: 899900,
  hero: { image: `${DIR}/hero.webp`, position: "70% 50%" },
  highlights: [
    { value: 800, unit: "km", label: "Total range*", note: "* NEDC 2WD MAX · 4WD 750 กม." },
    { value: 190, unit: "km", label: "EV range*", note: "ไฟฟ้าล้วน 2WD · 4WD 160 กม." },
    { value: 428, unit: "hp", label: "Power", note: "4WD ULTRA · 2WD 252 แรงม้า" },
    { value: 5.5, unit: "s", label: "0-100 km/h", note: "4WD ULTRA · 2WD 7.9 วินาที" },
  ],
  design: {
    eyebrow: "Ready for Every Road",
    title: "พร้อมลุยทุกเส้นทาง",
    wide: `${DIR}/image-ready-for-every-road-th.webp`,
    wideAlt: "JAECOO 6T REEV บนถนน",
    wideAspect: "1320 / 540",
    points: [
      "ดีไซน์ทรงกล่อง ONE BOX ให้ความรู้สึกแข็งแกร่ง",
      "ไฟหน้า LED พร้อมระบบ Matrix Adaptive ปรับไฟสูง-ต่ำอัตโนมัติ",
      "ล้ออัลลอยด์ 21 นิ้ว (4WD ULTRA) · 19 นิ้ว (2WD MAX)",
      "ประตูท้ายไฟฟ้า · บันไดข้าง · ราวหลังคา · ระยะต่ำสุดจากพื้น 215–220 มม.",
    ],
    detail: `${DIR}/image-electrifying-performance-th.webp`,
    detailAlt: "สมรรถนะการขับเคลื่อนด้วยไฟฟ้า JAECOO 6T REEV",
    detailAspect: "1298 / 1040",
  },
  battery: {
    title: "ขับด้วยไฟฟ้า ไปได้ไกลกว่าด้วย REEV",
    image: `${DIR}/image-go-further-th.webp`,
    imageAlt: "ระบบขยายระยะทาง REEV ของ JAECOO 6T REEV",
    imageAspect: "649 / 520",
    stats: [
      { value: 33.67, unit: "kWh", label: "Battery", note: "LFP", decimals: 2 },
      { value: 100, unit: "kW", label: "DC charge", note: "สูงสุด" },
      { value: 1.5, unit: "L", label: "Range extender", note: "เทอร์โบ 4 สูบ", decimals: 1 },
      { value: 45, unit: "L", label: "Fuel tank", note: "แก๊สโซฮอล์ 95" },
    ],
    points: [
      "Golden Range Extension Technology จาก Chery — ล้อขับเคลื่อนด้วยมอเตอร์ไฟฟ้าตลอดเวลา",
      "ขับไฟฟ้าล้วนสูงสุด 190 กม. · ระยะทางรวมสูงสุด 800 กม. (2WD MAX, NEDC)",
      "เครื่องยนต์ 1.5 ลิตร เทอร์โบ ทำหน้าที่ปั่นไฟเพื่อขยายระยะทาง ไม่ต้องกังวลเรื่องจุดชาร์จ",
      "ชาร์จ DC สูงสุด 100 kW · AC 6.6 kW · V2L จ่ายไฟภายนอก 2.3 kW",
    ],
  },
  interior: {
    title: "ความสบายที่เดินทางไปกับคุณ",
    main: `${DIR}/interior-dash.webp`,
    mainAlt: "ห้องโดยสาร JAECOO 6T REEV จอกลาง 15.6 นิ้ว",
    tiles: [
      { src: `${DIR}/s-2-copy.webp`, alt: "เบาะคู่หน้าพร้อมฟังก์ชันนวดและระบายอากาศ", label: "นวดผ่อนคลายคู่หน้า (4WD)" },
      { src: `${DIR}/interior-highlight-sunroof-no-text.webp`, alt: "หลังคาพาโนรามิคซันรูฟพร้อมม่านไฟฟ้า", label: "พาโนรามิคซันรูฟ (4WD)" },
      { src: `${DIR}/two-step-second-row-adjustment.webp`, alt: "ปรับเบาะนั่งด้านหลัง 2 ระดับ", label: "ปรับเบาะหลัง 2 ระดับ" },
    ],
    points: [
      "จอสัมผัสกลาง 15.6 นิ้ว + จอมาตรวัด 9.2 นิ้ว · Apple CarPlay / Android Auto ไร้สาย",
      "เบาะคนขับปรับไฟฟ้า 10 ทิศทาง พร้อมหน่วยความจำ · ที่รองน่องผู้โดยสารด้านหน้า",
      "เบาะคู่หน้าระบายอากาศ · ฟังก์ชันนวดผ่อนคลาย (4WD)",
      "เครื่องเสียง INFINITY 12 ลำโพง (4WD) / 8 ลำโพง (2WD)",
      "แท่นชาร์จไร้สาย 50 วัตต์ · แอร์แยกอิสระ 2 โซน สั่งงานผ่านรีโมท",
    ],
  },
  driveModes: {
    title: "9 โหมดการขับขี่อัจฉริยะ",
    note: "4WD ULTRA 9 โหมด · 2WD MAX 4 โหมด (Eco, Normal, Sport, Custom)",
    modes: ["Eco", "Normal", "Sport", "Custom", "All Road", "Slippery", "Beach", "Muddy", "Bumpy"],
    highlightFirst: 4,
  },
  safety: {
    eyebrow: "ADAS · 15 ระบบ",
    title: "เทคโนโลยีอัจฉริยะที่ดูแลทุกการเดินทาง",
    note: "ถุงลมนิรภัย 6 ใบ · กล้องรอบทิศทาง 540° · กล้องบันทึกภาพ built-in",
    items: [
      { code: "ACC", name: "ควบคุมความเร็วอัตโนมัติ", img: ADAS("01-acc") },
      { code: "AEB", name: "เบรกฉุกเฉินอัตโนมัติ", img: ADAS("02-aeb") },
      { code: "BSD", name: "ตรวจสอบจุดอับสายตา", img: ADAS("04-bsd") },
      { code: "DAI", name: "แจ้งเตือนการออกตัว", img: ADAS("06-dai-op1") },
      { code: "DOW", name: "เตือนเมื่อเปิดประตู", img: ADAS("08-dow") },
      { code: "ELK", name: "ช่วยควบคุมรถให้อยู่ในเลน", img: ADAS("09-elk") },
      { code: "FCW", name: "เตือนการชนด้านหน้า", img: ADAS("10-fcw") },
      { code: "HMA", name: "ไฟหน้า Matrix ปรับสูง-ต่ำอัตโนมัติ", img: ADAS("11-hma") },
      { code: "ICA", name: "รักษารถให้อยู่กลางเลน", img: ADAS("12-ica") },
      { code: "LDP", name: "ป้องกันการออกนอกเลน", img: ADAS("17-ldp") },
      { code: "LDW", name: "เตือนการออกนอกเลน", img: ADAS("18-ldw") },
      { code: "LKA", name: "ควบคุมรถให้อยู่ในช่องทาง", img: ADAS("19-lka") },
      { code: "RCTA", name: "เตือนจุดอับสายตาขณะถอยหลัง", img: ADAS("20-rcta") },
      { code: "RCW", name: "เตือนการชนด้านหลัง", img: ADAS("22-rcw") },
      { code: "TJA", name: "ช่วยขับในสภาพความเร็วต่ำ", img: ADAS("23-tja") },
    ],
  },
  colors: {
    title: "เลือกสีที่ใช่ พร้อมไปได้ทุกเส้นทาง",
    items: [
      { name: "Honey Yellow", swatch: "#E3B53C", img: `${DIR}/4-wd-honey-yellow.webp` },
      { name: "Arctic White", swatch: "#EEEEEC", img: `${DIR}/4-wd-arctic-white.webp` },
      { name: "Urban Grey", swatch: "#6E7173", img: `${DIR}/4-wd-urban-grey.webp` },
    ],
    note: "มีสี Night Black เพิ่มเติม · ภาพแสดงรุ่น 4WD ULTRA",
  },
  specs: {
    columns: ["2WD MAX", "4WD ULTRA"],
    rows: [
      { label: "ราคาแนะนำ", values: [formatTHB(899900), formatTHB(999900)] },
      { label: "ระบบขับเคลื่อน", values: ["ขับเคลื่อนล้อหลัง · มอเตอร์ 1 ตัว", "ขับเคลื่อนสี่ล้อ · มอเตอร์ 2 ตัว"] },
      { label: "กำลังสูงสุด", values: ["185 kW (252 แรงม้า)", "315 kW (428 แรงม้า)"] },
      { label: "แรงบิดสูงสุด", values: ["300 Nm", "505 Nm"] },
      { label: "0-100 กม./ชม.", values: ["7.9 วินาที", "5.5 วินาที"] },
      { label: "ระยะทางไฟฟ้าล้วน (NEDC)", values: ["190 กม.", "160 กม."] },
      { label: "ระยะทางรวม (NEDC)", values: ["800 กม.", "750 กม."] },
      { label: "แบตเตอรี่", values: ["33.67 kWh LFP", "33.67 kWh LFP"] },
      { label: "ชาร์จ AC / DC สูงสุด", values: ["6.6 kW / 100 kW", "6.6 kW / 100 kW"] },
      { label: "เครื่องยนต์ขยายระยะทาง", values: ["1,499 ซีซี 4 สูบ เทอร์โบ", "1,499 ซีซี 4 สูบ เทอร์โบ"] },
      { label: "ถังน้ำมัน", values: ["45 ลิตร (แก๊สโซฮอล์ 95)", "45 ลิตร (แก๊สโซฮอล์ 95)"] },
      { label: "ความเร็วสูงสุด", values: ["160 กม./ชม.", "160 กม./ชม."] },
      { label: "มิติตัวถัง กว้าง×ยาว×สูง (มม.)", values: ["1,950 × 4,503 × 1,785", "1,950 × 4,503 × 1,785"] },
      { label: "ระยะฐานล้อ", values: ["2,783 มม.", "2,783 มม."] },
      { label: "ระยะต่ำสุดจากพื้น", values: ["215 มม.", "220 มม."] },
      { label: "ล้อและยาง", values: ["255/55 R19", "265/45 R21"] },
      { label: "พื้นที่สัมภาระ", values: ["450 ลิตร", "450 ลิตร"] },
      { label: "โหมดการขับขี่", values: ["4 โหมด", "9 โหมด"] },
      { label: "เครื่องเสียง", values: ["8 ลำโพง", "INFINITY 12 ลำโพง"] },
    ],
    source: "ที่มา: ตารางสเปก JAECOO 6T REEV อย่างเป็นทางการ (มิ.ย. 2026) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม",
  },
  cta: { title: "พร้อมไปได้ไกลกว่ากับ JAECOO 6T REEV?", image: `${DIR}/interior-dash.webp` },
};
