import { getBrandGroups, getModelsForGroup } from "@/lib/data/brandGroups";
import BrandCard from "@/components/home/BrandCard";
import ScrollFx from "@/components/ui/ScrollFx";

// Uniform, equal-weight photography for the brand showcase — one hero car per
// brand at a similar in-frame scale, cropped from the same real assets used
// elsewhere on the site (see plan notes for the crop rationale per brand).
const SHOWCASE_IMAGE: Record<string, string> = {
  suzuki: "/brand/showcase/suzuki.jpg",
  farizon: "/brand/showcase/farizon.jpg",
  wuling: "/brand/showcase/wuling.jpg",
  nex: "/brand/showcase/nex.jpg",
  gwm: "/brand/showcase/gwm.jpg",
  "omoda-jaecoo": "/brand/showcase/omoda-jaecoo.jpg",
  lepas: "/brand/showcase/lepas.jpg",
};

export default function BrandGrid() {
  const groups = getBrandGroups();
  const counts = new Map(groups.map((g) => [g.key, getModelsForGroup(g).length]));

  return (
    <>
      {/* Desktop / tablet: uniform 4-column grid, every brand the same size */}
      <ScrollFx
        effect="fade-up"
        stagger={0.08}
        className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
      >
        {groups.map((g) => (
          <BrandCard
            key={g.key}
            group={g}
            modelCount={counts.get(g.key) ?? 0}
            image={SHOWCASE_IMAGE[g.key]}
          />
        ))}
      </ScrollFx>

      {/* Mobile: horizontal snap-scroll strip, same uniform card */}
      <div className="sm:hidden -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {groups.map((g) => (
          <div key={g.key} className="shrink-0 w-[78vw] snap-start">
            <BrandCard
              group={g}
              modelCount={counts.get(g.key) ?? 0}
              image={SHOWCASE_IMAGE[g.key]}
              />
          </div>
        ))}
      </div>
    </>
  );
}
