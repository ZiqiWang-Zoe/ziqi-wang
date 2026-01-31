import { AlertCircle, Eye, Scale } from 'lucide-react';

const considerations = [
  {
    icon: AlertCircle,
    title: 'Information Overload Risks',
    description: 'Acknowledging that excessive information may overwhelm rather than empower consumers.',
  },
  {
    icon: Eye,
    title: 'Self-Reporting Limitations',
    description: 'Recognizing the inherent constraints of user-provided data in skin assessment.',
  },
  {
    icon: Scale,
    title: 'Ethical Responsibility',
    description: 'Prioritizing transparency and education over persuasion or commercial influence.',
  },
];

export function EthicsSection() {
  return (
    <section id="ethics" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Ethics & Limitations</h2>
          <p className="section-subtitle mx-auto">
            Acknowledging constraints and responsibilities in consumer education
          </p>
        </div>

        <div className="content-card max-w-3xl mx-auto mb-10">
          <div className="prose-academic">
            <p>
              This project operates with a clear commitment to <strong>ethical consumer education</strong>. 
              We prioritize transparency in both methodology and limitations, ensuring users understand 
              the scope and constraints of the recommendations provided.
            </p>
            <p className="mb-0">
              The system is designed to <strong>inform rather than persuade</strong>, avoiding 
              manipulative design patterns or commercial incentives that might compromise educational integrity.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {considerations.map((item) => (
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
