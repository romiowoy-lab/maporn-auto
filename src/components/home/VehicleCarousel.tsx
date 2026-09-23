"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, animate, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface CarouselVehicle {
  slug: string;
  brand: string;
  name: string;
  image: string;
  /** Real transparent product cutout vs. a regular bounded studio photo (needs multiply blend). */
  isCutout: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 4500;
const RESUME_AFTER_MS = 4000;
const DRAG_THRESHOLD = 70;

export default function VehicleCarousel({
  vehicles,
  onActiveChange,
  onSelectVehicle,
}: {
  vehicles: CarouselVehicle[];
  /** Fired whenever the centered/active car changes (drag, arrows, dots, autoplay, click-to-select). */
  onActiveChange?: (vehicle: CarouselVehicle, index: number) => void;
  /** Fired when the already-active car is clicked again — used to navigate to its detail page. */
  onSelectVehicle?: (vehicle: CarouselVehicle) => void;
}) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduce = useReducedMotion();

  // Subtle mouse-parallax depth (desktop): the whole showroom drifts a few px and yaws a couple of degrees.
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 22 });
  const sceneX = useTransform(sx, [-1, 1], [-8, 8]);
  const sceneRotY = useTransform(sx, [-1, 1], [-2.5, 2.5]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [metrics, setMetrics] = useState({ viewport: 0, item: 0, step: 0 });

  const measure = useCallback(() => {
    const viewport = viewportRef.current?.offsetWidth ?? 0;
    const item = itemRef.current?.offsetWidth ?? 0;
    // gap-8 sm:gap-10 on the track — read the real computed gap instead of hardcoding it.
    const gapStr = viewportRef.current ? getComputedStyle(viewportRef.current.firstElementChild as Element).columnGap : "0";
    const gap = parseFloat(gapStr) || 0;
    setMetrics({ viewport, item, step: item + gap });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, vehicles.length]);

  const targetX = useCallback(
    (i: number) => metrics.viewport / 2 - (i * metrics.step + metrics.item / 2),
    [metrics]
  );

  useEffect(() => {
    if (!metrics.step) return;
    const controls = animate(x, targetX(index), { duration: 0.7, ease: EASE });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, metrics.step, metrics.viewport]);

  useEffect(() => {
    const cur = vehicles[index];
    if (cur) onActiveChange?.(cur, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, vehicles]);

  const clamp = useCallback((i: number) => ((i % vehicles.length) + vehicles.length) % vehicles.length, [vehicles.length]);

  const goTo = useCallback(
    (i: number) => {
      const next = clamp(i);
      if (next === index) {
        animate(x, targetX(index), { duration: 0.4, ease: EASE });
      } else {
        setIndex(next);
      }
    },
    [clamp, index, targetX, x]
  );

  const pauseThenResume = () => {
    setManualPause(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setManualPause(false), RESUME_AFTER_MS);
  };

  const next = () => {
    goTo(index + 1);
    pauseThenResume();
  };
  const prev = () => {
    goTo(index - 1);
    pauseThenResume();
  };

  // Autoplay — paused on hover, drag, or briefly after a manual interaction.
  useEffect(() => {
    if (reduce || userPaused || isHovering || isDragging || manualPause || vehicles.length <= 1) return;
    const id = setInterval(() => setIndex((i) => clamp(i + 1)), AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, userPaused, isHovering, isDragging, manualPause, vehicles.length]);

  // Keyboard arrows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, metrics]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x <= -DRAG_THRESHOLD) goTo(index + 1);
    else if (info.offset.x >= DRAG_THRESHOLD) goTo(index - 1);
    else goTo(index);
    pauseThenResume();
  };

  const showArrows = vehicles.length > 1;

  return (
    <div
      className="relative h-full w-full select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        mx.set(0);
      }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      }}
    >
      <div ref={viewportRef} className="relative h-full w-full overflow-hidden" style={{ perspective: 1400 }}>
        <motion.div style={reduce ? undefined : { x: sceneX, rotateY: sceneRotY }} className="h-full w-full">
        <motion.div
          drag="x"
          dragMomentum={false}
          dragElastic={0.12}
          style={{ x, touchAction: "pan-y" }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className={`flex h-full items-end gap-3 sm:gap-6 pb-8 sm:pb-10 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          {vehicles.map((v, i) => {
            const isActive = i === index;
            return (
              <div
                key={v.slug}
                ref={i === 0 ? itemRef : undefined}
                role="button"
                tabIndex={0}
                aria-label={`${v.brand} ${v.name}`}
                onClick={() => (isActive ? onSelectVehicle?.(v) : goTo(i))}
                onKeyDown={(e) => {
                  if (e.key !== "Enter" && e.key !== " ") return;
                  if (isActive) onSelectVehicle?.(v);
                  else goTo(i);
                }}
                className="relative flex shrink-0 flex-col items-center justify-end w-[64vw] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] h-[300px] sm:h-[340px] lg:h-[400px] cursor-pointer"
              >
                {isActive && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-[70%] w-[85%] rounded-full opacity-50 blur-3xl"
                    style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.35), transparent 75%)" }}
                  />
                )}

                <motion.div
                  animate={(() => {
                    const d = i - index;
                    const a = Math.abs(d);
                    if (a === 0) return { scale: 1.2, opacity: 1, rotateY: 0, x: 0, filter: "blur(0px) brightness(1.06)" };
                    const dir = d < 0 ? 1 : -1; // side cars turn slightly toward the centre
                    return a === 1
                      ? { scale: 0.84, opacity: 0.68, rotateY: reduce ? 0 : dir * 9, x: dir * -10, filter: "blur(0.6px) brightness(0.8)" }
                      : { scale: 0.7, opacity: 0.42, rotateY: reduce ? 0 : dir * 12, x: dir * -16, filter: "blur(1.4px) brightness(0.7)" };
                  })()}
                  transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                  style={{ transformOrigin: "50% 100%" }}
                  className="relative h-[78%] w-full will-change-transform"
                >
                  <Image
                    src={v.image}
                    alt={`${v.brand} ${v.name}`}
                    fill
                    sizes="(max-width: 640px) 45vw, 310px"
                    style={v.isCutout ? undefined : { mixBlendMode: "multiply" }}
                    className={`object-contain object-bottom transition-[filter] duration-500 ${
                      isActive ? "drop-shadow-[0_30px_28px_rgba(0,0,0,0.55)]" : "drop-shadow-[0_16px_16px_rgba(0,0,0,0.4)]"
                    }`}
                    draggable={false}
                  />
                </motion.div>

                {/* Contact shadow + subtle mirrored floor reflection */}
                <div className={`mx-auto -mt-1 rounded-full bg-black blur-md transition-all duration-700 ${isActive ? "h-3 w-[70%] opacity-70" : "h-2 w-[50%] opacity-35"}`} />
                <div
                  aria-hidden="true"
                  className="relative -mt-1 h-[18%] w-full scale-y-[-1] opacity-[0.14]"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 85%)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 85%)",
                  }}
                >
                  <Image src={v.image} alt="" fill sizes="200px" className="object-contain object-top" draggable={false} />
                </div>

                <p
                  className={`mt-3 text-center font-semibold uppercase tracking-[0.14em] text-white/60 transition-all duration-300 ${
                    isActive ? "text-[11px] sm:text-xs" : "text-[10px]"
                  }`}
                >
                  {v.brand}
                </p>
                <p
                  className={`text-center font-bold text-white transition-all duration-300 ${
                    isActive ? "text-base sm:text-lg" : "text-xs sm:text-sm text-white/70"
                  }`}
                >
                  {v.name}
                </p>
              </div>
            );
          })}
        </motion.div>
        </motion.div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            aria-label="รุ่นก่อนหน้า"
            onClick={prev}
            className="group absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.08] hover:border-white/60 hover:bg-white/[0.18] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)]"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            aria-label="รุ่นถัดไป"
            onClick={next}
            className="group absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white backdrop-blur-md transition-all duration-200 hover:scale-[1.08] hover:border-white/60 hover:bg-white/[0.18] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)]"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {vehicles.length > 1 && !reduce && (
        <button
          type="button"
          aria-label={userPaused ? "เล่นสไลด์อัตโนมัติ" : "หยุดสไลด์อัตโนมัติ"}
          onClick={() => setUserPaused((v) => !v)}
          className="absolute bottom-1 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white backdrop-blur-md transition-colors hover:bg-white/[0.18] sm:bottom-2 sm:right-4"
        >
          {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      )}

      {vehicles.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-1 sm:bottom-2 z-20 flex items-center justify-center gap-2">
          {vehicles.map((v, i) => (
            <button
              key={v.slug}
              type="button"
              aria-label={`ไปยัง ${v.brand} ${v.name}`}
              onClick={() => {
                goTo(i);
                pauseThenResume();
              }}
              className={`pointer-events-auto rounded-full transition-all duration-300 ${
                i === index ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
