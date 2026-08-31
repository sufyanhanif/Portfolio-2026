import React, { useState, useEffect, useRef } from 'react';

export default function Project() {
  const [activeCategory, setActiveCategory] = useState('Website');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const categories = ['Website', 'UI/UX Designer', 'Other'];

  const projects = [
    {
      id: 'sso-polines',
      tabTitle: 'SSO POLINES',
      date: 'MARCH 2026',
      title: 'SSO POLINES',
      description:
        'Single Sign-On system designed to streamline authentication for students and staff across multiple academic platforms efficiently and securely.',
      stacks: ['/stacks/laravel.svg', '/stacks/react.svg', '/stacks/mysql.svg'],
      image:
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'mosiban',
      tabTitle: 'Mosiban',
      date: 'JULY 2026',
      title: 'MOSIBAN',
      description:
        'Mosiban is an IoT-based platform designed to monitor water levels in real time, centrally configure sensor devices, and automatically send early warning signals when flood risks are detected.',
      stacks: ['/stacks/laravel.svg', '/stacks/css.svg', '/stacks/mysql.svg'],
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'landing-page',
      tabTitle: 'Landing Page',
      date: 'AUGUST 2026',
      title: 'OMAH IOT',
      description:
        'An interactive company profile and product showcase landing page built with modern micro-animations and smooth performance for IoT solution services.',
      stacks: ['/stacks/astro.svg', '/stacks/css.svg', '/stacks/framer.svg'],
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    },
  ];

  // Intersection Observer
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
        threshold: 0.05,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll Progress Event Listener
  useEffect(() => {
    const mainEl = document.querySelector('main');
    const target = mainEl || window;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height - window.innerHeight;

      if (sectionHeight > 0) {
        const rawProgress = -rect.top / sectionHeight;
        const clampedProgress = Math.max(0, Math.min(rawProgress, 1));
        setScrollProgress(clampedProgress);
      }
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  const getSteppedProgress = (progress) => {
    const totalSteps = projects.length - 1;
    const x = progress * totalSteps;
    const floorX = Math.floor(x);
    const fracX = x - floorX;

    const transitionStart = 0.25;
    const transitionEnd = 0.75;

    let mappedFrac = 0;
    if (fracX < transitionStart) {
      mappedFrac = 0;
    } else if (fracX > transitionEnd) {
      mappedFrac = 1;
    } else {
      const t = (fracX - transitionStart) / (transitionEnd - transitionStart);
      mappedFrac = t * t * (3 - 2 * t);
    }

    if (floorX >= totalSteps) return totalSteps;
    return floorX + mappedFrac;
  };

  const steppedIndex = getSteppedProgress(scrollProgress);
  const activeIndex = Math.round(steppedIndex);

  const handleTabClick = (index) => {
    if (!sectionRef.current) return;
    const mainEl = document.querySelector('main');
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.clientHeight - window.innerHeight;
    const targetScroll = sectionTop + (index / (projects.length - 1)) * sectionHeight;

    if (mainEl) {
      mainEl.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="my-project"
      className="relative w-full h-[350vh] bg-black text-white"
    >
      {/* Sticky Screen Box */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-start lg:justify-between px-3 sm:px-8 md:px-12 pt-16 sm:pt-20 pb-3 md:pb-6 overflow-hidden">

        {/* Ambient Purple Glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-fuchsia-900/20 blur-[140px] rounded-full pointer-events-none z-0" />

        {/* --- HEADER & CATEGORY FILTER --- */}
        <div className="max-w-7xl mx-auto w-full z-10 relative">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Featured <span className="text-fuchsia-500">Project</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-xs md:text-right leading-relaxed">
              Synergizing Product Design and Web Development
            </p>
          </div>

          <div className={`relative w-full border-t border-dashed border-zinc-700 flex justify-between items-center my-4 sm:my-6 transition-all duration-700 ease-out transform delay-[150ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
            <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
          </div>

          <div className={`flex justify-center my-6 sm:my-8 transition-all duration-700 ease-out transform delay-[300ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-md shadow-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- CARDS & FOLDER TABS CONTAINER --- */}
        <div className={`max-w-7xl mx-auto w-full z-20 mt-6 sm:mt-8 lg:my-auto transition-all duration-700 ease-out transform delay-[450ms] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>

          {/* TRAPEZOID TAB FOLDER */}
          <div className="flex items-end gap-1 px-1 sm:px-6 z-30 relative">
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleTabClick(idx)}
                  className={`relative px-2.5 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-fuchsia-600 text-white z-30 shadow-lg shadow-fuchsia-600/20'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white border-t border-x border-zinc-800'
                  }`}
                  style={{
                    clipPath: 'polygon(0% 0%, 82% 0%, 100% 100%, 0% 100%)',
                    paddingRight: '1.2rem',
                  }}
                >
                  {proj.tabTitle}
                </button>
              );
            })}
          </div>

          {/* CARDS STACK CONTAINER */}
          <div className="grid grid-cols-1 w-full relative">
            {projects.map((project, index) => {
              const diff = index - steppedIndex;

              let translateY = 0;
              let scale = 1;
              let opacity = 1;

              if (diff < 0) {
                const clampedDiff = Math.max(-1, diff);
                translateY = clampedDiff * 180;
                scale = 1 + clampedDiff * 0.05;
                opacity = Math.max(0, 1 + clampedDiff);
              } else {
                const clampedDiff = Math.min(2, diff);
                translateY = clampedDiff * 16;
                scale = 1 - clampedDiff * 0.04;
                opacity = 1 - clampedDiff * 0.15;
              }

              const isCurrentActive = index === activeIndex;

              return (
                <div
                  key={project.id}
                  className="col-start-1 row-start-1 w-full h-auto bg-zinc-900/95 border border-zinc-800 rounded-2xl rounded-tl-none p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl origin-top"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: projects.length - index,
                    pointerEvents: isCurrentActive ? 'auto' : 'none',
                    transition:
                      'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), scale 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 items-start lg:items-center justify-between">

                    {/* GAMBAR */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center shrink-0">
                      <div className="relative w-full max-w-full sm:max-w-[360px] lg:max-w-[380px] h-40 xs:h-44 sm:h-48 lg:h-auto lg:aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 shadow-xl group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* TEKS */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-widest text-zinc-500 uppercase">
                          {project.date}
                        </span>

                        <h3 className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-extrabold text-white mt-0.5 mb-1.5 sm:mb-2 tracking-tight">
                          {project.title}
                        </h3>

                        {/* STACK ICONS */}
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          {project.stacks.map((iconPath, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-1.5 bg-zinc-950 rounded-lg sm:rounded-xl border border-zinc-800 flex items-center justify-center shadow-inner"
                            >
                              <img
                                src={iconPath}
                                alt="stack"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ))}
                        </div>

                        <p className="text-[11px] sm:text-xs lg:text-sm text-zinc-400 leading-relaxed font-normal">
                          {project.description}
                        </p>
                      </div>

                      {/* MORE DETAIL LINK */}
                      <div className="pt-2 sm:pt-3">
                        <a
                          href={`#project-${project.id}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-fuchsia-400 transition-colors group cursor-pointer"
                        >
                          <span>More Detail</span>
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* SCROLL INDICATOR FOOTER (Ditambah mt-8 di Mobile agar berjarak longgar) */}
          <div className="text-center z-10 text-[9px] sm:text-[10px] font-mono text-zinc-500 mt-8 sm:mt-4 py-0.5">
            Scroll down/up to navigate projects ({activeIndex + 1}/{projects.length})
          </div>

        </div>

      </div>
    </section>
  );
}