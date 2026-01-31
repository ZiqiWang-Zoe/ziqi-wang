import { BookOpen, Users, Shield } from 'lucide-react';

const highlights = [
  {
    icon: BookOpen,
    title: 'Educational Focus',
    description: 'Designed to inform and empower consumers, not to sell products or promote brands.',
  },
  {
    icon: Users,
    title: 'Brand-Independent',
    description: 'Recommendations focus on ingredient types and product categories, remaining neutral to commercial interests.',
  },
  {
    icon: Shield,
    title: 'Research-Driven',
    description: 'Built on established dermatological research and transparent methodology.',
  },
];

export function OverviewSection() {
  return (
    <section id="overview" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Project Overview</h2>
          <p className="section-subtitle mx-auto">
            Understanding the purpose and scope of this research initiative
          </p>
        </div>

        <div className="content-card max-w-3xl mx-auto mb-12">
          <div className="prose-academic">
            <p>
              This project aims to help consumers make <strong>informed skincare decisions</strong> by 
              providing transparent, ingredient-focused recommendations based on individual skin profiles.
            </p>
            <p>
              Unlike commercial recommendation engines, this system is <strong>brand-independent</strong> and 
              designed purely for educational purposes. It does not promote specific products or brands.
            </p>
            <p className="mb-0">
              <strong>Important Disclaimer:</strong> This is not a medical or dermatological diagnostic tool. 
              All assessments are self-reported and intended for educational exploration only.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="content-card text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-4">
                <item.icon size={24} className="text-accent-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
