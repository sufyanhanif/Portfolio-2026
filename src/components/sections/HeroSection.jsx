import React from 'react';

export default function HeroSection() {
  // Array data media sosial
  const socialLinks = [
    { name: 'GitHub', icon: '/icons/github.svg', url: 'https://github.com/username' },
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', url: 'https://linkedin.com/in/username' },
    { name: 'Behance', icon: '/icons/behance.svg', url: 'https://behance.net/username' },
    { name: 'Instagram', icon: '/icons/instagram.svg', url: 'https://instagram.com/username' },
  ];

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('about-me');
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="home" className="relative flex flex-col items-center justify-between min-h-screen w-full select-none px-2 sm:px-6 pt-20 sm:pt-24 pb-6 sm:pb-10 animate-page-fade-in overflow-hidden">
      
      {/* --- GLOW UNGU KIRI ATAS --- */}
      <div 
        className="absolute -top-16 -left-16 sm:-top-32 sm:-left-32 w-64 sm:w-[450px] md:w-[550px] h-64 sm:h-[450px] md:h-[550px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[70px] sm:blur-[130px] rounded-full pointer-events-none -z-10" 
      />

      {/* --- GLOW UNGU KANAN BAWAH --- */}
      <div 
        className="absolute -bottom-16 -right-16 sm:-bottom-36 sm:-right-36 w-64 sm:w-[500px] md:w-[650px] h-64 sm:h-[500px] md:h-[650px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none -z-10" 
      />

      {/* Main Hero Bounding Box */}
      <div className="flex flex-col items-center text-center my-auto w-full max-w-5xl z-10">
        <div className="relative border border-dashed border-neutral-600/80 bg-black/40 backdrop-blur-[2px] px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-4 mb-4 sm:mb-8 w-fit max-w-[95vw]">
          {/* Titik Sudut Magenta */}
          <span className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 sm:-top-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 sm:-left-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 sm:-right-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 sm:-bottom-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />
          <span className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-fuchsia-500 z-10" />

          {/* Tagline Portofolio */}
          <p className="text-left text-xs sm:text-lg md:text-xl font-medium tracking-wide text-neutral-300 pl-0.5 mb-[-2px] sm:mb-[-6px]">
            Portofolio
          </p>

          {/* Typography SUFYAN */}
          <h1 className="text-[22vw] xs:text-[20vw] sm:text-8xl md:text-9xl font-black tracking-tight flex items-baseline justify-center leading-none my-0">
            <span className="text-neutral-300">SUFY</span>
            
            <span className="relative text-white animate-lamp-glow inline-block mx-0.5">
              A
              <span className="absolute inset-0 blur-xl sm:blur-3xl bg-white/60 -z-10 rounded-full pointer-events-none" />
            </span>
            
            <span className="text-neutral-300">N</span>
          </h1>

          {/* 2026 Badge */}
          <div className="absolute right-1 sm:right-3 bottom-1 sm:bottom-2.5 border border-neutral-700 bg-black/80 px-1 sm:px-2.5 py-0.5 rounded text-[8px] sm:text-xs tracking-wider text-neutral-300 font-mono">
            2026
          </div>
        </div>

        {/* Subtitle */}
        <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold tracking-wide text-white mb-6">
          Web Developer &amp; UI/UX Designer
        </h2>

        {/* Deretan Ikon Sosmed */}
        <div className="flex items-center gap-4 sm:gap-6 bg-zinc-900/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-800/80 shadow-lg">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="group/icon relative flex items-center justify-center p-1.5 rounded-full transition-all duration-300 hover:scale-110"
            >
              {/* Tooltip Nama Sosmed saat Hover (Pindah ke Bawah: top-9) */}
              <span className="absolute top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-all duration-200 bg-fuchsia-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-20">
                {social.name}
              </span>

              {/* Ikon SVG */}
              <img
                src={social.icon}
                alt={social.name}
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-0 invert transition-all duration-300 group-hover/icon:[filter:invert(38%)_sepia(90%)_saturate(3000%)_hue-rotate(275deg)_brightness(100%)_contrast(105%)] group-hover/icon:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Panah Bawah dengan Smooth Scroll */}
      <a
        href="#about-me"
        onClick={handleScrollToAbout}
        aria-label="Scroll Down"
        className="group relative z-10 w-10 h-10 sm:w-12 sm:h-12 border border-neutral-700 hover:border-white rounded-full flex items-center justify-center animate-bounce-slow transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:bg-white/10 hover:scale-110 mt-auto"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
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