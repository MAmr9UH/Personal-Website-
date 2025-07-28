import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import shipCabinBg from '@/assets/ship-cabin.jpg';

const ProjectsSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "AI-Powered Healthcare Diagnostics",
      description: "Developed a machine learning model for early disease detection using medical imaging data.",
      technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
      github: "#",
      demo: "#"
    },
    {
      title: "Natural Language Processing Engine",
      description: "Built a comprehensive NLP pipeline for sentiment analysis and text classification.",
      technologies: ["Python", "NLTK", "Transformers", "PyTorch"],
      github: "#",
      demo: "#"
    },
    {
      title: "Computer Vision Object Detection",
      description: "Implemented real-time object detection system for autonomous vehicle navigation.",
      technologies: ["Python", "YOLO", "OpenCV", "Docker"],
      github: "#",
      demo: "#"
    },
    {
      title: "Predictive Analytics Platform",
      description: "Created a scalable platform for business intelligence and predictive modeling.",
      technologies: ["Python", "Scikit-learn", "PostgreSQL", "React"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen bg-gradient-mountain">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: `url(${shipCabinBg})`,
          transform: `translateY(${(scrollY - window.innerHeight * 2) * 0.3}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Innovation
              <span className="block text-primary">Portfolio</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Showcasing innovative machine learning solutions and AI applications that solve real-world problems.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-glow">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{project.title}</CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;