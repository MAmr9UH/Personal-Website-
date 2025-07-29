import { useEffect, useState } from 'react';
import mountainHero from '@/assets/mountain-hero.jpg';
const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const {
        clientX,
        clientY
      } = e;
      const {
        innerWidth,
        innerHeight
      } = window;
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
  return <section id="hero" className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-300 ease-out" style={{
      backgroundImage: `url(${mountainHero})`,
      transform: `translate3d(${mouseX * 20}px, ${Math.min(offsetY * 0.4, 60) + mouseY * 15}px, 0) scale(1.05)`
    }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      
      {/* Neural Network Effect - Left */}
      <div className="absolute left-0 top-0 w-96 h-full opacity-40 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          {/* Neural Network Nodes */}
          <circle cx="80" cy="150" r="3" fill="#00d4ff" className="animate-pulse">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="200" r="2.5" fill="#8b5cf6" className="animate-pulse">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="250" r="2" fill="#06b6d4" className="animate-pulse">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="320" r="3.5" fill="#3b82f6" className="animate-pulse">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="380" r="2.8" fill="#a855f7" className="animate-pulse">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          
          {/* Connection Lines */}
          <line x1="80" y1="150" x2="120" y2="200" stroke="url(#blueGradient)" strokeWidth="1" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="120" y1="200" x2="60" y2="250" stroke="url(#purpleGradient)" strokeWidth="1" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="250" x2="140" y2="320" stroke="url(#cyanGradient)" strokeWidth="1" opacity="0.7">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="140" y1="320" x2="90" y2="380" stroke="url(#blueGradient)" strokeWidth="1" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.8s" repeatCount="indefinite" />
          </line>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Soft Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-transparent blur-xl"></div>
      </div>
      
      {/* Brain Effect - Right */}
      <div className="absolute right-0 top-0 w-96 h-full opacity-30 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          {/* Brain Outline */}
          <path d="M280 200 Q320 180 350 220 Q370 260 350 300 Q340 340 320 360 Q290 380 280 350 Q270 320 260 300 Q250 280 260 250 Q270 220 280 200" 
                stroke="url(#pinkGradient)" strokeWidth="2" fill="none" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
          </path>
          
          {/* Internal Brain Lines */}
          <path d="M280 230 Q300 240 310 260 Q300 280 290 300" stroke="url(#orangeGradient)" strokeWidth="1.5" fill="none" opacity="0.5">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M290 220 Q320 230 330 250 Q320 270 300 280" stroke="url(#pinkGradient)" strokeWidth="1.5" fill="none" opacity="0.4">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
          </path>
          
          {/* Brain Nodes */}
          <circle cx="285" cy="240" r="2" fill="#f97316" className="animate-pulse">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="315" cy="270" r="2.5" fill="#ec4899" className="animate-pulse">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="300" r="2" fill="#f59e0b" className="animate-pulse">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
          </circle>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Soft Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-l from-pink-500/10 via-orange-500/5 to-transparent blur-xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="mx-auto max-w-6xl text-center relative">
          {/* Animated Name with Stylized SVG */}
          <div className="relative mb-8">
            {/* Background SVG Pattern */}
            <svg className="absolute inset-0 w-full h-full animate-fade-in opacity-20" viewBox="0 0 800 400" fill="none" style={{
            animationDelay: '0.5s'
          }}>
              {/* Geometric M */}
              <path d="M100 50 L100 350 L150 150 L200 350 L250 50" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" className="animate-pulse" style={{
              animationDelay: '1s'
            }} />
              {/* Geometric A */}
              <path d="M400 350 L450 50 L500 350 M420 200 L480 200" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" className="animate-pulse" style={{
              animationDelay: '1.2s'
            }} />
              {/* Decorative lines */}
              <path d="M300 100 Q400 50 500 100" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{
              animationDelay: '1.4s'
            }} />
            </svg>
            
            {/* Main Name Text */}
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-1 leading-none">
                <span className="inline-block animate-fade-in" style={{
                animationDelay: '0.2s',
                animationFillMode: 'both'
              }}>
                  Mohamed
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground leading-none mb-6">
                <span className="inline-block animate-fade-in" style={{
                animationDelay: '0.4s',
                animationFillMode: 'both'
              }}>
                  Amr
                </span>
              </div>
            </div>
          </div>
          
          {/* Animated Tagline */}
          <div className="relative">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{
            animationDelay: '0.8s',
            animationFillMode: 'both'
          }}>
              I build intelligent systems that solve problems, adapt over time, and drive decisions.
            </p>
          </div>
          
          {/* Animated Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row animate-fade-in" style={{
          animationDelay: '1s',
          animationFillMode: 'both'
        }}>
            <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 backdrop-blur-sm hover:scale-105">GitHub</button>
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
    </section>;
};
export default HeroSection;