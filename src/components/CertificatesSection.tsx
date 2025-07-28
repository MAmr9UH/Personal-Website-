import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import cabinComputerBg from '@/assets/cabin-computer.jpg';

const CertificatesSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const certificates = [
    {
      title: "AWS Certified Machine Learning - Specialty",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-MLS-2024-001",
      skills: ["Machine Learning", "AWS SageMaker", "Data Engineering", "Model Deployment"],
      verifyUrl: "#"
    },
    {
      title: "Google Cloud Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-PMLE-2023-456",
      skills: ["TensorFlow", "ML Pipelines", "AutoML", "Vertex AI"],
      verifyUrl: "#"
    },
    {
      title: "Microsoft Azure AI Engineer Associate",
      issuer: "Microsoft",
      date: "2023",
      credentialId: "AZ-AI-102-789",
      skills: ["Azure Cognitive Services", "Bot Framework", "Computer Vision", "NLP"],
      verifyUrl: "#"
    },
    {
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI (Coursera)",
      date: "2022",
      credentialId: "DL-SPEC-2022-123",
      skills: ["Neural Networks", "CNN", "RNN", "Transformers"],
      verifyUrl: "#"
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2022",
      credentialId: "TF-DEV-2022-567",
      skills: ["TensorFlow", "Keras", "Computer Vision", "Time Series"],
      verifyUrl: "#"
    },
    {
      title: "Professional Data Scientist",
      issuer: "IBM",
      date: "2021",
      credentialId: "IBM-DS-2021-890",
      skills: ["Python", "R", "Statistics", "Data Visualization"],
      verifyUrl: "#"
    }
  ];

  return (
    <section id="certificates" className="relative min-h-screen bg-gradient-cabin">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: `url(${cabinComputerBg})`,
          transform: `translateY(${(scrollY - window.innerHeight * 3) * 0.3}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection animationType="slide-up" delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Professional
                <span className="block text-primary">Certifications</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional certifications demonstrating expertise in machine learning, cloud platforms, and AI technologies.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animationType="slide-up" delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <Card key={index} className="bg-card/70 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all duration-300 hover:shadow-glow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        {cert.date}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-foreground leading-tight">{cert.title}</CardTitle>
                    <p className="text-sm text-primary font-medium">{cert.issuer}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Credential ID:</p>
                        <p className="text-sm font-mono text-foreground">{cert.credentialId}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs bg-primary/5 text-primary border-primary/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full border-primary/30 hover:border-primary">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Verify Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;