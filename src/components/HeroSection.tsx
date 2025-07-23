import { useEffect, useState } from 'react';
import mountainHero from '@/assets/mountain-hero.jpg';

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-75"
        style={{
          backgroundImage: `url(${mountainHero})`,
          transform: `translate3d(0, ${Math.min(offsetY * 0.4, 60)}px, 0)`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <input 
              type="text" 
              placeholder="Enter your name"
              className="rounded-lg bg-background/80 px-6 py-3 text-foreground placeholder:text-muted-foreground backdrop-blur-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input 
              type="text" 
              placeholder="Enter other info"
              className="rounded-lg bg-background/80 px-6 py-3 text-foreground placeholder:text-muted-foreground backdrop-blur-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="rounded-full bg-card/50 p-4 backdrop-blur-sm border border-border animate-float">
          <div className="h-3 w-3 rounded-full bg-primary" />
        </div>
      </div>
      
      <div className="absolute bottom-20 right-20 hidden lg:block">
        <div className="rounded-full bg-card/50 p-6 backdrop-blur-sm border border-border animate-float-delayed">
          <div className="h-2 w-2 rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;