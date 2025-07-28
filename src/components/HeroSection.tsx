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
    <section id="hero" className="relative h-screen overflow-hidden">
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
        <div className="mx-auto max-w-6xl text-center relative">
          {/* Animated Name with Stylized SVG */}
          <div className="relative mb-8">
            {/* Background SVG Pattern */}
            <svg 
              className="absolute inset-0 w-full h-full animate-fade-in opacity-20" 
              viewBox="0 0 800 400" 
              fill="none"
              style={{ animationDelay: '0.5s' }}
            >
              {/* Geometric M */}
              <path 
                d="M100 50 L100 350 L150 150 L200 350 L250 50" 
                stroke="hsl(var(--primary))" 
                strokeWidth="3" 
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              {/* Geometric A */}
              <path 
                d="M400 350 L450 50 L500 350 M420 200 L480 200" 
                stroke="hsl(var(--primary))" 
                strokeWidth="3" 
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: '1.2s' }}
              />
              {/* Decorative lines */}
              <path 
                d="M300 100 Q400 50 500 100" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none" 
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: '1.4s' }}
              />
            </svg>
            
            {/* Main Name Text */}
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-1 leading-none">
                <span 
                  className="inline-block animate-fade-in"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                  Mohamed
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground leading-none mb-6">
                <span 
                  className="inline-block animate-fade-in"
                  style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
                >
                  Amr
                </span>
              </div>
            </div>
          </div>
          
          {/* Animated Tagline */}
          <div className="relative">
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in"
              style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
            >
              I build intelligent systems that solve problems, adapt over time, and drive decisions.
            </p>
          </div>
          
          {/* Animated Buttons */}
          <div 
            className="flex flex-col justify-center gap-4 sm:flex-row animate-fade-in"
            style={{ animationDelay: '1s', animationFillMode: 'both' }}
          >
            <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 backdrop-blur-sm hover:scale-105">
              View Portfolio
            </button>
            <button className="rounded-lg bg-foreground px-8 py-3 font-semibold text-background hover:bg-foreground/90 transition-all duration-300 backdrop-blur-sm hover:scale-105">
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