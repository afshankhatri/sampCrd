import { useTheme } from '../ThemeContext';
import TF from '../assets/logoTF3.png';


export default function Footer() {
  const { isDark } = useTheme();
  const accent = isDark ? '#d4af5a' : '#b8973a';
  const goldGrad = 'linear-gradient(135deg, #d4af5a 0%, #8a6d1e 40%, #f0d080 70%, #b8973a 100%)';

  return (
    <footer
      className="relative overflow-hidden py-16 px-6 section-bg"
    >
      {/* Arabesque pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='${isDark ? '%23d4af5a' : '%23b8973a'}' stroke-width='0.5' opacity='${isDark ? '0.1' : '0.08'}'%3E%3Ccircle cx='40' cy='40' r='35'/%3E%3Ccircle cx='40' cy='40' r='22'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Cpath d='M40 5 L40 75 M5 40 L75 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
          transition: 'background-image 0.7s ease',
          zIndex: 0,
        }}
      />

      {/* Top arc glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '80%', height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${accent}99 50%, transparent 100%)`,
          transition: 'background 0.7s ease',
          zIndex: 0,
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, rgba(${isDark ? '212,175,90' : '184,151,58'},0.06) 0%, transparent 70%)`,
          transition: 'background 0.7s ease',
          zIndex: 0,
        }}
      />

      {/* Decorative stage arch */}
      <div className="flex justify-center mb-8">
        <svg width="320" height="40" viewBox="0 0 320 40" fill="none" className="max-w-full">
          <path d="M0 38 Q80 0 160 0 Q240 0 320 38" stroke={accent} strokeWidth="1" fill="none" opacity="0.35" style={{ transition: 'stroke 0.7s ease' }} />
          <path d="M20 38 Q90 8 160 8 Q230 8 300 38" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.2" style={{ transition: 'stroke 0.7s ease' }} />
          {[...Array(13)].map((_, i) => {
            const x = i * (320 / 12);
            const t = i / 12;
            const y = 40 - 40 * 4 * t * (1 - t);
            return <circle key={i} cx={x} cy={y} r="2" fill={accent} opacity={0.2 + 0.4 * Math.sin(Math.PI * t)} style={{ transition: 'fill 0.7s ease' }} />;
          })}
        </svg>
      </div>

      {/* Names */}
      <div className="text-center">
        <p className="font-cinzel tracking-[0.4em] text-xs uppercase mb-4" style={{ color: isDark ? '#4a6a5a' : '#8a7650', transition: 'color 0.7s ease' }}>
          United in love & faith
        </p>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <h2
            className="font-playfair italic"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              animation: 'shimmer 5s linear infinite',
              backgroundSize: '200% auto',
              transition: 'background 0.7s ease',
            }}
          >
            Faishal
          </h2>

          <div className="flex flex-col items-center gap-1">
            <img
              src={TF}
              alt="icon"
              className="w-[30px] h-[30px] object-contain"
            />
          </div>

          <h2
            className="font-playfair italic"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              animation: 'shimmer 5s linear infinite 0.5s',
              backgroundSize: '200% auto',
              transition: 'background 0.7s ease',
            }}
          >
            Saniya
          </h2>
        </div>

        <div className="h-px mx-auto my-6" style={{ maxWidth: 200, background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transition: 'background 0.7s ease' }} />


        <p className="font-cinzel tracking-[0.3em] text-xs uppercase mt-1" style={{ color: isDark ? '#4a6a5a' : '#8a7650', transition: 'color 0.7s ease' }}>
          16 Nov 2026
        </p>

        <p className="font-cormorant italic text-sm mt-6" style={{ color: isDark ? '#3a5a4a' : '#8a7650', transition: 'color 0.7s ease' }}>
          Made with love (
            <a
              href="https://barqlabs.tech"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              barqlabs.tech
            </a>
  )
          </p>
      </div>
    </footer>
  );
}
