import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import OceanSection from '@/components/OceanSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificatesSection from '@/components/CertificatesSection';
import ChatBox from '@/components/ChatBox';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <OceanSection />
      <ProjectsSection />
      <CertificatesSection />
      <ChatBox />
    </div>
  );
};

export default Index;
