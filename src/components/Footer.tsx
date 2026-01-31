import { Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container-main">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span 
              className="text-xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ZW<span className="text-primary">.</span>
            </span>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Ziqi Wang. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="mailto:zwang234@usc.edu" 
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/ziqiwang-zoe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
