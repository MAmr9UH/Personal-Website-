import { useEffect, useState } from 'react';
import mountainHero from '@/assets/mountain-hero.jpg';

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMouseX((clientX - innerWidth / 2) / innerWidth);
      setMouseY((clientY - innerHeight / 2) / innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${mountainHero})`,
          transform: `translate3d(${mouseX * 20}px, ${Math.min(offsetY * 0.4, 60) + mouseY * 15}px, 0) scale(1.05)`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-4xl md:text-6xl font-bold text-foreground mb-4 block">Mohamed Amr</span>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            I build intelligent systems that solve problems, adapt over time, and drive decisions.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors backdrop-blur-sm">
              View Portfolio
            </button>
            <button className="rounded-lg bg-foreground px-8 py-3 font-semibold text-background hover:bg-foreground/90 transition-colors backdrop-blur-sm">
              Download CV
            </button>
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