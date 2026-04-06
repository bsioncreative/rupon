import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProblemSection } from "../components/ProblemSection";
import { WhyTouristsSection } from "../components/WhyTouristsSection";
import { TechEdgeSection } from "../components/TechEdgeSection";
import { AppFeaturesSection } from "../components/AppFeaturesSection";
import { PartnerCTA } from "../components/PartnerCTA";
import { UserValueSection } from "../components/UserValueSection";
import { Footer } from "../components/Footer";

export function LandingPage() {
  return (
    <div id="main-scroll" className="size-full overflow-y-auto scroll-smooth">
      <Header />
      <HeroSection />
      <ProblemSection />
      <WhyTouristsSection />
      <TechEdgeSection />
      <AppFeaturesSection />
      <PartnerCTA />
      <UserValueSection />
      <Footer />
    </div>
  );
}