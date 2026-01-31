import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <div className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          <span className="badge-academic mb-6 opacity-0 animate-fade-in-up">
            Graduate Capstone Project
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-stagger-1" style={{ fontFamily: 'var(--font-serif)' }}>
            Reducing Information Asymmetry in Skincare
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 opacity-0 animate-fade-in-up animate-stagger-2" style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
            A Skin-Type–Based Recommendation System with Ingredient Transparency
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up animate-stagger-3">
            An educational digital tool designed to help consumers better understand their skin and skincare ingredients through transparent, research-informed recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animate-stagger-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <a href="#overview">View Project</a>
            </Button>
          </div>
        </div>
        
        <a
          href="#overview"
          className="inline-flex items-center justify-center mt-20 text-muted-foreground hover:text-foreground transition-colors opacity-0 animate-fade-in animate-stagger-4"
          aria-label="Scroll to project overview"
        >
          <ArrowDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
