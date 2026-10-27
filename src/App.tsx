import { useEffect, useRef, useState, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';
import { Routes, Route } from "react-router-dom";
import EntryScreen from './components/EntryScreen';
import BismillahSection from './components/BismillahSection';
import BrideGroomSection from './components/BrideGroomSection';
import ScratchSection from './components/ScratchSection';
import CountdownSection from './components/CountdownSection';
import BlessingsSection from './components/BlessingsSection';
import ClosingSection from './components/ClosingSection';
import AudioPlayer from './components/AudioPlayer';
import SattadaIntro from './components/SattadaIntro';
import SattadaDetails from './components/SattadaDetails';
import ContactBride from './components/ContactBride';
import RsvpBride from './components/RsvpBride';
import FooterBride from './components/FooterBride';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [startMusic, setStartMusic] = useState(false); 
  const [, setScratchUnlocked] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const walimaStartRef = useRef<HTMLDivElement>(null);

  // Scroll-driven theme: when walima section crosses 40% from top, switch to dark
  const onScroll = useCallback(() => {
    const el = walimaStartRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const threshold = vh * 0.4;
    setIsDark(rect.top < threshold);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Apply theme class to body for full-page background transition
  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDark);
    document.body.classList.toggle('theme-light', !isDark);
  }, [isDark]);


  // Lock scroll during intro/video, enable after. Also ensures we start at top when unlocking.
  useEffect(() => {
    if (!entered) {
      // lock scroll during intro
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // enable scroll after intro/video
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';

      // force start from top
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [entered]);

 

  return (
    <Routes>
        <Route 
            path="/"
            element={  
              <ThemeContext.Provider value={{ isDark }}>
                {/* Entry card */}
                {!entered && (
                  <EntryScreen 
                    onEnter={() => {
                      setEntered(true);     // open website
                      setStartMusic(true);  // 🎵 start music
                    }}
                    onVideoEnd={() => setVideoEnded(true)}
                  />
                )}

                {/* Main site */}
                <div
                    style={{
                    opacity: entered ? 1 : 0,
                    transition: entered ? 'opacity 0.8s ease' : 'none',
                    overflow: 'hidden',
                    }}
                  >
                    {/* ── NIKAAH SECTIONS ── */}
                    <BismillahSection videoEnded={videoEnded} />
                    <BrideGroomSection />
                    <ScratchSection onUnlocked={() => setScratchUnlocked(true)} />
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
                      <span className="font-amiri text-2xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
                      <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
                    </div>
                    <CountdownSection />

                    {/* ── Sattada SECTIONS ── */}
                    <div ref={walimaStartRef} id="walima-start">


                    <SattadaIntro />
                    <SattadaDetails />
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
                      <span className="font-amiri text-2xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
                      <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
                    </div>
                    <RsvpBride />

                    <BlessingsSection />
                    <ContactBride />
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
                      <span className="font-amiri text-2xl t-accent" style={{ transition: 'color 0.7s ease' }}>✦</span>
                      <div className="h-px flex-1 max-w-28" style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#d4af5a' : '#b8973a'}, transparent)`, transition: 'background 0.7s ease' }} />
                    </div>
                    <ClosingSection />
                    <FooterBride />
                    </div>

                    {/* Audio player FAB */}
                    <AudioPlayer shouldPlay={startMusic} />
                </div>
              </ThemeContext.Provider>
            }/>



    </Routes>
  );
}