import type { GalleryImage } from "@/components/cars/VehicleGallery";

// Extra real photos per model (beyond the single catalog image). Only models listed here get
// the full gallery; every other model keeps the default single-photo + placeholder tiles.
export const MODEL_GALLERY: Record<string, GalleryImage[]> = {
  "lepas-l6": [
    { src: "/brand/models/lepas-l6.jpg", label: "Lepas L6" },
    { src: "/brand/studio3/lepas-l6-orange.jpg", label: "Lepas L6 สีส้ม" },
    { src: "/brand/studio3/lepas-l6-purple.jpg", label: "Lepas L6 สีม่วง" },
    { src: "/brand/studio3/lepas-l6-white.jpg", label: "Lepas L6 สีขาว" },
    { src: "/brand/studio3/lepas-l6-gray.jpg", label: "Lepas L6 สีเทา" },
    { src: "/brand/studio2/lepas-l6-side-dark.jpg", label: "ด้านข้าง" },
    { src: "/brand/studio2/lepas-l6-rear-dark.jpg", label: "ด้านหลัง" },
    { src: "/brand/studio3/lepas-l6-cabin.jpg", label: "ห้องโดยสาร" },
    { src: "/brand/studio3/lepas-l6-cargo.jpg", label: "พื้นที่เก็บของ" },
    { src: "/brand/studio3/lepas-l6-detail-badge.jpg", label: "โลโก้ Lepas" },
    { src: "/brand/studio3/lepas-l6-detail-taillight.jpg", label: "ไฟท้าย" },
  ],
  "omoda-c5-ev": [
    { src: "/brand/models/omoda-c5-ev.jpg", label: "OMODA C5 EV" },
    { src: "/brand/omoda-c5/hero.jpg", label: "C5 EV กับสถานีชาร์จ" },
    { src: "/brand/omoda-c5/front.jpg", label: "ด้านหน้า" },
    { src: "/brand/studio3/omoda-c5-ev-lunar-white.jpg", label: "สี Lunar White" },
    { src: "/brand/studio3/omoda-c5-ev-mercury-gray.jpg", label: "สี Mercury Gray" },
    { src: "/brand/studio3/omoda-c5-ev-space-black.jpg", label: "สี Space Black" },
    { src: "/brand/studio3/omoda-c5-ev-lunar-white-roof.jpg", label: "สี Lunar White (Black Roof)" },
    { src: "/brand/studio3/omoda-c5-ev-mint-green-roof.jpg", label: "สี Mint Green (Black Roof)" },
    { src: "/brand/omoda-c5/taillight.jpg", label: "ไฟท้าย" },
    { src: "/brand/omoda-c5/interior.jpg", label: "ห้องโดยสาร" },
    { src: "/brand/omoda-c5/dash.jpg", label: "แดชบอร์ด" },
    { src: "/brand/omoda-c5/screen.jpg", label: "จอกว้าง 24.6 นิ้ว" },
    { src: "/brand/omoda-c5/wireless.jpg", label: "ชาร์จไร้สาย 50 วัตต์" },
    { src: "/brand/omoda-c5/charge.jpg", label: "ช่องชาร์จ" },
    { src: "/brand/omoda-c5/trunk.jpg", label: "พื้นที่เก็บของ" },
    { src: "/brand/omoda-c5/topview.jpg", label: "มุมมองด้านบน" },
  ],
  "gwm-tank-500": [
    { src: "/brand/gwm-tank500/rocks.jpg", label: "GWM Tank 500 3.0T Diesel" },
    { src: "/brand/gwm-tank500/side.jpg", label: "ด้านข้าง" },
    { src: "/brand/gwm-tank500/gray.jpg", label: "สี Crystal Gray" },
    { src: "/brand/gwm-tank500/seats.jpg", label: "ห้องโดยสาร" },
    { src: "/brand/gwm-tank500/cream.jpg", label: "ห้องโดยสารโปร่งกว้าง" },
    { src: "/brand/gwm-tank500/screen.jpg", label: "จอสัมผัส 14.6 นิ้ว" },
    { src: "/brand/gwm-tank500/wheel.jpg", label: "จอแสดงข้อมูล 12.3 นิ้ว" },
    { src: "/brand/gwm-tank500/sunroof.jpg", label: "หลังคาซันรูฟพาโนรามิค" },
    { src: "/brand/gwm-tank500/cargo.jpg", label: "เบาะพับ 60:40" },
    { src: "/brand/gwm-tank500/step.jpg", label: "บันไดข้าง" },
    { src: "/brand/gwm-tank500/camera.jpg", label: "กล้องรอบทิศทาง 360°" },
  ],
  "gwm-tank-300": [
    { src: "/brand/models/gwm-tank-300.jpg", label: "GWM Tank 300" },
    { src: "/brand/gwm-tank300/front.jpg", label: "ด้านหน้า" },
    { src: "/brand/gwm-tank300/rear.jpg", label: "ด้านหลัง" },
    { src: "/brand/gwm-tank300/dash.jpg", label: "ห้องโดยสาร" },
    { src: "/brand/gwm-tank300/screen.jpg", label: "จอ 13 นิ้ว Apple CarPlay" },
    { src: "/brand/gwm-tank300/shifter.jpg", label: "คันเกียร์และโหมดขับขี่" },
    { src: "/brand/gwm-tank300/engine.jpg", label: "เครื่องยนต์เบนซิน 2.0 เทอร์โบ + มอเตอร์ไฟฟ้า" },
  ],
  "jaecoo-j7": [
    { src: "/brand/studio3/jaecoo-j7-shs-exterior.jpg", label: "JAECOO J7 SHS" },
    { src: "/brand/studio2/jaecoo-j7-front-3q.jpg", label: "ด้านหน้า" },
    { src: "/brand/studio2/jaecoo-j7-side-3q.jpg", label: "ด้านข้าง" },
    { src: "/brand/studio3/jaecoo-j7-shs-rear.jpg", label: "ด้านหลัง" },
    { src: "/brand/studio2/jaecoo-j7-top-3q.jpg", label: "หลังคาพาโนรามา" },
    { src: "/brand/studio2/jaecoo-j7-interior.jpg", label: "ห้องโดยสารด้านหน้า" },
    { src: "/brand/studio3/jaecoo-j7-shs-interior.jpg", label: "เบาะหลัง" },
  ],
};

// Photos for the Technology / Design & Comfort story blocks (real photos only).
export const MODEL_STORY_IMAGES: Record<string, { technology?: string; design?: string }> = {
  "lepas-l6": {
    technology: "/brand/studio3/lepas-l6-cabin.jpg",
    design: "/brand/studio2/lepas-l6-interior.jpg",
  },
  "omoda-c5-ev": {
    technology: "/brand/omoda-c5/screen.jpg",
    design: "/brand/omoda-c5/interior.jpg",
  },
  "gwm-tank-500": {
    technology: "/brand/gwm-tank500/screen.jpg",
    design: "/brand/gwm-tank500/seats.jpg",
  },
  "gwm-tank-300": {
    technology: "/brand/gwm-tank300/screen.jpg",
    design: "/brand/gwm-tank300/dash.jpg",
  },
  "jaecoo-j7": {
    technology: "/brand/studio2/jaecoo-j7-interior.jpg",
    design: "/brand/studio3/jaecoo-j7-shs-interior.jpg",
  },
};
