import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import OceanSection from '@/components/OceanSection';
import ChatBox from '@/components/ChatBox';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <OceanSection />
      <ChatBox />
    </div>
  );
};

export default Index;
