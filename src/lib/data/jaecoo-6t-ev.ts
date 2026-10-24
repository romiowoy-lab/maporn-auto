// JAECOO 6T EV — sub-model of the JAECOO 6 family on /brands/omoda-jaecoo (rendered by JaecooEvShowroom).
// Specs from the official spec sheet J6_T_Spec_Sheet (JAECOO6TEVV2-032026) and price from
// omodajaecoo.co.th/th/model/jaecoo-6t-ev (Oct 2026). Photography: OMODA & JAECOO Thailand.

import type { JaecooEvData } from "@/components/brands/jaecoo/JaecooEvShowroom";
import { formatTHB } from "@/lib/utils";

const DIR = "/brand/jaecoo-6t-ev";
// The 6T shares its ADAS illustrations with the 6T REEV
const ADAS = (file: string) => `/brand/jaecoo-6t-reev/${file}.webp`;

export const j6tEv: JaecooEvData = {
  id: "j6t",
  name: "JAECOO 6T EV",
  tagline: "100% Electric · Tough on All Roads",
  headline: "แกร่งเหนือระดับ พร้อมก้าวข้ามทุกขีดจำกัด",
  startPrice: 1099000,
  hero: { image: `${DIR}/resize-j6t-red-800x500.webp`, position: "50% 60%" },
  highlights: [
    { value: 279, unit: "hp", label: "Power", note: "มอเตอร์คู่ 205 kW" },
    { value: 385, unit: "Nm", label: "Torque", note: "ขับเคลื่อนสี่ล้อ iWD" },
    { value: 6.5, unit: "s", label: "0-100 km/h", note: null },
    { value: 436, unit: "km", label: "Range*", note: "* มาตรฐาน NEDC" },
  ],
  design: {
    eyebrow: "One Box Design · Wide Body",
    title: "สะกดทุกสายตา ด้วยดีไซน์ทรงกล่องตัวถังกว้าง",
    wide: `${DIR}/card-performance-full.webp`,
    wideAlt: "JAECOO 6T EV ด้านข้าง ระยะต่ำสุดจากพื้น 225 มม.",
    wideAspect: "1320 / 540",
    points: [
      "ONE BOX STYLE พร้อมโป่งล้อขนาดใหญ่ เท่ ดุดัน แข็งแกร่ง",
      "โครงสร้างตัวถังอะลูมิเนียม น้ำหนักเบาแต่แข็งแรง ทนทานต่อการบิดงอ",
      "ช่วงล่างหลังมัลติลิงค์แบบ H-ARM ยึดเกาะถนนดี นุ่มนวลในการขับขี่",
      "ระยะต่ำสุดจากพื้น 225 มม. · ล้อ 19 นิ้ว ยาง 245/55 R19",
    ],
    detail: `${DIR}/card-performance-black-1.webp`,
    detailAlt: "โครงสร้างตัวถังอะลูมิเนียม JAECOO 6T EV",
    detailAspect: "648 / 520",
  },
  battery: {
    title: "ไฟฟ้า 100% วิ่งไกล 436 กม. ชาร์จไว DC 85 kW",
    image: `${DIR}/card-performance-black.webp`,
    imageAlt: "ช่วงล่างหลังมัลติลิงค์แบบ H-ARM",
    imageAspect: "648 / 520",
    stats: [
      { value: 69.77, unit: "kWh", label: "Battery", note: "แบตเตอรี่ไฟฟ้าแรงสูง", decimals: 2 },
      { value: 85, unit: "kW", label: "DC charge", note: "สูงสุดโดยประมาณ" },
      { value: 6.6, unit: "kW", label: "AC charge", note: "สูงสุด" },
      { value: 3.3, unit: "kW", label: "V2L", note: "จ่ายไฟภายนอก" },
    ],
    points: [
      "แบตเตอรี่ความจุ 69.77 kWh วิ่งได้ไกลสูงสุด 436 กม. (NEDC)",
      "ชาร์จเร็ว DC สูงสุดประมาณ 85 kW · AC สูงสุด 6.6 kW",
      "ระบบขับเคลื่อนอัจฉริยะ iWD มอเตอร์คู่ ขับเคลื่อนสี่ล้อ",
      "V2L จ่ายไฟให้อุปกรณ์ภายนอก 3.3 kW พร้อมโหมดแคมป์ปิ้ง",
    ],
  },
  interior: {
    title: "ห้องโดยสารที่เติมเต็มสุนทรียภาพแห่งการขับขี่",
    main: `${DIR}/image-1.webp`,
    mainAlt: "ห้องโดยสาร JAECOO 6T EV จอกลาง 15.6 นิ้ว",
    tiles: [
      { src: `${DIR}/s-2-copy.webp`, alt: "เบาะคู่หน้าพร้อมฟังก์ชันนวดและระบายอากาศ", label: "นวดผ่อนคลาย + ระบายอากาศคู่หน้า" },
      { src: `${DIR}/s-3-copy.webp`, alt: "เบาะหลังพร้อมฟังก์ชันระบายอากาศ", label: "เบาะระบายอากาศ 4 ตำแหน่ง" },
    ],
    points: [
      "จอสัมผัสกลาง 15.6 นิ้ว + จอมาตรวัด 9.2 นิ้ว",
      "ฟังก์ชันนวดผ่อนคลายคู่หน้า และที่รองน่องผู้โดยสารด้านหน้า",
      "เบาะระบายอากาศ 4 ตำแหน่ง · เบาะคนขับปรับไฟฟ้า 6 ทิศทาง พร้อมหน่วยความจำ",
      "เครื่องเสียง INFINITY 12 ลำโพง · ไฟ Ambient 64 เฉดสี",
      "หลังคาพาโนรามิคซันรูฟ · แท่นชาร์จไร้สาย 50 วัตต์ · กรองฝุ่น PM2.5",
    ],
  },
  driveModes: {
    title: "9 โหมดการขับขี่อัจฉริยะ ทุกสภาพถนน",
    note: "ปรับได้ตามสภาพถนน ทั้งในเมือง ทางลาดชัน และออฟโรด",
    modes: ["Eco", "Normal", "Sport", "Custom", "All Road", "Slippery", "Beach", "Muddy", "Bumpy"],
    highlightFirst: 4,
  },
  safety: {
    eyebrow: "ADAS · 9 ระบบ",
    title: "มั่นใจกับระบบอัจฉริยะ ที่พร้อมปกป้องคุณในทุกสถานการณ์",
    note: "ถุงลมนิรภัย 6 ใบ · กล้องรอบทิศทาง 540° · กล้องบันทึกภาพ built-in",
    items: [
      { code: "ACC", name: "ควบคุมความเร็วอัตโนมัติ", img: ADAS("01-acc") },
      { code: "AEB", name: "เบรกฉุกเฉินอัตโนมัติ", img: ADAS("02-aeb") },
      { code: "BSD", name: "ตรวจสอบจุดอับสายตา", img: ADAS("04-bsd") },
      { code: "DAI", name: "แจ้งเตือนการออกตัว", img: ADAS("06-dai-op1") },
      { code: "FCW", name: "เตือนการชนด้านหน้า", img: ADAS("10-fcw") },
      { code: "LDP", name: "ป้องกันการออกนอกเลน", img: ADAS("17-ldp") },
      { code: "LDW", name: "เตือนการออกนอกเลน", img: ADAS("18-ldw") },
      { code: "TJA", name: "ช่วยขับในสภาพความเร็วต่ำ", img: ADAS("23-tja") },
      { code: "HMA", name: "ไฟหน้า Matrix ปรับสูง-ต่ำอัตโนมัติ", img: ADAS("11-hma") },
    ],
  },
  colors: {
    title: "เลือกสีที่ใช่ในแบบของคุณ",
    items: [
      { name: "Toronto Red", swatch: "#B8321F", img: `${DIR}/resize-j6t-red-800x500.webp` },
      { name: "Arctic White", swatch: "#EEEEEC", img: `${DIR}/resize-j6t-white-800x500.webp` },
      { name: "Platinum Silver", swatch: "#B9BCBF", img: `${DIR}/resize-j6t-silver-800x500.webp` },
      { name: "Urban Grey", swatch: "#6E7173", img: `${DIR}/resize-j6t-grey-800x500.webp` },
      { name: "Night Black", swatch: "#1B1C1E", img: `${DIR}/resize-j6t-black-800x500.webp` },
    ],
    note: "สี Arctic White และ Toronto Red มาพร้อมภายในสีขาว-ดำ",
  },
  specs: {
    columns: ["Long Range 4WD"],
    rows: [
      { label: "ราคาแนะนำ", values: [formatTHB(1099000)] },
      { label: "ระบบขับเคลื่อน", values: ["ขับเคลื่อนสี่ล้อ · มอเตอร์ 2 ตัว"] },
      { label: "กำลังสูงสุด", values: ["205 kW (279 แรงม้า)"] },
      { label: "แรงบิดสูงสุด", values: ["385 Nm"] },
      { label: "0-100 กม./ชม.", values: ["6.5 วินาที"] },
      { label: "ระยะทาง (NEDC)", values: ["436 กม."] },
      { label: "แบตเตอรี่", values: ["69.77 kWh"] },
      { label: "ชาร์จ AC / DC สูงสุด", values: ["6.6 kW / 85 kW (โดยประมาณ)"] },
      { label: "จ่ายไฟภายนอก V2L", values: ["3.3 kW"] },
      { label: "ความเร็วสูงสุด", values: ["150 กม./ชม."] },
      { label: "มิติตัวถัง กว้าง×ยาว×สูง (มม.)", values: ["1,916 × 4,433 × 1,741"] },
      { label: "ระยะฐานล้อ", values: ["2,715 มม."] },
      { label: "ระยะต่ำสุดจากพื้น", values: ["225 มม."] },
      { label: "ล้อและยาง", values: ["245/55 R19"] },
      { label: "พื้นที่สัมภาระ", values: ["450 ลิตร"] },
      { label: "โหมดการขับขี่", values: ["9 โหมด"] },
      { label: "เครื่องเสียง", values: ["INFINITY 12 ลำโพง"] },
    ],
    source: "ที่มา: ตารางสเปก JAECOO 6T EV อย่างเป็นทางการ (มี.ค. 2026) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม",
  },
  cta: { title: "พร้อมลุยทุกเส้นทางกับ JAECOO 6T EV?", image: `${DIR}/image-1.webp` },
};
