"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import GwmTank300Showroom from "@/components/brands/gwm/GwmTank300Showroom";
import GwmTank500Showroom from "@/components/brands/gwm/GwmTank500Showroom";
import GwmPoerShowroom from "@/components/brands/gwm/GwmPoerShowroom";
import GwmOra5Showroom from "@/components/brands/gwm/GwmOra5Showroom";
import GwmHavalH6Showroom from "@/components/brands/gwm/GwmHavalH6Showroom";

// GWM page with a 5-way model switch (Tank 300 / Tank 500 / POER / ORA 5 / Haval H6) and a full-screen wipe between them.

type View = "tank300" | "tank500" | "poer" | "ora5" | "havalh6";

const MODEL: Record<View, { label: string; sub: string; sweep: string; glow: string }> = {
  tank300: {
    label: "TANK 300",
    sub: "Hybrid",
    sweep: "linear-gradient(120deg,#1a1b1d 0%,#4a2a10 45%,#FF7A1A 100%)",
    glow: "#FF7A1A",
  },
  tank500: {
    label: "TANK 500",
    sub: "3.0T Diesel",
    sweep: "linear-gradient(120deg,#0e0f11 0%,#2a2c30 45%,#8a8f94 100%)",
    glow: "#C5CAD0",
  },
  poer: {
    label: "POER",
    sub: "SAHAR Diesel",
    sweep: "linear-gradient(120deg,#0f0e0c 0%,#2a1f0e 45%,#B07B3E 100%)",
    glow: "#B07B3E",
  },
  ora5: {
    label: "ORA 5",
    sub: "HEV",
    sweep: "linear-gradient(120deg,#080f0a 0%,#0d2a18 45%,#1A6B42 100%)",
    glow: "#1A6B42",
  },
  havalh6: {
    label: "H6",
    sub: "HEV · PHEV",
    sweep: "linear-gradient(120deg,#040810 0%,#061828 45%,#0080C0 100%)",
    glow: "#0080C0",
  },
};

const ease = [0.16, 1, 0.3, 1] as const;
const safe = (p: Promise<unknown>, ms: number) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

export default function GwmShowroomSwitch() {
  const [view, setView] = useState<View>("tank300");
  const [target, setTarget] = useState<View>("tank300");
  const [busy, setBusy] = useState(false);
  const [spin, setSpin] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const saved = sessionStorage.getItem("gwm-init-view") as View | null;
    if (saved && saved in MODEL) {
      sessionStorage.removeItem("gwm-init-view");
      setView(saved);
      setTarget(saved);
    }
  }, []);

  async function switchTo(next: View) {
    if (next === view || busy) return;
    setBusy(true);
    setTarget(next);
    setSpin((s) => s + 180);
    await safe(controls.start({ x: "0%", transition: { duration: 0.5, ease } }), 900);
    setView(next);
    window.scrollTo({ top: 0 });
    await new Promise((r) => setTimeout(r, 120));
    await safe(controls.start({ x: "100%", transition: { duration: 0.5, ease } }), 900);
    controls.set({ x: "-100%" });
    setBusy(false);
  }

  return (
    <div className="bg-[#101114]">
      <div className="sticky top-[4.5rem] z-[60] flex justify-center px-3 pt-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-black/55 p-1.5 sm:pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <motion.span animate={{ rotate: spin }} transition={{ duration: 0.6, ease }} className="hidden text-white/60 sm:inline-flex" aria-hidden="true">
            <ArrowLeftRight className="h-4 w-4" />
          </motion.span>
          <div className="relative flex rounded-full bg-white/[0.06] p-1" role="tablist" aria-label="สลับรุ่น GWM Tank 300 / Tank 500 / POER / ORA 5 / Haval H6">
            {(Object.keys(MODEL) as View[]).map((v) => {
              const active = target === v;
              return (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchTo(v)}
                  className={`relative z-10 min-w-[52px] rounded-full px-2 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors duration-300 sm:min-w-[72px] sm:px-3 sm:tracking-[0.12em] sm:text-sm ${
                    active ? "text-[#101114]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gwm-thumb"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: "#fff", boxShadow: `0 0 24px ${MODEL[v].glow}99` }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {MODEL[v].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div key={view} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        {view === "tank300" ? (
          <GwmTank300Showroom />
        ) : view === "tank500" ? (
          <GwmTank500Showroom />
        ) : view === "poer" ? (
          <GwmPoerShowroom />
        ) : view === "ora5" ? (
          <GwmOra5Showroom />
        ) : (
          <GwmHavalH6Showroom />
        )}
      </motion.div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4"
        style={{ background: MODEL[target].sweep }}
        aria-hidden="true"
      >
        <span className="flex h-24 items-center rounded-2xl bg-white px-10 shadow-2xl sm:h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logos/gwm.png" alt="" className="h-9 w-auto sm:h-11" />
        </span>
        <span className="text-2xl font-extrabold uppercase tracking-[0.2em] text-white sm:text-4xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
          {MODEL[target].label}
        </span>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
          {MODEL[target].sub}
        </span>
      </motion.div>
    </div>
  );
}
