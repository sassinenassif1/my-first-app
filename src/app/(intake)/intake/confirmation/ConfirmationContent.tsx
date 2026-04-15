"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "../LocaleProvider";

type Submission = {
  id: string;
  firstName: string;
  lastName: string;
  locale: "en" | "ar";
  createdAt: string;
};

export function ConfirmationContent() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/intake?id=${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setSubmission(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-32">
        <p className="intake-serif italic text-[var(--ink-faint)]">…</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex-1 mx-auto max-w-xl px-5 py-20 text-center">
        <p className="intake-section-label text-[var(--chart-red)]">
          {t.requiredMark}
        </p>
        <h1 className="intake-serif mt-4 text-[2rem] text-[var(--ink)] leading-tight">
          {t.notFoundTitle}
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">{t.notFoundLead}</p>
        <Link
          href="/intake"
          className="intake-btn intake-btn-ghost mt-8 inline-flex"
        >
          <span aria-hidden className="rtl-flip">
            ←
          </span>
          {t.returnHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto max-w-xl px-4 py-10 sm:px-5 sm:py-14">
      <article className="intake-card">
        {/* A stamped "received" mark — peppermint rinse, used once, here. */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "var(--rinse)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <p className="intake-section-label">{t.clinic}</p>
        </div>

        <h1 className="intake-serif mt-6 text-[2rem] leading-[1.1] tracking-[-0.01em] text-[var(--ink)] sm:text-[2.3rem]">
          {t.confirmTitle}{" "}
          <span className="italic text-[var(--chart-red)]">
            {submission.firstName}
          </span>
          .
        </h1>
        <p className="mt-4 text-[1rem] leading-relaxed text-[var(--ink-muted)]">
          {t.confirmLead}
        </p>

        {/* Reference number: mono, tabular, dir="ltr" so Arabic doesn't flip it */}
        <div className="mt-8 border-t border-dashed border-[var(--ink-line)] pt-5">
          <p className="intake-section-label">{t.confirmRef}</p>
          <p
            className="intake-mono mt-1 text-[1rem] text-[var(--ink)]"
            dir="ltr"
          >
            {submission.id}
          </p>
        </div>

        <p className="intake-serif mt-6 text-[0.95rem] italic text-[var(--ink-faint)]">
          {t.confirmCall}
        </p>

        <div className="mt-8">
          <Link
            href="/intake"
            className="intake-btn intake-btn-ghost inline-flex"
          >
            <span aria-hidden className="rtl-flip">
              ←
            </span>
            {t.returnHome}
          </Link>
        </div>
      </article>
    </div>
  );
}
