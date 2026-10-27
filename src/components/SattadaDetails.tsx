import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

export default function WalimaDetailsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.fade-up');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible'); }),
      { threshold: 0.15 }
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, []);

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <section
      id="walima-details"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden section-bg"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='${isDark ? '%23d4af5a' : '%23b8973a'}' stroke-width='0.4' opacity='${isDark ? '0.09' : '0.1'}'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Ccircle cx='50' cy='50' r='28'/%3E%3Cpath d='M50 8 L50 92 M8 50 L92 50'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />

      {/* Emerald glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,61,46,${isDark ? 0.3 : 0.08}) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 30% at 50% 100%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.04) 0%, transparent 60%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="fade-up">
          <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-3 t-muted" style={{ transition: 'color 0.7s ease' }}>
            Walima Details
          </p>
          <h2
            className="font-playfair italic mb-8"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'background 0.7s ease',
            }}
          >
            The Celebration Feast
          </h2>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {/* Date */}
          <div className="fade-up fade-up-delay-1 glass-card rounded-2xl p-6 text-center" style={{ transition: 'all 0.7s ease' }}>
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}44`, transition: 'all 0.7s ease' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1.5" y="3" width="15" height="13.5" rx="2" stroke={accent} strokeWidth="1.2" style={{ transition: 'stroke 0.7s ease' }} />
                  <path d="M5 1.5 L5 4.5 M13 1.5 L13 4.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" style={{ transition: 'stroke 0.7s ease' }} />
                  <path d="M1.5 7.5 L16.5 7.5" stroke={accent} strokeWidth="0.8" style={{ transition: 'stroke 0.7s ease' }} />
                  <circle cx="6" cy="11" r="1" fill={accent} style={{ transition: 'fill 0.7s ease' }} />
                  <circle cx="9" cy="11" r="1" fill={accent} style={{ transition: 'fill 0.7s ease' }} />
                  <circle cx="12" cy="11" r="1" fill={accent} style={{ transition: 'fill 0.7s ease' }} />
                </svg>
              </div>
            </div>
            <p className="font-cinzel tracking-widest text-xs uppercase mb-2 t-muted" style={{ transition: 'color 0.7s ease' }}>Date</p>
            <p className="font-playfair italic text-xl t-primary" style={{ transition: 'color 0.7s ease' }}>Wednesday</p>
            <p className="font-cormorant text-lg t-accent" style={{ transition: 'color 0.7s ease' }}>8 July 2026</p>
          </div>

          {/* Time */}
          <div className="fade-up fade-up-delay-2 glass-card rounded-2xl p-6 text-center" style={{ transition: 'all 0.7s ease' }}>
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}44`, transition: 'all 0.7s ease' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke={accent} strokeWidth="1.2" style={{ transition: 'stroke 0.7s ease' }} />
                  <path d="M9 5 L9 9 L12 11" stroke={accent} strokeWidth="1.2" strokeLinecap="round" style={{ transition: 'stroke 0.7s ease' }} />
                </svg>
              </div>
            </div>
            <p className="font-cinzel tracking-widest text-xs uppercase mb-2 t-muted" style={{ transition: 'color 0.7s ease' }}>Time</p>
            <p className="font-playfair italic text-xl t-primary" style={{ transition: 'color 0.7s ease' }}>Evening</p>
            <p className="font-cormorant text-lg t-accent" style={{ transition: 'color 0.7s ease' }}>7:30 PM onwards</p>
          </div>

          {/* Venue */}
          <div className="fade-up fade-up-delay-3 glass-card rounded-2xl p-6 text-center" style={{ transition: 'all 0.7s ease' }}>
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}44`, transition: 'all 0.7s ease' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5C6.5 1.5 4 3.8 4 7C4 11 9 17 9 17C9 17 14 11 14 7C14 3.8 11.5 1.5 9 1.5Z" stroke={accent} strokeWidth="1.2" fill={`${accent}18`} style={{ transition: 'stroke 0.7s ease, fill 0.7s ease' }} />
                  <circle cx="9" cy="7" r="2.2" stroke={accent} strokeWidth="1" style={{ transition: 'stroke 0.7s ease' }} />
                </svg>
              </div>
            </div>
            <p className="font-cinzel tracking-widest text-xs uppercase mb-2 t-muted" style={{ transition: 'color 0.7s ease' }}>Venue</p>
            <p className="font-playfair italic text-xl t-primary" style={{ transition: 'color 0.7s ease' }}>Atlantis The Royal</p>
            <p className="font-cormorant text-lg t-accent" style={{ transition: 'color 0.7s ease' }}>Palm Jumeirah - Dubai - UAE</p>
          </div>
        </div>

        {/* Map */}
        <div className="fade-up">
          <p className="font-cinzel tracking-widest text-xs uppercase mb-4 t-muted" style={{ transition: 'color 0.7s ease' }}>Location</p>
          <div className="map-frame-themed mx-auto max-w-xl rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7156305.159117453!2d45.37353515625!3d25.140311914680755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f15086afe32c9%3A0xcc7618cd4530c0e1!2sAtlantis%20The%20Royal!5e1!3m2!1sen!2sin!4v1779263417716!5m2!1sen!2sin"
              width="100%" height="220"
              style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none', display: 'block', transition: 'filter 0.7s ease' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Walima venue map"
            />
          </div>
          <p className="font-cormorant italic text-sm mt-3 t-muted" style={{ transition: 'color 0.7s ease' }}>
            Atlantis The Royal, Palm Jumeirah - Dubai - UAE
          </p>
        </div>
      </div>
    </section>
  );
}
