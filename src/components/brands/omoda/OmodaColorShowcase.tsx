"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// One selectable image. `hex` is set for real per-color renders (shown as a color dot);
// omit it for plain views/angles (shown as a small thumbnail instead). `fit`/`position`
// control how a photo fills the frame: "contain" for trimmed cutouts, "cover" for full photos.
interface ColorOption {
  key: string;
  name: string;
  /** CSS background for the swatch dot (a color, or a gradient for two-tone paint). */
  hex?: string;
  copy: string;
  image: string;
  fit?: "contain" | "cover";
  position?: string;
}

interface ColorModel {
  key: string;
  name: string;
  colors: ColorOption[];
  /** Optional line under the selector, e.g. the official color list from the brochure. */
  note?: string;
  /** Optional verified facts shown under the image. */
  facts?: { label: string; value: string }[];
  factsNote?: string;
}

// To add a model, append an entry here with its real color renders (trim the empty margin
// around the car first so every color has the same framing). The model tabs appear on the
// page automatically as soon as there is more than one entry.
const ALL_MODELS: ColorModel[] = [
  {
    key: "omoda-c5-ev",
    name: "OMODA C5 EV",
    // Official OMODA & JAECOO Thailand brochure + official studio renders. Colors listed are the
    // ones in the current brochure (Dynamic: Space Black / Mercury Gray / Lunar White; Max: Lunar
    // White + Black Roof / Space Black / Mint Green + Black Roof / Mercury Gray).
    note: "รุ่น Long Range Dynamic: Space Black · Mercury Gray · Lunar White  |  รุ่น Long Range Max: Lunar White (Black Roof) · Space Black · Mint Green (Black Roof) · Mercury Gray — ภาพและสีอาจแตกต่างจากรถจริง",
    facts: [
      { label: "ระยะทางสูงสุด", value: "505 กม." },
      { label: "ชาร์จ DC 30–80%", value: "28 นาที" },
      { label: "อัตราเร่ง 0–100", value: "7.2 วินาที" },
      { label: "กำลังสูงสุด", value: "211 แรงม้า" },
    ],
    factsNote: "505 กม. ตามมาตรฐาน NEDC (430 กม. ตามมาตรฐาน WLTP) · ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่ ลักษณะเส้นทาง อุณหภูมิ และปัจจัยอื่น",
    colors: [
      { key: "lunar-white", name: "Lunar White", hex: "#E4E7EA", copy: "ขาวสะอาด ทันสมัย ดูสว่างในทุกมุมมอง", image: "/brand/studio3/omoda-c5-ev-lunar-white.jpg", fit: "cover", position: "50% 50%" },
      { key: "mercury-gray", name: "Mercury Gray", hex: "#5B6068", copy: "เทาโลหะ สุขุมและมีระดับ", image: "/brand/studio3/omoda-c5-ev-mercury-gray.jpg", fit: "cover", position: "50% 50%" },
      { key: "space-black", name: "Space Black", hex: "#1B1C1F", copy: "ดำลึก ดุดัน เต็มไปด้วยพลัง", image: "/brand/studio3/omoda-c5-ev-space-black.jpg", fit: "cover", position: "50% 50%" },
      { key: "lunar-white-roof", name: "Lunar White (Black Roof)", hex: "linear-gradient(#141416 0 40%, #E4E7EA 40%)", copy: "ขาวตัดหลังคาดำ ดีไซน์สองโทนโฉบเฉี่ยว", image: "/brand/studio3/omoda-c5-ev-lunar-white-roof.jpg", fit: "cover", position: "50% 50%" },
      { key: "mint-green-roof", name: "Mint Green (Black Roof)", hex: "linear-gradient(#141416 0 40%, #A9D6C2 40%)", copy: "เขียวมินต์สดชื่น ตัดหลังคาดำ", image: "/brand/studio3/omoda-c5-ev-mint-green-roof.jpg", fit: "cover", position: "50% 50%" },
    ],
  },
  {
    key: "jaecoo-j7-shs",
    name: "JAECOO J7 SHS",
    // Official Thai brochure (OMODA & JAECOO Thailand, Nov 2025). We only have 3 photos, not
    // one per color, so these are shown as views — no color swatch is claimed for any photo.
    note: "สีที่มีจำหน่าย: Olive Grey (Black Roof) · Carbon Black · Khaki White · Moonlight Silver (Black Roof) — ภาพประกอบอาจแตกต่างจากรถจริง",
    facts: [
      { label: "ระยะทางรวมทั้งระบบ", value: "1,300 กม." },
      { label: "ไฟฟ้าล้วน", value: "106 กม." },
      { label: "อัตราสิ้นเปลือง", value: "30.35 กม./ลิตร*" },
      { label: "แบตเตอรี่", value: "18.3 kWh" },
    ],
    factsNote: "ระยะทางตามมาตรฐาน NEDC · *ผลจากการทดสอบขับขี่บนเส้นทางจริงตามเงื่อนไขของผู้ผลิต ระยะทางจริงขึ้นอยู่กับพฤติกรรมการขับขี่และปัจจัยอื่น",
    colors: [
      { key: "exterior", name: "ด้านหน้า", copy: "ดีไซน์ SUV ไฮบริด สไตล์คลาสสิกอย่างมีระดับ", image: "/brand/studio3/jaecoo-j7-shs-exterior.jpg", fit: "cover", position: "60% 70%" },
      { key: "rear", name: "ด้านหลัง", copy: "ไฟท้ายเต็มความกว้าง เส้นสายคมชัดในทุกมุมมอง", image: "/brand/studio3/jaecoo-j7-shs-rear.jpg", fit: "cover", position: "50% 55%" },
      { key: "interior", name: "ภายใน", copy: "ห้องโดยสารกว้างขวาง สะดวกสบายทุกการเดินทาง", image: "/brand/studio3/jaecoo-j7-shs-interior.jpg", fit: "cover", position: "50% 50%" },
    ],
  },
];

