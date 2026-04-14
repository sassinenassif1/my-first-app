"use client";

import { useLocale } from "./LocaleProvider";

export function IntakeHeader() {
  const { t, locale, toggleLocale } = useLocale();

  return (
    <header className="border-b border-[var(--dental-border)] bg-[var(--dental-surface)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dental-primary)] text-white text-lg font-semibold"
          >
            {locale === "ar" ? "ن" : "N"}
          </span>
          <div className="leading-tight">
            <p className="text-[0.95rem] font-semibold text-[var(--dental-ink)]">
              {t.clinic}
            </p>
            <p className="text-[0.72rem] text-[var(--dental-muted)]">
              {t.clinicTagline}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={t.switchAria}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--dental-border-strong)] bg-[var(--dental-surface)] px-3 py-1.5 text-sm text-[var(--dental-ink)] hover:border-[var(--dental-primary)] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>{t.switchToLang}</span>
        </button>
      </div>
    </header>
  );
}
