import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { LeadershipSection } from '@/components/LeadershipSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { CertificateSection } from '@/components/CertificateSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <LeadershipSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificateSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
