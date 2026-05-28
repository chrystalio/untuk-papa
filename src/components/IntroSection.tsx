"use client";

import { useState } from "react";
import prayers from "@/data/prayers.json";

export default function IntroSection() {
  return (
    <div className="space-y-2">
      <IntroPrayer title={prayers.tanda_salib.title} prayer={prayers.tanda_salib.prayer} defaultOpen />
      <IntroPrayer title={prayers.aku_percaya.title} prayer={prayers.aku_percaya.prayer} />
      <IntroPrayer title={prayers.terpujilah.title} prayer={prayers.terpujilah.prayer} />
      <IntroPrayer title={prayers.kemuliaan.title} prayer={prayers.kemuliaan.prayer} />
      <IntroPrayer title={prayers.bapa_kami.title} prayer={prayers.bapa_kami.prayer} />
      <IntroPrayer title={prayers.salam_putri.title} prayer={prayers.salam_putri.prayer} />
      <IntroPrayer title={prayers.salam_bunda.title} prayer={prayers.salam_bunda.prayer} />
      <IntroPrayer title={prayers.salam_mempelai.title} prayer={prayers.salam_mempelai.prayer} />
      <IntroPrayer title={prayers.kemuliaan.title} prayer={prayers.kemuliaan.prayer} />
      <IntroPrayer title={prayers.terpujilah.title} prayer={prayers.terpujilah.prayer} />
    </div>
  );
}

function IntroPrayer({
  title,
  prayer,
  defaultOpen = false,
}: {
  title: string;
  prayer: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-100/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-700 text-sm">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-slate-400 shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1">
          <p className="text-slate-600 text-sm leading-relaxed">{prayer}</p>
        </div>
      )}
    </div>
  );
}