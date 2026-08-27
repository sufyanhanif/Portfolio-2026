import React, { useRef, useEffect, useState } from 'react';

export default function About() {
  const cardRef = useRef(null);
  const maskRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Ref khusus untuk elemen gambar Mobile
  const mobileMaskRef = useRef(null);
  const mobileTimerRef = useRef(null);
  const mobileAnimRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  // Array ikon My Stacks
  const stacks = [
    { name: 'Astro', icon: '/stacks/astro.svg' },
    { name: 'Laravel', icon: '/stacks/laravel.svg' },
    { name: 'React', icon: '/stacks/react.svg' },
    { name: 'JavaScript', icon: '/stacks/javascript.svg' },
    { name: 'PHP', icon: '/stacks/php.svg' },
    { name: 'MySQL', icon: '/stacks/mysql.svg' },
    { name: 'CSS', icon: '/stacks/css.svg' },
    { name: 'Framer', icon: '/stacks/framer.svg' },
  ];

  const cardHoverStyle = "hover:scale-[1.02] hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] cursor-default";

  // 1. Intersection Observer untuk Scroll Reveal Trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Logika Efek Senter Desktop
  useEffect(() => {
    const card = cardRef.current;
    const mask = maskRef.current;

    if (!card || !mask) return;

    const radius = 110;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mask.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
    };

    const handleMouseLeave = () => {
      mask.style.clipPath = `circle(0px at 0px 0px)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 3. Logika Sentuh Mobile
  const handleMobileTouch = (e) => {
    const mask = mobileMaskRef.current;
    if (!mask) return;

    const rect = mask.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    if (mobileAnimRef.current) cancelAnimationFrame(mobileAnimRef.current);

    const targetRadius = 350;
    let currentRadius = 0;
    const duration = 600;
    const startTime = performance.now();

    const animateExpand = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      currentRadius = targetRadius * easeProgress;

      mask.style.clipPath = `circle(${currentRadius}px at ${x}px ${y}px)`;

      if (progress < 1) {
        mobileAnimRef.current = requestAnimationFrame(animateExpand);
      } else {
        mobileTimerRef.current = setTimeout(() => {
          animateShrink(x, y);
        }, 30000);
      }
    };

    const animateShrink = (startX, startY) => {
      const shrinkDuration = 800;
      const shrinkStartTime = performance.now();

      const shrinkStep = (now) => {
        const elapsed = now - shrinkStartTime;
        const progress = Math.min(elapsed / shrinkDuration, 1);
        const easeProgress = Math.pow(progress, 3);
        const radius = targetRadius * (1 - easeProgress);

        mask.style.clipPath = `circle(${radius}px at ${startX}px ${startY}px)`;

        if (progress < 1) {
          mobileAnimRef.current = requestAnimationFrame(shrinkStep);
        } else {
          mask.style.clipPath = `circle(0px at 0px 0px)`;
        }
      };

      mobileAnimRef.current = requestAnimationFrame(shrinkStep);
    };

    mobileAnimRef.current = requestAnimationFrame(animateExpand);
  };

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="relative w-full min-h-screen bg-black text-white p-5 sm:p-8 md:p-12 flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center justify-center overflow-hidden pt-24 lg:pt-16 pb-12"
    >
      {/* GLOW UNGU */}
      <div 
        className="absolute -top-16 -right-16 sm:-top-40 sm:-right-36 w-64 sm:w-[500px] md:w-[650px] h-64 sm:h-[500px] md:h-[650px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none z-0" 
      />

      {/* BENTO GRID */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 max-w-xl z-10">
        
        {/* Profil Brief */}
        <div 
          className={`bg-zinc-900/80 p-4 sm:p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[150ms] lg:delay-[0ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h1 className="text-lg sm:text-2xl font-bold text-fuchsia-500 mb-0.5 sm:mb-1">Sufyan Hanif Ariyana</h1>
          <p className="text-[11px] sm:text-sm text-zinc-400 mb-2 sm:mb-3">Web Developer & UI/UX Designer</p>
          <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">
            As a fresh graduate from Politeknik Negeri Semarang, I am proficient in building websites using Laravel and Astro. I am also skilled in UI/UX design and various design tools, supported by internal organizational experience in the capital market.
          </p>
        </div>

        {/* Grid Tengah: Education & Career */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div 
            className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[300ms] lg:delay-[150ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center gap-1.5 text-fuchsia-500 font-semibold mb-1.5 text-[11px] sm:text-sm">
              <span>🎓 Education</span>
            </div>
            <h2 className="text-[11px] sm:text-sm font-bold leading-tight">Politeknik Negeri Semarang</h2>
            <p className="text-[9px] sm:text-[11px] text-zinc-500 mt-0.5">2021 - 2025</p>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1.5 leading-snug">Bachelor of Computer Eng.</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">Grade: 3.87/4.00</p>
          </div>

          <div 
            className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[450ms] lg:delay-[300ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center gap-1.5 text-fuchsia-500 font-semibold mb-1.5 text-[11px] sm:text-sm">
              <span>💼 Career</span>
            </div>
            <h2 className="text-[11px] sm:text-sm font-bold leading-tight">Web Developer</h2>
            <p className="text-[9px] sm:text-[11px] text-zinc-500">Jan 2026 - Present</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">CV Omah IOT</p>

            <h2 className="text-[11px] sm:text-sm font-bold leading-tight mt-2">UI/UX DESIGNER</h2>
            <p className="text-[9px] sm:text-[11px] text-zinc-500">Aug 2025 - Present</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">Manifestasi</p>
          </div>
        </div>

        {/* Grid Bawah: Achievement & My Stacks */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div 
            className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[600ms] lg:delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center gap-1.5 text-fuchsia-500 font-semibold mb-1.5 text-[11px] sm:text-sm">
              <span>🏆 Achievement</span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold leading-tight">2nd place in INOVATION 2022</p>
            <p className="text-[9px] sm:text-[11px] text-zinc-500 mt-0.5">Video Competition</p>
          </div>

          <div 
            className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center relative backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[750ms] lg:delay-[600ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center gap-1.5 text-fuchsia-500 font-semibold mb-1 text-[11px] sm:text-sm">
              <span>🛠 My Stacks</span>
            </div>

            <div className="relative w-full overflow-hidden pt-5 pb-0.5">
              <div className="flex gap-2 sm:gap-3 animate-marquee w-max hover:[animation-play-state:paused]">
                {stacks.map((item, index) => (
                  <div key={`stack-1-${index}`} className="relative group/stack flex flex-col items-center">
                    <span className="absolute -top-6 opacity-0 group-hover/stack:opacity-100 transition-all duration-200 bg-fuchsia-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-30">
                      {item.name}
                    </span>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-1.5 bg-zinc-800 rounded-lg border border-zinc-700 object-contain transition-transform group-hover/stack:scale-110"
                    />
                  </div>
                ))}

                {stacks.map((item, index) => (
                  <div key={`stack-2-${index}`} className="relative group/stack flex flex-col items-center">
                    <span className="absolute -top-6 opacity-0 group-hover/stack:opacity-100 transition-all duration-200 bg-fuchsia-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-30">
                      {item.name}
                    </span>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-1.5 bg-zinc-800 rounded-lg border border-zinc-700 object-contain transition-transform group-hover/stack:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KOLOM FOTO PROFIL */}
      <div 
        className={`w-full lg:w-1/2 flex justify-center relative z-10 mb-2 sm:mb-4 lg:mb-0 transition-all duration-700 ease-out transform delay-[0ms] lg:delay-[750ms] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* ========================================================
            PANAH MELENGKUNG & TEKS PANDUAN (DESKTOP & MOBILE)
           ======================================================== */}
        
        {/* 1. Panduan Khusus MOBILE (Pojok Kanan Foto) */}
        <div className="flex lg:hidden absolute -bottom-9 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none z-20 animate-bounce-slow">
            {/* Panah Menunjuk ke Atas */}
            <svg className="w-4 h-4 text-fuchsia-400 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" strokeDasharray="3 3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            
            {/* Teks Panduan */}
            <span className="text-[10px] font-mono tracking-wide text-fuchsia-300 bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-fuchsia-500/30 shadow-md whitespace-nowrap">
                Tap to illuminate ✨
            </span>
            </div>

        {/* 2. Panduan Khusus DESKTOP (Samping Kiri Foto dengan Panah Melengkung Dash) */}
        <div className="hidden lg:flex absolute top-12 -right-16 flex-col items-start pointer-events-none z-20 animate-pulse">
            <span className="text-xs font-mono text-fuchsia-300 bg-zinc-900/90 px-2.5 py-1 rounded-full border border-fuchsia-500/30 shadow-lg whitespace-nowrap">
                Hover to illuminate 💡
            </span>
            
            {/* Panah Melengkung Dash ke arah kiri foto */}
            <svg className="w-12 h-12 text-fuchsia-400 -mt-1 ml-2 transform -scale-x-100" viewBox="0 0 50 50" fill="none">
                <path
                d="M 10 10 Q 35 15 35 35"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 3"
                strokeLinecap="round"
                />
                <polygon points="30,30 38,38 38,28" fill="currentColor" />
            </svg>
            </div>


        {/* TAMPILAN MOBILE: Efek Sentuh */}
        <div 
          onTouchStart={handleMobileTouch}
          onClick={handleMobileTouch}
          className="block lg:hidden relative w-full max-w-[200px] xs:max-w-[220px] h-[240px] xs:h-[260px] cursor-pointer select-none rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="/images/mobile.png"
            alt="Sufyan - Mobile Version"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div
            ref={mobileMaskRef}
            className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
            style={{
              backgroundImage: "url('/images/mobileOn.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: 'circle(0px at 0px 0px)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none rounded-b-2xl" />
        </div>

        {/* TAMPILAN DESKTOP: Efek Hover Senter */}
        <div
          ref={cardRef}
          className="hidden lg:block relative w-full max-w-[400px] h-[480px] cursor-pointer select-none group"
        >
          <img
            src="/images/abu.png"
            alt="Sufyan - Grayscale"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          <div
            ref={maskRef}
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              backgroundImage: "url('/images/on.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: 'circle(0px at 0px 0px)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}