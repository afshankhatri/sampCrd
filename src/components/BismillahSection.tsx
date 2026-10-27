import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';
import BG from '../assets/PerfBG.svg';




export default function BismillahSection({ videoEnded = false }: { videoEnded?: boolean }) {
  
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const fullText = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('visible');
          if (videoEnded && !started) {
            setStarted(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started, videoEnded]);

  useEffect(() => {
    if (!videoEnded || !started) return;

    let currentIndex = 0;
    const id = setInterval(() => {
      currentIndex++;
      setDisplayedText(fullText.slice(0, currentIndex));
      if (currentIndex >= fullText.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [fullText, started, videoEnded]);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden section-bg "
      id="bismillah"
    >

      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: '150px 150px',
           opacity: 0.3,
          transition: 'background-image 10s ease',
          zIndex: 0,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.07) 0%, transparent 70%)`,
          transition: 'background 0.7s ease',
          zIndex: 0,
        }}
      />

      <div ref={ref} className="fade-up max-w-3xl w-full mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <GoldFloral isDark={isDark} />
        </div>

        {/* Bismillah */}
        <div className="mb-10">
          <p
            className={`font-arabic text-center leading-relaxed whitespace-pre-wrap typewriter-text fade-up fade-up-delay-1 ${started ? 'visible animate-reveal-in' : ''}`}
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontFamily: "'Noto Naskh Arabic', 'Amiri', serif",
              background: 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.5,
              transition: 'background 0.7s ease',
              minHeight: '4.5rem',
            }}
          >
            {displayedText}
            {started && displayedText.length < fullText.length && (
              <span className="cursor" style={{ color: isDark ? '#d4af5a' : '#b8973a' }}>|</span>
            )}
          </p>
          <p
            className="font-cinzel tracking-[0.3em] text-xs sm:text-sm mt-3 uppercase t-muted"
            style={{ transition: 'color 0.7s ease' }}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
          <span className="font-amiri text-2xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
          <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
        </div>

        {/* Quranic verse */}
        <div
          className="glass-card rounded-2xl px-8 py-10 mx-auto max-w-2xl"
          style={{ transition: 'all 0.7s ease' }}
        >
          <p
            className="font-arabic text-center leading-loose mb-6"
            style={{
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              fontFamily: "'Noto Naskh Arabic', 'Amiri', serif",
              color: isDark ? '#e8d5a0' : '#2c2415',
              transition: 'color 0.7s ease',
            }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>

          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px flex-1 max-w-20" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
            <span className="font-cormorant italic text-sm t-muted" style={{ transition: 'color 0.7s ease' }}>Surah Ar-Rum 30:21</span>
            <div className="h-px flex-1 max-w-20" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
          </div>

          <p
            className="font-cormorant italic text-lg sm:text-xl leading-relaxed t-secondary"
            style={{ transition: 'color 0.7s ease' }}
          >
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them;
            and He placed between you affection and mercy."
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <GoldFloral isDark={isDark} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center scroll-bounce">
        <div className="flex flex-col items-center gap-1 t-muted" style={{ transition: 'color 0.7s ease' }}>
          <span className="font-cinzel text-sm tracking-widest uppercase">Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 2 L7 18 M2 13 L7 18 L12 13" stroke={isDark ? '#d4af5a' : '#b8973a'} strokeWidth="1.5" strokeLinecap="round" style={{ transition: 'stroke 0.7s ease' }} />
          </svg>
        </div>
      </div>
    </section>
  );
}

function GoldFloral({ isDark }: { isDark: boolean }) {
  const c = isDark ? '#d4af5a' : '#b8973a';
  return (
    <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'fill 0.7s ease, stroke 0.7s ease' }}>
      <path d="M60 14 L55 8 L50 14 L55 20 Z" fill={c} opacity="0.7" />
      <path d="M60 14 L65 8 L70 14 L65 20 Z" fill={c} opacity="0.7" />
      <circle cx="60" cy="14" r="3" fill={isDark ? '#f0d080' : '#d4af5a'} />
      <path d="M5 14 L52 14" stroke={c} strokeWidth="0.8" />
      <path d="M68 14 L115 14" stroke={c} strokeWidth="0.8" />
      <circle cx="5" cy="14" r="1.5" fill={c} opacity="0.5" />
      <circle cx="115" cy="14" r="1.5" fill={c} opacity="0.5" />
      <path d="M15 14 L15 10 M25 14 L25 10 M35 14 L35 10 M45 14 L45 10" stroke={c} strokeWidth="0.6" opacity="0.5" />
      <path d="M75 14 L75 10 M85 14 L85 10 M95 14 L95 10 M105 14 L105 10" stroke={c} strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}
