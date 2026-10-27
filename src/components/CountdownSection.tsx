import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';


const TARGET = new Date('2026-07-03T13:30:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTime(): TimeLeft {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Digit({ value, label, isDark }: { value: number; label: string; isDark: boolean }) {
  const [key, setKey] = useState(0);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setKey((k) => k + 1);
      prev.current = value;
    }
  }, [value]);

  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <div className="flex flex-col items-center gap-3 flex-shrink min-w-0">
      <div
        className="glass-card rounded-2xl flex items-center justify-center relative overflow-hidden glow-pulse-gold"
        style={{
          width: 'clamp(70px, 18vw, 104px)',
          height: 'clamp(80px, 20vw, 116px)',
          transition: 'all 0.7s ease',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)' }}
        />
        <span
          key={key}
          className="num-flip font-cinzel font-bold"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            background: goldGrad,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            transition: 'background 0.7s ease',
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span
        className="font-cinzel tracking-[0.3em] uppercase t-muted"
        style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.72rem)', transition: 'color 0.7s ease' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState<TimeLeft>(calcTime());
  const ref = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const past = TARGET.getTime() <= Date.now();
  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <section
      id="countdown"
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
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.06) 0%, transparent 70%)`,
        transition: 'background 0.7s ease',
        zIndex: 0,
      }} />
      

      <div ref={ref} className="fade-up max-w-3xl mx-auto text-center relative z-10">
        <p className="font-cinzel tracking-[0.35em] text-xs uppercase mt-4 t-muted" style={{ transition: 'color 0.7s ease' }}>
          Almost time to say...
        </p>
        <h2
          className="font-playfair italic mb-6"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            background: goldGrad,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transition: 'background 0.7s ease',
          }}
        >
          Qabool Hai
        </h2>

        {past ? (
          <div>
            <p className="font-playfair italic text-2xl t-accent" style={{ transition: 'color 0.7s ease' }}>
              Alhamdulillah — The blessed day has arrived!
            </p>
          </div>
        ) : (
          <div className="flex flex-nowrap justify-center gap-4 sm:gap-8 w-full scale-90 sm:scale-100">
            <Digit value={time.days}    label="Days"    isDark={isDark} />
            <div className="flex justify-center items-center font-cinzel text-3xl mb-8" style={{ color: accent, lineHeight: 1, transition: 'color 0.7s ease' }}>:</div>
            <Digit value={time.hours}   label="Hours"   isDark={isDark} />
            <div className="flex justify-center items-center font-cinzel text-3xl mb-8" style={{ color: accent, lineHeight: 1, transition: 'color 0.7s ease' }}>:</div>
            <Digit value={time.minutes} label="Minutes" isDark={isDark} />
            <div className="flex justify-center items-center font-cinzel text-3xl mb-8" style={{ color: accent, lineHeight: 1, transition: 'color 0.7s ease' }}>:</div>
            <Digit value={time.seconds} label="Seconds" isDark={isDark} />
          </div>
        )}
        <p className="font-cormorant italic text-base mt-4 t-muted" style={{ transition: 'color 0.7s ease' }}>
          Friday, 3 July 2026 · After Jumma Salah
        </p>
      </div>
    </section>
  );
}
