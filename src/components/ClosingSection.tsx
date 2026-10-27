import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

export default function ClosingSection() {
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
      id="closing"
      ref={ref}
      className="flex items-center justify-center px-6 py-24 relative overflow-hidden section-bg"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='${isDark ? '%23d4af5a' : '%23b8973a'}' stroke-width='0.5' opacity='${isDark ? '0.08' : '0.1'}'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Ccircle cx='50' cy='50' r='28'/%3E%3Ccircle cx='50' cy='50' r='14'/%3E%3Cpath d='M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />

      {/* Warm central glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 65% 55% at 50% 50%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.05) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 90% 40% at 50% 100%, rgba(13,61,46,${isDark ? 0.2 : 0.05}) 0%, transparent 50%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
       
          <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-4 t-muted" style={{ transition: 'color 0.7s ease' }}>
            A Message from the Heart
          </p>

          <p
            className="font-arabic text-2xl sm:text-3xl mb-6"
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.6,
              transition: 'background 0.7s ease',
            }}
          >
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="font-amiri text-sm t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
            <span className="font-amiri text-sm t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
            <span className="font-amiri text-sm t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
          </div>
        

        <div className="fade-up fade-up-delay-1">
          <p
            className="font-cormorant italic leading-relaxed t-secondary"
            style={{
              fontSize: 'clamp(1.15rem, 2.8vw, 1.55rem)',
              lineHeight: 1.85,
              transition: 'color 0.7s ease',
            }}
          >
            On this blessed occasion, we open our hearts and our doors to you.
            Your presence, your prayers, and your love mean everything to us.
            May Allah fill your life with the same joy you bring into ours.
          </p>
        </div>

        <div className="fade-up fade-up-delay-3 mt-10">
          <p className="font-arabic text-lg t-muted" style={{ fontFamily: "'Noto Naskh Arabic', serif", transition: 'color 0.7s ease' }}>
            اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا
          </p>
          <p className="font-cormorant italic text-sm mt-1" style={{ color: isDark ? '#4a6a5a' : '#8a7650', transition: 'color 0.7s ease' }}>
            O Allah, unite our hearts
          </p>
        </div>
      </div>
    </section>
  );
}
