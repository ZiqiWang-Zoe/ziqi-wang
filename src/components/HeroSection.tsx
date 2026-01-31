import { ArrowRight, Download, Mail } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12">
      <div className="container-main">
        <div className="max-w-4xl">
          <div className="animate-fade-up">
            <span className="tag tag-primary mb-6">
              Open to Opportunities
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up animate-delay-1" style={{ fontFamily: 'var(--font-display)' }}>
            Hi, I'm <span className="text-primary">Ziqi Wang</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/80 mb-6 animate-fade-up animate-delay-2" style={{ fontFamily: 'var(--font-display)' }}>
            Digital Marketing & Social Media Strategist
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up animate-delay-3">
            Combining consumer insights, content strategy, and data-driven execution to build meaningful digital engagement.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-4">
            <a href="#projects" className="btn-primary">
              View My Work
              <ArrowRight size={18} />
            </a>
            <a href="#" className="btn-outline">
              <Download size={18} />
              Download Resume
            </a>
            <a href="#contact" className="btn-outline">
              <Mail size={18} />
              Contact Me
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  );
}
