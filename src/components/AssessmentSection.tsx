import { Droplets, Wind, Sun, Clock, Leaf } from 'lucide-react';

const dimensions = [
  {
    icon: Droplets,
    title: 'Oil–Water Balance',
    description: 'Assessment of skin\'s natural moisture and sebum production levels.',
  },
  {
    icon: Wind,
    title: 'Sensitivity & Reactivity',
    description: 'Evaluation of skin\'s response to environmental factors and products.',
  },
  {
    icon: Sun,
    title: 'Acne Tendency',
    description: 'Analysis of propensity for breakouts and comedogenic reactions.',
  },
  {
    icon: Clock,
    title: 'Aging-Related Concerns',
    description: 'Assessment of fine lines, elasticity, and other age-related factors.',
  },
  {
    icon: Leaf,
    title: 'Environmental Response',
    description: 'How skin reacts to climate, pollution, and seasonal changes.',
  },
];

export function AssessmentSection() {
  return (
    <section id="assessment" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Skin-Type Assessment</h2>
          <p className="section-subtitle mx-auto">
            A multi-dimensional questionnaire for comprehensive skin profiling
          </p>
        </div>

        <div className="content-card max-w-3xl mx-auto mb-10">
          <div className="prose-academic">
            <p>
              The assessment utilizes a <strong>questionnaire-based approach</strong> to determine 
              individual skin characteristics across multiple dimensions. This self-reported method 
              provides a foundation for personalized recommendations.
            </p>
            <p className="mb-0 text-sm bg-accent/50 p-4 rounded-lg border border-border">
              <strong>Note:</strong> This assessment is self-reported and intended for educational 
              purposes only. It is not a substitute for professional dermatological evaluation.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {dimensions.map((dimension) => (
            <div key={dimension.title} className="content-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <dimension.icon size={16} className="text-accent-foreground" />
                </div>
                <h4 className="font-medium text-foreground text-sm">{dimension.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{dimension.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
