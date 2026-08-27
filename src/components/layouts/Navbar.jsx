import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const navItems = ['Home', 'About Me', 'My Project', 'Certificate', 'Contact'];

  // 1. Deteksi Scroll (Show/Hide Navbar)
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

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
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
  }, []);

  // 2. IntersectionObserver untuk Aktif Tab Otomatis
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
        threshold: 0.4,
      }
    );

    sectionMap.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Handler Klik dengan Smooth Scroll kustom
  const handleNavClick = (e, item) => {
    e.preventDefault(); // Mencegah lompatan URL Hash instan
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between md:justify-center items-center px-6 md:px-0">
        <span className="text-sm font-semibold tracking-widest text-neutral-400 md:hidden">
          PORTFOLIO
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="p-2 text-neutral-400 hover:text-white focus:outline-none md:hidden ml-auto"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigasi Desktop */}
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

      {/* Dropdown Menu Mobile */}
      <div
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-neutral-800 transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative text-base font-medium transition-colors duration-300 ${
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
  );
}