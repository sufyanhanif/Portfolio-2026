import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between min-h-[100dvh] h-[100dvh] w-full select-none px-4 sm:px-6 pt-20 pb-6 sm:pb-8 animate-page-fade-in overflow-hidden">
      
      {/* --- GLOW UNGU KIRI ATAS --- */}
      <div 
        className="absolute -top-16 -left-16 sm:-top-32 sm:-left-32 w-60 sm:w-[450px] md:w-[550px] h-60 sm:h-[450px] md:h-[550px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[70px] sm:blur-[130px] rounded-full pointer-events-none -z-10" 
      />

      {/* --- GLOW UNGU KANAN BAWAH --- */}
      <div 
        className="absolute -bottom-16 -right-16 sm:-bottom-36 sm:-right-36 w-64 sm:w-[500px] md:w-[650px] h-64 sm:h-[500px] md:h-[650px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none -z-10" 
      />

      {/* Spacer penyeimbang layout bagian atas */}
      <div className="w-full h-2"></div>

      {/* Main Hero Bounding Box (Pasti pas di tengah layar HP) */}
      <div className="flex flex-col items-center text-center my-auto w-full max-w-4xl z-10">
        <div className="relative border border-dashed border-neutral-600/80 bg-black/40 backdrop-blur-[2px] px-4 xs:px-6 sm:px-10 md:px-14 pt-4 sm:pt-8 pb-4 sm:pb-6 mb-4 sm:mb-8 w-full max-w-fit">
          {/* Titik Sudut Magenta */}
          <span className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 sm:-top-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 sm:-left-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 sm:-right-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 sm:-bottom-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />
          <span className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-2 sm:w-3 h-2 sm:h-3 bg-fuchsia-500 z-10" />

          {/* Tagline Portofolio */}
          <p className="text-left text-xs sm:text-lg md:text-xl font-medium tracking-wide text-neutral-300 mb-[-2px] sm:mb-[-8px]">
            Portofolio
          </p>

          {/* Typography Responsif */}
          <h1 className="text-4xl xs:text-5xl sm:text-8xl md:text-9xl font-black tracking-tight flex items-baseline justify-center">
            <span className="text-neutral-300">SUFY</span>
            
            <span className="relative text-white animate-lamp-glow inline-block mx-0.5">
              A
              <span className="absolute inset-0 blur-lg sm:blur-2xl bg-white/50 -z-10 rounded-full pointer-events-none" />
            </span>
            
            <span className="text-neutral-300">N</span>
          </h1>

          {/* 2026 Badge */}
          <div className="absolute right-2 sm:right-6 bottom-1.5 sm:bottom-4 border border-neutral-700 bg-black/80 px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-xs md:text-sm tracking-wider text-neutral-300 font-mono">
            2026
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold tracking-wide text-white">
          Web Developer &amp; UI/UX Designer
        </h2>
      </div>

      {/* Panah Bawah */}
      <a
        href="#about-me"
        aria-label="Scroll Down"
        className="group relative z-10 w-10 h-10 sm:w-14 sm:h-14 border border-neutral-700 hover:border-white rounded-full flex items-center justify-center animate-bounce-slow transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:bg-white/10 hover:scale-110 mb-1"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6 text-neutral-400 group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}