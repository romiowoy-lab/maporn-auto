import WulingNav from "@/components/brands/wuling/WulingNav";
import WulingHero from "@/components/brands/wuling/WulingHero";
import WulingDesign from "@/components/brands/wuling/WulingDesign";
import WulingInterior from "@/components/brands/wuling/WulingInterior";
import WulingConfidence from "@/components/brands/wuling/WulingConfidence";
import WulingCTA from "@/components/brands/wuling/WulingCTA";

export default function WulingShowroom() {
  return (
    <div className="bg-[#101114]">
      <WulingNav />
      <WulingHero />
      <WulingDesign />
      <WulingInterior />
      <WulingConfidence />
      <WulingCTA />
    </div>
  );
}
