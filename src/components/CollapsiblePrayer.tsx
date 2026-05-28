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
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-100/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-700 text-sm">{title}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-slate-400 shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              <p className="text-slate-600 text-sm leading-relaxed">{prayer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}