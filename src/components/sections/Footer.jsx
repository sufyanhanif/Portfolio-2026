import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Tahun dinamis (otomatis berubah sesuai tahun berjalan)
  const currentYear = new Date().getFullYear();
  const emailAddress = "hanifsufyan48@gmail.com";

  // Data Media Sosial yang sama dengan HeroSection (Home)
  const socialLinks = [
    { name: 'GitHub', icon: '/icons/github.svg', url: 'https://github.com/sufyanhanif/' },
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', url: 'https://www.linkedin.com/in/sufyan48/' },
    { name: 'Behance', icon: '/icons/behance.svg', url: 'https://www.behance.net/sufyanhanif1' },
    { name: 'Instagram', icon: '/icons/instagram.svg', url: 'https://www.instagram.com/sufyan_ha/' },
  ];

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

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-black text-white px-4 sm:px-8 md:px-12 pt-16 sm:pt-24 pb-12 overflow-hidden"
    >
      {/* Ambient Glow Ungu Bergerak Atas-Bawah (Animated Floating Background Glow) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-t from-[#8b0099]/35 via-[#6b0870]/25 to-transparent blur-[130px] rounded-full pointer-events-none z-0 animate-glow-up-down" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-[#ab00c4]/15 blur-[150px] rounded-full pointer-events-none z-0 animate-glow-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CARD CONTACT CTA (Tengah pada Mobile, Space-between pada Desktop) */}
        <div
          className={`relative w-full bg-gradient-to-r from-[#5c0067] via-[#3a0047] to-[#0c0012] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-6 sm:gap-8 transition-all duration-700 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Sisi Kiri: Teks Judul Besar */}
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
              Let’s Build Something <br className="hidden sm:inline" />
              Great Together
            </h2>
          </div>

          {/* Sisi Kanan: Tombol Contact Me */}
          <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${emailAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-900/40 border border-fuchsia-400/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer text-sm sm:text-base group whitespace-nowrap"
            >
              <Mail className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>

        {/* GARIS PUTIH / DIVIDER */}
        <div className={`w-full border-t border-zinc-800/90 my-8 sm:my-12 transition-all duration-700 delay-200 ease-out transform ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-95'
        }`} />

        {/* FOOTER BOTTOM: Copyright Dynamic Year (Kiri) & Sosmed Icons (Kanan) */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 transition-all duration-700 delay-300 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          
          {/* Kiri: Copyright Tahun Dinamis */}
          <p className="text-center sm:text-left text-zinc-400 text-xs sm:text-sm font-medium">
            © {currentYear} Sufyan Hanif Ariyana. All rights reserved.
          </p>

          {/* Kanan: Icon Sosmed Berjajar (Sama persis dengan Home / HeroSection) */}
          <div className="flex items-center gap-3 sm:gap-4 bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800/90 shadow-xl hover:border-fuchsia-500/40 hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] transition-all duration-500">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group/icon relative flex items-center justify-center p-1.5 rounded-full transition-all duration-300 hover:scale-110"
              >
                {/* Tooltip Nama Sosmed saat Hover */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-all duration-200 bg-fuchsia-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-20">
                  {social.name}
                </span>

                {/* Ikon SVG (Awalnya Putih, Hover-nya Ungu) */}
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert transition-all duration-300 group-hover/icon:[filter:invert(38%)_sepia(90%)_saturate(3000%)_hue-rotate(275deg)_brightness(100%)_contrast(105%)] group-hover/icon:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                />
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
