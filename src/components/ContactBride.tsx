import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.fade-up');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible'); }),
      { threshold: 0.1 }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, []);

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden section-bg"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='${isDark ? '%23d4af5a' : '%23b8973a'}' stroke-width='0.4' opacity='${isDark ? '0.08' : '0.1'}'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Ccircle cx='50' cy='50' r='28'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,61,46,${isDark ? 0.2 : 0.05}) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="fade-up text-center mb-14">
          <h2
            className="font-playfair italic mb-2"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'background 0.7s ease',
            }}
          >
            Get in Touch
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${accent})`, transition: 'background 0.7s ease' }} />
            <span className="font-amiri text-xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contacts */}
          <div className="fade-up fade-up-delay-1">
            <div className="glass-card rounded-2xl p-8" style={{ transition: 'all 0.7s ease' }}>
              <h3 className="font-playfair italic text-2xl mb-6 t-primary" style={{ transition: 'color 0.7s ease' }}>
                Contact Details
              </h3>

              <div className="space-y-5">
                {[
                  { label: "Mr.Mahboob Khan", value: '+91 94258 50950' },
                  { label: "General Enquiry", value: '+91 87883 14656' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: `${accent}18`, border: `1px solid ${accent}44`, transition: 'all 0.7s ease' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2.5C2 2.5 3 1 4 1C5 1 6 3 6 3.5C6 4 5.5 4.5 5 5C4.5 5.5 4.5 6 5.5 7.5C6.5 9 7 9 7.5 8.5C8 8 8.5 7.5 9 7.5C9.5 7.5 12 8.5 12 9.5C12 10.5 10.5 13 9 13C7.5 13 2 8 2 2.5Z" stroke={accent} strokeWidth="1.1" fill={`${accent}18`} style={{ transition: 'stroke 0.7s ease, fill 0.7s ease' }} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-cinzel tracking-widest text-xs uppercase t-muted" style={{ transition: 'color 0.7s ease' }}>{c.label}</p>
                      <p className="font-cormorant text-lg t-primary" style={{ transition: 'color 0.7s ease' }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Home location */}
          <div className="fade-up fade-up-delay-2 flex flex-col gap-5">
            {[{
              title: "Groom's Residence",
              name: 'Home',
              addr: 'Jawahar ward no. 19, Eidgah Colony, near Noorani Masjid, Mandla, Madhya Pradesh, India'
            }].map((h, i) => (
              <div key={i} className="glass-card rounded-2xl p-6" style={{ transition: 'all 0.7s ease' }}>
                <div className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 mt-1 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}44`, transition: 'all 0.7s ease' }}
                  >
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <path d="M7 1C4.2 1 1 4.2 1 8C1 13 7 17 7 17C7 17 13 13 13 8C13 4.2 9.8 1 7 1Z" stroke={accent} strokeWidth="1.2" fill={`${accent}18`} style={{ transition: 'stroke 0.7s ease, fill 0.7s ease' }} />
                      <circle cx="7" cy="8" r="2.2" stroke={accent} strokeWidth="1" style={{ transition: 'stroke 0.7s ease' }} />
                    </svg>
                  </div>
                  <div>
                    <p className="font-cinzel tracking-widest text-xs uppercase mb-1 t-muted" style={{ transition: 'color 0.7s ease' }}>{h.title}</p>
                    <p className="font-cormorant italic text-xl t-primary" style={{ transition: 'color 0.7s ease' }}>{h.name}</p>
                    <p className="font-cormorant text-base" style={{ color: isDark ? '#8ab09a' : '#5a8a6a', transition: 'color 0.7s ease', whiteSpace: 'pre-line' }}>
                      {h.addr}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Small map */}
            <div className="map-frame-themed rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4047.6871024250886!2d80.3655782753015!3d22.608877379465927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDM2JzMyLjAiTiA4MMKwMjInMDUuNCJF!5e1!3m2!1sen!2sin!4v1793119079447!5m2!1sen!2sin"
                width="100%" height="160"
                style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none', display: 'block', transition: 'filter 0.7s ease' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Home location map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


