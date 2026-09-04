import { Promotion } from "@/lib/types";

// NOTE: dates are static demo data. "today" for status calculation comes from lib/data/promotions.ts -> getPromotionStatus()
export const promotions: Promotion[] = [
  {
    slug: "suzuki-fronx-launch-2026",
    title: "Suzuki Fronx ดอกเบี้ย 0% นาน 24 เดือน",
    category: "New Car",
    brandSlug: "suzuki",
    modelSlug: "suzuki-fronx",
    description: "รับดอกเบี้ยพิเศษ 0% เมื่อผ่อนชำระ 24 เดือนแรก พร้อมประกันภัยชั้น 1 ฟรี 1 ปี",
    detail:
      "โปรโมชั่นสำหรับลูกค้าที่จองและออกรถ Suzuki Fronx ทุกรุ่นย่อยภายในระยะเวลาที่กำหนด รับสิทธิ์ดอกเบี้ย 0% นาน 24 เดือนแรกของสัญญาเช่าซื้อ (เมื่อผ่อนชำระขั้นต่ำ 48 เดือน) พร้อมรับประกันภัยชั้น 1 ฟรี 1 ปี และของแถมชุดแต่งเสริมมูลค่ารวม 15,000 บาท เงื่อนไขเป็นไปตามที่บริษัทกำหนด",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
  },
  {
    slug: "wuling-ev-campaign",
    title: "Wuling EV จัดเต็ม ฟรีเครื่องชาร์จที่บ้าน",
    category: "EV",
    brandSlug: "wuling",
    description: "จองวันนี้รับฟรี Home Charger พร้อมติดตั้ง และส่วนลดค่าจดทะเบียนสูงสุด 20,000 บาท",
    detail:
      "ลูกค้าที่จองและออกรถ Wuling Air EV หรือ Binguo EV รับฟรีเครื่องชาร์จไฟฟ้าประจำบ้าน (Home Charger) พร้อมติดตั้งฟรีในเขตพื้นที่ให้บริการ และรับส่วนลดค่าใช้จ่ายในการจดทะเบียนสูงสุด 20,000 บาท เมื่อจัดไฟแนนซ์ผ่านบริษัทพันธมิตรที่ร่วมรายการ",
    startDate: "2026-07-15",
    endDate: "2026-10-15",
  },
  {
    slug: "gwm-tank300-off-road-fest",
    title: "GWM Tank 300 Off-Road Fest ลดสูงสุด 100,000 บาท",
    category: "Discount",
    brandSlug: "gwm",
    modelSlug: "gwm-tank-300",
    description: "รับส่วนลดพิเศษสูงสุด 100,000 บาท พร้อมยางออฟโรดและอุปกรณ์กันกระแทกฟรี",
    detail:
      "เฉพาะลูกค้าที่จองและออกรถ GWM Tank 300 รุ่น Elite Plus Hybrid ภายในงาน Off-Road Fest รับส่วนลดเงินสดสูงสุด 100,000 บาท พร้อมของแถมชุดยางออฟโรดและกันชนหน้า-หลังมูลค่ารวมกว่า 80,000 บาท",
    startDate: "2026-08-20",
    endDate: "2026-09-20",
  },
  {
    slug: "farizon-fleet-finance",
    title: "Farizon Fleet Finance ดอกเบี้ยพิเศษสำหรับธุรกิจ",
    category: "Financing",
    brandSlug: "farizon",
    description: "สินเชื่อรถเพื่อการพาณิชย์ ดอกเบี้ยเริ่มต้น 2.99% ต่อปี ผ่อนนานสูงสุด 72 เดือน",
    detail:
      "โปรแกรมสินเชื่อพิเศษสำหรับผู้ประกอบการที่ต้องการจัดซื้อรถ Farizon ตั้งแต่ 3 คันขึ้นไป รับอัตราดอกเบี้ยเริ่มต้น 2.99% ต่อปี ผ่อนชำระได้นานสูงสุด 72 เดือน พร้อมบริการดูแลหลังการขายแบบ Fleet Maintenance Package",
    startDate: "2026-06-01",
    endDate: "2026-12-31",
  },
  {
    slug: "jaecoo-j8-family-gift",
    title: "JAECOO J8 ครบครัวอบอุ่น รับของแถมสูงสุด 50,000 บาท",
    category: "Gift",
    brandSlug: "jaecoo",
    modelSlug: "jaecoo-j8",
    description: "จองและออกรถวันนี้ รับฟรีประกันภัยชั้น 1 พรมปูพื้น ฟิล์มกรองแสง และกล้องติดรถยนต์",
    detail:
      "เมื่อจองและออกรถ JAECOO J8 ทุกรุ่นย่อย รับฟรีแพ็กเกจของแถมมูลค่ารวมสูงสุด 50,000 บาท ประกอบด้วยประกันภัยชั้น 1 ฟรี 1 ปี พรมปูพื้นเกรดพรีเมียม ฟิล์มกรองแสงกันความร้อน และกล้องติดรถยนต์หน้า-หลัง",
    startDate: "2026-08-10",
    endDate: "2026-11-10",
  },
  {
    slug: "omoda-5-interest-rate",
    title: "OMODA 5 ดอกเบี้ยพิเศษ 1.99% เริ่มต้นปีแรก",
    category: "Interest Rate",
    brandSlug: "omoda",
    modelSlug: "omoda-5",
    description: "รับอัตราดอกเบี้ยพิเศษ 1.99% ต่อปีในปีแรก เมื่อดาวน์ 25% ขึ้นไป",
    detail:
      "ลูกค้าที่จองและออกรถ OMODA 5 พร้อมเงินดาวน์ 25% ขึ้นไป รับอัตราดอกเบี้ยพิเศษ 1.99% ต่อปีในปีแรกของสัญญาเช่าซื้อ ผ่อนชำระนานสูงสุด 84 เดือน เงื่อนไขเป็นไปตามที่บริษัทไฟแนนซ์กำหนด",
    startDate: "2026-05-01",
    endDate: "2026-08-31",
  },
  {
    slug: "nex-vantastic-fleet-campaign",
    title: "Nex Vantastic แคมเปญ Fleet ธุรกิจ Net-Zero",
    category: "Campaign",
    brandSlug: "nex",
    modelSlug: "nex-vantastic",
    description: "จองรถตู้ไฟฟ้าตั้งแต่ 3 คันขึ้นไป รับส่วนลดพิเศษและบริการ Fleet Maintenance ฟรี",
    detail:
      "ลูกค้าธุรกิจที่จองและออกรถ Nex Vantastic ตั้งแต่ 3 คันขึ้นไป รับส่วนลดพิเศษต่อคัน พร้อมแพ็กเกจ Fleet Maintenance ฟรี 1 ปี และบริการ Home Charger สำหรับจุดจอดรถของธุรกิจ",
    startDate: "2026-08-01",
    endDate: "2026-09-15",
  },
];

export function getPromotion(slug: string): Promotion | undefined {
  return promotions.find((p) => p.slug === slug);
}

export function getPromotionStatus(promo: Promotion, now: Date = new Date()): "Active" | "Expired" | "Upcoming" {
  const start = new Date(promo.startDate);
  const end = new Date(promo.endDate);
  end.setHours(23, 59, 59, 999);
  if (now < start) return "Upcoming";
  if (now > end) return "Expired";
  return "Active";
}
