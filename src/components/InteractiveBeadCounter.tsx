"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface InteractiveBeadCounterProps {
  mysteryOrder?: number;
  onComplete?: () => void;
}

const TOTAL_BEADS = 10;

export default function InteractiveBeadCounter({
  mysteryOrder = 1,
  onComplete,
}: InteractiveBeadCounterProps) {
  const [count, setCount] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const storageKey = `rosario-bead-count-${mysteryOrder}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= TOTAL_BEADS) {
        setCount(parsed);
      }
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(storageKey, String(count));
  }, [count, storageKey, hydrated]);

  const handleTap = useCallback(() => {
    setCount((prev) => {
      if (prev >= TOTAL_BEADS) return prev;
      const next = prev + 1;
      if (next === TOTAL_BEADS) {
        setJustCompleted(true);
        onComplete?.();
        setTimeout(() => {
          setJustCompleted(false);
          setCount(0);
          localStorage.removeItem(storageKey);
        }, 2500);
      }
      return next;
    });
  }, [onComplete, storageKey]);

  const handleReset = useCallback(() => {
    setCount(0);
    localStorage.removeItem(storageKey);
    setJustCompleted(false);
  }, [storageKey]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 5x2 Bead Grid */}
      <div className="grid grid-cols-5 gap-2.5">
        {Array.from({ length: TOTAL_BEADS }).map((_, i) => {
          const filled = i < count;
          return (
            <motion.button
              key={i}
              onClick={handleTap}
              whileTap={{ scale: 0.8 }}
              className={`
                w-9 h-9 rounded-full border transition-all duration-200 shadow-sm
                ${
                  filled
                    ? "bg-[var(--color-navy)] border-[var(--color-navy)]"
                    : "bg-white border-[var(--color-divider)] hover:border-[var(--color-gold-muted)] hover:shadow-md"
                }
              `}
              aria-label={`Bead ${i + 1}${filled ? " (filled)" : ""}`}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-[var(--color-slate)] tracking-wide">
          {count} <span className="text-[var(--color-slate-light)]">/</span> {TOTAL_BEADS}
        </span>
        {count > 0 && count < TOTAL_BEADS && (
          <button
            onClick={handleReset}
            className="text-xs text-[var(--color-slate-light)] hover:text-[var(--color-navy)] transition-colors px-2 py-1 rounded-lg hover:bg-[var(--color-ivory-dark)]"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}