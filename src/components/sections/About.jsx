import React, { useRef, useEffect, useState } from 'react';
import { GraduationCap, Wrench, Briefcase, Sparkles, Lightbulb, ChevronUp } from 'lucide-react';

export default function About() {
  const cardRef = useRef(null);
  const maskRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Ref khusus untuk elemen gambar Mobile
  const mobileMaskRef = useRef(null);
  const mobileTimerRef = useRef(null);
  const mobileAnimRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  // Array ikon My Stacks (Dibagi menjadi 2 Baris: Atas & Bawah)
  const stacksRow1 = [
    { name: 'Astro', icon: '/stacks/astro.svg' },
    { name: 'Laravel', icon: '/stacks/laravel.svg' },
    { name: 'React', icon: '/stacks/react.svg' },
    { name: 'HTML', icon: '/stacks/html.svg' },
  ];

  const stacksRow2 = [
    { name: 'PHP', icon: '/stacks/php.svg' },
    { name: 'MySQL', icon: '/stacks/mysql.svg' },
    { name: 'CSS', icon: '/stacks/css.svg' },
    { name: 'Figma', icon: '/stacks/figma.svg' },
  ];

  // Data Career Timeline (Selang-seling Kiri/Kanan)
  const careers = [
    {
      title: 'Web Developer',
      company: 'CV Omah IOT',
      date: 'Jan 2026 – Present',
      type: 'Contract',
      side: 'left',
    },
    {
      title: 'UI/UX Designer',
      company: 'PT Tiga Serangkai',
      date: 'Des 2024 – Jan 2025',
      type: 'Internship',
      side: 'right',
    },
    {
      title: 'UI/UX Designer',
      company: 'Manifestasi',
      date: 'Aug 2025 – Present',
      type: 'Freelance',
      side: 'left',
    },
    {
      title: 'UI/UX Designer',
      company: 'PT Campus Digital',
      date: 'Sep 2024 – Des 2024',
      type: 'Internship',
      side: 'right',
    },
  ];

  const cardHoverStyle = "hover:scale-[1.02] hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] cursor-default";

  // 1. Intersection Observer
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
      className="relative w-full min-h-screen bg-black text-white px-4 sm:px-8 md:px-12 flex items-center justify-center overflow-hidden pt-24 lg:pt-16 pb-12"
    >
      {/* GLOW UNGU */}
      <div 
        className="absolute -top-16 -right-16 sm:-top-40 sm:-right-36 w-64 sm:w-[500px] md:w-[650px] h-64 sm:h-[500px] md:h-[650px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none z-0" 
      />

      {/* CONTAINER PRESISI MAX-W-7XL */}
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center justify-center z-10">
        
        {/* BENTO GRID */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 z-10">
        
        {/* Profil Brief */}
        <div 
          className={`bg-zinc-900/80 p-4 sm:p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[150ms] lg:delay-[0ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h1 className="text-lg sm:text-2xl font-bold text-fuchsia-500 mb-0.5 sm:mb-1 hover:scale-105 transition-transform duration-200 block origin-left cursor-default">
            Sufyan Hanif Ariyana
          </h1>
          <p className="text-[11px] sm:text-sm text-zinc-400 mb-2 sm:mb-3 hover:text-zinc-200 hover:scale-[1.03] transition-all duration-200 block origin-left cursor-default">
            Web Developer & UI/UX Designer
          </p>
          <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed hover:text-zinc-200 transition-colors duration-200 cursor-default">
            As a fresh graduate from Politeknik Negeri Semarang, I am proficient in building websites using Laravel and Astro. I am also skilled in UI/UX design and various design tools, supported by internal organizational experience in the capital market.
          </p>
        </div>

        {/* Grid Tengah & Bawah: Left Column (Education + My Stacks) vs Right Column (Career Vertical Timeline) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* KOLOM KIRI: Education & My Stacks */}
          <div className="flex flex-col gap-4 justify-between h-full">
            {/* Education */}
            <div 
              className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[300ms] lg:delay-[150ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-fuchsia-500 font-semibold mb-2.5 text-[11px] sm:text-sm hover:scale-105 transition-transform origin-left">
                <GraduationCap className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>Education</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* 1. Politeknik Negeri Semarang */}
                <div className="group/edu flex flex-col items-start cursor-default">
                  <h2 className="text-[11px] sm:text-sm font-bold leading-tight transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-fuchsia-400 origin-left">
                    Politeknik Negeri Semarang
                  </h2>
                  <p className="text-[9px] sm:text-[11px] text-zinc-500 mt-0.5 transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-zinc-400 origin-left">
                    2021 – 2025
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 leading-snug transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-zinc-200 origin-left">
                    Bachelor of Computer Eng.
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-fuchsia-400 origin-left">
                    Grade: 3.87/4.00 (Cumlaude)
                  </p>
                </div>

                {/* Separator */}
                <div className="border-t border-zinc-800/80" />

                {/* 2. SMA Negeri 9 Semarang */}
                <div className="group/edu flex flex-col items-start cursor-default">
                  <h2 className="text-[11px] sm:text-sm font-bold leading-tight transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-fuchsia-400 origin-left">
                    SMA Negeri 9 Semarang
                  </h2>
                  <p className="text-[9px] sm:text-[11px] text-zinc-500 mt-0.5 transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-zinc-400 origin-left">
                    2018 – 2021
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 leading-snug transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-zinc-200 origin-left">
                    Mathematics and Natural Sciences
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 transition-all duration-200 group-hover/edu:scale-105 group-hover/edu:text-fuchsia-400 origin-left">
                    Grade: 90/100
                  </p>
                </div>
              </div>
            </div>

            {/* My Stacks (dengan Ikon & Tulisan Nama Stack + Hover Scale & Glow) */}
            <div 
              className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between relative backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[450ms] lg:delay-[300ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="inline-flex items-center gap-2 text-fuchsia-500 font-semibold mb-2.5 text-[11px] sm:text-sm hover:scale-105 transition-transform origin-left">
                <Wrench className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>My Stacks</span>
              </div>

              <div className="flex flex-col gap-3 pt-1 pb-0.5">
                {/* Baris 1: 4 Ikon & Text */}
                <div className="grid grid-cols-4 gap-2">
                  {stacksRow1.map((item, index) => (
                    <div 
                      key={`row1-${index}`} 
                      className="group/stack flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                    >
                      <div className="p-1.5 sm:p-2 bg-zinc-800/90 rounded-lg border border-zinc-700/80 group-hover/stack:border-fuchsia-500/70 group-hover/stack:bg-zinc-800 group-hover/stack:shadow-[0_0_12px_rgba(217,70,239,0.35)] transition-all duration-300">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-5 h-5 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover/stack:rotate-3"
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium mt-1.5 transition-all duration-300 group-hover/stack:text-fuchsia-400 group-hover/stack:scale-105 group-hover/stack:font-semibold text-center truncate max-w-full">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Baris 2: 4 Ikon & Text */}
                <div className="grid grid-cols-4 gap-2">
                  {stacksRow2.map((item, index) => (
                    <div 
                      key={`row2-${index}`} 
                      className="group/stack flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                    >
                      <div className="p-1.5 sm:p-2 bg-zinc-800/90 rounded-lg border border-zinc-700/80 group-hover/stack:border-fuchsia-500/70 group-hover/stack:bg-zinc-800 group-hover/stack:shadow-[0_0_12px_rgba(217,70,239,0.35)] transition-all duration-300">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-5 h-5 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover/stack:rotate-3"
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium mt-1.5 transition-all duration-300 group-hover/stack:text-fuchsia-400 group-hover/stack:scale-105 group-hover/stack:font-semibold text-center truncate max-w-full">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: CAREER TIMELINE VERTIKAL DASH */}
          <div 
            className={`bg-zinc-900/80 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm transition-all duration-700 ease-out transform ${cardHoverStyle} delay-[600ms] lg:delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 text-fuchsia-500 font-semibold mb-3.5 text-[11px] sm:text-sm hover:scale-105 transition-transform origin-left">
              <Briefcase className="w-4 h-4 text-fuchsia-500 shrink-0" />
              <span>Career</span>
            </div>

            {/* Container TIMELINE VERTIKAL */}
            <div className="relative py-2">
              {/* Garis Putus-putus Vertikal di Tengah (Dash Line) */}
              <div className="absolute left-1/2 top-1 bottom-1 -translate-x-1/2 w-[1px] border-r border-dashed border-zinc-700" />

              <div className="flex flex-col gap-5 sm:gap-6">
                {careers.map((item, idx) => (
                  <div key={idx} className="relative flex items-center w-full min-h-[52px]">
                    
                    {/* Kotak Magenta di Garis Tengah */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-fuchsia-500 z-10 rounded-[1px] shadow-[0_0_8px_rgba(217,70,239,0.8)]" />

                    {/* SISI KIRI (Jika item.side === 'left') */}
                    {item.side === 'left' ? (
                      <div className="w-[45%] pr-2.5 text-right group/career cursor-default flex flex-col items-end">
                        <h2 className="text-[10px] sm:text-[11px] font-bold text-white leading-tight transition-all duration-200 group-hover/career:scale-105 group-hover/career:text-fuchsia-400 origin-right">
                          {item.title}
                        </h2>
                        <p className="text-[8px] sm:text-[9px] text-fuchsia-400 font-medium mt-0.5 transition-all duration-200 group-hover/career:text-fuchsia-300 group-hover/career:scale-105 origin-right">
                          {item.company}
                        </p>
                        <p className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 transition-all duration-200 group-hover/career:scale-105 group-hover/career:text-zinc-200 origin-right">
                          {item.date}
                        </p>
                        <p className="text-[8px] sm:text-[9px] text-zinc-500 mt-0.5 transition-all duration-200 group-hover/career:scale-105 group-hover/career:text-zinc-400 origin-right">
                          {item.type}
                        </p>
                      </div>
                    ) : (
                      <div className="w-[45%]" /> // Spacer Kosong
                    )}

                    {/* SISI KANAN (Jika item.side === 'right') */}
                    {item.side === 'right' ? (
                      <div className="w-[45%] pl-2.5 text-left ml-auto group/career cursor-default flex flex-col items-start">
                        <h2 className="text-[10px] sm:text-[11px] font-bold text-white leading-tight transition-all duration-200 group-hover/career:scale-105 group-hover/career:text-fuchsia-400 origin-left">
                          {item.title}
                        </h2>
                        <p className="text-[8px] sm:text-[9px] text-fuchsia-400 font-medium mt-0.5 transition-all duration-200 group-hover/career:text-fuchsia-300 group-hover/career:scale-105 origin-left">
                          {item.company}
                        </p>
                        <p className="text-[8px] sm:text-[9px] text-zinc-400 mt-0.5 transition-all duration-200 group-hover/career:scale-105 group-hover/career:text-zinc-200 origin-left">
                          {item.date}
                        </p>
                        <p className="text-[8px] sm:text-[9px] text-zinc-500 mt-0.5 transition-all duration-200 group-hover/career:scale-105 group-hover/career:text-zinc-400 origin-left">
                          {item.type}
                        </p>
                      </div>
                    ) : (
                      <div className="w-[45%]" /> // Spacer Kosong
                    )}

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
        {/* Panduan Khusus MOBILE */}
        <div className="flex lg:hidden absolute -bottom-9 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none z-20 animate-bounce-slow">
          <ChevronUp className="w-4 h-4 text-fuchsia-400 mb-0.5" />
          <span className="text-[10px] font-mono tracking-wide text-fuchsia-300 bg-zinc-900/90 px-2.5 py-0.5 rounded-full border border-fuchsia-500/30 shadow-md whitespace-nowrap flex items-center gap-1.5">
            <span>Tap to illuminate</span>
            <Sparkles className="w-3 h-3 text-fuchsia-400" />
          </span>
        </div>

        {/* Panduan Khusus DESKTOP */}
        <div className="hidden lg:flex absolute top-12 -right-16 flex-col items-start pointer-events-none z-20 animate-pulse">
          <span className="text-xs font-mono text-fuchsia-300 bg-zinc-900/90 px-2.5 py-1 rounded-full border border-fuchsia-500/30 shadow-lg whitespace-nowrap flex items-center gap-1.5">
            <span>Hover to illuminate</span>
            <Lightbulb className="w-3.5 h-3.5 text-fuchsia-400" />
          </span>
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
    </div>
  </section>
);
}