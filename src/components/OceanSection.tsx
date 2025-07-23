import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import oceanTanker from '@/assets/ocean-tanker.jpg';

const OceanSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Deep Learning",
      description: "Advanced neural networks for complex pattern recognition and predictive modeling.",
      icon: "🧠"
    },
    {
      title: "Data Engineering",
      description: "Scalable pipelines processing massive datasets with precision and efficiency.",
      icon: "⚡"
    },
    {
      title: "AI Research",
      description: "Pushing boundaries in artificial intelligence and machine learning innovation.",
      icon: "🔬"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-ocean">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ 
          backgroundImage: `url(${oceanTanker})`,
          transform: `translateY(${(scrollY - window.innerHeight) * 0.3}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Navigating
              <span className="block text-primary">Data Oceans</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Like a precision vessel cutting through vast waters, my expertise guides organizations 
              through the complexities of big data, delivering insights that drive global impact.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 p-8 group hover:shadow-glow"
              >
                <div className="text-4xl mb-4 group-hover:animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "ML Models Deployed" },
              { number: "1B+", label: "Data Points Processed" },
              { number: "15+", label: "Industries Served" },
              { number: "99.7%", label: "Model Accuracy" }
            ].map((stat, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default OceanSection;