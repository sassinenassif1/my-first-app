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
        <p className="font-serif italic text-[var(--dental-muted)]">…</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex-1 mx-auto max-w-2xl px-5 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--dental-danger)]">
          {t.requiredMark}
        </p>
        <h1 className="mt-3 font-serif text-3xl text-[var(--dental-ink)]">
          {t.notFoundTitle}
        </h1>
        <p className="mt-4 text-[var(--dental-muted)]">{t.notFoundLead}</p>
        <Link
          href="/intake"
          className="intake-btn intake-btn-ghost mt-8 inline-flex"
        >
          <span aria-hidden className="rtl-flip">←</span>
          {t.returnHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto max-w-2xl px-5 py-16">
      <div className="intake-card p-8 sm:p-10 text-center">
        <div
          aria-hidden
          className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--dental-primary-light)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--dental-primary-dark)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--dental-primary)]">
          {t.clinic}
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[var(--dental-ink)]">
          {t.confirmTitle}{" "}
          <span className="italic text-[var(--dental-primary)]">
            {submission.firstName}
          </span>
          .
        </h1>
        <p className="mt-4 text-[var(--dental-muted)] leading-relaxed">
          {t.confirmLead}
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-[var(--dental-border)] bg-[var(--dental-bg)] px-4 py-2.5">
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--dental-muted)]">
            {t.confirmRef}
          </span>
          <span
            className="font-mono text-sm text-[var(--dental-ink)]"
            dir="ltr"
          >
            {submission.id}
          </span>
        </div>

        <p className="mt-8 text-sm italic text-[var(--dental-muted)]">
          {t.confirmCall}
        </p>

        <div className="mt-10">
          <Link href="/intake" className="intake-btn intake-btn-ghost inline-flex">
            <span aria-hidden className="rtl-flip">←</span>
            {t.returnHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
