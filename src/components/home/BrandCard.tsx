"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { BrandGroup } from "@/lib/data/brandGroups";

const EASE = [0.16, 1, 0.3, 1] as const;

const liftVariants = { rest: { y: 0 }, hover: { y: -4 } };
const imageVariants = { rest: { scale: 1 }, hover: { scale: 1.035 } };
const logoVariants = { rest: { y: 0 }, hover: { y: -2 } };
const ctaVariants = { rest: { opacity: 0.55, x: 0 }, hover: { opacity: 1, x: 3 } };

export default function BrandCard({
  group,
  modelCount,
  image,
  className = "",
}: {
  group: BrandGroup;
  modelCount: number;
  image?: string;
  className?: string;
}) {
  const isCombined = group.isCombined;
  const src = image ?? group.heroImage;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={liftVariants}
      transition={{ duration: 0.5, ease: EASE }}
      className={`h-full ${className}`}
    >
      <Link href={group.href} className="group flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f0f0ee] shadow-[0_1px_2px_rgba(17,17,17,0.05)] transition-shadow duration-500 group-hover:shadow-[0_24px_45px_-24px_rgba(17,17,17,0.35)]">
          {src && (
            <motion.div variants={imageVariants} transition={{ duration: 0.5, ease: EASE }} className="absolute inset-0">
              <Image
                src={src}
                alt={group.name}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                className="object-contain"
              />
            </motion.div>
          )}
        </div>

        <div className="pt-4 flex flex-col h-[168px]">
          <div className="flex items-center gap-2">
            {isCombined ? (
              group.slugs.map((slug) => (
                <motion.span
                  key={slug}
                  variants={logoVariants}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-line"
                >
                  <Image src={`/brand/logos/${slug}.svg`} alt="" fill className="object-contain p-1.5" />
                </motion.span>
              ))
            ) : (
              group.logo && (
                <motion.span
                  variants={logoVariants}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-brand-line"
                >
                  <Image src={group.logo} alt="" fill className="object-contain p-1.5" />
                </motion.span>
              )
            )}
          </div>

          <h3 className="mt-3 text-xl font-semibold uppercase tracking-tight text-brand-navy">{group.name}</h3>
          <p className="mt-1 text-sm text-brand-slate font-light line-clamp-1">{group.tagline}</p>
          {modelCount > 0 && <p className="mt-0.5 text-xs text-brand-slate/70">{modelCount} รุ่นให้เลือก</p>}

          <motion.p
            variants={ctaVariants}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand-navy"
          >
            สำรวจ {group.name}
            <span aria-hidden="true">→</span>
          </motion.p>
        </div>
      </Link>
    </motion.div>
  );
}
