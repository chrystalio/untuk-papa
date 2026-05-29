"use client";

import CollapsiblePrayer from "./CollapsiblePrayer";
import InteractiveBeadCounter from "./InteractiveBeadCounter";
import prayers from "@/data/prayers.json";
import { motion } from "framer-motion";

interface Mystery {
  order: number;
  title: string;
  verse?: string;
}

interface PeristiwaSectionProps {
  mystery: Mystery;
  papaPrayer: string;
  imagePath?: string;
}

const ORDINAL_TEXT = ["Pertama", "Kedua", "Ketiga", "Keempat", "Kelima"];

export default function PeristiwaSection({
  mystery,
  papaPrayer,
  imagePath,
}: PeristiwaSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-4"
    >
      {/* Top Row: Image + Title */}
      <div className="flex items-start gap-4">
        {/* Mystery Image */}
        {imagePath && (
          <div className="shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePath}
              alt={mystery.title}
              className="w-32 h-40 rounded-2xl object-cover shadow-sm"
            />
            <div className="absolute inset-0 rounded-2xl border border-[var(--color-divider)] pointer-events-none" />
          </div>
        )}

        {/* Title */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pt-1">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-gold)]"
          >
            Peristiwa {ORDINAL_TEXT[mystery.order - 1] ?? ""}
          </span>
          <h3
            className="text-xl leading-snug mt-1 text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
          >
            {mystery.title}
          </h3>
          {mystery.verse && (
            <p className="text-[var(--color-slate)] text-xs italic mt-2 leading-relaxed pr-2">
              {mystery.verse}
            </p>
          )}
        </div>
      </div>

      {/* Papa's Personal Prayer - Elevated Card */}
      <div className="relative">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-transparent opacity-50" />
        <div className="relative bg-[var(--color-ivory)] border border-[var(--color-divider)] rounded-2xl px-5 py-4">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0 mt-0.5"
            >
              <path d="M12 2v20M7 7h10" />
            </svg>
            <p
              className="text-[var(--color-navy)] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              {papaPrayer}
            </p>
          </div>
        </div>
      </div>

      {/* Peristiwa Prayers */}
      <div className="space-y-2">
        <CollapsiblePrayer
          title="Bapa Kami"
          prayer={prayers.bapa_kami.prayer}
        />

        {/* Salam Maria with Interactive Counter */}
        <div className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-ivory)] overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between border-b border-[var(--color-divider)]">
            <span
              className="text-sm font-medium text-[var(--color-navy)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Salam Maria
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-slate-light)]">
              Ulangi 10×
            </span>
          </div>
          <div className="px-5 pb-5 pt-3">
            <p className="text-[var(--color-slate)] text-sm leading-relaxed mb-5">
              {prayers.salam_maria.prayer}
            </p>
            <InteractiveBeadCounter mysteryOrder={mystery.order} />
          </div>
        </div>

        <CollapsiblePrayer
          title="Kemuliaan"
          prayer={prayers.kemuliaan.prayer}
        />

        <CollapsiblePrayer
          title="Terpujilah"
          prayer={prayers.terpujilah.prayer}
        />

        <CollapsiblePrayer
          title="Doa Fatima"
          prayer={prayers.doa_fatima.prayer}
        />
      </div>
    </motion.div>
  );
}