import { Briefcase, Building2, GraduationCap, Sparkles } from 'lucide-react';

const experiences = [
  {
    icon: Building2,
    title: 'Social Media Associate',
    company: 'Echobend',
    period: 'Recent',
    description: 'Led social media strategy and content creation for multiple client accounts. Managed influencer partnerships, optimized content calendars, and tracked performance metrics.',
    achievements: [
      'Increased engagement rates across client accounts',
      'Coordinated influencer campaigns and brand collaborations',
      'Developed data-driven content strategies',
    ],
    tools: ['Meta Ads Manager', 'Content Scheduling Tools', 'Analytics Platforms'],
  },
  {
    icon: Briefcase,
    title: 'Marketing Intern (B2B & Growth)',
    company: 'CambioML',
    period: 'Previous',
    description: 'Supported growth marketing initiatives for a B2B technology company. Focused on content marketing, lead generation, and market research.',
    achievements: [
      'Contributed to content marketing and SEO efforts',
      'Assisted with market research and competitive analysis',
      'Supported lead generation campaigns',
    ],
    tools: ['Google Ads', 'SEO Tools', 'CRM Systems'],
  },
  {
    icon: GraduationCap,
    title: 'Research Assistant',
    company: 'UIUC',
    period: 'Academic',
    description: 'Conducted research on consumer behavior and marketing communications. Applied quantitative and qualitative research methods.',
    achievements: [
      'Designed and analyzed consumer surveys',
      'Applied statistical analysis to marketing research',
      'Contributed to academic publications',
    ],
    tools: ['R', 'SPSS', 'Survey Design'],
  },
  {
    icon: Sparkles,
    title: 'Founder',
    company: 'Independent Nail Art Business',
    period: 'Entrepreneurial',
    description: 'Founded and grew a nail art business through social media marketing and customer relationship management.',
    achievements: [
      'Built customer base through Instagram marketing',
      'Developed brand identity and visual content',
      'Managed end-to-end business operations',
    ],
    tools: ['Instagram', 'Canva', 'Business Management'],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-spacing">
      <div className="container-main">
        <div className="section-header">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Professional Journey</h2>
          <p className="section-description">
            Building expertise across agencies, startups, academia, and entrepreneurship.
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.title + exp.company} className="card-base card-hover">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <exp.icon size={24} className="text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="tag">{exp.period}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool) => (
                      <span key={tool} className="tag text-xs">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
