import { Award } from 'lucide-react';

// Brand icon components (inline SVG - official brand logos)
function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="LinkedIn">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function AmazonIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Amazon">
      <path d="M15.23 17.22c.75.56 1.78.85 2.81.85 1.15 0 2.28-.32 3.22-.96.19-.14.21-.42.04-.58l-.53-.46c-.15-.13-.39-.1-.53.04-.71.51-1.63.76-2.71.76-1.44 0-2.82-.74-3.59-2.02l-2.19 1.07v3.36h-2.07V6.6h2.07v5.43l2.53-1.24zm-2.79-3.28c.24.95.96 1.69 2.04 1.69.9 0 1.52-.38 1.94-1.04l.11-.17-2.05-.96-.04.48zm10.49-3.34l-1.9.75c-.16.06-.26.23-.22.4l.25.99c.04.17.22.27.39.22l1.9-.75c.16-.06.26-.23.22-.4l-.25-.99c-.03-.17-.21-.27-.39-.22zm-7.39-3.39c-2.49 0-4.51 2.03-4.51 4.51s2.03 4.51 4.51 4.51 4.51-2.03 4.51-4.51-2.02-4.51-4.51-4.51zm0 7.02c-1.39 0-2.51-1.13-2.51-2.51s1.12-2.51 2.51-2.51 2.51 1.13 2.51 2.51-1.12 2.51-2.51 2.51z"/>
    </svg>
  );
}

function getCertificateIcon(issuer: string, imageUrl?: string) {
  // If certificate has a custom image (e.g., screenshot of certificate), use it
  if (imageUrl) {
    return <img src={imageUrl} alt="" className="w-full h-full object-contain" />;
  }
  const iconSize = 24;
  switch (issuer?.toLowerCase()) {
    case 'google':
      return <GoogleIcon size={iconSize} />;
    case 'linkedin':
      return <LinkedInIcon size={iconSize} />;
    case 'amazon':
      return <AmazonIcon size={iconSize} />;
    default:
      return <Award size={iconSize} className="text-primary" />;
  }
}

const certificates: { title: string; issuer?: string; date?: string; imageUrl?: string }[] = [
  { title: 'Google Analytics Individual Qualification', issuer: 'Google', date: 'Issued Apr 2025' },
  { title: 'Google Ads Display Certification', issuer: 'Google', date: 'Issued Sep 2023' },
  { title: 'Google Ads Search Certification', issuer: 'Google', date: 'Issued Sep 2023' },
  { title: 'Social Media Monitoring: Strategies and Skills', issuer: 'LinkedIn', date: 'Issued Mar 2023' },
  { title: 'Sponsored Ads Certification', issuer: 'Amazon', date: 'Issued Dec 2022' },
];

export function CertificateSection() {
  return (
    <section id="certificates" className="section-spacing bg-secondary/30">
      <div className="container-main">
        <div className="section-header">
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certificates</h2>
          <p className="section-description">
            Professional certifications and credentials.
          </p>
        </div>

        <div className="space-y-6">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <div key={cert.title} className="card-base card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 p-2">
                    {getCertificateIcon(cert.issuer ?? '', cert.imageUrl)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-primary font-medium text-sm mt-1">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <span className="tag mt-2 inline-block">{cert.date}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-12">
              Certificates will be added here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
