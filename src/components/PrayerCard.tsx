"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PrayerCardProps {
  title: string;
  href?: string;
  description?: string;
  comingSoon?: boolean;
}

export default function PrayerCard({
  title,
  href,
  description,
  comingSoon = false,
}: PrayerCardProps) {
  return (
    <Link
      href={comingSoon ? "#" : (href ?? "#")}
      className={`
        group relative block p-5 rounded-2xl border transition-all duration-300
        ${
          comingSoon
            ? "bg-[var(--color-ivory)] border-[var(--color-divider)] cursor-not-allowed opacity-60"
            : "bg-[var(--color-ivory)] border-[var(--color-divider)] hover:border-[var(--color-gold-muted)] hover:shadow-md hover:scale-[1.01]"
        }
      `}
      onClick={(e) => comingSoon && e.preventDefault()}
    >
      {/* Gold accent line on left for active cards */}
      {!comingSoon && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {comingSoon ? (
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[var(--color-slate-light)]">
          Soon
        </span>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <h3
          className="text-base text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-[var(--color-slate)] text-sm leading-snug">{description}</p>
        )}
      </div>

      {!comingSoon && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className="text-[var(--color-gold)] text-sm font-medium"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mulai
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-[var(--color-gold)] group-hover:translate-x-1 transition-transform duration-200"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </Link>
  );
}