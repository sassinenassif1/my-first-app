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
      <div className="flex items-center justify-center py-20">
        <p className="text-muted">Loading confirmation...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="px-6 py-12">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Appointment Not Found
          </h1>
          <p className="mt-2 text-muted">
            We couldn&apos;t find your appointment. Please try booking again.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
          >
            Book Again
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(appointment.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-lg">
        {/* Success Banner */}
        <div className="rounded-xl border border-green-200 bg-success-light p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-2xl font-bold text-white">
            &#10003;
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            Appointment Confirmed!
          </h1>
          <p className="mt-1 text-muted">
            Your appointment has been successfully booked.
          </p>
        </div>

        {/* Details Card */}
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-semibold text-foreground">
              Appointment Details
            </h2>
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary-dark">
              {appointment.id}
            </span>
          </div>

          <dl className="mt-4 space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Patient</dt>
              <dd className="text-sm font-medium text-foreground">
                {appointment.firstName} {appointment.lastName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Service</dt>
              <dd className="text-sm font-medium text-foreground">
                {appointment.service}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Doctor</dt>
              <dd className="text-sm font-medium text-foreground">
                {appointment.doctor}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Date</dt>
              <dd className="text-sm font-medium text-foreground">
                {formattedDate}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Time</dt>
              <dd className="text-sm font-medium text-foreground">
                {appointment.time}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Email</dt>
              <dd className="text-sm font-medium text-foreground">
                {appointment.email}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted">Phone</dt>
              <dd className="text-sm font-medium text-foreground">
                {appointment.phone}
              </dd>
            </div>
            {appointment.notes && (
              <div className="border-t border-border pt-3">
                <dt className="text-sm text-muted">Notes</dt>
                <dd className="mt-1 text-sm text-foreground">
                  {appointment.notes}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/book"
            className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Book Another Appointment
          </Link>
          <Link
            href="/"
            className="flex-1 rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <p className="text-muted">Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
