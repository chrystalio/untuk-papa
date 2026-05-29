"use client";

import { useState } from "react";
import prayers from "@/data/prayers.json";

export default function IntroSection() {
  return (
    <div className="space-y-2">
      <IntroPrayer title={prayers.tanda_salib.title} prayer={prayers.tanda_salib.prayer} defaultOpen />
      <IntroPrayer title={prayers.aku_percaya.title} prayer={prayers.aku_percaya.prayer} />
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
    <div className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-ivory)] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-[var(--color-ivory-dark)] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span
          className="text-sm text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
        >
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 pt-1 border-t border-[var(--color-divider)]">
          <p className="text-[var(--color-slate)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
            {prayer}
          </p>
        </div>
      )}
    </div>
  );
}