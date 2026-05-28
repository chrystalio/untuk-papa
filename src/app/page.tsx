import PrayerCard from "@/components/PrayerCard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center">
        {/* Papa Photo Placeholder */}
        <div className="relative mb-8">
          <div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden"
            aria-label="Foto Papa"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full opacity-20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="35" r="18" fill="#1e3a5f" />
              <path
                d="M50 55 C20 55, 10 85, 10 95 L90 95 C90 85, 80 55, 50 55Z"
                fill="#1e3a5f"
              />
            </svg>
          </div>

          {/* Soft overlay ring */}
          <div className="absolute inset-0 rounded-full border-2 border-navy/20 -z-10" />
        </div>

        {/* Text Content */}
        <div className="space-y-3 max-w-md">
          <h1 className="text-4xl font-bold text-slate-700 tracking-tight">
            Untuk Papa
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Kumpulan doa untuk mengenang Papa tercinta
          </p>
        </div>

        {/* Soft decorative element */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-slate-400 text-xs">Scroll untuk memilih doa</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-slate-400 animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Prayer Cards Section */}
      <section className="flex-1 px-6 pb-12">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Pilih Doa
          </h2>

          <PrayerCard
            title="Doa Rosario"
            href="/Rosario"
            description="Panduan doa Rosario berdasarkan peristiwa hari ini"
          />

          <PrayerCard
            title="Doa Ziarah Makam"
            description="Doa untuk ziarah ke makam Papa (coming soon)"
            comingSoon
          />

          <PrayerCard
            title="Peringatan Ulang Tahun"
            description="Doa especiais untuk memperingati hari lahir Papa (coming soon)"
            comingSoon
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center border-t border-stone-200/50">
        <p className="text-slate-400 text-xs">
          Dikumpulkan dengan cinta untuk Papa
        </p>
      </footer>
    </main>
  );
}