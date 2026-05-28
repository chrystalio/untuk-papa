"use client";

import Link from "next/link";

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
            ? "bg-slate-50/50 border-slate-200 cursor-not-allowed opacity-70"
            : "bg-white border-slate-200 hover:border-navy/30 hover:shadow-md hover:scale-[1.02]"
        }
      `}
      onClick={(e) => comingSoon && e.preventDefault()}
    >
      {comingSoon && (
        <span className="absolute top-3 right-3 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
          Soon
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-800 group-hover:text-navy transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-slate-500 text-sm leading-snug">{description}</p>
        )}
      </div>

      {!comingSoon && (
        <div className="mt-3 flex items-center gap-1 text-navy text-sm font-medium">
          <span>Mulai</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </Link>
  );
}