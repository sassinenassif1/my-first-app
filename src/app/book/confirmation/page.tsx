"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  notes: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/appointments?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAppointment(null);
        } else {
          setAppointment(data);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="font-serif italic text-muted">One moment…</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="px-6 py-24">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow text-accent">— Not found</p>
          <h1 className="display text-4xl text-ink mt-4">
            We couldn&apos;t find
            <br />
            that appointment.
          </h1>
          <p className="mt-4 text-muted italic font-serif">
            Perhaps the link is old. Let&apos;s try again.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
          >
            Book again <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(
    appointment.date + "T00:00:00"
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayNum = new Date(appointment.date + "T00:00:00").getDate();
  const monthShort = new Date(appointment.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { month: "short" }
  );

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-10">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="eyebrow text-primary">— Confirmed</p>
            <p className="eyebrow text-muted font-mono">{appointment.id}</p>
          </div>
          <h1 className="display text-5xl sm:text-6xl text-ink mt-12">
            Thank you,
            <br />
            <span className="italic text-primary">
              {appointment.firstName}
            </span>
            . We&apos;ll see you.
          </h1>
          <p className="mt-6 text-muted max-w-xl leading-relaxed italic font-serif">
            A confirmation has been sent to{" "}
            <span className="not-italic text-ink">{appointment.email}</span>.
            If anything changes, reply there or call us directly.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Big date block */}
          <aside className="lg:col-span-4">
            <p className="eyebrow text-muted">— Save the day</p>
            <div className="mt-4 border-2 border-ink p-8 bg-card">
              <p className="eyebrow text-accent text-center">
                {new Date(
                  appointment.date + "T00:00:00"
                ).toLocaleDateString("en-US", { weekday: "long" })}
              </p>
              <p className="font-serif text-[8rem] leading-none text-ink text-center mt-2">
                {dayNum}
              </p>
              <p className="font-serif italic text-2xl text-accent text-center mt-2">
                {monthShort}.
              </p>
              <div className="mt-6 pt-6 border-t border-border-strong text-center">
                <p className="eyebrow text-muted">— Time</p>
                <p className="font-serif text-3xl text-ink mt-1">
                  {appointment.time}
                </p>
              </div>
            </div>
          </aside>

          {/* Details */}
          <div className="lg:col-span-8 lg:pl-4">
            <p className="eyebrow text-muted">— Particulars</p>
            <dl className="mt-4">
              <div className="flex items-baseline justify-between border-b border-border py-5">
                <dt className="eyebrow text-muted">— Patient</dt>
                <dd className="font-serif text-xl text-ink">
                  {appointment.firstName} {appointment.lastName}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border py-5">
                <dt className="eyebrow text-muted">— Service</dt>
                <dd className="font-serif text-xl text-ink">
                  {appointment.service}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border py-5">
                <dt className="eyebrow text-muted">— Physician</dt>
                <dd className="font-serif italic text-xl text-primary">
                  {appointment.doctor}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border py-5">
                <dt className="eyebrow text-muted">— Date</dt>
                <dd className="text-base text-ink">{formattedDate}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border py-5">
                <dt className="eyebrow text-muted">— Phone</dt>
                <dd className="text-base text-ink font-mono">
                  {appointment.phone}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-border py-5">
                <dt className="eyebrow text-muted">— Email</dt>
                <dd className="text-base text-ink">{appointment.email}</dd>
              </div>
              {appointment.notes && (
                <div className="border-b border-border py-5">
                  <dt className="eyebrow text-muted">— Your note</dt>
                  <dd className="mt-3 font-serif italic text-lg text-ink leading-relaxed">
                    &ldquo;{appointment.notes}&rdquo;
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-between gap-6 bg-ink text-cream px-6 py-5 hover:bg-primary-dark transition-colors"
              >
                <span className="text-sm font-medium tracking-wide">
                  Return home
                </span>
                <span aria-hidden className="text-lg">→</span>
              </Link>
              <Link
                href="/book"
                className="flex-1 inline-flex items-center justify-between gap-6 border border-ink text-ink px-6 py-5 hover:bg-ink hover:text-cream transition-colors"
              >
                <span className="text-sm font-medium tracking-wide">
                  Book another
                </span>
                <span aria-hidden className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32">
          <p className="font-serif italic text-muted">One moment…</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
