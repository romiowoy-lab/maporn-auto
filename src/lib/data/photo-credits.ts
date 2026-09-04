export interface PhotoCredit {
  brandSlug?: string;
  fileName: string;
  subject: string;
  author: string;
  license: string;
  sourceUrl: string;
}

const COMPANY_SUPPLIED = "จัดหาโดยบริษัท (ภาพประชาสัมพันธ์ผลิตภัณฑ์)";
const COMPANY_LICENSE = "ใช้ภายใต้สิทธิ์ตัวแทนจำหน่ายอย่างเป็นทางการ";

export const photoCredits: PhotoCredit[] = [
  {
    brandSlug: "suzuki",
    fileName: "suzuki-fronx.jpg",
    subject: "Suzuki Fronx (facelift)",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "farizon",
    fileName: "farizon-van.jpg",
    subject: "Farizon SV",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "wuling",
    fileName: "wuling-air-ev.jpg",
    subject: "Wuling Air EV Standard Range (2023)",
    author: "Chanokchon",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2023_Wuling_Air_EV_Standard_Range.jpg",
  },
  {
    brandSlug: "wuling",
    fileName: "wuling-xingguang-s60.jpg",
    subject: "Wuling Xingguang S60",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "nex",
    fileName: "nex-vantastic.jpg",
    subject: "Nex (NEX Point) Vantastic",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "nex",
    fileName: "nex-pickup.jpg",
    subject: "Nex (NEX Point) BEV Pickup",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "gwm",
    fileName: "gwm-tank-300.jpg",
    subject: "GWM Tank 300",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "gwm",
    fileName: "gwm-tank-500.jpg",
    subject: "GWM Tank 500",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "jaecoo",
    fileName: "jaecoo-j7.jpg",
    subject: "JAECOO J7",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "omoda",
    fileName: "omoda-5.jpg",
    subject: "OMODA 5",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    brandSlug: "lepas",
    fileName: "lepas-l6.jpg",
    subject: "Lepas L6 EV",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
  {
    fileName: "showroom-banner.jpg",
    subject: "โชว์รูมเรือธง Maporn Autogroup พร้อมรถยนต์ทั้ง 7 แบรนด์",
    author: COMPANY_SUPPLIED,
    license: COMPANY_LICENSE,
    sourceUrl: "",
  },
];
