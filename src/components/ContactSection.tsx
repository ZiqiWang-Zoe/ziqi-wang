import { MapPin, GraduationCap, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle mx-auto">
            Learn more about this research project
          </p>
        </div>

        <div className="content-card max-w-xl mx-auto text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <GraduationCap size={24} className="text-primary" />
              <span className="text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
                Graduate Program in Digital Social Media
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <MapPin size={20} />
              <span>Los Angeles, CA</span>
            </div>

            <div className="divider-subtle" />

            <p className="text-sm text-muted-foreground">
              This portfolio represents a capstone project completed as part of graduate studies 
              in digital media. For inquiries about this research, please contact the program directly.
            </p>

            <div className="flex items-center justify-center gap-2 text-primary">
              <Mail size={18} />
              <span className="text-sm font-medium">Contact via university program</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
