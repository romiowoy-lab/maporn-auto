import Hero from "@/components/home/Hero";
import ShowroomBanner from "@/components/home/ShowroomBanner";
import BrandGrid from "@/components/home/BrandGrid";
import PromotionsSection from "@/components/home/PromotionsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BranchesSection from "@/components/home/BranchesSection";
import ServiceSection from "@/components/home/ServiceSection";
import NewsSection from "@/components/home/NewsSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowroomBanner />
      <BrandGrid />
      <PromotionsSection />
      <WhyChooseUs />
      <BranchesSection />
      <ServiceSection />
      <NewsSection />
      <ContactCTA />
    </>
  );
}
