import { Layers, Search, FileText } from 'lucide-react';

const outputs = [
  {
    icon: Layers,
    title: 'Skin Type Classification',
    description: 'Categorization into primary types: oily, dry, normal, or combination skin.',
  },
  {
    icon: Search,
    title: 'Identified Concerns',
    description: 'Recognition of specific conditions such as acne-prone, sensitive, or dehydrated skin.',
  },
  {
    icon: FileText,
    title: 'Ingredient Guidance',
    description: 'Plain-language explanations of recommended ingredients and their functions.',
  },
];

export function LogicSection() {
  return (
    <section id="logic" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Recommendation Logic</h2>
          <p className="section-subtitle mx-auto">
            How the system generates transparent, ingredient-focused guidance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="content-card">
              <h3 className="text-xl font-medium text-foreground mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                System Outputs
              </h3>
              <div className="prose-academic">
                <p>
                  Based on assessment responses, users receive a comprehensive profile including 
                  their <strong>primary skin type classification</strong> and any 
                  <strong> identified skin concerns</strong>.
                </p>
                <p className="mb-0">
                  Recommendations focus on <strong>product categories</strong> (e.g., hydrating 
                  serums, gentle cleansers) rather than specific brands, ensuring neutrality 
                  and educational value.
                </p>
              </div>
            </div>

            <div className="content-card bg-accent/30">
              <h4 className="font-medium text-foreground mb-3">Ingredient Transparency</h4>
              <p className="text-sm text-muted-foreground mb-0">
                Each recommendation includes plain-language explanations of key ingredients, 
                their functions, suitability for specific skin types, and potential risks or 
                sensitivities to consider.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {outputs.map((output) => (
              <div key={output.title} className="content-card flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <output.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{output.title}</h4>
                  <p className="text-sm text-muted-foreground">{output.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
