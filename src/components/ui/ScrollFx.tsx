"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollFxEffect = "fade-up" | "fade" | "slide-left" | "slide-right" | "scale" | "blur" | "reveal";

export default function ScrollFx({
  children,
  effect = "fade-up",
  className = "",
  stagger,
  delay = 0,
}: {
  children: ReactNode;
  effect?: ScrollFxEffect;
  className?: string;
  /** Set to animate direct children individually (staggered) instead of the whole block at once. */
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets: gsap.TweenTarget = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      if (effect === "reveal") {
        gsap.fromTo(
          targets,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power4.out",
            delay,
            stagger,
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
        return;
      }

      const fromVars: gsap.TweenVars = { opacity: 0 };
      const toVars: gsap.TweenVars = { opacity: 1, duration: 0.9, ease: "power3.out", delay, stagger };

      if (effect === "fade-up") {
        fromVars.y = 40;
        toVars.y = 0;
      } else if (effect === "slide-left") {
        fromVars.x = 60;
        toVars.x = 0;
      } else if (effect === "slide-right") {
        fromVars.x = -60;
        toVars.x = 0;
      } else if (effect === "scale") {
        fromVars.scale = 0.92;
        toVars.scale = 1;
      } else if (effect === "blur") {
        fromVars.filter = "blur(14px)";
        toVars.filter = "blur(0px)";
      }

      gsap.fromTo(targets, fromVars, {
        ...toVars,
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, ref);

    return () => ctx.revert();
  }, [effect, stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
