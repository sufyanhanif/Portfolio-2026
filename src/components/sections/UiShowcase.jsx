import React, { useState, useEffect, useRef } from 'react';

export default function UiShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer untuk animasi muncul saat discroll
  useEffect(() => {
    const mainEl = document.querySelector('main');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: mainEl || null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Frame 1-3 untuk Atas (Top Row)
  const topFrames = [
    '/images/ui/frame1.svg',
    '/images/ui/frame2.svg',
    '/images/ui/frame3.svg',
  ];

  // Frame 4-6 untuk Bawah (Bottom Row)
  const bottomFrames = [
    '/images/ui/frame4.svg',
    '/images/ui/frame5.svg',
    '/images/ui/frame6.svg',
  ];

  // Track menyambung tanpa henti (2x duplikasi untuk efisiensi performa)
  const topTrack = [...topFrames, ...topFrames];
  const bottomTrack = [...bottomFrames, ...bottomFrames];

  return (
    <section
      ref={sectionRef}
      id="ui-showcase"
      className="relative w-full py-16 sm:py-24 bg-black text-white overflow-hidden"
    >
      {/* Ambient Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-fuchsia-950/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Container dengan Animasi Entrance Fade-In saat Discroll */}
      <div
        className={`relative z-10 space-y-6 sm:space-y-8 transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        
        {/* ROW 1: TOP ROW (Frame 1-3, Kanan ke Kiri / Right-to-Left) */}
        <div className="relative w-full overflow-hidden flex select-none group">
          {/* Edge Gradient Blurs */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex shrink-0 w-max gap-4 sm:gap-6 animate-marquee group-hover:[animation-play-state:paused]">
            {topTrack.map((imgSrc, idx) => (
              <div
                key={`top-${idx}`}
                className="shrink-0 h-44 xs:h-52 sm:h-64 lg:h-72 aspect-[863/473] rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <img
                  src={imgSrc}
                  alt={`UI Design Frame Top ${idx + 1}`}
                  className="w-full h-full object-contain bg-black"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: BOTTOM ROW (Frame 4-6, Kiri ke Kanan / Left-to-Right) */}
        <div className="relative w-full overflow-hidden flex select-none group">
          {/* Edge Gradient Blurs */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Marquee Track Reverse */}
          <div className="flex shrink-0 w-max gap-4 sm:gap-6 animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {bottomTrack.map((imgSrc, idx) => (
              <div
                key={`bottom-${idx}`}
                className="shrink-0 h-44 xs:h-52 sm:h-64 lg:h-72 aspect-[863/473] rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <img
                  src={imgSrc}
                  alt={`UI Design Frame Bottom ${idx + 1}`}
                  className="w-full h-full object-contain bg-black"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION: MORE PORTFOLIO BUTTON & BEHANCE ICON */}
        <div className="pt-6 sm:pt-10 flex justify-center items-center">
          <a
            href="https://www.behance.net/sufyanhanif1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 sm:py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-fuchsia-500/80 rounded-full font-semibold text-xs sm:text-sm text-white shadow-xl shadow-fuchsia-950/20 hover:shadow-fuchsia-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="tracking-wide">More Portfolio</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-800 group-hover:bg-fuchsia-600 flex items-center justify-center transition-colors">
              <img
                src="/icons/behance.svg"
                alt="Behance Icon"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 brightness-0 invert transition-all duration-300"
              />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
