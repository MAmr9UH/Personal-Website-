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
      
      {/* Neural Network - Left Side */}
      <div className="absolute left-0 top-0 w-1/3 h-full overflow-hidden opacity-40">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          {/* Animated Nodes */}
          <circle cx="50" cy="150" r="4" fill="url(#neuralGradient1)" className="animate-pulse" style={{ animationDelay: '0s' }} />
          <circle cx="120" cy="100" r="3" fill="url(#neuralGradient2)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="180" cy="200" r="5" fill="url(#neuralGradient1)" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="80" cy="300" r="3" fill="url(#neuralGradient3)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          <circle cx="150" cy="350" r="4" fill="url(#neuralGradient2)" className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="220" cy="450" r="3" fill="url(#neuralGradient1)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="90" cy="550" r="5" fill="url(#neuralGradient3)" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
          <circle cx="170" cy="600" r="4" fill="url(#neuralGradient2)" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
          
          {/* Interconnecting Lines */}
          <path d="M50 150 L120 100" stroke="url(#lineGradient1)" strokeWidth="1" opacity="0.6" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          <path d="M120 100 L180 200" stroke="url(#lineGradient2)" strokeWidth="1" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
          <path d="M180 200 L80 300" stroke="url(#lineGradient1)" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
          <path d="M80 300 L150 350" stroke="url(#lineGradient3)" strokeWidth="1" opacity="0.6" className="animate-pulse" style={{ animationDelay: '1.7s' }} />
          <path d="M150 350 L220 450" stroke="url(#lineGradient2)" strokeWidth="1" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
          <path d="M220 450 L90 550" stroke="url(#lineGradient1)" strokeWidth="1" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
          <path d="M90 550 L170 600" stroke="url(#lineGradient3)" strokeWidth="1" opacity="0.6" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
          
          {/* Gradients */}
          <defs>
            <radialGradient id="neuralGradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#0080ff" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="neuralGradient2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#0040ff" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="neuralGradient3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8000ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#4000ff" stopOpacity="0.3" />
            </radialGradient>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0080ff" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8000ff" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8000ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4000ff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brain - Right Side */}
      <div className="absolute right-0 top-0 w-1/3 h-full overflow-hidden opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          {/* Brain Outline */}
          <path 
            d="M150 200 Q200 150 250 200 Q280 250 250 300 Q280 350 250 400 Q200 450 150 400 Q120 350 150 300 Q120 250 150 200 Z" 
            stroke="url(#brainGradient1)" 
            strokeWidth="2" 
            fill="none" 
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: '0s' }}
          />
          
          {/* Internal Brain Lines */}
          <path d="M150 250 Q200 230 250 250" stroke="url(#brainGradient2)" strokeWidth="1.5" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <path d="M150 300 Q200 280 250 300" stroke="url(#brainGradient1)" strokeWidth="1.5" opacity="0.4" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <path d="M150 350 Q200 330 250 350" stroke="url(#brainGradient3)" strokeWidth="1.5" opacity="0.6" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Glowing Nodes */}
          <circle cx="180" cy="230" r="3" fill="url(#brainNodeGradient1)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
          <circle cx="220" cy="270" r="4" fill="url(#brainNodeGradient2)" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
          <circle cx="200" cy="320" r="3" fill="url(#brainNodeGradient1)" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
          <circle cx="170" cy="360" r="5" fill="url(#brainNodeGradient3)" className="animate-pulse" style={{ animationDelay: '1.8s' }} />
          <circle cx="230" cy="340" r="3" fill="url(#brainNodeGradient2)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
          
          {/* Brain Gradients */}
          <defs>
            <linearGradient id="brainGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff8c42" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="brainGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff8c42" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ffa726" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="brainGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffa726" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="brainNodeGradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b9d" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff8c42" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="brainNodeGradient2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff8c42" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffa726" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="brainNodeGradient3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffa726" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </div>

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