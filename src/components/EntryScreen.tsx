import { useState, useEffect } from 'react';
import stamp from "../assets/stamp.png";
import cardVideo from "../assets/cardOpen2.mp4"; 

interface Props {
  onEnter: () => void;
  onVideoEnd?: () => void;
}

export default function EntryScreen({ onEnter, onVideoEnd }: Props) {
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [videoFading, setVideoFading] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 800);
    return () => clearTimeout(t);
  }, []);
  
  const handleTap = () => {
    if (opening || playingVideo) return;

    setOpening(true);

    // small delay if you want (optional)
    setPlayingVideo(true);
  };

  const handleVideoEnded = () => {
    setVideoFading(true);

    window.setTimeout(() => {
      onVideoEnd?.();
      setDone(true);
      onEnter();
    }, 650);
  };

  if (done) return null;

  return (

    <>
    {playingVideo && (
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-700 ${videoFading ? 'opacity-0' : 'opacity-100'}`}
      >
        <video
          className="w-full h-full object-cover"
          src={cardVideo}
          autoPlay
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            (e.target as HTMLVideoElement).play();
          }}
          onEnded={handleVideoEnded}
        />
      </div>
    )}

    <div
      className={`fixed inset-0 z-40 flex items-center justify-center cursor-pointer select-none transition-opacity duration-500 ${
        opening ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: 'linear-gradient(160deg, #1a1206 0%, #0d0d0a 40%, #1a1206 100%)',
      }}
      onClick={handleTap}
    >
      {/* Arabesque pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${stamp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="fixed inset-0 grid grid-rows-2 z-40">
  
          {/* top */}
          <div className="flex items-center justify-center">
            {/* Tap to open */}
            <div
              className={`mb-20 transition-all duration-700 ${pulse ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: pulse ? 'translateY(0)' : 'translateY(8px)' }}
            >
              <div
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full"
                style={{
                  border: '1px solid #aa8448',
                  background: 'rgba(184,151,58,0.1)',
                  color: '#91774e',
                }}
              >
                <span
                  className="font-cinzel tracking-widest text-md uppercase"
                  style={{ animation: 'float-down 2.2s ease-in-out infinite' }}
                >
                  Tap to Open
                </span>
              </div>
            </div>
          </div>

          <div />

        </div>


      <style>{`
        @keyframes float-down {
          0%,100% { transform: translateY(0); opacity: 0.7; }
          50%      { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
    </div>
  </>
  );
}
