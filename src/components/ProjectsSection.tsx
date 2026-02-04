import { ArrowUpRight, Beaker, Scale, TrendingUp } from 'lucide-react';

const projects: {
  icon: typeof Beaker;
  title: string;
  category: string;
  context: string;
  role: string;
  actions: string[];
  outcomes: string;
  tags: string[];
  url?: string;
}[] = [
  {
    icon: Beaker,
    title: 'Skincare Consumer Insights & Recommendation System',
    category: 'Research Project',
    context: 'Graduate capstone project addressing information asymmetry in the skincare industry.',
    role: 'Lead Researcher & Designer',
    actions: [
      'Designed survey-based skin-type assessment methodology',
      'Developed ingredient transparency framework',
      'Built recommendation logic based on consumer research',
    ],
    outcomes: 'Created an educational tool that helps consumers understand their skin and skincare ingredients through research-informed recommendations. Currently building the website/app and plan to publish it once it\'s ready.',
    tags: ['Consumer Research', 'UX Design', 'Data Analysis', 'Content Strategy', 'Digital Marketing', 'Brand Messaging', 'User Research', 'Product Development'],
  },
  {
    icon: Scale,
    title: 'L-MARS: Legal Multi-Agent Workflow with Orchestrated Reasoning and Agentic Search',
    category: 'Research Publication',
    context: 'Multi-agent system that reduces hallucination and uncertainty in legal question answering through coordinated reasoning and retrieval across heterogeneous sources (Serper web, local RAG, CourtListener case law).',
    role: 'Co-Author',
    actions: [
      'Designed multi-agent workflow with Judge Agent for verification of sufficiency, jurisdiction, and temporal validity',
      'Built iterative reasoning-search-verification loop to ground answers in authoritative law',
      'Evaluated on LegalSearchQA benchmark (200 questions); improved factual accuracy and preference scores from human experts and LLM judges',
    ],
    outcomes: 'Demonstrated that multi-agent reasoning with agentic search offers a scalable blueprint for deploying LLMs in high-stakes legal domains requiring precise retrieval and deliberation.',
    tags: ['Legal AI', 'Multi-Agent Systems', 'RAG', 'LLMs'],
    url: 'https://arxiv.org/abs/2509.00761',
  },
  {
    icon: Scale,
    title: 'AI & Legal Communication Project',
    category: 'Market Research',
    context: 'Research project exploring marketing and content strategy in a regulated industry.',
    role: 'Marketing Researcher',
    actions: [
      'Conducted competitive landscape analysis',
      'Developed content strategy recommendations',
      'Analyzed communication challenges in regulated sectors',
    ],
    outcomes: 'Delivered strategic insights on effective marketing approaches for complex, compliance-sensitive products.',
    tags: ['Market Research', 'Content Strategy', 'B2B Marketing'],
  },
  {
    icon: TrendingUp,
    title: 'Independent Business Growth Project',
    category: 'Entrepreneurial',
    context: 'Built and scaled a nail art business through organic social media growth.',
    role: 'Founder & Marketing Lead',
    actions: [
      'Developed brand identity and visual content strategy',
      'Built community through Instagram engagement',
      'Managed customer relationships and retention',
    ],
    outcomes: 'Grew customer base organically through strategic social media marketing and word-of-mouth referrals.',
    tags: ['Entrepreneurship', 'Brand Building', 'Instagram Marketing'],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="section-spacing bg-secondary/30">
      <div className="container-main">
        <div className="section-header">
          <span className="section-label">Selected Projects</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-description">
            A selection of projects showcasing strategy, research, and execution across different contexts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="card-base card-hover group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <project.icon size={24} className="text-primary" />
                </div>
                <span className="tag tag-primary text-xs">{project.category}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                {project.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">{project.context}</p>
              
              <div className="mb-4">
                <p className="text-xs font-semibold text-foreground mb-2">My Role: {project.role}</p>
                <ul className="space-y-1">
                  {project.actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-accent/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-foreground">
                  <span className="font-semibold">Outcome:</span> {project.outcomes}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-4"
                >
                  View paper
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
