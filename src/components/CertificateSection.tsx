import { Award, ExternalLink, ShoppingBag } from 'lucide-react';

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
  return <ShoppingBag size={size} className="text-[#FF9900]" strokeWidth={2} />;
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

const certificates: {
  title: string;
  issuer?: string;
  date?: string;
  imageUrl?: string;
  /** Path to certificate proof (image or PDF) in public folder, e.g. "certificates/ga-cert.pdf" */
  proofUrl?: string;
}[] = [
  { title: 'Google Analytics Individual Qualification', issuer: 'Google', date: 'Issued Apr 2025', proofUrl: 'https://skillshop.credential.net/999b3c90-1d12-484b-8c0b-2e656d71c151#acc.NxMrTO6C' },
  { title: 'Google Ads Display Certification', issuer: 'Google', date: 'Issued Sep 2023' },
  { title: 'Google Ads Search Certification', issuer: 'Google', date: 'Issued Sep 2023' },
  { title: 'Social Media Monitoring: Strategies and Skills', issuer: 'LinkedIn', date: 'Issued Mar 2023', proofUrl: 'https://www.linkedin.com/learning/certificates/41c38e4a1d0e02eaa22ba31bf0d521481b02b3c78d5f7c2ce2cbaeafa962c09e' },
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
                    {cert.proofUrl && (
                      <a
                        href={cert.proofUrl.startsWith('http') ? cert.proofUrl : `${import.meta.env.BASE_URL}${cert.proofUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-3"
                      >
                        View certificate
                        <ExternalLink size={14} />
                      </a>
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
