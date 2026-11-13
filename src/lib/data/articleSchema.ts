import { getBranch } from "@/lib/data/branches";

// Per-article JSON-LD (agency SEO brief, Nov 2026). Branch addresses and phones come from
// branches.ts so the schema always matches the branch pages.
const SITE = "https://mapornautogroup.com";

// "02-322-3663-5" → "+66-2-322-3663"
function intlPhone(phone: string): string {
  const m = phone.match(/^0(\d{1,2})-(\d{3})-(\d{4})/);
  return m ? `+66-${m[1]}-${m[2]}-${m[3]}` : phone;
}

function branchRepair(slug: string, name: string) {
  const b = getBranch(slug);
  if (!b) return null;
  return {
    "@type": "AutoRepair",
    name,
    url: `${SITE}/branches/${slug}`,
    parentOrganization: { "@id": `${SITE}/#autorepair` },
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: b.province,
      addressCountry: "TH",
    },
    telephone: intlPhone(b.phone),
  };
}

const schemas: Record<string, () => object> = {
  "service-center-maporn": () => {
    const hq = getBranch("srinakarin");
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: "ศูนย์บริการรถยนต์ Maporn ดูแลรถคุณครบ 6 บริการหลักในที่เดียว",
          inLanguage: "th",
          datePublished: "2026-11-02",
          dateModified: "2026-11-02",
          author: { "@type": "Organization", name: "ทีมบริการหลังการขาย Maporn Auto Group" },
          publisher: { "@type": "Organization", name: "Maporn Auto Group", url: SITE },
          mainEntityOfPage: `${SITE}/blog/service-center-maporn`,
        },
        {
          "@type": "AutoRepair",
          "@id": `${SITE}/#autorepair`,
          name: "ศูนย์บริการรถยนต์ มาพร ออโต้ กรุ๊ป (Maporn Auto Group)",
          url: `${SITE}/blog/service-center-maporn`,
          description:
            "ศูนย์บริการรถยนต์ครบวงจร 9 สาขา เช็คระยะ ซ่อมทั่วไป ซ่อมสีตัวถัง อะไหล่แท้ และช่วยเหลือฉุกเฉิน 24 ชม. สำหรับ Suzuki, GWM, Omoda Jaecoo, Lepas, Wuling และ Farizon",
          telephone: hq ? intlPhone(hq.phone) : undefined,
          priceRange: "฿฿",
          areaServed: ["กรุงเทพมหานคร", "ปทุมธานี", "ชลบุรี", "ระยอง"],
          brand: ["Suzuki", "GWM", "OMODA", "JAECOO", "Lepas", "Wuling", "Farizon"],
        },
        branchRepair("srinakarin", "Maporn Auto Group สาขาศรีนครินทร์ (สำนักงานใหญ่)"),
        // The brief's "มีนบุรี" branch is Suzy Fix (/branches/minburi redirects there).
        branchRepair("suzy-fix", "Maporn Auto Group สาขามีนบุรี (Suzy Fix)"),
        branchRepair("lamlukka", "Maporn Auto Group สาขาลำลูกกา"),
        branchRepair("rayong", "Maporn Auto Group สาขาระยอง"),
        branchRepair("sriracha", "Maporn Auto Group สาขาศรีราชา"),
      ].filter(Boolean),
    };
  },
};

export function getArticleSchema(slug: string): object | null {
  return schemas[slug]?.() ?? null;
}
