import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const navItems = ['Home', 'About Me', 'My Project', 'Certificate', 'Contact'];

  useEffect(() => {
    const handleLoaded = () => {
      setIsLoaded(true);
    };

    window.addEventListener('portfolioLoaded', handleLoaded);
    const timer = setTimeout(() => setIsLoaded(true), 2000);

    return () => {
      window.removeEventListener('portfolioLoaded', handleLoaded);
      clearTimeout(timer);
    };
  }, []);

  // 1. Deteksi Scroll (Show/Hide Navbar & Background Change)
  useEffect(() => {
    let lastScrollY = 0;
    const mainEl = document.querySelector('main');

    const handleScroll = () => {
      const currentScrollY = mainEl ? mainEl.scrollTop : window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Sembunyikan navbar saat scroll ke bawah (hanya jika menu mobile tertutup)
      if (currentScrollY > lastScrollY && currentScrollY > 80 && !isOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    const target = mainEl || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Lock Scroll saat Mobile Drawer Terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // 2. IntersectionObserver untuk Active Tab
  useEffect(() => {
    const sectionMap = [
      { id: 'home', name: 'Home' },
      { id: 'about-me', name: 'About Me' },
      { id: 'my-project', name: 'My Project' },
      { id: 'certificate', name: 'Certificate' },
      { id: 'contact', name: 'Contact' },
    ];

    const mainEl = document.querySelector('main');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sectionMap.find((s) => s.id === entry.target.id);
            if (matched) {
              setActiveTab(matched.name);
            }
          }
        });
      },
      {
        root: mainEl || null,
        threshold: 0.3,
      }
    );

    sectionMap.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Handler Klik dengan Smooth Scroll
  const handleNavClick = (e, item) => {
    e.preventDefault();
    setActiveTab(item);
    setIsOpen(false);

    const targetId = item.toLowerCase().replace(/\s+/g, '-');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* NAVBAR HEADER */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
          isLoaded && isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrolled || isOpen
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/40'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between md:justify-center items-center px-6 md:px-0">
          
          {/* Brand Logo / Title (Hanya tampil di Mobile: md:hidden) */}
          <span className="text-sm font-semibold tracking-widest text-neutral-300 md:hidden">
            PORTFOLIO
          </span>

          {/* Tombol Hamburger Mobile (Hanya tampil di Mobile: md:hidden) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="relative w-6 h-5 flex flex-col justify-between items-center md:hidden focus:outline-none z-50 cursor-pointer"
          >
            <span
              className={`w-full h-[2px] bg-neutral-200 rounded-full transition-all duration-300 ease-in-out transform ${
                isOpen ? 'rotate-45 translate-y-[9px]' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-neutral-200 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`w-full h-[2px] bg-neutral-200 rounded-full transition-all duration-300 ease-in-out transform ${
                isOpen ? '-rotate-45 -translate-y-[9px]' : ''
              }`}
            />
          </button>

          {/* Navigasi Desktop (Otomatis Ditengah karena container md:justify-center) */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => {
              const isActive = activeTab === item;
              return (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative text-sm lg:text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-fuchsia-500 rounded-full transition-all duration-300" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Dark Backdrop Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[75%] max-w-[280px] bg-zinc-950/95 backdrop-blur-2xl border-l border-white/10 pt-24 px-6 pb-8 flex flex-col justify-start shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-5">
            {navItems.map((item, idx) => {
              const isActive = activeTab === item;
              return (
                <li
                  key={item}
                  style={{
                    transitionDelay: isOpen ? `${idx * 60}ms` : '0ms',
                  }}
                  className={`transition-all duration-300 transform ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                  }`}
                >
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`text-base font-medium tracking-wide transition-colors duration-300 block py-2 rounded-lg ${
                      isActive
                        ? 'text-fuchsia-400 font-semibold bg-fuchsia-500/10 border-l-4 border-fuchsia-500 pl-3'
                        : 'text-neutral-400 hover:text-white border-l-4 border-transparent pl-3'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}