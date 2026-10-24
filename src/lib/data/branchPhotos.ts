// Real photos of each branch (Maporn's own LINE albums, Oct 2026), shown as the gallery on
// /branches/[slug]. The first photo of each branch is also its cover (BRANCH_PHOTO).

export interface BranchPhoto {
  src: string;
  alt: string;
}

const p = (slug: string, file: string, alt: string): BranchPhoto => ({ src: `/brand/branches/${slug}/${file}.webp`, alt });

// Main showroom photo per branch (client-supplied, Oct 2026). Used on /branches cards, the branch
// page hero, homepage location tiles and brand-page showroom banners. `position` keeps the sign
// in frame when the photo is cropped to a landscape card.
export const branchCover: Record<string, { src: string; alt: string; position?: string }> = {
  rayong: { src: "/brand/branches/covers/suzuki-rayong.webp", alt: "โชว์รูม Suzuki มาพรพาณิชย์ ระยอง", position: "50% 28%" },
  "rayong-omoda-jaecoo": { src: "/brand/branches/covers/omoda-jaecoo-rayong.webp", alt: "โชว์รูม OMODA | JAECOO Maporn Auto Tech ระยอง", position: "50% 40%" },
  "rayong-lepas": { src: "/brand/branches/covers/lepas-rayong.webp", alt: "โชว์รูม Lepas มาพร ระยอง", position: "50% 55%" },
  "rayong-wuling": { src: "/brand/branches/covers/wuling-rayong.webp", alt: "โชว์รูม Wuling Maporn Rayong", position: "50% 45%" },
  "farizon-srinakarin": { src: "/brand/branches/covers/farizon-srinakarin.webp", alt: "โชว์รูม Farizon Maporn Auto Tech ศรีนครินทร์", position: "40% 55%" },
};

export const branchGallery: Record<string, BranchPhoto[]> = {
  srinakarin: [
    p("srinakarin", "exterior-dusk", "โชว์รูม Suzuki Maporn สำนักงานใหญ่ ศรีนครินทร์"),
    p("srinakarin", "exterior", "อาคารโชว์รูม Suzuki Maporn ศรีนครินทร์"),
    p("srinakarin", "lounge", "ห้องรับรองลูกค้า"),
    p("srinakarin", "service", "ศูนย์บริการ"),
    p("srinakarin", "team", "ทีมงาน Maporn ศรีนครินทร์"),
  ],
  "farizon-srinakarin": [
    { src: "/brand/branches/covers/farizon-srinakarin.webp", alt: "โชว์รูม Farizon Maporn Auto Tech ศรีนครินทร์" },
    p("srinakarin", "farizon-exterior", "อาคารโชว์รูม Farizon — Maporn Auto Tech"),
    p("srinakarin", "farizon-showroom", "โชว์รูม Farizon"),
    p("srinakarin", "farizon-showroom-2", "รถตู้ไฟฟ้า Farizon ในโชว์รูม"),
    p("srinakarin", "farizon-service", "ศูนย์บริการ Farizon"),
  ],
  lamlukka: [
    p("lamlukka", "exterior-team", "โชว์รูม GWM Maporn ลำลูกกา พร้อมทีมงาน"),
    p("lamlukka", "welcome-team", "ทีมงานต้อนรับ GWM ลำลูกกา"),
    p("lamlukka", "showroom-team", "ทีมขายในโชว์รูม"),
    p("lamlukka", "delivery-team", "ส่งมอบรถ GWM"),
    p("lamlukka", "delivery", "พิธีส่งมอบรถ"),
    p("lamlukka", "sales-desks", "โต๊ะที่ปรึกษาการขาย"),
    p("lamlukka", "service-team", "ทีมศูนย์บริการ"),
    p("lamlukka", "technician", "ช่างผู้ชำนาญการ GWM"),
  ],
  sriracha: [
    p("sriracha", "exterior", "โชว์รูม Suzuki Maporn ศรีราชา"),
    p("sriracha", "exterior-road", "โชว์รูมริมถนนสุขุมวิท ศรีราชา"),
    p("sriracha", "showroom", "ภายในโชว์รูม"),
    p("sriracha", "lounge", "ห้องรับรองลูกค้า"),
    p("sriracha", "customers", "ลูกค้าชมรถในโชว์รูม"),
    p("sriracha", "hospitality", "ทีมงานต้อนรับพร้อมของว่าง"),
    p("sriracha", "hospitality-2", "มุมเครื่องดื่มและของว่าง"),
    p("sriracha", "service", "ศูนย์บริการ"),
  ],
  "rayong-omoda-jaecoo": [
    { src: "/brand/branches/covers/omoda-jaecoo-rayong.webp", alt: "โชว์รูม OMODA | JAECOO Maporn Auto Tech ระยอง" },
    p("rayong-omoda-jaecoo", "exterior", "โชว์รูม OMODA | JAECOO Maporn ระยอง"),
    p("rayong-omoda-jaecoo", "exterior-side", "อาคารโชว์รูมและศูนย์บริการ"),
    p("rayong-omoda-jaecoo", "entrance", "ทางเข้าโชว์รูม"),
    p("rayong-omoda-jaecoo", "showroom", "ภายในโชว์รูม"),
    p("rayong-omoda-jaecoo", "j5-display", "JAECOO 5 EV ในโชว์รูม"),
    p("rayong-omoda-jaecoo", "service-desk", "เคาน์เตอร์ศูนย์บริการ"),
  ],
  "suzy-fix": [
    p("suzy-fix", "entrance", "ศูนย์ซ่อมสีและตัวถัง Suzy Fix"),
    p("suzy-fix", "front", "ด้านหน้าศูนย์บริการ Suzy Fix"),
    p("suzy-fix", "mural", "กราฟฟิตี้ Suzy Fix"),
    p("suzy-fix", "lounge", "ห้องรับรองลูกค้า"),
    p("suzy-fix", "cafe", "มุมกาแฟ"),
    p("suzy-fix", "workshop", "พื้นที่ซ่อมสีและตัวถัง"),
    p("suzy-fix", "team", "ทีมช่าง Suzy Fix"),
  ],
};
