import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import BG from '../assets/PerfBG.svg';
import Bride from '../assets/Bride.png';
import Groom from '../assets/Groom.png';



export default function BrideGroomSection() {
  const refBride = useRef<HTMLDivElement>(null);
  const refWeds  = useRef<HTMLDivElement>(null);
  const refGroom = useRef<HTMLDivElement>(null);
  const refDua = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const items = [refBride.current, refWeds.current, refGroom.current, refDua.current];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible'); }),
      { threshold: 0.2 }
    );
    items.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  const goldGradStyle = {
    background: goldGrad,
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text' as const,
    transition: 'background 0.7s ease',
  };

  const accent = isDark ? '#d4af5a' : '#b8973a';

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden section-bg"
      id="couple"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: '150px 150px',
           opacity: 0.2,
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.06) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Invitation header */}
        <div className="relative z-10 text-center mb-16 fade-up" ref={refWeds}>
          <p
            className="font-cinzel tracking-[0.4em] text-xs sm:text-sm uppercase mb-2 t-muted"
            style={{ transition: 'color 0.7s ease' }}
          >
            With hearts full of gratitude to {' '}
            <span className="text-base sm:text-lg md:text-xl font-semibold tracking-normal font-arabic">
              Allah ﷻ
            </span>
          </p>
          <p className="font-cormorant italic text-xl sm:text-2xl t-secondary" style={{ transition: 'color 0.7s ease' }}>
            we invite you to witness and celebrate the sacred union of
          </p>
        </div>

        {/* Names grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          {/* Bride */}
          <div ref={refBride} className="fade-up fade-up-delay-1 text-center">

            <div className="mb-3 flex justify-center">
              <img
                src={Bride}
                alt="Bride Name"
                style={{
                  width: 'clamp(200px, 40vw, 500px)',
                  height: 'auto',
                  objectFit: 'contain',
                  lineHeight: 1.15,
                }}
              />
            </div>

            <div className="h-px mx-auto mb-3" style={{ width: 60, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />

            <p className="font-cormorant italic text-xl sm:text-2xl t-secondary" style={{ transition: 'color 0.7s ease' }}>
              D/o Mrs.Rahila &amp; Mr.Rahil
            </p>
          </div>

          {/* Weds ornament */}
          
            <div className="flex-1 flex justify-center">
              <span className="font-amiri italic block" style={{ ...goldGradStyle, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
                With
              </span>
            </div>

          {/* Groom */}
          <div ref={refGroom} className="fade-up fade-up-delay-3 text-center">
            <div className="mb-3 flex justify-center">
              <img
                src={Groom}
                alt="Groom Name"
                style={{
                  width: 'clamp(400px, 70vw, 900px)',
                  height: 'auto',
                  objectFit: 'contain',
                  lineHeight: 1.15,
                }}
              />
            </div>

            <div className="h-px mx-auto mb-3" style={{ width: 60, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />

            <p className="font-cormorant italic text-xl sm:text-2xl t-secondary" style={{ transition: 'color 0.7s ease' }}>
              S/o Mrs.Afshana &amp; Mr.Afshan
            </p>
          </div>
        </div>


        <div className="relative z-10 text-center m-16 fade-up" ref={refDua}>
          <p
            className="font-cinzel tracking-[0.4em] text-xs sm:text-sm uppercase mb-2 t-muted"
            style={{ transition: 'color 0.7s ease' }}
          >
            on the blessed occasion of their
          </p>
          <p className="font-cinzel tracking-[0.25em] text-base sm:text-lg mt-1 uppercase" style={goldGradStyle}>
            Nikaah 
          </p>
          <p className="flex justify-center font-cormorant italic text-xl sm:text-2xl t-secondary whitespace-nowrap">
            in accordance to the Quran & Sunnah
          </p>
          
        </div>

        {/* Bottom du'a */}
        <div className="relative z-10 text-center mt-16">
          <p
            className="font-arabic text-xl leading-relaxed tracking-normal t-accent"
            style={{
              fontFamily: "'Noto Naskh Arabic', serif",
              transition: 'color 0.7s ease'
            }}
          >
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
          </p>

          <p
            className="font-cormorant italic text-sm mt-2 t-muted"
            style={{ transition: 'color 0.7s ease' }}
          >
            May Allah bless you and shower His blessings upon you
          </p>
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
