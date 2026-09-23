// Suzuki brand-page data. Facts come from the official Maporn Suzuki site
// (mapornsuzukith.com model pages, Sep 2026). PRICES ARE DELIBERATELY NOT INCLUDED —
// the brand page must not show any price.

export type SuzukiCategory = "suv" | "commercial";

export interface SuzukiShowcaseModel {
  id: string;
  name: string;
  tagline: string;
  category: SuzukiCategory;
  badge: string;
  /** Transparent cutout (real) — null when no real image exists yet. */
  image: string | null;
  imagePosition?: string;
  /** "cover" for full studio photos, "contain" (default) for transparent cutouts. */
  imageFit?: "cover" | "contain";
  /** Three short "at a glance" figures. */
  stats: { value: string; label: string }[];
  /** 3–4 key highlights. */
  highlights: string[];
  /** Official model page with full specs. */
  detailUrl: string;
  /** Internal detail route when one exists (preferred over detailUrl). */
  href?: string;
  subtitle: string;
  /** Stage colour when the photo has its own studio backdrop. */
  stageBg?: string;
}

export const LINE_BOOKING_URL = "https://line.me/R/ti/p/@flu8933t?oat_content=url";
export const MAPORN_SUZUKI_URL = "https://mapornsuzukith.com/";
export const MAPORN_SUZUKI_CONTACT_URL = "https://mapornsuzukith.com/contact/";

export const SUZUKI_MODELS: SuzukiShowcaseModel[] = [
  {
    id: "fronx",
    name: "ALL NEW SUZUKI FRONX",
    tagline: "ครอสโอเวอร์ดีไซน์สปอร์ตพรีเมียม ห้องโดยสารทันสมัย ขับคล่องตัว",
    category: "suv",
    badge: "New Model",
    image: "/brand/models/suzuki-fronx.jpg",
    subtitle: "The Iconic Drive",
    stats: [
      { value: "6", label: "ถุงลมนิรภัย" },
      { value: "9\"", label: "จอสัมผัส" },
      { value: "8", label: "สีตัวถัง" },
    ],
    highlights: [
      "เครื่องยนต์ K15C DUALJET พร้อมเทคโนโลยี SHVS (ISG + แบตเตอรี่ลิเธียมไอออน) และระบบ Auto Start/Stop",
      "Suzuki Safety Support: เบรกฉุกเฉินอัตโนมัติ, ACC, ช่วยรักษาเลน, เตือนจุดอับสายตา, กล้อง 360°",
      "จอสัมผัส 9 นิ้ว Apple CarPlay / Android Auto ไร้สาย ชาร์จมือถือไร้สาย",
      "พวงมาลัยหุ้มหนังพร้อมแป้นเปลี่ยนเกียร์ มาตรวัด LCD ไฟหน้า Full LED",
    ],
    detailUrl: "https://mapornsuzukith.com/model/all-new-suzuki-fronx/",
  },
  {
    id: "xl7-hybrid",
    name: "SUZUKI XL7 Hybrid",
    tagline: "Smart Hybrid ครอบครัว 7 ที่นั่ง บุคลิก SUV ลุยได้ทุกเส้นทาง",
    category: "suv",
    badge: "Smart Hybrid",
    image: "/brand/cutouts/suzuki-xl7-cutout.png",
    subtitle: "Smart Hybrid · 7 Seats",
    stats: [
      { value: "7", label: "ที่นั่ง" },
      { value: "105", label: "แรงม้า" },
      { value: "19.2", label: "กม./ลิตร" },
    ],
    highlights: [
      "เทคโนโลยี Smart Hybrid (ISG Mild Hybrid) แบตเตอรี่ลิเธียมไอออน อัตราสิ้นเปลือง 19.2 กม./ลิตร",
      "เครื่องยนต์ K15B 1.5 ลิตร 105 แรงม้า แรงบิด 138 นิวตันเมตร เกียร์อัตโนมัติ 4 สปีด",
      "3 แถว 7 ที่นั่ง เบาะแถว 2 พับ 60:40 แถว 3 พับ 50:50",
      "จอสัมผัส 10 นิ้ว ชาร์จมือถือไร้สาย ครูซคอนโทรล ล้ออัลลอย 16 นิ้ว ราวหลังคาสไตล์ SUV",
    ],
    detailUrl: "https://mapornsuzukith.com/model/xl7-hybrid/",
  },
  {
    id: "carry",
    name: "SUZUKI CARRY",
    tagline: "รถยนต์เพื่อการพาณิชย์ ทนทาน คล่องตัว ต่อยอดธุรกิจได้หลากหลาย",
    category: "commercial",
    badge: "Commercial Solution",
    image: "/brand/suzuki-carry/front.jpg",
    stageBg: "#E6E6E6",
    subtitle: "Work Smarter, Go Further",
    stats: [
      { value: "945", label: "กก. บรรทุกสูงสุด" },
      { value: "4.4", label: "เมตร รัศมีวงเลี้ยว" },
      { value: "1.5", label: "ลิตร K15B" },
    ],
    highlights: [
      "กระบะบรรทุกพื้นเรียบ ยาว 2,450 มม. เปิดได้ 3 ด้าน ความสูงกระบะจากพื้น 750 มม.",
      "รองรับการดัดแปลงทำธุรกิจ เช่น Food Truck และบริการเคลื่อนที่",
      "เครื่องยนต์ K15B 1.5 ลิตร รองรับ E20 / เบนซิน 91 / 95 พวงมาลัยพาวเวอร์ไฟฟ้า",
      "ช่วงล่างหน้าแมคเฟอร์สันสตรัท หลังแหนบ 5 ชั้น ABS รัศมีวงเลี้ยวแคบเพียง 4.4 เมตร",
    ],
    detailUrl: "https://mapornsuzukith.com/model/carry/",
  },
];
