import { FlaskConical, ClipboardList, BarChart3 } from 'lucide-react';

const methods = [
  {
    icon: ClipboardList,
    title: 'Survey-Based Assessment',
    description: 'Structured questionnaires to determine individual skin type and concerns.',
  },
  {
    icon: BarChart3,
    title: 'Quantitative Analysis',
    description: 'Statistical evaluation of user responses and recommendation effectiveness.',
  },
  {
    icon: FlaskConical,
    title: 'Comparative Study',
    description: 'Analysis of recommendations with and without ingredient explanations.',
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Research Design</h2>
          <p className="section-subtitle mx-auto">
            Methodology and approach to studying ingredient transparency
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="content-card">
            <h3 className="text-xl font-medium text-foreground mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Research Focus
            </h3>
            <div className="prose-academic">
              <p>
                The primary research question examines whether <strong>ingredient transparency 
                and explanation</strong> improve consumer understanding and trust in skincare 
                decision-making.
              </p>
              <p className="mb-0">
                This study investigates the relationship between information availability and 
                consumer confidence, exploring how educational context affects perception of 
                skincare recommendations.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {methods.map((method) => (
              <div key={method.title} className="content-card flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <method.icon size={20} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{method.title}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
