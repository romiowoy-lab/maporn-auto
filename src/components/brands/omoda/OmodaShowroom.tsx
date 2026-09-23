import OmodaHero from "@/components/brands/omoda/OmodaHero";
import OmodaExplore from "@/components/brands/omoda/OmodaExplore";
import OmodaHighlights from "@/components/brands/omoda/OmodaHighlights";
import OmodaColorShowcase from "@/components/brands/omoda/OmodaColorShowcase";
import OmodaCTA from "@/components/brands/omoda/OmodaCTA";
import type { ShowcaseModel } from "@/components/brands/omoda/types";
import { getModel } from "@/lib/data/models";

// OMODA and JAECOO are marketed as one combined dealership at Maporn (shared showroom,
// shared marketing image) — same convention used sitewide (brandGroups.ts). The /brands/omoda
// page's showcase features both real verified models under that combined line: OMODA 5 and
// JAECOO J7. Real studio photography only exists for these two; nothing else is fabricated.
function buildModels(): ShowcaseModel[] {
  const omoda5 = getModel("omoda-5");
  const omodaC5Ev = getModel("omoda-c5-ev");
  const jaecooJ7 = getModel("jaecoo-j7");
  const list: ShowcaseModel[] = [];
  if (omoda5) {
    list.push({
      slug: omoda5.slug,
      brandLabel: "OMODA",
      name: omoda5.name,
      tagline: "Urban Crossover SUV",
      image: "/brand/studio/omoda-studio.jpg",
      imagePosition: "62% center",
    });
  }
  if (omodaC5Ev) {
    list.push({
      slug: omodaC5Ev.slug,
      brandLabel: "OMODA",
      name: omodaC5Ev.name,
      tagline: "Electric Crossover SUV",
      image: "/brand/studio3/omoda-c5-ev-lunar-white-roof.jpg",
      imagePosition: "50% 55%",
    });
  }
  if (jaecooJ7) {
    list.push({
      slug: jaecooJ7.slug,
      brandLabel: "JAECOO",
      name: jaecooJ7.name,
      tagline: "Adventure SUV",
      image: "/brand/studio2/jaecoo-j7-front-3q.jpg",
      imagePosition: "center",
    });
  }
  return list;
}

export default function OmodaShowroom() {
  const models = buildModels();

  return (
    <div className="bg-[#0a0a0b]">
      <OmodaHero />
      <OmodaExplore models={models} />
      <OmodaHighlights />
      <OmodaColorShowcase />
      <OmodaCTA />
    </div>
  );
}
