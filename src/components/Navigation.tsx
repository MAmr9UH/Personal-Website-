import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-slate-300">ML Engineer</span>
            <span className="text-primary"></span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => document.getElementById('ocean')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg text-muted-foreground hover:text-primary transition-colors"
            >
              Certificates
            </button>
          </div>
          
          {/* CTA Button */}
          <Button variant="outline" className="border-primary/30 hover:border-primary backdrop-blur-sm text-slate-950 bg-slate-300 hover:bg-slate-200">
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>;
};
export default Navigation;