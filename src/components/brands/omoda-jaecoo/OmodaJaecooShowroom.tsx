"use client";

import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import JaecooShowroom from "@/components/brands/jaecoo/JaecooShowroom";
import OmodaC5Showroom from "@/components/brands/omoda-jaecoo/OmodaC5Showroom";

// OMODA and JAECOO are one paired dealership — one page, one switch. JAECOO first.
// Switching plays a full-screen brand "swipe" (sweeps in, swaps the page underneath, sweeps out).

type View = "jaecoo" | "omoda";

const BRAND: Record<View, { label: string; logo: string; sweep: string; glow: string }> = {
  jaecoo: {
    label: "JAECOO",
    logo: "/brand/logos/jaecoo.svg",
    sweep: "linear-gradient(120deg,#1a1b1f 0%,#3b3626 45%,#C8B27A 100%)",
    glow: "#C8B27A",
  },
  omoda: {
    label: "OMODA",
    logo: "/brand/logos/omoda.svg",
    sweep: "linear-gradient(120deg,#14101c 0%,#3a1a52 45%,#9b4bc4 100%)",
    glow: "#B36BDD",
  },
};

const ease = [0.16, 1, 0.3, 1] as const;

// Never let a stalled animation (e.g. background tab) block switching.
const safe = (p: Promise<unknown>, ms: number) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

export default function OmodaJaecooShowroom() {
  const [view, setView] = useState<View>("jaecoo");
  const [target, setTarget] = useState<View>("jaecoo");
  const [busy, setBusy] = useState(false);
  const [spin, setSpin] = useState(0);
  const controls = useAnimationControls();

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
    <div className="bg-[#0a0a0b]">
      {/* Switch bar */}
      <div className="sticky top-[4.5rem] z-[60] flex justify-center px-3 pt-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-black/55 p-1.5 pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <motion.span animate={{ rotate: spin }} transition={{ duration: 0.6, ease }} className="text-white/60" aria-hidden="true">
            <ArrowLeftRight className="h-4 w-4" />
          </motion.span>
          <div className="relative flex rounded-full bg-white/[0.06] p-1" role="tablist" aria-label="สลับแบรนด์ JAECOO / OMODA">
            {(Object.keys(BRAND) as View[]).map((v) => {
              const active = target === v;
              return (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchTo(v)}
                  className={`relative z-10 min-w-[104px] rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] transition-colors duration-300 sm:min-w-[128px] sm:text-sm ${
                    active ? "text-[#101114]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="brand-thumb"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: "#fff", boxShadow: `0 0 24px ${BRAND[v].glow}99` }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {BRAND[v].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* The swipe overlay covers the swap, so the new page simply fades in underneath it */}
      <motion.div key={view} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        {view === "jaecoo" ? <JaecooShowroom /> : <OmodaC5Showroom />}
      </motion.div>

      {/* Brand swipe overlay */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center"
        style={{ background: BRAND[target].sweep }}
        aria-hidden="true"
      >
        <span className="flex h-24 items-center rounded-2xl bg-white px-10 shadow-2xl sm:h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND[target].logo} alt="" className="h-9 w-auto sm:h-11" />
        </span>
      </motion.div>
    </div>
  );
}
