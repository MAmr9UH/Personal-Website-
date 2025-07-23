import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import OceanSection from '@/components/OceanSection';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <OceanSection />
    </div>
  );
};

export default Index;
