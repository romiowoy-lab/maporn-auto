import type { MetadataRoute } from "next";
import { brands } from "@/lib/data/brands";
import { models } from "@/lib/data/models";
import { promotions } from "@/lib/data/promotions";
import { branches } from "@/lib/data/branches";
import { news } from "@/lib/data/news";

const BASE_URL = "https://www.mapornautogroup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,                      priority: 1.0, changeFrequency: "daily"   },
    { url: `${BASE_URL}/brands`,               priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/cars`,                 priority: 0.9, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/promotions`,           priority: 0.8, changeFrequency: "daily"   },
    { url: `${BASE_URL}/test-drive`,           priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/branches`,             priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/service`,              priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/service/appointment`,  priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/finance`,              priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/quotation`,            priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about`,               priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/news`,                 priority: 0.6, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/contact`,              priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE_URL}/compare`,              priority: 0.5, changeFrequency: "weekly"  },
    { url: `${BASE_URL}/privacy-policy`,       priority: 0.3, changeFrequency: "yearly"  },
    { url: `${BASE_URL}/terms`,                priority: 0.3, changeFrequency: "yearly"  },
    { url: `${BASE_URL}/pdpa`,                 priority: 0.3, changeFrequency: "yearly"  },
  ].map((r) => ({ ...r, lastModified: new Date(), changeFrequency: r.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"] }));

  const brandRoutes = brands
    .filter((b) => !b.hidden && b.slug !== "jaecoo")
    .map((b) => ({
      url: `${BASE_URL}/brands/${b.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
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
