import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

const NAMES =
  'All Khan Family\n Relatives \n Friends';

export default function RsvpSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
    const nameRef = useRef<HTMLDivElement>(null);
  const [typeText, setTypeText] = useState('');
  const [started, setStarted] = useState(false);

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

    useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypeText(NAMES.slice(0, i));
      if (i >= NAMES.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [started]);

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <section
      id="rsvp"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden section-bg"
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
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(13,61,46,${isDark ? 0.25 : 0.06}) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="fade-up text-center mb-16">
          {/* <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-3 t-muted" style={{ transition: 'color 0.7s ease' }}>
            Kindly Respond
          </p> */}
          <h2
            className="font-playfair italic mb-4"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'background 0.7s ease',
            }}
          >
            Best Wishes 
          </h2>

        </div>

        <div
          ref={nameRef}
          className="glass-card rounded-2xl px-6 sm:px-10 py-8 max-w-md mx-auto"
          style={{ transition: 'all 0.7s ease' }}
        >
          <p className="font-cinzel tracking-[0.3em] text-xs uppercase mb-4 t-muted text-center" style={{ transition: 'color 0.7s ease' }}>
            With Love and Dua's of
          </p>

          <div className="h-px mx-auto mb-6" style={{ width: 80, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />

          <p
            className="font-cormorant italic text-lg sm:text-xl leading-relaxed whitespace-pre-wrap text-center t-secondary  "
            style={{ minHeight: '6em', transition: 'color 0.7s ease' }}
          >
            {typeText}
            {started && typeText.length < NAMES.length && (
              <span className="cursor" style={{ color: accent }}>|</span>
            )}
          </p>
        </div>

        <div className="fade-up text-center mt-16">
          <p className="font-cormorant italic text-xl" style={{ color: isDark ? '#8ab09a' : '#5a8a6a', transition: 'color 0.7s ease' }}>
            We would love to celebrate this day with you.
          </p>
          <p className="font-cormorant text-base mt-1 t-muted" style={{ transition: 'color 0.7s ease' }}>
            Please confirm your Presence on 16th Nov 2026
          </p>
        </div>
      </div>
    </section>
  );
}
