
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
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-75"
        style={{
          backgroundImage: `url(${mountainHero})`,
          transform: `translate3d(0, ${Math.min(offsetY * 0.4, 60)}px, 0)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background/20" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 animate-fade-in">
            Mohamed Amr
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-primary mb-8 animate-fade-in-delay">
            Machine Learning Engineer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-2">
            Transforming complex data into breakthrough insights through cutting-edge machine learning and AI innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-3">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-glow transition-all duration-300 hover:shadow-glow-intense">
              View Portfolio
            </button>
            <button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
