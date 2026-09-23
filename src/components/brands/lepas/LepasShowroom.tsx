import LepasNav from "@/components/brands/lepas/LepasNav";
import LepasHero from "@/components/brands/lepas/LepasHero";
import LepasStory from "@/components/brands/lepas/LepasStory";
import LepasDesignHighlights from "@/components/brands/lepas/LepasDesignHighlights";
import LepasOutdoor from "@/components/brands/lepas/LepasOutdoor";
import LepasInterior from "@/components/brands/lepas/LepasInterior";
import LepasShowcase from "@/components/brands/lepas/LepasShowcase";
import LepasTechnology from "@/components/brands/lepas/LepasTechnology";
import LepasExperience from "@/components/brands/lepas/LepasExperience";
import LepasCTA from "@/components/brands/lepas/LepasCTA";

export default function LepasShowroom() {
  return (
    <div className="bg-[#0a0a0b]">
      <LepasNav />
      <LepasHero />
      <LepasStory />
      <LepasDesignHighlights />
      <LepasOutdoor />
      <LepasInterior />
      <LepasShowcase />
      <LepasTechnology />
      <LepasExperience />
      <LepasCTA />
    </div>
  );
}
