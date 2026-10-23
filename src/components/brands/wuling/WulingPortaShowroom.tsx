"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Zap, Gauge, Timer, BatteryCharging } from "lucide-react";
import ImageSlot from "@/components/brands/wuling/ImageSlot";
import Stat from "@/components/brands/wuling/Stat";
import { porta } from "@/lib/data/wuling-porta";
import { formatTHB } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#5B9BD5";
const shadow = { textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6)" };

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
      {children}
    </p>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-sm sm:text-base text-white/80">
          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function WulingPortaShowroom() {
  const { images } = porta;
  const perfIcons = [Zap, Gauge, Timer, BatteryCharging];

  return (
    <div className="bg-[#101114]">
      {/* HERO — the banner carries its own headline, so it is shown whole, uncropped */}
      <section className="relative w-full overflow-hidden bg-[#101114]">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="relative aspect-[1983/793] w-full"
        >
          <Image
            src={images.banner}
            alt="Wuling Porta EV — Drive a better tomorrow พลังขับเคลื่อนธุรกิจของคุณ"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </section>

      {/* INTRO + headline numbers */}
      <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div {...reveal}>
            <Eyebrow>Electric Commercial Van</Eyebrow>
            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold uppercase leading-none tracking-tight text-white">
              Wuling Porta EV
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-white/75">
              รถตู้ทึบไฟฟ้า 100% เพื่อการพาณิชย์และการขนส่ง สำหรับผู้ประกอบการยุคใหม่ที่ต้องการลดต้นทุนพลังงาน
              — ต้นทุนการขับขี่เพียง 0.56 บาทต่อกิโลเมตร
            </p>
            <p className="mt-6 text-2xl font-bold text-white">
              เริ่มต้น {formatTHB(porta.variants[0].price)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quotation?brand=wuling"
                className="rounded-lg px-7 py-3 text-sm font-bold text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
                style={{ backgroundColor: ACCENT }}
              >
                ขอใบเสนอราคา
              </Link>
              <Link
                href="/test-drive?brand=wuling"
                className="rounded-lg border border-white/40 px-7 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#101114]"
              >
                ทดลองขับ
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            {porta.highlights.map((h) => (
              <Stat key={h.label} value={h.value} unit={h.unit} label={h.label} note={h.note} decimals={h.decimals} size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* SUPER CAPACITY — cargo body + dimensions */}
      <section className="grid border-t border-white/[0.06] bg-[#17181c] lg:grid-cols-2">
        <div className="relative flex items-center justify-center bg-[#0b0c0f] p-6 sm:p-10">
          <ImageSlot
            src={images.capacity}
            label="Porta EV — พื้นที่บรรทุก 6.5 ลบ.ม."
            className="aspect-[494/619] w-full max-w-[420px] rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <motion.div {...reveal}>
            <Eyebrow>Super Capacity</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              บรรทุกได้มาก ขนส่งได้คุ้ม
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/60">ออกแบบมาเพื่องานขนส่งพัสดุและโลจิสติกส์โดยเฉพาะ</p>
          </motion.div>

          <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
            {porta.dimensions.map((d) => (
              <div key={d.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/45">{d.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{d.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CheckList items={porta.cargo} />
          </div>
        </div>
      </section>

      {/* PERFORMANCE & BATTERY */}
      <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <motion.div {...reveal}>
              <Eyebrow>Electric Performance</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                ขับเคลื่อนด้วยไฟฟ้า 100%
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/60">
                วิ่งไกลสูงสุด 400 กม. ต่อการชาร์จ (CLTC) ด้วยแบตเตอรี่ LFP เทคโนโลยี Wuling MAGIC Battery
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-md">
              {porta.performance.map((p, i) => {
                const Icon = perfIcons[i];
                return (
                  <div key={p.label}>
                    <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
                    <Stat value={p.value} unit={p.unit} label={p.label} note={p.note} size="md" />
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <CheckList items={porta.powertrain} />
            </div>
          </div>

          <ImageSlot
            src={images.frontDetail}
            label="Porta EV — ไฟหน้า LED และกระจังหน้า"
            className="order-1 aspect-[3/2] w-full rounded-2xl lg:order-2"
          />
        </div>
      </section>

      {/* CABIN & CHASSIS */}
      <section className="border-t border-white/[0.06] bg-[#26272b] py-14 sm:py-20">
        <div className="container-page">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>Cabin &amp; Chassis</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              ห้องโดยสารใช้งานง่าย ช่วงล่างพร้อมงานหนัก
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ImageSlot src={images.cabin} label="Porta EV — ห้องโดยสาร 2 ที่นั่ง" className="aspect-[3/2] w-full rounded-2xl" />
            <ImageSlot src={images.steering} label="Porta EV — พวงมาลัยและตำแหน่งคนขับ" className="aspect-[3/2] w-full rounded-2xl" />
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {porta.chassis.map((c) => (
              <div key={c.label} className="rounded-xl border border-white/10 bg-[#101114]/60 p-5">
                <dt className="text-[11px] uppercase tracking-[0.15em] text-white/45">{c.label}</dt>
                <dd className="mt-1.5 text-sm sm:text-base font-medium text-white">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* VARIANTS & PRICE */}
      <section className="border-t border-white/[0.06] bg-[#101114] py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <ImageSlot src={images.studio} label="Porta EV — สี Polar White" className="aspect-[630/487] w-full rounded-2xl" />

          <div>
            <motion.div {...reveal}>
              <Eyebrow>Models &amp; Price</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">ราคาจำหน่าย</h2>
              <p className="mt-2 text-sm text-white/60">สีตัวถัง: {porta.color} (สีขาว)</p>
            </motion.div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {porta.variants.map((v) => (
                <div key={v.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Porta EV</p>
                  <h3 className="mt-1 text-2xl font-bold uppercase text-white">{v.name}</h3>
                  <p className="mt-3 text-2xl font-extrabold" style={{ color: ACCENT }}>
                    {formatTHB(v.price)}
                  </p>
                  {v.perks.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {v.perks.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-white/75">
                          <Check className="h-4 w-4" style={{ color: ACCENT }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href="/quotation?brand=wuling"
                    className="mt-6 rounded-lg border border-white/30 px-5 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#101114]"
                  >
                    ขอใบเสนอราคา
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101114]">
        <div className="absolute inset-0">
          <ImageSlot src={images.banner} label="Porta EV — ภาพปิดท้าย" className="h-full w-full" position="80% center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#101114]/85 via-[#101114]/55 to-[#101114]/30" />
        <div className="relative z-10 container-page flex min-h-[440px] flex-col items-center justify-center gap-8 py-14 text-center">
          <motion.h2
            {...reveal}
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white"
            style={shadow}
          >
            พร้อมขับเคลื่อนธุรกิจด้วย Porta EV?
            <span className="mt-3 block text-sm font-normal normal-case tracking-normal text-white/90 sm:text-lg">
              ทีมงาน Maporn Autogroup พร้อมให้คำปรึกษาเรื่องรถเพื่อการพาณิชย์และไฟแนนซ์
            </span>
          </motion.h2>
          <div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/quotation?brand=wuling"
                className="rounded-lg px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
                style={{ backgroundColor: ACCENT }}
              >
                ขอใบเสนอราคา
              </Link>
              <Link
                href="/b2b-fleet"
                className="rounded-lg border border-white/40 bg-[#101114]/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#101114]"
              >
                สั่งซื้อแบบฟลีท
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-white/60">*ภาพประกอบเพื่อการนำเสนอเท่านั้น รายละเอียดอาจแตกต่างจากรถจริง</p>
          </div>
        </div>
      </section>
    </div>
  );
}
