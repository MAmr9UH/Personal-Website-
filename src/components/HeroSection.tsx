import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import mountainHero from '@/assets/mountain-hero.jpg';

const HeroSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Smooth Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform transition-transform duration-75"
        style={{
          backgroundImage: `url(${mountainHero})`,
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      />

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
            <span className="text-zinc-950 font-medium text-5xl text-right">
              Mohamed Amr
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transforming complex data into breakthrough insights through
            cutting-edge machine learning and AI innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
