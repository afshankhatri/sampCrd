import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';


export default function WalimaIntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const hadithRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = hadithRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <section
      id="walima-intro"
      className="flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden section-bg"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='${isDark ? '%23d4af5a' : '%23b8973a'}' stroke-width='0.5' opacity='${isDark ? '0.09' : '0.13'}'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Ccircle cx='50' cy='50' r='28'/%3E%3Ccircle cx='50' cy='50' r='14'/%3E%3Cpath d='M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />

      {/* Gold radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.06) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      {/* Teal glow edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 90% 40% at 50% 0%, rgba(13,61,46,${isDark ? 0.5 : 0.15}) 0%, transparent 60%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      <div ref={ref} className="fade-up max-w-3xl w-full mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <FloralOrnament isDark={isDark} />
        </div>

        {/* Walima heading */}
        <div className="mb-6">
          <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-3 t-muted" style={{ transition: 'color 0.7s ease' }}>
            You are invited to
          </p>
          <h2
            className="font-playfair italic"
            style={{
              fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.15,
              transition: 'background 0.7s ease',
            }}
          >
            Walima
          </h2>

        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${accent})`, transition: 'background 0.7s ease' }} />
          <span className="font-amiri text-2xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
          <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />
        </div>
      </div>


    

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center scroll-bounce">
        <div className="flex flex-col items-center gap-1 t-muted" style={{ transition: 'color 0.7s ease' }}>
          <span className="font-cinzel text-xs tracking-widest uppercase">Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 2 L7 18 M2 13 L7 18 L12 13" stroke={accent} strokeWidth="1.5" strokeLinecap="round" style={{ transition: 'stroke 0.7s ease' }} />
          </svg>
        </div>
      </div>
    </section>
  );
}

function FloralOrnament({ isDark }: { isDark: boolean }) {
  const c = isDark ? '#d4af5a' : '#b8973a';
  return (
    <svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'fill 0.7s ease, stroke 0.7s ease' }}>
      <path d="M70 15 L63 8 L56 15 L63 22 Z" fill={c} opacity="0.6" />
      <path d="M70 15 L77 8 L84 15 L77 22 Z" fill={c} opacity="0.6" />
      <circle cx="70" cy="15" r="3.5" fill={isDark ? '#f0d080' : '#d4af5a'} opacity="0.8" />
      <path d="M5 15 L53 15" stroke={c} strokeWidth="0.8" opacity="0.5" />
      <path d="M87 15 L135 15" stroke={c} strokeWidth="0.8" opacity="0.5" />
      <circle cx="5" cy="15" r="2" fill={c} opacity="0.4" />
      <circle cx="135" cy="15" r="2" fill={c} opacity="0.4" />
      <path d="M18 15 L18 11 M30 15 L30 11 M42 15 L42 11" stroke={c} strokeWidth="0.6" opacity="0.4" />
      <path d="M98 15 L98 11 M110 15 L110 11 M122 15 L122 11" stroke={c} strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}
