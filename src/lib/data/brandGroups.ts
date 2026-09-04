import { brands, getBrand } from "@/lib/data/brands";
import { getModelsByBrand } from "@/lib/data/models";
import { VehicleModel } from "@/lib/types";

export interface BrandGroup {
  key: string;
  name: string;
  href: string;
  slugs: string[];
  colorHex: string;
  heroImage?: string;
  logo?: string;
  tagline: string;
  description: string;
  isCombined: boolean;
}

/**
 * Maporn markets OMODA and JAECOO as one paired dealership (shared showroom,
 * shared marketing image/logo) — display grouping is 7 brands, not 8.
 * Individual brand pages/models/filters stay untouched; only nav-level
 * and marketing-copy display uses this grouped list.
 */
export function getBrandGroups(): BrandGroup[] {
  const groups: BrandGroup[] = [];
  for (const b of brands) {
    if (b.slug === "jaecoo") continue;
    if (b.slug === "omoda") {
      const jaecoo = getBrand("jaecoo");
      groups.push({
        key: "omoda-jaecoo",
        name: "OMODA | JAECOO",
        href: "/brands/omoda",
        slugs: jaecoo ? ["omoda", "jaecoo"] : ["omoda"],
        colorHex: b.colorHex,
        heroImage: b.heroImage,
        logo: b.logo,
        tagline: jaecoo ? `${b.tagline} · ${jaecoo.tagline}` : b.tagline,
        description: jaecoo
          ? `${b.description} จำหน่ายคู่กับ JAECOO ในโชว์รูมเดียวกัน — ${jaecoo.description}`
          : b.description,
        isCombined: true,
      });
      continue;
    }
    groups.push({
      key: b.slug,
      name: b.name,
      href: `/brands/${b.slug}`,
      slugs: [b.slug],
      colorHex: b.colorHex,
      heroImage: b.heroImage,
      logo: b.logo,
      tagline: b.tagline,
      description: b.description,
      isCombined: false,
    });
  }
  return groups;
}

export function getModelsForGroup(group: BrandGroup): VehicleModel[] {
  return group.slugs.flatMap((slug) => getModelsByBrand(slug));
}

export function getFeaturedModelForGroup(group: BrandGroup): VehicleModel | undefined {
  const models = getModelsForGroup(group);
  return models.find((m) => m.isFeatured) ?? models[0];
}