// `only` limits the showcase to a single model (used so each brand page shows its own car).
export default function OmodaColorShowcase({ only }: { only?: string }) {
  const MODELS = ALL_MODELS.filter((m) => !only || m.key === only);
  const [modelKey, setModelKey] = useState(MODELS[0].key);
  const model = MODELS.find((m) => m.key === modelKey) ?? MODELS[0];
  const [colorKey, setColorKey] = useState(model.colors[0].key);
  const color = model.colors.find((c) => c.key === colorKey) ?? model.colors[0];

  const selectModel = (key: string) => {
    const next = MODELS.find((m) => m.key === key);
    if (!next) return;
    setModelKey(key);
    setColorKey(next.colors[0].key);
  };

  return (
    <section className="bg-[#0a0a0b] py-16 sm:py-20 border-t border-white/[0.06]">
      <div className="container-page mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{model.name}</p>
        <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white">{model.colors.every((c) => c.hex) ? "เลือกสีที่ใช่สำหรับคุณ" : "รอบตัวรถ · Walkaround"}</h2>
        <p className="mt-1 text-sm text-white/60">
          {model.colors.every((c) => c.hex) ? `สัมผัสสีสันจริงของ ${model.name} แต่ละเฉดสี` : `ชมรูปลักษณ์จริงของ ${model.name} ในแต่ละมุมมอง`}
        </p>

        {MODELS.length > 1 && (
          <div role="tablist" className="mt-6 flex flex-wrap gap-2">
            {MODELS.map((m) => (
              <button
                key={m.key}
                role="tab"
                aria-selected={m.key === model.key}
                type="button"
                onClick={() => selectModel(m.key)}
                className={`rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                  m.key === model.key ? "border-brand-red bg-brand-red text-white" : "border-white/25 text-white/60 hover:border-white/50 hover:text-white"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container-page">
        <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-[#141517]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${model.key}-${color.key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={color.fit === "cover" ? "absolute inset-0" : "absolute inset-x-0 top-0 bottom-16 px-4 pt-4 sm:px-10 sm:pt-8"}
            >
              <Image
                src={color.image}
                alt={`${model.name} ${color.name}`}
                fill
                sizes="100vw"
                style={{ objectPosition: color.position ?? "center" }}
                className={color.fit === "cover" ? "object-cover" : "object-contain"}
              />
            </motion.div>
          </AnimatePresence>

        <div className="absolute left-3 right-3 top-3 z-10 flex flex-wrap items-center gap-x-2 gap-y-2 sm:left-5 sm:top-5">
          {model.colors.map((c) => (
            <button key={c.key} type="button" onClick={() => setColorKey(c.key)} className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 py-1 pl-1 pr-3 backdrop-blur-md transition-colors hover:bg-black/65" aria-label={c.name}>
              {c.hex ? (
                <span
                  className={`h-6 w-6 rounded-full border shrink-0 transition-all ${
                    color.key === c.key ? "border-brand-red ring-2 ring-brand-red/40 scale-110" : "border-white/25"
                  }`}
                  style={{ background: c.hex }}
                />
              ) : (
                <span
                  className={`relative h-6 w-9 shrink-0 overflow-hidden rounded-full border transition-all ${
                    color.key === c.key ? "border-brand-red ring-2 ring-brand-red/40" : "border-white/25 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={c.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
              )}
              <span className={`text-[11px] font-semibold sm:text-xs ${color.key === c.key ? "text-white" : "text-white/70"}`}>{c.name}</span>
            </button>
          ))}
        </div>

          <div
            className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-sm"
            style={color.fit === "cover" ? { textShadow: "0 1px 6px rgba(0,0,0,0.9), 0 4px 18px rgba(0,0,0,0.7)" } : undefined}
          >
            <p className="text-sm font-bold text-white">{color.name}</p>
            <p className={`mt-1 text-xs ${color.fit === "cover" ? "text-white/90" : "text-white/60"}`}>{color.copy}</p>
          </div>
        </div>

        {model.facts && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {model.facts.map((f) => (
              <div key={f.label} className="border-l-2 border-brand-red pl-3">
                <dt className="text-[11px] uppercase tracking-[0.15em] text-white/50">{f.label}</dt>
                <dd className="mt-0.5 text-xl font-light text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {model.factsNote && <p className="mt-2 text-[11px] text-white/40">{model.factsNote}</p>}

        {model.note && <p className="mt-4 max-w-3xl text-xs leading-relaxed text-white/45">{model.note}</p>}
      </div>
    </section>
  );
}
