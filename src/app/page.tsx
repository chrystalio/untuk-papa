"use client";

import PrayerCard from "@/components/PrayerCard";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 py-16 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-[var(--color-gold)] opacity-[0.06] blur-[80px]" />

        {/* Decorative top border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-[var(--color-divider)] to-transparent" />

        {/* Papa Photo */}
        <div className="relative mb-8">
          <div
            className="w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-ivory-dark)] to-[var(--color-divider)] border border-[var(--color-divider)] shadow-lg flex items-center justify-center overflow-hidden"
            aria-label="Foto Papa"
          >
            {/* Cross motif inside */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 L50 85 M30 35 L70 35" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          {/* Gold ring accent */}
          <div className="absolute inset-0 rounded-full border border-[var(--color-gold)] opacity-20" />
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-md">
          <h1
            className="text-5xl font-semibold text-[var(--color-navy)] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Untuk Papa
          </h1>
          <p className="text-[var(--color-slate)] text-base leading-relaxed px-4">
            Kumpulan doa untuk mengenang dan mendoakan Papa tercinta
          </p>
        </div>

        {/* Scripture */}
        <p
          className="text-[var(--color-slate)] text-sm italic leading-relaxed max-w-sm mt-6 px-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          "Apabila orang-orang benar itu berseru-seru, maka Tuhan mendengar, dan melepaskan mereka dari segala kesesakannya. Tuhan itu dekat kepada orang-orang yang patah hati, dan Ia menyelamatkan orang-orang yang remuk jiwanya."
          <span className="block mt-1.5 text-[11px] not-italic text-[var(--color-slate-light)] tracking-wide">
            — Mazmur 34:18-19
          </span>
        </p>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 mt-8">
          <div className="w-8 h-px bg-[var(--color-divider)]" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
          >
            <path d="M12 2v4M12 18v4M7 7h10" />
          </svg>
          <div className="w-8 h-px bg-[var(--color-divider)]" />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-[var(--color-slate-light)] text-[11px] tracking-wide">Pilih Doa</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-[var(--color-slate-light)] animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Prayer Cards Section */}
      <section className="flex-1 px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-md mx-auto space-y-3"
        >
          <PrayerCard
            title="Doa Rosario"
            href="/Rosario"
            description="Panduan doa Rosario berdasarkan peristiwa hari ini"
          />

          <PrayerCard
            title="Doa Ziarah Makam"
            description="Doa untuk ziarah ke makam Papa"
            comingSoon
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-[var(--color-divider)]">
        <p
          className="text-[var(--color-slate-light)] text-xs italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Dikumpulkan dengan cinta untuk Papa
        </p>
      </footer>
    </main>
  );
}