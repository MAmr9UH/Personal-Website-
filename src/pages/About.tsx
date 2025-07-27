import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const researchAreas = [
    {
      title: "Computer Vision",
      description: "Developing state‑of‑the‑art image‑segmentation approaches."
    },
    {
      title: "Quantum Computing", 
      description: "Partnering with Dr. Fan Lee on an NSF‑funded initiative that applies quantum algorithms to hydrogen‑production optimization."
    }
  ];

  const highlights = [
    "Active Kaggle competitor for three years, turning cutting‑edge research into production‑ready models.",
    "3rd place, AWS Cloudathon – Solutions Architect track: Led migration of on‑premises infrastructure to AWS, showcasing cloud‑native ML architecture expertise.",
    "I stay current with new technologies and state‑of‑the‑art deep‑learning models, continually seeking opportunities to apply them to complex, high‑value problems."
  ];

  const skills = ["Deep learning", "Agentic AI", "AI research"];
  const stats = [
    { number: "16", label: "Projects" },
    { number: "2", label: "Research" }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation />
      
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Mohamed Amr
            </h1>
            <p className="text-xl text-primary font-semibold mb-6">
              Machine Learning Engineer & Researcher
            </p>
          </div>

          {/* Bio Section */}
          <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a Machine Learning Engineer who designs intelligent systems that generate real‑world impact, 
              learn continuously, and power data‑driven decision‑making at scale. My core tools are Python, SQL, 
              AWS Cloud services, and LangChain. Now in my senior year of a bachelor's program, I combine academic 
              rigor with hands‑on industry projects.
            </p>
          </Card>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Core Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 mb-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Research Assistantships */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Research Assistantships</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Highlights</h2>
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;