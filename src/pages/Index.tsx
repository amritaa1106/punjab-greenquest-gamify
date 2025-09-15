import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MissionsSection from "@/components/MissionsSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import ImpactSection from "@/components/ImpactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MissionsSection />
        <LeaderboardSection />
        <ImpactSection />
      </main>
    </div>
  );
};

export default Index;