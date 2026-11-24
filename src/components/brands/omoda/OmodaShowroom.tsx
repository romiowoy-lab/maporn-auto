import OmodaHero from "@/components/brands/omoda/OmodaHero";
import OmodaExplore from "@/components/brands/omoda/OmodaExplore";
import OmodaHighlights from "@/components/brands/omoda/OmodaHighlights";
import OmodaColorShowcase from "@/components/brands/omoda/OmodaColorShowcase";
import OmodaCTA from "@/components/brands/omoda/OmodaCTA";
import type { ShowcaseModel } from "@/components/brands/omoda/types";
import { getModel } from "@/lib/data/models";

function buildModels(): ShowcaseModel[] {
  const omoda5 = getModel("omoda-5");
  const omodaC5Ev = getModel("omoda-c5-ev");
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
