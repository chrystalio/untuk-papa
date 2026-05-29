"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsiblePrayerProps {
  title: string;
  prayer: string;
  defaultOpen?: boolean;
}

export default function CollapsiblePrayer({
  title,
  prayer,
  defaultOpen = false,
}: CollapsiblePrayerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-ivory)] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--color-ivory-dark)] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span
          className="text-sm font-medium text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-[var(--color-divider)]">
              <p className="text-[var(--color-slate)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                {prayer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}