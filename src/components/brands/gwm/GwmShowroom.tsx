import GwmHero from "@/components/brands/gwm/GwmHero";
import GwmModelGrid from "@/components/brands/gwm/GwmModelGrid";
import GwmFeaturedVehicle from "@/components/brands/gwm/GwmFeaturedVehicle";
import GwmWhyMaporn from "@/components/brands/gwm/GwmWhyMaporn";
import GwmCTA from "@/components/brands/gwm/GwmCTA";

export default function GwmShowroom() {
  return (
    <div>
      <GwmHero />
      <GwmModelGrid />
      <GwmFeaturedVehicle />
      <GwmWhyMaporn />
      <GwmCTA />
    </div>
  );
}
