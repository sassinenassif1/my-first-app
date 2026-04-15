"use client";

import { useLocale } from "./LocaleProvider";

export function IntakeHeader() {
  const { t, toggleLocale } = useLocale();

  return (
    <header className="border-b border-[var(--ink-line)] bg-[var(--paper)]">
      <div className="mx-auto flex max-w-xl items-baseline justify-between gap-4 px-5 pt-6 pb-4 sm:pt-7 sm:pb-5">
        <div className="min-w-0">
          <p className="intake-serif italic text-[0.78rem] tracking-[0.04em] text-[var(--ink-faint)]">
            {t.clinicTagline}
          </p>
          <p className="intake-serif mt-0.5 text-[1.1rem] leading-tight text-[var(--ink)]">
            {t.clinic}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={t.switchAria}
          className="intake-serif shrink-0 text-[0.9rem] italic text-[var(--chart-red)] underline decoration-[var(--chart-red)] decoration-[1px] underline-offset-[3px] transition-opacity hover:opacity-75 min-h-11 px-1"
        >
          {t.switchToLang}
        </button>
      </div>
    </header>
  );
}
