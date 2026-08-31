import React, { useState } from 'react';

export default function CertificateSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const categories = ['All', 'Web Dev', 'UI/UX', 'Course'];

  // Data Sertifikat dengan Deskripsi
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
    <section id="certificates" className="relative w-full min-h-screen bg-black text-white px-3 sm:px-8 md:px-16 py-16 sm:py-20 overflow-hidden">
      
      {/* Ambient Glow Ungu */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#7b008b]/20 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-fuchsia-400 tracking-widest uppercase">
              Certifications & Achievements
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-0.5">
              My <span className="text-fuchsia-500">Certificates</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xs md:text-right leading-relaxed">
            Validated skills and continuous learning path in tech & design.
          </p>
        </div>

        {/* Garis Putus-Putus Bounding Box */}
        <div className="relative w-full border-t border-dashed border-zinc-700 flex justify-between items-center my-4 sm:my-6">
          <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
          <span className="w-2.5 h-2.5 bg-fuchsia-500 -mt-[5px] z-10" />
        </div>

        {/* --- FILTER BUTTONS --- */}
        <div className="flex justify-center my-6 sm:my-8">
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

        {/* --- GRID CARDS (2 KOLOM DI MOBILE: grid-cols-2) --- */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative bg-zinc-900/80 border border-zinc-800 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm hover:border-fuchsia-500/50 hover:shadow-[0_0_25px_rgba(217,70,239,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Gambar Sertifikat */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                  <span className="text-[10px] sm:text-xs font-semibold bg-fuchsia-600 text-white px-2.5 py-1 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1">
                    🔍 View
                  </span>
                </div>

                {/* Badge Kategori */}
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-zinc-900/90 text-fuchsia-400 text-[8px] sm:text-[10px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-zinc-700/80 backdrop-blur-md">
                  {cert.category}
                </span>
              </div>

              {/* Detail Teks Kartu */}
              <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-zinc-500 font-mono mb-1">
                    <span className="truncate pr-1">{cert.issuer}</span>
                    <span className="shrink-0">{cert.date}</span>
                  </div>
                  
                  <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-fuchsia-400 transition-colors mb-1.5 line-clamp-2 leading-tight">
                    {cert.title}
                  </h3>
                  
                  {/* Deskripsi Singkat */}
                  <p className="text-[10px] sm:text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 sm:pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] sm:text-xs text-zinc-400">
                  <span className="group-hover:text-white transition-colors">Details</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- MODAL POPUP PREVIEW SERTIFIKAT --- */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-fuchsia-600 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer text-xs sm:text-sm"
            >
              ✕
            </button>

            {/* Gambar Besar */}
            <div className="w-full aspect-[16/10] bg-zinc-950 rounded-xl overflow-hidden mb-3 sm:mb-4 border border-zinc-800">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Meta Detail & Deskripsi Modal */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
                <span className="text-fuchsia-400 bg-fuchsia-500/10 px-2 py-0.5 rounded-full border border-fuchsia-500/20">{selectedCert.category}</span>
                <span className="text-zinc-500">{selectedCert.date}</span>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold text-white">{selectedCert.title}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Penerbit: <span className="text-white font-medium">{selectedCert.issuer}</span></p>
              </div>

              {/* Deskripsi Lengkap dalam Modal */}
              <div className="bg-zinc-950/60 p-3 sm:p-3.5 rounded-xl border border-zinc-800/80">
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Deskripsi & Output:</span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Tombol Kredensial */}
              <div className="pt-2 flex justify-end">
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-fuchsia-600/30 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Verify Credential</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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