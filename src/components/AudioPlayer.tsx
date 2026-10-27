import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';
import weddingSong from '../assets/weddingSong.mp3';

export default function AudioPlayer({ shouldPlay }: { shouldPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  // PAUSE MUSIC WHEN NOT ON SCREEN
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;

      if (!audio) return;

      if (document.hidden) {
        // app/tab minimized or switched
        audio.pause();
      } else {
        // app/tab active again
        audio.play().catch(() => {});
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);   

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay) {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [shouldPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  if (!mounted) return null;

  const accent = isDark ? '#d4af5a' : '#b8973a';

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={weddingSong}
      />

      <button
        onClick={toggle}
        className="audio-fab"
        style={{
          background: isDark ? 'rgba(10,30,22,0.82)' : 'rgba(250,246,238,0.88)',
          borderColor: accent,
          transition: 'background 0.7s ease, border-color 0.7s ease, box-shadow 0.3s ease',
        }}
        title={playing ? 'Mute music' : 'Play music'}
        aria-label={playing ? 'Mute background music' : 'Play background music'}
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="7" width="2.5" height="6" rx="1" fill={accent}>
              <animate attributeName="height" values="6;10;6" dur="0.7s" repeatCount="indefinite" />
              <animate attributeName="y"      values="7;5;7"  dur="0.7s" repeatCount="indefinite" />
            </rect>
            <rect x="6.5" y="5" width="2.5" height="10" rx="1" fill={accent}>
              <animate attributeName="height" values="10;4;10"  dur="0.9s" repeatCount="indefinite" />
              <animate attributeName="y"      values="5;8;5"   dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect x="11" y="6" width="2.5" height="8" rx="1" fill={accent}>
              <animate attributeName="height" values="8;12;8" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y"      values="6;4;6"  dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="15.5" y="8" width="2.5" height="4" rx="1" fill={accent}>
              <animate attributeName="height" values="4;8;4" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="y"      values="8;6;8" dur="0.8s" repeatCount="indefinite" />
            </rect>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 7 L3 13 M7 4 L7 16 M11 6 L11 14 M15 8 L15 12" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M2 2 L18 18" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
