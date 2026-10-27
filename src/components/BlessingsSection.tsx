import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const BLESSINGS = [
{ text: 'O Allah, bless this union with love, mercy, and barakah in every step.', author: 'Ameen' },
{ text: 'Under the blessings of Nabi ﷺ, may your marriage be filled with peace and joy.', author: 'Ameen' },
{ text: 'Ya Allah, grant you both a life of togetherness rooted in faith and compassion.', author: 'Ameen' },
{ text: 'With the mercy of Allah, may your hearts always remain united in goodness.', author: 'Ameen' },
{ text: 'Through Allah’s guidance, may your journey together be full of ease and happiness.', author: 'Ameen' },
{ text: 'O Allah, place محبت(muhabbat) and سکون(sukun) in your hearts for one another.', author: 'Ameen' },
{ text: 'By the blessings of Nabi ﷺ, may your home be filled with نور (Noor) and رحمت (Rahmat).', author: 'Ameen' },
{ text: 'Ya Rabb, grant you sabr, love, and endless understanding in your marriage.', author: 'Ameen' },
{ text: 'With Allah’s فضل (fazl),  may your bond grow stronger with each passing day.', author: 'Ameen' },
{ text: 'O Allah, keep your محبت (muhabbat) alive and your hearts always connected in deen.', author: 'Ameen' },
{ text: 'Under His رحمة (rahmah), may your marriage be a source of peace and comfort.', author: 'Ameen' },
{ text: 'Ya Allah, write for you both happiness, barakah, and خیر (khair) in every moment.', author: 'Ameen' },
{ text: 'Through the blessings of Nabi ﷺ, may your life together be full of خیر (khair) and برکت (barakah).', author: 'Ameen' },
{ text: 'O Allah, grant your union sincerity, loyalty, and everlasting love.', author: 'Ameen' },
{ text: 'With Allah’s mercy, may your home always be filled with warmth and Iman.', author: 'Ameen' },
];

export default function BlessingsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  // ── Fade-up observer (unchanged) ──────────────────────────────────────────
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

  // ── Infinite-scroll carousel ───────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // --- state ---
    let animId: number;
    let paused = false;
    let speed = 0.5;           // px per frame — tweak as desired
    let pos = 0;               // current translateX offset (negative = scrolled left)

    // drag / swipe
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;

    // We rendered BLESSINGS twice inside the track (original + clone set).
    // Half the scrollWidth is one full "lap".
    const halfWidth = () => track.scrollWidth / 2;

    function animate() {
      if (!paused && !isDragging) {
        pos -= speed;
        // When we've scrolled exactly one full lap, snap back silently
        if (Math.abs(pos) >= halfWidth()) {
          pos += halfWidth();
        }
        track.style.transform = `translateX(${pos}px)`;
      }
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    // --- hover pause ---
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    // --- mouse drag ---
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartPos = pos;
      track.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX;
      pos = dragStartPos + delta;
      // Keep within a sane range so we don't wander too far
      if (pos > 0) pos = 0;
      if (pos < -halfWidth() * 2) pos = -halfWidth() * 2;
      track.style.transform = `translateX(${pos}px)`;
    };
    const onMouseUp = () => {
      isDragging = false;
      track.style.cursor = 'grab';
    };
    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // --- touch drag ---
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartPos = pos;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const delta = e.touches[0].clientX - dragStartX;
      pos = dragStartPos + delta;
      if (pos > 0) pos = 0;
      if (pos < -halfWidth() * 2) pos = -halfWidth() * 2;
      track.style.transform = `translateX(${pos}px)`;
    };
    const onTouchEnd = () => { isDragging = false; };
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: true });
    track.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  // The card JSX extracted so we can render it twice (original + clone)
  const Cards = () => (
    <>
      {BLESSINGS.map((b, i) => (
        <div
          key={i}
          className={`glass-card rounded-2xl px-6 py-8 text-center flex flex-col gap-4`}
          style={{
            transition: 'all 0.7s ease',
            // Narrow fixed width → tall vertical card matching original grid column proportions
            width: '260px',
            minWidth: '260px',
            flexShrink: 0,
          }}
        >
          <div className="font-amiri text-5xl leading-none" style={{ color: `${accent}40`, transition: 'color 0.7s ease' }}>&ldquo;</div>
          <p className="font-cormorant italic text-lg leading-relaxed flex-1 t-secondary" style={{ transition: 'color 0.7s ease' }}>
            {b.text}
          </p>
          <div className="h-px mx-auto" style={{ width: 40, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />
          <p className="font-cinzel tracking-widest text-xs uppercase t-muted" style={{ transition: 'color 0.7s ease' }}>
            {b.author}
          </p>
        </div>
      ))}
    </>
  );

  return (
    <section
      id="blessings"
      ref={ref}
      className="py-24 px-6 relative overflow-hidden section-bg"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='${isDark ? '%23d4af5a' : '%23b8973a'}' stroke-width='0.4' opacity='${isDark ? '0.08' : '0.1'}'%3E%3Ccircle cx='50' cy='50' r='42'/%3E%3Cpath d='M50 8 L50 92 M8 50 L92 50 M20 20 L80 80 M80 20 L20 80'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          transition: 'background-image 0.7s ease',
          zIndex: -1,
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,61,46,${isDark ? 0.2 : 0.05}) 0%, transparent 65%)`,
        transition: 'background 0.7s ease',
        zIndex: -1,
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
            Heartfelt Duas
          </h2>
          <p className="font-cinzel tracking-[0.35em] text-xs uppercase mb-7 t-muted" style={{ transition: 'color 0.7s ease' }}>
            May it rise to the heavens
          </p>
          <p className="font-arabic text-lg t-accent" style={{ fontFamily: "'Noto Naskh Arabic', serif", transition: 'color 0.7s ease' }}>
            بَارَكَ اللَّهُ لَكُمَا
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(90deg, transparent, ${accent})`, transition: 'background 0.7s ease' }} />
            <span className="font-amiri text-xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
            <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(90deg, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />
          </div>
        </div>

        {/*
          ── Carousel wrapper ────────────────────────────────────────────────
          overflow:hidden clips the track; width:100% keeps it in-section.
          The track holds cards × 2 side-by-side; JS loops pos over the
          first half so the seam is invisible.
        */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '1.5rem',        // matches original gap-6
              cursor: 'grab',
              willChange: 'transform',
              userSelect: 'none',
            }}
          >
            {/* Original set */}
            <Cards />
            {/* Cloned set — makes the loop seamless */}
            <Cards />
          </div>
        </div>
      </div>
    </section>
  );
}