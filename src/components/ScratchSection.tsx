import { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useTheme } from '../ThemeContext';
import BG from '../assets/PerfBG.svg';


interface ScratchCircleProps {
  label: string;
  revealText: string;
  onScratched: () => void;
  disabled: boolean;
  isDark: boolean;
}

function ScratchCircle({ label, revealText, onScratched, disabled, isDark }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(false);
  const isDrawingRef = useRef(false);

  const SIZE = typeof window !== 'undefined'
  ? Math.min(90, window.innerWidth / 4)
  : 70;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = SIZE;
    canvas.height = SIZE;

    const grad = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 10, SIZE / 2, SIZE / 2, SIZE / 2);
    grad.addColorStop(0, '#c9a84c');
    grad.addColorStop(0.5, '#b8973a');
    grad.addColorStop(1, '#8a6d1e');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,240,180,0.4)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      ctx.beginPath();
      ctx.moveTo(SIZE / 2 + Math.cos(angle) * 20, SIZE / 2 + Math.sin(angle) * 20);
      ctx.lineTo(SIZE / 2 + Math.cos(angle) * 62, SIZE / 2 + Math.sin(angle) * 62);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255,248,220,0.9)';
    ctx.font = 'bold 11px Cinzel, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', SIZE / 2, SIZE / 2 - 6);
    ctx.fillText('HERE', SIZE / 2, SIZE / 2 + 10);

    ctx.strokeStyle = 'rgba(255,240,180,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();
  }, [SIZE]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = SIZE / rect.width;
    const scaleY = SIZE / rect.height;
    if ('touches' in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas || scratched) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();

      const data = ctx.getImageData(0, 0, SIZE, SIZE);
      let transparent = 0;
      for (let i = 3; i < data.data.length; i += 4) {
        if (data.data[i] < 128) transparent++;
      }
      const total = Math.PI * (SIZE / 2) * (SIZE / 2);
      const coverage = transparent / total;
      if (coverage > 0.55 && !scratched) {
        setScratched(true);
        onScratched();
        ctx.clearRect(0, 0, SIZE, SIZE);
      }
    },
    [scratched, onScratched]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || scratched) return;
    isDrawingRef.current = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawingRef.current || disabled || scratched) return;
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const handleMouseUp = () => { isDrawingRef.current = false; };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || scratched) return;
    e.preventDefault();
    isDrawingRef.current = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawingRef.current || disabled || scratched) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const revealBg = isDark
    ? 'linear-gradient(135deg, #0d1a14 0%, #0a140e 100%)'
    : 'linear-gradient(135deg, #faf6ee 0%, #f5edd6 100%)';
  const revealBorder = isDark ? 'rgba(212,175,90,0.3)' : 'rgba(184,151,58,0.3)';

  return (
    <div className="flex flex-col items-center gap-3 flex-shrink min-w-0">
      <div className="relative " style={{ width: SIZE + 28, height: SIZE + 28 }}>
        {/* Ornamental border */}
        <svg
          width={SIZE + 28} height={SIZE + 28}
          viewBox={`0 0 ${SIZE + 28} ${SIZE + 28}`}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {[...Array(12)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 12;
            const cx = (SIZE + 28) / 2 + Math.cos(angle) * ((SIZE + 28) / 2 - 6);
            const cy = (SIZE + 28) / 2 + Math.sin(angle) * ((SIZE + 28) / 2 - 6);
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill={accent} opacity="0.7" />;
          })}
          <circle cx={(SIZE + 28) / 2} cy={(SIZE + 28) / 2} r={(SIZE + 28) / 2 - 3} fill="none" stroke={accent} strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
          <circle cx={(SIZE + 28) / 2} cy={(SIZE + 28) / 2} r={(SIZE + 28) / 2 - 10} fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
        </svg>

        {/* Reveal value underneath */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{ margin: 14, background: revealBg, border: `2px solid ${revealBorder}`, transition: 'background 0.7s ease, border-color 0.7s ease' }}
        >
          <span
            className="font-playfair text-4xl font-bold"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #e8d5a0 0%, #d4af5a 50%, #f5e8b0 100%)'
                : 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 50%, #d4af5a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'background 0.7s ease',
            }}
          >
            {revealText}
          </span>
        </div>

        {/* Scratch canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', top: 14, left: 14, borderRadius: '50%', zIndex: 3,
            touchAction: 'none', cursor: scratched ? 'default' : 'crosshair',
            transition: 'opacity 0.4s', opacity: scratched ? 0 : 1,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { isDrawingRef.current = false; }}
        />
      </div>

      <span className="font-cinzel tracking-[0.25em] text-xs uppercase t-accent" style={{ transition: 'color 0.7s ease' }}>
        {label}
      </span>
    </div>
  );
}

interface Props {
  onUnlocked: () => void;
}

export default function ScratchSection({ onUnlocked }: Props) {
  const [allDone, setAllDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scratchedSetRef = useRef(new Set<string>());
  const { isDark } = useTheme();

  const handleScratched = (key: 'day' | 'month' | 'year') => {
  if (scratchedSetRef.current.has(key)) return; // prevent duplicates

  scratchedSetRef.current.add(key);

  if (scratchedSetRef.current.size >= 3) {
    setTimeout(() => {
      setAllDone(true);
      onUnlocked();

      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#d4af5a', '#b8973a', '#f0d080', '#fff8e1', '#c9a84c', '#8a6d1e'],
        ticks: 220,
      });

      setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ['#d4af5a', '#f0d080', '#fff'] });
        confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ['#d4af5a', '#f0d080', '#fff'] });
      }, 400);

    }, 300);
  }
};

  // Scroll lock enforcement


  const refFadeIn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = refFadeIn.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const muted = isDark ? '#6a8a78' : '#8a7650';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <section
      ref={sectionRef}
      id="scratch"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden section-bg"
    >
      {/* Arabesque pattern */}
            <div
        className="absolute inset-0 pointer-events-none "
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: '150px 150px',
          opacity: 0.2,
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />

      <div ref={refFadeIn} className="fade-up w-full max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-3 t-muted" style={{ transition: 'color 0.7s ease' }}>
            A little moment before the big one...
          </p>
          <h2
            className="font-playfair italic"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
              transition: 'background 0.7s ease',
            }}
          >
            Unveil the Nikah Date
          </h2>
          <p className="font-cormorant italic text-base mt-2 t-muted" style={{ transition: 'color 0.7s ease' }}>
            InshaAllah on...
          </p>
        </div>

        {/* Scratch circles */}
        <div className="flex flex-nowrap justify-center gap-4 sm:gap-8 w-full ">
          <ScratchCircle label="Day" revealText="3" onScratched={() => handleScratched('day')} disabled={allDone}  />
          <ScratchCircle label="Month" revealText="July" onScratched={() => handleScratched('month')} disabled={allDone}  />
          <ScratchCircle label="Year" revealText="26" onScratched={() => handleScratched('year')} disabled={allDone}  />
        </div>

         {allDone && (
            <div className="mt-16 text-center animate-reveal-in">
              <p className="flex justify-center font-cormorant italic text-base m-8 t-muted" style={{ transition: 'color 0.7s ease' }}>
                  We Are Getting Married!
              </p>
            </div>
          )}

        {/* Revealed Nikaah details */}
        {allDone && (
          <div className="mt-16 text-center animate-reveal-in">
            <div
              className="glass-card rounded-3xl px-6 sm:px-12 py-10 max-w-2xl mx-auto"
              style={{ transition: 'all 0.7s ease' }}
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center glow-pulse-gold"
                  style={{
                    background: `${accent}18`,
                    border: `1.5px solid ${accent}`,
                    transition: 'all 0.7s ease'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 20 C12 20,4 14.5,4 9.5 C4 7 6 5,8.5 5 C10.2 5,11.3 6,12 7 C12.7 6,13.8 5,15.5 5 C18 5,20 7,20 9.5 C20 14.5,12 20,12 20 Z"
                      stroke={isDark ? '#d4af5a' : '#b8973a'}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ transition: 'stroke 0.7s ease' }}
                    />
                  </svg>
                </div>
              </div>

              <p className="font-cinzel tracking-[0.3em] text-xs uppercase mb-2 t-muted" style={{ transition: 'color 0.7s ease' }}>
                Nikaah Ceremony
              </p>

              <h3
                className="font-playfair italic mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'background 0.7s ease',
                }}
              >
                Friday, 3 July 2026
              </h3>

              <h3
                className="font-playfair italic mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'background 0.7s ease',
                }}
              >١٨ مُحَرَّم ١٤٤٨              
              </h3>

              <div className="h-px mx-auto mb-6" style={{ width: 80, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />

              {/* Time */}
              <div className="mb-6">
                <p className="font-cinzel tracking-widest text-xs uppercase mb-4 t-muted" style={{ transition: 'color 0.7s ease' }}>InshaAllah</p>
                <p className="font-arabic text-xl t-primary" style={{ fontFamily: "'Noto Naskh Arabic', serif", transition: 'color 0.7s ease' }}>
                  بَعْدَ صَلَاةِ الْجُمُعَةِ
                </p>
                <p className="font-playfair italic text-xl t-primary" style={{ transition: 'color 0.7s ease' }}>Baad Namaz-e-jumma</p>
                <p className="font-cormorant text-base t-muted" style={{ transition: 'color 0.7s ease' }}>After Jumma Salah</p>
              </div>

              {/* Location */}
              <div className="mb-6">
                {/* <p className="font-cinzel tracking-widest text-xs uppercase mb-1 t-muted" style={{ transition: 'color 0.7s ease' }}>Location</p> */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path d="M7 1C4.2 1 2 3.2 2 6C2 10 7 17 7 17C7 17 12 10 12 6C12 3.2 9.8 1 7 1Z" stroke={accent} strokeWidth="1.3" fill={`${accent}18`} style={{ transition: 'stroke 0.7s ease, fill 0.7s ease' }} />
                    <circle cx="7" cy="6" r="1.8" stroke={accent} strokeWidth="1" style={{ transition: 'stroke 0.7s ease' }} />
                  </svg>
                  <p className="font-playfair italic text-xl t-primary" style={{ transition: 'color 0.7s ease' }}>Masjid-Al-Haram</p>
                </div>
              </div>

              {/* Map */}
              <div className="map-frame-themed mt-4 mx-auto max-w-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14390535.567248754!2d20.093994140625007!3d24.467150664738988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbf005ed60ebb%3A0x41d4f0ba8145173!2sHaram%20Madina%20Almasjid%20Al%20Nabawi%20shareef!5e1!3m2!1sen!2sin!4v1779263142261!5m2!1sen!2sin"
                  width="100%" height="200"
                  style={{ border: 0, display: 'block', filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none', transition: 'filter 0.7s ease' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nikaah venue map"
                />
              </div>
              
            </div>
            
          </div>
        )}
      </div>
    </section>
  );
}


