import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import mountainHero from '@/assets/mountain-hero.jpg';
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${mountainHero})`,
      transform: `translateY(${scrollY * 0.5}px)`
    }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 animate-float">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
              Machine Learning Engineer
            </span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text leading-tight md:text-7xl text-blue-950">
            Machine learning
            <br />
            <span className="text-zinc-950 font-medium text-5xl text-right">Mohamed Amr</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transforming complex data into breakthrough insights through cutting-edge machine learning and AI innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-premium transition-all duration-300 px-8 py-6 text-lg">
              View Portfolio
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary text-foreground hover:bg-primary/5 backdrop-blur-sm px-8 py-6 text-lg transition-all duration-300">
              Download CV
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>;
};
export default HeroSection;