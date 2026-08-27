import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = ['Home', 'About Me', 'My Project', 'Certificate', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setActiveTab(item);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-500 ease-in-out ${
        isScrolled
          ? 'bg-black/60 backdrop-blur-md border-white/10 py-4 shadow-lg shadow-black/20'
          : 'bg-black/0 backdrop-blur-none border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between md:justify-center items-center px-6 md:px-0">
        {/* Brand Title Kecil Khusus Mobile */}
        <span className="text-sm font-semibold tracking-widest text-neutral-400 md:hidden">
          PORTFOLIO
        </span>

        {/* Tombol Hamburger Mobile */}
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
                  onClick={() => setActiveTab(item)}
                  className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item}
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
                  onClick={() => handleNavClick(item)}
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}