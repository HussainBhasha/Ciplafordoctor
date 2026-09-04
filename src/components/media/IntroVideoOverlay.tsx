import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  onDone: () => void;
};

export default function IntroVideoOverlay({ src, onDone }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const hasEndedRef = useRef(false);
  const fallbackTimerRef = useRef<number | null>(null);

  const handleEnd = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
    setFadingOut(true);
    // Smooth 900ms crossfade revealing the website underneath
    setTimeout(onDone, 900);
  };

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Ensure muted DOM properties are strictly applied for smooth mobile & Chrome autoplay
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const play = async () => {
      try {
        await v.play();
      } catch {
        setBlocked(true);
      }
    };

    play();

    // Default safety fallback timer: ensure video never hangs
    fallbackTimerRef.current = window.setTimeout(() => {
      handleEnd();
    }, 6000);

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const handleLoadedMetadata = () => {
    const v = ref.current;
    if (v && v.duration && !isNaN(v.duration) && v.duration > 0) {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
      fallbackTimerRef.current = window.setTimeout(() => {
        handleEnd();
      }, (v.duration + 1.5) * 1000);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-slate-950 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
        fadingOut ? "opacity-0 pointer-events-none scale-[1.03] blur-[2px]" : "opacity-100 scale-100 blur-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Intro video"
    >
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="h-full w-full object-cover"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnd}
        onError={handleEnd}
        onTimeUpdate={() => {
          const v = ref.current;
          if (v && v.duration && v.currentTime >= v.duration - 0.25) {
            handleEnd();
          }
        }}
      />

      {/* Skip button with smooth fade */}
      <div
        className={`absolute top-6 right-6 z-20 transition-opacity duration-300 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={handleEnd}
          className="flex items-center gap-2 rounded-full bg-black/45 hover:bg-black/75 border border-white/20 px-5 py-2.5 text-xs font-semibold tracking-wide text-white/95 backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
        >
          Skip Intro <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />

      {blocked ? (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={() => {
            const v = ref.current;
            if (v) {
              setBlocked(false);
              v.play().catch(handleEnd);
            } else {
              handleEnd();
            }
          }}
        >
          <div className="rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-white/30 hover:bg-white/25 transition-all shadow-xl">
            Tap to enter
          </div>
        </div>
      ) : null}
    </div>
  );
}
