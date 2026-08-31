import React, { useState, useEffect, useRef } from 'react';

export default function CertificateSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const categories = ['All', 'Web Dev', 'UI/UX', 'Course'];

  // 1. Intersection Observer untuk mentrigger animasi scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Animasi berjalan saat 10% section masuk ke layar
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Data Sertifikat
  const certificates = [
    {
      id: 1,
      title: 'Fullstack Web Development',
      issuer: 'Dicoding Indonesia',
      date: 'Jan 2026',
      category: 'Web Dev',
      description: 'Mempelajari arsitektur web modern, pembuatan REST API dengan Laravel, integrasi frontend React, serta deployment aplikasi ke cloud server secara mandiri.',
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop',
      credentialUrl: '#',
    },
    {
      id: 2,
      title: 'UI/UX Design Mastery',
      issuer: 'BuildWithAngga',
      date: 'Nov 2025',
      category: 'UI/UX',
      description: 'Fokus pada User Research, pembentukan Design System berskala besar, Wireframing, dan Pembuatan High-Fidelity Interactive Prototype menggunakan Figma.',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
      credentialUrl: '#',
    },
    {
      id: 3,
      title: 'React & Frontend Specialization',
      issuer: 'Coursera',
      date: 'Aug 2025',
      category: 'Web Dev',
      description: 'Pendalaman konsep React State Management, Custom Hooks, optimasi render DOM, serta integrasi Tailwind CSS responsif.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      credentialUrl: '#',
    },
    {
      id: 4,
      title: 'Framer Design System & Animation',
      issuer: 'Framer Academy',
      date: 'May 2025',
      category: 'UI/UX',
      description: 'Mendesain mikro-interaksi canggih, animasi scroll-driven, dan mengonversi hasil desain Figma menjadi situs web interaktif.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
      credentialUrl: '#',
    },
    {
      id: 5,
      title: 'Laravel REST API & Database',
      issuer: 'SanberCode',
      date: 'Jan 2025',
      category: 'Course',
      description: 'Pendalaman backend development: otentikasi Sanctum, struktur Relasi Database MySQL, dan optimasi Query Performance.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      credentialUrl: '#',
    },
  ];

  const filteredCerts = activeFilter === 'All'
    ? certificates
    : certificates.filter(c => c.category === activeFilter);

  return (
    <section 
      ref={sectionRef} 
      id="certificate" 
      className="relative w-full min-h-screen bg-black text-white px-3 sm:px-8 md:px-12 py-16 sm:py-20 overflow-hidden"
    >
      {/* Ambient Glow Ungu */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#7b008b]/20 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 transition-all duration-700 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-0.5">
              My <span className="text-fuchsia-500">Certificates</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xs md:text-right leading-relaxed">
            Validated skills and continuous learning path in tech &amp; design.
          </p>
        </div>

        {/* Garis Putus-Putus Bounding Box */}
        <div className={`relative w-full border-t border-dashed border-zinc-700 flex justify-between items-center my-4 sm:my-6 transition-all duration-700 delay-100 ease-out transform ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-95'
        }`}>
          <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
          <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
        </div>

        {/* --- FILTER BUTTONS --- */}
        <div className={`flex justify-center my-6 sm:my-8 transition-all duration-700 delay-200 ease-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full backdrop-blur-md shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID CARDS TANPA GAMBAR (MOBILE: 2 KARTU, DESKTOP: 3 KARTU) --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {filteredCerts.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              style={{
                transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms',
              }}
              className={`group relative bg-zinc-900/70 border border-zinc-800/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 backdrop-blur-md hover:border-fuchsia-500/50 hover:bg-zinc-900/95 hover:shadow-[0_0_25px_rgba(217,70,239,0.15)] hover:-translate-y-1.5 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                {/* Top Meta: Category & Date */}
                <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono mb-2">
                  <span className="text-fuchsia-400 bg-fuchsia-950/70 border border-fuchsia-800/60 px-2 py-0.5 rounded-full">
                    {cert.category}
                  </span>
                  <span className="text-zinc-500">{cert.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-fuchsia-400 transition-colors mb-1 line-clamp-2 leading-tight">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mb-2 truncate">
                  {cert.issuer}
                </p>

                {/* Short Description */}
                <p className="text-[10px] sm:text-xs text-zinc-400 line-clamp-3 leading-relaxed font-normal">
                  {cert.description}
                </p>
              </div>

              {/* Card Footer: View Details link with arrow */}
              <div className="mt-3 pt-2.5 sm:pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] sm:text-xs text-zinc-400">
                <span className="group-hover:text-white transition-colors">Details</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- MODAL POPUP PREVIEW SERTIFIKAT (TANPA GAMBAR) --- */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-fuchsia-600 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer text-sm"
            >
              ✕
            </button>

            {/* Meta Detail & Deskripsi Modal */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-fuchsia-400 bg-fuchsia-950/60 px-3 py-1 rounded-full border border-fuchsia-800/50">{selectedCert.category}</span>
                <span className="text-zinc-500">{selectedCert.date}</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedCert.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">Penerbit: <span className="text-white font-medium">{selectedCert.issuer}</span></p>
              </div>

              {/* Deskripsi Lengkap dalam Modal */}
              <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80 mt-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Deskripsi &amp; Output Pembelajaran:</span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Tombol Kredensial */}
              <div className="pt-3 flex justify-end">
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-lg shadow-fuchsia-600/30 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Verify Credential</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}