import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Jumlah kolom dan baris untuk animasi transisi kotak-kotak hitam
  const COLS = 6;
  const ROWS = 4;
  const totalTiles = COLS * ROWS;

  useEffect(() => {
    // Kunci scroll halaman saat loading berjalan
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            // Trigger event agar HeroSection & Navbar mulai beranimasi saat loading keluar
            window.dispatchEvent(new CustomEvent('portfolioLoaded'));

            setTimeout(() => {
              setIsComplete(true);
              document.body.style.overflow = '';
            }, 1200);
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 35);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none flex items-center justify-center overflow-hidden">
      {/* GRID TILES TRANSISI HITAM KOTAK-KOTAK */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 w-full h-full pointer-events-auto">
        {Array.from({ length: totalTiles }).map((_, index) => {
          const col = index % COLS;
          const row = Math.floor(index / COLS);
          // Delay gelombang berdasarkan posisi diagonal kolom + baris
          const delay = (col + row) * 60;

          return (
            <div
              key={index}
              className={`bg-black transition-all duration-700 cubic-bezier(0.77, 0, 0.175, 1) ${
                isExiting
                  ? 'scale-0 opacity-0 rotate-12 rounded-xl'
                  : 'scale-100 opacity-100 rotate-0 rounded-none'
              }`}
              style={{
                transitionDelay: isExiting ? `${delay}ms` : '0ms',
              }}
            />
          );
        })}
      </div>

      {/* KONTEN UTAMA LOADING (TEXT & PROGRESS BAR UNGU) */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-md w-full transition-all duration-500 ease-out ${
          isExiting ? 'opacity-0 scale-90 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Ambient Purple Glow */}
        <div className="absolute w-80 h-80 bg-fuchsia-600/30 blur-[110px] rounded-full pointer-events-none -z-10 animate-pulse" />

        {/* Teks Salam "Hai, you found me." (Warna Putih Bersih) */}
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hai, you found me.
          </h2>
        </div>

        {/* Progress Bar Container Ungu */}
        <div className="w-full bg-zinc-900/90 border border-zinc-800/80 rounded-full p-1 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Bar Isi Progress */}
          <div
            className="h-3 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-fuchsia-400 transition-all duration-150 ease-out shadow-[0_0_18px_rgba(217,70,239,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Persentase & Status Teks */}
        <div className="w-full flex items-center justify-between mt-3 text-xs font-mono text-zinc-400">
          <span className="truncate pr-2">
            {progress < 35
              ? 'Initializing environment...'
              : progress < 70
              ? 'Loading components & stacks...'
              : progress < 100
              ? 'Finalizing setup...'
              : 'Welcome!'}
          </span>
          <span className="text-fuchsia-400 font-bold text-sm tracking-wider shrink-0">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
