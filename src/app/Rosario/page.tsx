import prayers from "@/data/prayers.json";
import PeristiwaSection from "@/components/PeristiwaSection";
import IntroSection from "@/components/IntroSection";
import Link from "next/link";
import peristiwaData from "@/data/peristiwa.json";

const PAPA_PRAYERS = [
  "Allah Bapa yang mahakuasa, pada peristiwa ini kami memanjatkan doa secara khusus bagi papa kami tercinta, Bapak Anselmus Rudi. Dengan rendah hati kami memohon, kiranya Engkau mengampuni segala dosa dan kesalahannya semasa hidup, serta menyucikan jiwanya dengan kasih karunia-Mu yang tak terhingga.",
  "Ya Yesus Yang Baik, pada peristiwa ini kami menyerahkan jiwa papa kami. Bapak Anselmus Rudi ke dalam tangan kasih-Mu. Anugerahkanlah kepadanya keselamatan kekal, dan biarlah terang-Mu yang abadi senantiasa menyinari perjalanannya menuju rumah Bapa di surga.",
  "Ya Bapa di surga, dengarkanlah doa kami untuk papa, Bapak Anselmus Rudi. Terimalah ia di pangkuan kasih-Mu dan berikanlah ia tempat peristirahatan terindah di surga. Tempat di mana tiada lagi sakit dan sengsara, melainkan damai sejahtera. Semoga terang cahaya-Mu menyinari perjalanannya menuju kedamaian abadi.",
  "Ya Bunda Maria, Bunda yang berbelaskasih, doakanlah papa kami Bapak Anselmus Rudi. Mohonkanlah kerahiman Allah baginya, jauhkanlah jiwanya dari segala siksa, dan hantarkanlah ia dengan selamat ke dalam pelukan kasih sayang Allah Bapa di surga.",
  "Ya Allah Pencipta Semesta, pada peristiwa ini kami memohon agar jiwa Bapak Anselmus Rudi beroleh sukacita abadi. Persatukanlah ia dalam kebahagiaan surgawi bersama para malaikat dan semua orang kudus-Mu, untuk memuji dan memuliakan nama-Mu selama-lamanya.",
];

function getDayKey(dayOfWeek: number): string {
  // Senin = Gembira, Selasa = Sedih, Rabu = Mulia, Kamis = Terang, Jumat = Sedih, Sabtu = Gembira, Minggu = Mulia
  switch (dayOfWeek) {
    case 1:
      return "senin_gembira";
    case 2:
      return "selasa_sedih";
    case 3:
      return "rabu_mulia";
    case 4:
      return "kamis_terang";
    case 5:
      return "jumat_sedih";
    case 6:
      return "sabtu_gembira";
    default:
      return "minggu_mulia";
  }
}

const IMAGE_FOLDER_MAP: Record<string, string> = {
  senin_gembira: "joyfull",
  sabtu_gembira: "joyfull",
  selasa_sedih: "sorrowful",
  jumat_sedih: "sorrowful",
  rabu_mulia: "glorious",
  minggu_mulia: "glorious",
  kamis_terang: "luminous",
};

export default function RosarioPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayKey = getDayKey(dayOfWeek);

  const peristiwa = peristiwaData[dayKey as keyof typeof peristiwaData];
  const dayName = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-[var(--color-divider)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-ivory-dark)] transition-colors"
            aria-label="Kembali ke beranda"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-[var(--color-navy)]"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-[var(--color-navy)] tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Doa Rosario
            </h1>
            <p className="text-xs text-[var(--color-slate)]">{dayName}</p>
          </div>
        </div>
      </header>

      {/* Peristiwa Banner */}
      <div className="px-6 py-5 border-b border-[var(--color-divider)]">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="text-sm font-medium text-[var(--color-navy)] tracking-wide">
              {peristiwa.peristiwa}
            </span>
          </div>
          {peristiwa.description && (
            <p className="text-xs text-[var(--color-slate)] mt-1.5 ml-3.5 leading-relaxed">
              {peristiwa.description}
            </p>
          )}
        </div>
      </div>

      {/* Intro Prayers */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-md mx-auto space-y-6">
          <IntroSection />
          {peristiwa.mysteries.map((mystery, index) => {
            const folder = IMAGE_FOLDER_MAP[dayKey] ?? "joyfull";
            const imagePath = `/images/mysteries/${folder}/${folder}-${mystery.order}.jpg`;
            return (
              <div key={mystery.order}>
                <PeristiwaSection
                  mystery={mystery}
                  papaPrayer={
                    PAPA_PRAYERS[mystery.order - 1] ||
                    PAPA_PRAYERS[PAPA_PRAYERS.length - 1]
                  }
                  imagePath={imagePath}
                />
                {index < peristiwa.mysteries.length - 1 && (
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-[var(--color-divider)]" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-gold)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    <div className="flex-1 h-px bg-[var(--color-divider)]" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Doa Penutup */}
          <div className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-ivory)] px-5 py-4">
            <p className="text-[var(--color-navy)] text-sm" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
              {prayers.doa_penutup.prayer}
            </p>
          </div>

          {/* Tanda Salib Penutup */}
          <div className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-ivory)] px-5 py-4 text-center">
            <p className="text-[var(--color-navy)] text-sm" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
              {prayers.tanda_salib.prayer}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-[var(--color-divider)]">
        <p className="text-[var(--color-slate-light)] text-xs italic" style={{ fontFamily: "var(--font-serif)" }}>
          Dikumpulkan dengan cinta untuk Papa
        </p>
      </footer>
    </div>
  );
}