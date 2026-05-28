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
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: TOTAL_BEADS }).map((_, i) => {
          const filled = i < count;
          return (
            <motion.button
              key={i}
              onClick={handleTap}
              whileTap={{ scale: 0.85 }}
              className={`
                w-8 h-8 rounded-full border-2 transition-all duration-150
                ${
                  filled
                    ? "bg-navy border-navy shadow-sm"
                    : "bg-white border-slate-300 hover:border-navy/40"
                }
              `}
              aria-label={`Bead ${i + 1}${filled ? " (filled)" : ""}`}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <span className="text-slate-500 text-xs font-medium">
          {count}/{TOTAL_BEADS}
        </span>
        {count > 0 && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
          >
            Reset
          </button>
        )}
      </div>

          </div>
  );
}