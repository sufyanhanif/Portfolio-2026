import React, { useRef, useEffect } from 'react';

export default function About() {
  const cardRef = useRef(null);
  const maskRef = useRef(null);

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

  // Logika efek senter
  useEffect(() => {
    const card = cardRef.current;
    const mask = maskRef.current;

    if (!card || !mask) return;

    const radius = 130; // Ukuran lingkar senter (Pixel)

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

  return (
   <section id="about-me" className="relative w-full min-h-screen bg-black text-white p-6 md:p-12 flex flex-col lg:flex-row gap-8 items-center justify-center overflow-hidden">
      {/* EFEK GLOW UNGU DI POJOK KANAN ATAS (SEAMLESS SAMBUNGAN BARU) */}
      <div 
        className="absolute -top-16 -right-16 sm:-top-40 sm:-right-36 w-64 sm:w-[500px] md:w-[650px] h-64 sm:h-[500px] md:h-[650px] bg-[#6b0870]/40 sm:bg-[#7b008b]/35 blur-[80px] sm:blur-[150px] rounded-full pointer-events-none z-0" 
      />

      {/* Keyframes Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>

      {/* KOLOM KIRI (INFORMASI DIRI & BENTO GRID) */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 max-w-xl z-10">
        {/* Profil Brief */}
        <div className="bg-zinc-900/80 p-6 rounded-2xl border border-zinc-800 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-fuchsia-500 mb-1">Sufyan Hanif Ariyana</h1>
          <p className="text-sm text-zinc-400 mb-3">Web Developer & UI/UX Designer</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            As a fresh graduate from Politeknik Negeri Semarang, I am proficient in building websites using Laravel and Astro. I am also skilled in UI/UX design and various design tools, supported by internal organizational experience in the capital market.
          </p>
        </div>

        {/* Grid Tengah: Education & Career */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-fuchsia-500 font-semibold mb-2">
              <span>🎓 Education</span>
            </div>
            <h2 className="text-sm font-bold">Politeknik Negeri Semarang</h2>
            <p className="text-xs text-zinc-500">2021 - 2025</p>
            <p className="text-xs text-zinc-400 mt-2">Bachelor of Computer Engineering Technology</p>
            <p className="text-xs text-zinc-400">Grade: 3.87/4.00 (Cumlaude)</p>
          </div>

          {/* Career */}
          <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-fuchsia-500 font-semibold mb-2">
              <span>💼 Career</span>
            </div>
            <h2 className="text-sm font-bold">Web Developer</h2>
            <p className="text-xs text-zinc-500">Jan 2026 - Present</p>
            <p className="text-xs text-zinc-400">CV Omah IOT</p>

            <h2 className="text-sm font-bold mt-3">UI/UX DESIGNER</h2>
            <p className="text-xs text-zinc-500">Aug 2025 - Present</p>
            <p className="text-xs text-zinc-400">Manifestasi</p>
          </div>
        </div>

        {/* Grid Bawah: Achievement & My Stacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Achievement */}
          <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center backdrop-blur-sm">
            <div className="flex items-center gap-2 text-fuchsia-500 font-semibold mb-2">
              <span>🏆 Achievement</span>
            </div>
            <p className="text-xs font-bold">2nd place in INOVATION 2022</p>
            <p className="text-xs text-zinc-500">Video Competition</p>
          </div>

          {/* My Stacks */}
          <div className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-center relative backdrop-blur-sm">
            <div className="flex items-center gap-2 text-fuchsia-500 font-semibold mb-3">
              <span>🛠 My Stacks</span>
            </div>

            {/* Container Marquee */}
            <div className="relative w-full overflow-hidden pt-7 pb-2">
              <div className="flex gap-3 animate-marquee w-max hover:[animation-play-state:paused]">
                {/* Loop 1 */}
                {stacks.map((item, index) => (
                  <div key={`stack-1-${index}`} className="relative group/stack flex flex-col items-center">
                    <span className="absolute -top-7 opacity-0 group-hover/stack:opacity-100 transition-all duration-200 bg-fuchsia-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-30">
                      {item.name}
                    </span>

                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-8 h-8 p-1.5 bg-zinc-800 rounded-lg border border-zinc-700 object-contain transition-transform group-hover/stack:scale-110"
                    />
                  </div>
                ))}

                {/* Loop 2 */}
                {stacks.map((item, index) => (
                  <div key={`stack-2-${index}`} className="relative group/stack flex flex-col items-center">
                    <span className="absolute -top-7 opacity-0 group-hover/stack:opacity-100 transition-all duration-200 bg-fuchsia-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none z-30">
                      {item.name}
                    </span>

                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-8 h-8 p-1.5 bg-zinc-800 rounded-lg border border-zinc-700 object-contain transition-transform group-hover/stack:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KOLOM KANAN (FOTO PROFIL SENTER + GRADIENT SHADOW) */}
      <div className="w-full lg:w-1/2 flex justify-center z-10">
        <div
          ref={cardRef}
          className="relative w-full max-w-[420px] h-[520px] cursor-pointer select-none group"
        >
          {/* Layer 1: Gambar Hitam Putih (abu.png) */}
          <img
            src="/images/abu.png"
            alt="Sufyan - Grayscale"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Layer 2: Gambar Berwarna (on.png) */}
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

          {/* Layer 3: Gradient Fade-to-Black di Bawah Foto */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}