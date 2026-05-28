"use client";

import CollapsiblePrayer from "./CollapsiblePrayer";
import InteractiveBeadCounter from "./InteractiveBeadCounter";
import prayers from "@/data/prayers.json";

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
    <div className="space-y-3">
      {/* Top Row: Image + Title */}
      <div className="flex items-start gap-3">
        {/* Mystery Image */}
        {imagePath && (
          <div className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePath}
              alt={mystery.title}
              className="w-36 h-44 rounded-2xl object-contain"
            />
          </div>
        )}

        {/* Title */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <span className="text-navy/60 text-xs font-medium uppercase tracking-wide">
            Peristiwa {ORDINAL_TEXT[mystery.order - 1] ?? ""}
          </span>
          <h3 className="font-semibold text-slate-800 text-sm leading-snug mt-0.5">
            {mystery.title}
          </h3>
          {mystery.verse && (
            <p className="text-slate-400 text-xs italic mt-1 leading-relaxed">
              {mystery.verse}
            </p>
          )}
        </div>
      </div>

      {/* Papa's Personal Prayer */}
      <div className="bg-navy/5 border border-navy/20 rounded-2xl px-4 py-3">
        <div className="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-navy/50 shrink-0 mt-0.5"
          >
            <path d="M12 2v20M7 7h10" />
          </svg>
          <p className="text-navy/80 text-sm leading-relaxed font-medium italic">
            {papaPrayer}
          </p>
        </div>
      </div>

      {/* Peristiwa Prayers */}
      <div className="space-y-2">
        <CollapsiblePrayer
          title="Bapa Kami"
          prayer={prayers.bapa_kami.prayer}
        />

        {/* Salam Maria with Interactive Counter */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="font-medium text-slate-700 text-sm">
              Salam Maria
            </span>
          </div>
          <div className="px-4 pb-4">
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
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
    </div>
  );
}