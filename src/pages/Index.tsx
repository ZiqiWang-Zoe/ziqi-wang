import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { OverviewSection } from '@/components/OverviewSection';
import { ResearchSection } from '@/components/ResearchSection';
import { AssessmentSection } from '@/components/AssessmentSection';
import { LogicSection } from '@/components/LogicSection';
import { EthicsSection } from '@/components/EthicsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <OverviewSection />
        <ResearchSection />
        <AssessmentSection />
        <LogicSection />
        <EthicsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
