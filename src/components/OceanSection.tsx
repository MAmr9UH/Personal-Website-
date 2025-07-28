import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Linkedin, Github } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import oceanTanker from '@/assets/ocean-tanker.jpg';

const OceanSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const researchAreas = [{
    title: "Computer Vision",
    description: "Developing state‑of‑the‑art image‑segmentation approaches.",
    icon: "👁️"
  }, {
    title: "Quantum Computing",
    description: "Partnering with Dr. Fan Lee on an NSF‑funded initiative that applies quantum algorithms to hydrogen‑production optimization.",
    icon: "⚛️"
  }];

  const highlights = ["Active Kaggle competitor for three years, turning cutting‑edge research into production‑ready models.", "🏆3rd place, AWS Cloudathon – Solutions Architect track: Led migration of on‑premises infrastructure to AWS, showcasing cloud‑native ML architecture expertise.", "I stay current with new technologies and state‑of‑the‑art deep‑learning models, continually seeking opportunities to apply them to complex, high‑value problems."];

  const skills = ["🧠Deep learning", "🤖Agentic AI", "🔬AI research"];

  return (
    <section id="ocean" className="relative min-h-screen bg-gradient-ocean">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
        style={{
          backgroundImage: `url(${oceanTanker})`,
          transform: `translateY(${(scrollY - window.innerHeight) * 0.3}px)`
        }} 
      />
      
      {/* Content */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <AnimatedSection animationType="slide-up" delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Meet Mohamed Amr
                <span className="block text-primary text-4xl">Machine Learning & Researcher</span>
              </h2>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-6 mb-8">
              <a 
                href="http://linkedin.com/in/Mohamed-Amr-UH" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all hover:shadow-glow"
              >
                <Linkedin className="w-6 h-6 text-primary" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg hover:border-primary/30 transition-all hover:shadow-glow"
              >
                <Github className="w-6 h-6 text-primary" />
              </a>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a Machine Learning Engineer who designs intelligent systems that generate real‑world impact, 
              learn continuously, and power data‑driven decision‑making at scale. My core tools are Python, SQL, 
              AWS Cloud services, and LangChain. Now in my senior year of a bachelor's program, I combine academic 
              rigor with hands‑on industry projects.
            </p>
            </div>
          </AnimatedSection>
          
          {/* Skills Section */}
          <AnimatedSection animationType="slide-up" delay={400}>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Core Expertise</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-3 hover:border-primary/30 transition-all"
                  >
                    <span className="font-semibold text-primary text-lg">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Research Assistantships */}
          <AnimatedSection animationType="slide-up" delay={600}>
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Research Assistantships</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {researchAreas.map((area, index) => (
                  <Card 
                    key={index} 
                    className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 p-8 group hover:shadow-glow"
                  >
                    <div className="text-4xl mb-4 group-hover:animate-float">
                      {area.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {area.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Highlights */}
          <AnimatedSection animationType="slide-left" delay={800}>
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Highlights</h3>
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <Card 
                    key={index} 
                    className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all p-6"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {highlight}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          {/* Stats Section */}
          <AnimatedSection animationType="scale" delay={1000}>
            <div className="grid grid-cols-2 gap-8 text-center">
              {[{
                number: "16",
                label: "Projects"
              }, {
                number: "2",
                label: "Research"
              }].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:animate-pulse-glow">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default OceanSection;