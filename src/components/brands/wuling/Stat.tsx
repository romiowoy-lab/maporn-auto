"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Counts up once in view. A null value renders an honest "—" instead of an invented number.
export default function Stat({
  value,
  unit,
  label,
  note,
  size = "lg",
}: {
  value: number | null;
  unit?: string;
  label: string;
  note?: string | null;
  size?: "lg" | "md";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(value === null ? "—" : "0");

  useEffect(() => {
    if (value === null || !inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Number.isInteger(value) ? Math.round(v).toString() : v.toFixed(1)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div>
      <p className={`font-extralight tracking-tight text-white ${size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
        <span ref={ref}>{display}</span>
        {value !== null && unit && <span className="ml-1 text-base sm:text-lg text-white/60">{unit}</span>}
      </p>
      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</p>
      {value === null ? (
        <p className="mt-0.5 text-[10px] text-white/30">รอข้อมูลจริง</p>
      ) : (
        note && <p className="mt-0.5 text-[10px] text-white/30">{note}</p>
      )}
    </div>
  );
}
