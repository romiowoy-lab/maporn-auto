// NEW JAECOO 5 EV ULTRA — sub-model of the JAECOO 5 family on /brands/omoda-jaecoo (rendered by JaecooEvShowroom).
// Specs from the official spec sheet JAECOO_5_EV_SPEC_TH (JAECOO5EV(KD)V2-082026, MAX+ / ULTRA) and price from
// omodajaecoo.co.th/th/model/jaecoo-5-ev-ultra (Oct 2026). Photography: OMODA & JAECOO Thailand.
// ADAS illustrations are the brand's shared set (stored with the OMODA C5 EV).

import type { JaecooEvData } from "@/components/brands/jaecoo/JaecooEvShowroom";
import { formatTHB } from "@/lib/utils";

const DIR = "/brand/jaecoo-5-ev-ultra";
const ADAS = (code: string) => `/brand/omoda-c5-ev/adas-${code.toLowerCase()}.webp`;

export const j5Ultra: JaecooEvData = {
  id: "j5u",
  name: "NEW JAECOO 5 EV",
  tagline: "ULTRA · Range Redefined",
  headline: "More Choice. Same Smart Value. วิ่งไกล 480 กม.",
  startPrice: 809000,
  hero: { image: `${DIR}/hero.webp`, position: "70% 50%" },
  highlights: [
    { value: 480, unit: "km", label: "Range*", note: "* มาตรฐาน NEDC" },
    { value: 60.93, unit: "kWh", label: "Battery", note: "ใหญ่ขึ้นจาก 50.6 kWh", decimals: 2 },
    { value: 211, unit: "hp", label: "Power", note: "155 kW · ขับเคลื่อนล้อหน้า" },
    { value: 7.7, unit: "s", label: "0-100 km/h", note: "อัตราเร่ง" },
  ],
  design: {
    eyebrow: "Origin of Nature",
    title: "สุนทรียะแห่งการออกแบบ ที่มาพร้อมความกว้างขวาง",
    wide: `${DIR}/j5-interior-back.webp`,
    wideAlt: "ห้องโดยสาร NEW JAECOO 5 EV มุมกว้าง",
    wideAspect: "1600 / 1067",
    points: [
      "SUV ไฟฟ้าที่สะท้อนปรัชญา “Origin of Nature” ผสานความแข็งแกร่งแบบ JAECOO",
      "หลังคาแก้วพาโนรามิค (Panoramic Fixed Glass Roof) ขนาด 1.45 ตร.ม.",
      "ประตูท้ายไฟฟ้า · ราวหลังคา · สปอยเลอร์หลังคาแบบสปอร์ต",
      "ล้อ 18 นิ้ว ยาง 235/55 R18 · ระยะต่ำสุดจากพื้น 174 มม.",
    ],
    detail: `${DIR}/03-panoramic-th.webp`,
    detailAlt: "หลังคาแก้วพาโนรามิค 1.45 ตร.ม.",
    detailAspect: "648 / 520",
  },
  battery: {
    title: "From Everyday EV to Extended Electric Freedom",
    image: `${DIR}/01-th.webp`,
    imageAlt: "NEW JAECOO 5 EV ULTRA วิ่งไกล 480 กม.",
    imageAspect: "648 / 520",
    stats: [
      { value: 60.93, unit: "kWh", label: "Battery", note: "แบตเตอรี่ไฟฟ้าแรงสูง", decimals: 2 },
      { value: 130, unit: "kW", label: "DC charge", note: "สูงสุด" },
      { value: 6.6, unit: "kW", label: "AC charge", note: "สูงสุด" },
      { value: 175, unit: "km/h", label: "Top speed", note: "โดยประมาณ" },
    ],
    points: [
      "แบตเตอรี่ 60.93 kWh วิ่งไกลขึ้นเป็น 480 กม. ต่อการชาร์จ (NEDC) — MAX+ 405 กม.",
      "ชาร์จเร็ว DC สูงสุด 130 kW · AC สูงสุด 6.6 kW",
      "มอเตอร์ 155 kW (211 แรงม้า) แรงบิด 288 Nm ขับเคลื่อนล้อหน้า",
      "พื้นที่สัมภาระ 480 ลิตร ขยายได้ถึง 1,284 ลิตร + ช่องเก็บของด้านหน้า 35 ลิตร",
    ],
  },
  interior: {
    title: "ที่สุดของความใส่ใจ เพื่อทุกคนที่คุณรัก",
    main: `${DIR}/additional-creative-07.webp`,
    mainAlt: "ห้องคนขับ NEW JAECOO 5 EV จอกลาง 13.2 นิ้ว",
    tiles: [
      { src: `${DIR}/02-13inch-th.webp`, alt: "จอสัมผัส 13.2 นิ้ว", label: "จอกลาง 13.2 นิ้ว" },
      { src: `${DIR}/04-space-th.webp`, alt: "พื้นที่ขยายได้สูงสุด 1,284 ลิตร", label: "สัมภาระสูงสุด 1,284 ลิตร" },
      { src: `${DIR}/j5-interior-01.webp`, alt: "Pet friendly", label: "Pet friendly" },
    ],
    points: [
      "จอสัมผัสกลาง 13.2 นิ้ว + จอมาตรวัด 8 นิ้ว · เครื่องเสียง 8 ลำโพง",
      "ระบบปรับอากาศแยกอิสระ 2 โซน",
      "เบาะคู่หน้าปรับไฟฟ้า พร้อมฟังก์ชันระบายอากาศ · ภายในหนังโทนน้ำตาล (ULTRA)",
      "ไฟ Ambient 64 เฉดสี · แท่นชาร์จไร้สาย 50 วัตต์ · กุญแจ Keyless",
      "พร้อมต้อนรับเพื่อนซี้สี่ขา — Pet friendly",
    ],
  },
  safety: {
    eyebrow: "ADAS · 19 ระบบ",
    title: "มั่นใจทุกการขับขี่ ด้วยเทคโนโลยีความปลอดภัยเหนือระดับ",
    note: "ถุงลมนิรภัย 6 ใบ · กล้องรอบทิศทาง 540° · ABS, EBD, BAS, ESP, TCS, HAC, HDC",
    items: [
      { code: "ACC", name: "ควบคุมความเร็วอัตโนมัติ", img: ADAS("acc") },
      { code: "AEB", name: "เบรกฉุกเฉินอัตโนมัติ", img: ADAS("aeb") },
      { code: "BSD", name: "ตรวจสอบจุดอับสายตา", img: ADAS("bsd") },
      { code: "CSA", name: "ช่วยเหลือขณะเข้าโค้ง", img: ADAS("csa") },
      { code: "DAI", name: "แจ้งเตือนการออกตัว", img: ADAS("dai") },
      { code: "DMS", name: "ตรวจจับความเหนื่อยล้าของผู้ขับขี่", img: ADAS("dms") },
      { code: "DOW", name: "เตือนเมื่อเปิดประตู", img: ADAS("dow") },
      { code: "ELK", name: "ช่วยควบคุมรถให้อยู่ในเลน", img: ADAS("elk") },
      { code: "FCW", name: "เตือนการชนด้านหน้า", img: ADAS("fcw") },
      { code: "ICA", name: "รักษารถให้อยู่กลางเลน", img: ADAS("ica") },
      { code: "IES", name: "ช่วยเบรกฉุกเฉินอัจฉริยะ", img: ADAS("ies") },
      { code: "IHC", name: "ควบคุมไฟสูงอัตโนมัติ", img: ADAS("ihc") },
      { code: "LCA", name: "ช่วยเหลือเพื่อเปลี่ยนเลน", img: ADAS("lca") },
      { code: "LDP", name: "ป้องกันการออกนอกเลน", img: ADAS("ldp") },
      { code: "LDW", name: "เตือนการออกนอกเลน", img: ADAS("ldw") },
      { code: "RCTA", name: "เตือนจุดอับสายตาขณะถอยหลัง", img: ADAS("rcta") },
      { code: "RCTB", name: "ช่วยเบรกขณะถอยหลัง", img: ADAS("rctb") },
      { code: "RCW", name: "เตือนการชนด้านหลัง", img: ADAS("rcw") },
      { code: "TJA", name: "ช่วยขับในสภาพความเร็วต่ำ", img: ADAS("tja") },
    ],
  },
  colors: {
    title: "สีสันแห่งอนาคต",
    items: [
      { name: "Carbon Black", swatch: "#17181A", img: `${DIR}/black.webp` },
      { name: "Snowy White", swatch: "#EEEFEF", img: `${DIR}/white.webp` },
    ],
    note: "รุ่น ULTRA มีสี Carbon Black และ Snowy White พร้อมภายในหนังสีน้ำตาล · สีอื่นมีในรุ่น MAX+",
  },
  specs: {
    columns: ["MAX+", "ULTRA"],
    rows: [
      { label: "ราคาแนะนำ", values: [formatTHB(699000), formatTHB(809000)] },
      { label: "แบตเตอรี่", values: ["50.6 kWh", "60.93 kWh"] },
      { label: "ระยะทาง (NEDC)", values: ["405 กม.", "480 กม."] },
      { label: "ระบบขับเคลื่อน", values: ["ขับเคลื่อนล้อหน้า · มอเตอร์ 1 ตัว", "ขับเคลื่อนล้อหน้า · มอเตอร์ 1 ตัว"] },
      { label: "กำลังสูงสุด", values: ["155 kW (211 แรงม้า)", "155 kW (211 แรงม้า)"] },
      { label: "แรงบิดสูงสุด", values: ["288 Nm", "288 Nm"] },
      { label: "ชาร์จ AC / DC สูงสุด", values: ["6.6 kW / 130 kW", "6.6 kW / 130 kW"] },
      { label: "0-100 กม./ชม.", values: ["7.7 วินาที", "7.7 วินาที"] },
      { label: "ความเร็วสูงสุด", values: ["175 กม./ชม.", "175 กม./ชม."] },
      { label: "พื้นที่สัมภาระ หน้า / หลัง", values: ["35 / 480–1,284 ลิตร", "35 / 480–1,284 ลิตร"] },
      { label: "มิติตัวถัง กว้าง×ยาว×สูง (มม.)", values: ["1,860 × 4,380 × 1,650", "1,860 × 4,380 × 1,650"] },
      { label: "ระยะฐานล้อ", values: ["2,620 มม.", "2,620 มม."] },
      { label: "ระยะต่ำสุดจากพื้น", values: ["174 มม.", "174 มม."] },
      { label: "ล้อและยาง", values: ["235/55 R18", "235/55 R18"] },
      { label: "สีภายใน", values: ["หนังสีดำ", "หนังสีน้ำตาล"] },
    ],
    source: "ที่มา: ตารางสเปก JAECOO 5 EV อย่างเป็นทางการ (ส.ค. 2026) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม",
  },
  cta: { title: "พร้อมไปได้ไกลกว่ากับ NEW JAECOO 5 EV ULTRA?", image: `${DIR}/j5-interior-back.webp` },
};
