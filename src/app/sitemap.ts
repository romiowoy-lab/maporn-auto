import type { MetadataRoute } from "next";
import { brands } from "@/lib/data/brands";
import { models } from "@/lib/data/models";
import { promotions } from "@/lib/data/promotions";
import { branches } from "@/lib/data/branches";
import { news } from "@/lib/data/news";

const BASE_URL = "https://www.mapornautogroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/brands",
    "/cars",
    "/compare",
    "/promotions",
    "/branches",
    "/service",
    "/news",
    "/quotation",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/pdpa",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const brandRoutes = brands.filter((b) => b.slug !== "omoda").map((b) => ({
    url: `${BASE_URL}/brands/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const modelRoutes = models.map((m) => ({
    url: `${BASE_URL}/cars/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const promotionRoutes = promotions.map((p) => ({
    url: `${BASE_URL}/promotions/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const branchRoutes = branches.map((b) => ({
    url: `${BASE_URL}/branches/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsRoutes = news.map((n) => ({
    url: `${BASE_URL}/news/${n.slug}`,
    lastModified: new Date(n.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...brandRoutes, ...modelRoutes, ...promotionRoutes, ...branchRoutes, ...newsRoutes];
}
