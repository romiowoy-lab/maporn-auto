// JAECOO 5 EV — data for the "JAECOO 5 EV" tab of /brands/omoda-jaecoo (rendered by JaecooEvShowroom).
// Specs from the official spec sheet JAECOO_5_EV_SPEC_TH (JAECOO5EV(KD)V1-032026), which covers the
// MAX+ only; prices from omodajaecoo.co.th/th/model/jaecoo-5-ev (Oct 2026). Photography: OMODA &
// JAECOO Thailand. ADAS illustrations are the brand's shared set (stored with the OMODA C5 EV).

import type { JaecooEvData } from "@/components/brands/jaecoo/JaecooEvShowroom";
import { formatTHB } from "@/lib/utils";

const DIR = "/brand/jaecoo-j5";
const ADAS = (code: string) => `/brand/omoda-c5-ev/adas-${code.toLowerCase()}.webp`;

export const j5: JaecooEvData = {
  id: "j5",
  name: "JAECOO 5 EV",
  tagline: "100% Electric · Enjoy Each Moment Outdoors",
  headline: "SUV ไฟฟ้า หลังคาแก้วพาโนรามิค 1.45 ตร.ม.",
  startPrice: 699000,
  hero: { image: `${DIR}/hero.webp`, position: "60% 60%" },
  highlights: [
    { value: 211, unit: "hp", label: "Power", note: "155 kW · ขับเคลื่อนล้อหน้า" },
    { value: 405, unit: "km", label: "Range*", note: "* มาตรฐาน NEDC" },
    { value: 7.7, unit: "s", label: "0-100 km/h", note: "อัตราเร่ง" },
    { value: 1284, unit: "L", label: "Cargo", note: "เมื่อพับเบาะหลัง" },
  ],
  design: {
    eyebrow: "Enjoy Each Moment Outdoors",
    title: "ดีไซน์ทันสมัย พร้อมทุกการเดินทาง",
    wide: `${DIR}/rear-lake.webp`,
    wideAlt: "JAECOO 5 EV ริมทะเลสาบ",
    wideAspect: "1320 / 540",
    points: [
      "หลังคาแก้วพาโนรามิค (Panoramic Fixed Glass Roof) ขนาด 1.45 ตร.ม.",
      "ไฟหน้า LED พร้อมระบบเปิด-ปิดอัตโนมัติ · ไฟท้าย LED",
      "ราวหลังคา · สปอยเลอร์หลังคาแบบสปอร์ต",
      "ประตูท้ายเปิด-ปิดด้วยระบบไฟฟ้า",
      "ล้อ 18 นิ้ว ยาง 235/55 R18 · ระยะต่ำสุดจากพื้น 174 มม.",
    ],
    detail: `${DIR}/sunroof.webp`,
    detailAlt: "หลังคาแก้วพาโนรามิค 1.45 ตร.ม.",
    detailAspect: "1488 / 1000",
  },
  battery: {
    title: "ไฟฟ้า 100% วิ่งไกล พื้นที่เหลือเฟือ",
    image: `${DIR}/luggage.webp`,
    imageAlt: "พื้นที่เก็บสัมภาระ JAECOO 5 EV สูงสุด 1,284 ลิตร",
    imageAspect: "1920 / 785",
    stats: [
      { value: 50.6, unit: "kWh", label: "Battery", note: "แบตเตอรี่ไฟฟ้าแรงสูง" },
      { value: 130, unit: "kW", label: "DC charge", note: "สูงสุด" },
      { value: 6.6, unit: "kW", label: "AC charge", note: "สูงสุด" },
      { value: 175, unit: "km/h", label: "Top speed", note: "โดยประมาณ" },
    ],
    points: [
      "มอเตอร์ไฟฟ้า 1 ตัว 155 kW (211 แรงม้า) แรงบิด 288 Nm ขับเคลื่อนล้อหน้า",
      "วิ่งไกล 405 กม. ต่อการชาร์จ (NEDC) · ชาร์จ DC สูงสุด 130 kW / AC 6.6 kW",
      "พื้นที่สัมภาระด้านหลัง 480 ลิตร ขยายได้ถึง 1,284 ลิตร + ช่องเก็บของด้านหน้า 35 ลิตร",
      "โหมดการขับขี่ Eco / Normal / Sport",
    ],
  },
  interior: {
    title: "กว้างขวาง โปร่งสบาย ทุกที่นั่ง",
    main: `${DIR}/interior.webp`,
    mainAlt: "ห้องโดยสาร JAECOO 5 EV",
    tiles: [
      { src: `${DIR}/screen-13.webp`, alt: "จอสัมผัส 13.2 นิ้ว", label: "จอกลาง 13.2 นิ้ว" },
      { src: `${DIR}/dash-side.webp`, alt: "ห้องคนขับ JAECOO 5 EV", label: "ห้องคนขับ" },
      { src: `${DIR}/pet-cabin.webp`, alt: "ห้องโดยสารกว้างขวาง", label: "ห้องโดยสารโปร่งสบาย" },
    ],
    points: [
      "จอสัมผัสกลาง 13.2 นิ้ว + จอมาตรวัด 8 นิ้ว · เครื่องเสียง 8 ลำโพง",
      "เบาะผู้ขับขี่ปรับไฟฟ้า 6 ทิศทาง พร้อมฟังก์ชันระบายอากาศ",
      "เบาะผู้โดยสารด้านหน้าปรับไฟฟ้า 4 ทิศทาง พร้อมฟังก์ชันระบายอากาศ",
      "ไฟแสงสร้างบรรยากาศ 64 เฉดสี · แท่นชาร์จมือถือไร้สาย 50 วัตต์",
      "เบาะหลังพับได้ 60/40 · ระบบปรับอากาศอัตโนมัติ · กุญแจ Keyless",
    ],
  },
  safety: {
    eyebrow: "ADAS · 18 ระบบ",
    title: "ระบบช่วยขับอัจฉริยะ ปลอดภัยทุกเส้นทาง",
    note: "พร้อมถุงลมนิรภัย 6 ใบ · กล้องรอบทิศทาง 540° · ABS, EBD, BAS, ESP, TCS, HAC, HDC",
    items: [
      { code: "ACC", name: "ควบคุมความเร็วอัตโนมัติ", img: ADAS("acc") },
      { code: "TJA", name: "ช่วยขับในสภาพความเร็วต่ำ", img: ADAS("tja") },
      { code: "ICA", name: "รักษารถให้อยู่กลางเลน", img: ADAS("ica") },
      { code: "AEB", name: "เบรกฉุกเฉินอัตโนมัติ", img: ADAS("aeb") },
      { code: "IES", name: "ช่วยเบรกฉุกเฉินอัจฉริยะ", img: ADAS("ies") },
      { code: "FCW", name: "เตือนการชนด้านหน้า", img: ADAS("fcw") },
      { code: "LDW", name: "เตือนการออกนอกเลน", img: ADAS("ldw") },
      { code: "LDP", name: "ป้องกันการออกนอกเลน", img: ADAS("ldp") },
      { code: "LKA", name: "ควบคุมรถให้อยู่ในช่องทาง", img: null },
      { code: "ELK", name: "ช่วยควบคุมรถให้อยู่ในเลน", img: ADAS("elk") },
      { code: "LCA", name: "ช่วยเหลือเพื่อเปลี่ยนเลน", img: ADAS("lca") },
      { code: "BSD", name: "ตรวจสอบจุดอับสายตา", img: ADAS("bsd") },
      { code: "DOW", name: "เตือนเมื่อเปิดประตู", img: ADAS("dow") },
      { code: "RCW", name: "เตือนการชนด้านหลัง", img: ADAS("rcw") },
      { code: "RCTA", name: "เตือนจุดอับสายตาขณะถอยหลัง", img: ADAS("rcta") },
      { code: "RCTB", name: "ช่วยเบรกขณะถอยหลัง", img: ADAS("rctb") },
      { code: "DAI", name: "แจ้งเตือนการออกตัว", img: ADAS("dai") },
      { code: "ASL", name: "จำกัดความเร็วแบบแอ็คทีฟ", img: null },
    ],
  },
  colors: {
    title: "เลือกสีที่ใช่สำหรับทุกการเดินทาง",
    items: [
      { name: "Snowy White", swatch: "#EEEFEF", img: `${DIR}/color-snowy-white.webp` },
      { name: "Cloudy Grey", swatch: "#BFC2C3", img: `${DIR}/color-cloudy-grey.webp` },
      { name: "Carbon Black", swatch: "#17181A", img: `${DIR}/color-carbon-black.webp` },
      { name: "Light Sea Green", swatch: "#5E8784", img: `${DIR}/color-light-sea-green.webp` },
      { name: "Bahamas Blue", swatch: "#252B45", img: `${DIR}/color-bahamas-blue.webp` },
    ],
    note: "สีของรุ่น MAX+ · รุ่น ULTRA มีสีทูโทนหลังคาดำ และภายในโทนสีน้ำตาลให้เลือก",
  },
  specs: {
    columns: ["MAX+"],
    rows: [
      { label: "ราคาแนะนำ", values: [formatTHB(699000)] },
      { label: "ระบบขับเคลื่อน", values: ["ไฟฟ้า · ขับเคลื่อนล้อหน้า · มอเตอร์ 1 ตัว"] },
      { label: "กำลังสูงสุด", values: ["155 kW (211 แรงม้า)"] },
      { label: "แรงบิดสูงสุด", values: ["288 Nm"] },
      { label: "แบตเตอรี่", values: ["50.6 kWh"] },
      { label: "ระยะทาง (NEDC)", values: ["405 กม."] },
      { label: "ชาร์จ AC / DC สูงสุด", values: ["6.6 kW / 130 kW"] },
      { label: "0-100 กม./ชม.", values: ["7.7 วินาที"] },
      { label: "ความเร็วสูงสุด", values: ["175 กม./ชม."] },
      { label: "พื้นที่สัมภาระ หน้า / หลัง", values: ["35 ลิตร / 480–1,284 ลิตร"] },
      { label: "มิติตัวถัง กว้าง×ยาว×สูง", values: ["1,860 × 4,380 × 1,650 มม."] },
      { label: "ระยะฐานล้อ", values: ["2,620 มม."] },
      { label: "ระยะต่ำสุดจากพื้น", values: ["174 มม."] },
      { label: "ล้อและยาง", values: ["235/55 R18"] },
      { label: "ช่วงล่าง หน้า / หลัง", values: ["แม็คเฟอร์สันสตรัท / มัลติลิงค์"] },
      { label: "ถุงลมนิรภัย", values: ["6 ใบ (หน้า · ข้างคู่หน้า · ม่านลม)"] },
    ],
    extra: `ต้องการวิ่งไกลขึ้น? NEW JAECOO 5 EV ULTRA แบตเตอรี่ 60.93 kWh วิ่งไกล 480 กม. ราคา ${formatTHB(809000)} — เลือกได้ที่แถบรุ่นย่อยด้านบน`,
    source: "ที่มา: ตารางสเปก JAECOO 5 EV MAX+ อย่างเป็นทางการ (มี.ค. 2026) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และสภาพแวดล้อม",
  },
  cta: { title: "พร้อมออกเดินทางกับ JAECOO 5 EV?", image: `${DIR}/hero.webp` },
};
