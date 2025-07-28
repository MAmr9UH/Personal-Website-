import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface AnimatedSectionProps {
  children: ReactNode;
  animationType?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  threshold?: number;
  className?: string;
}

const AnimatedSection = ({ 
  children, 
  animationType = 'slide-up',
  delay = 0,
  threshold = 0.2,
  className = ''
}: AnimatedSectionProps) => {
  const { elementRef, animationClasses } = useScrollReveal({
    animationType,
    delay,
    threshold,
    triggerOnce: true
  });

  return (
    <div 
      ref={elementRef} 
      className={`${animationClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;