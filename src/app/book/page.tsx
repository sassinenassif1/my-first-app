"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  "General Checkup",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Lab & Diagnostics",
];

const doctors: Record<string, string[]> = {
  "General Checkup": ["Dr. Sarah Mitchell"],
  Pediatrics: ["Dr. Maria Rodriguez"],
  Cardiology: ["Dr. James Chen"],
  Dermatology: ["Dr. David Kim"],
  Orthopedics: ["Dr. Sarah Mitchell"],
  "Lab & Diagnostics": ["Dr. James Chen", "Dr. Maria Rodriguez"],
};

const timeSlots = [
  "8:00", "8:30", "9:00", "9:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

const inputClass =
  "w-full bg-transparent border-0 border-b border-border-strong pb-2 pt-4 text-base text-ink placeholder:text-muted-light focus:border-accent focus:outline-none transition-colors";

const labelClass =
  "eyebrow text-muted block";

export default function BookAppointment() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const availableDoctors = selectedService ? doctors[selectedService] ?? [] : [];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      doctor: formData.get("doctor") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      notes: formData.get("notes") as string,
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to book appointment");
      }

      const result = await res.json();
      router.push(`/book/confirmation?id=${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-10">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="eyebrow text-muted">— A booking, unhurried</p>
            <p className="eyebrow text-muted hidden sm:block">Form No. 01</p>
          </div>
          <h1 className="display text-5xl sm:text-6xl text-ink mt-12">
            Let&apos;s find a good
            <br />
            <span className="italic text-primary">time</span> to meet.
          </h1>
          <p className="mt-6 text-muted max-w-xl leading-relaxed">
            Tell us a little about you and when you&apos;d like to come in.
            We&apos;ll confirm by email within the hour.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        {error && (
          <div className="mb-10 border-l-2 border-accent bg-accent-light/40 px-5 py-4">
            <p className="eyebrow text-accent">— Notice</p>
            <p className="mt-1 text-sm text-ink">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 01 */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
            <div className="lg:col-span-4">
              <p className="font-serif italic text-accent text-xl">— 01</p>
              <h2 className="font-serif text-3xl text-ink mt-2">About you</h2>
              <p className="mt-3 text-sm text-muted max-w-xs">
                The basics, so we can prepare the visit and reach you.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  — First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>
                  — Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  — Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  — Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Step 02 */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-border">
            <div className="lg:col-span-4">
              <p className="font-serif italic text-accent text-xl">— 02</p>
              <h2 className="font-serif text-3xl text-ink mt-2">The visit</h2>
              <p className="mt-3 text-sm text-muted max-w-xs">
                Choose the service and physician you&apos;d like to see.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-10">
              <div>
                <label className={labelClass}>— Service</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <label
                      key={s}
                      className={`cursor-pointer border px-4 py-2 text-sm transition-colors ${
                        selectedService === s
                          ? "border-ink bg-ink text-cream"
                          : "border-border-strong text-ink hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={s}
                        required
                        checked={selectedService === s}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="sr-only"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="doctor" className={labelClass}>
                  — Physician
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  required
                  disabled={!selectedService}
                  className={`${inputClass} disabled:opacity-50 appearance-none cursor-pointer`}
                >
                  <option value="">
                    {selectedService
                      ? "Select a physician"
                      : "Choose a service first"}
                  </option>
                  {availableDoctors.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Step 03 */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-border">
            <div className="lg:col-span-4">
              <p className="font-serif italic text-accent text-xl">— 03</p>
              <h2 className="font-serif text-3xl text-ink mt-2">When</h2>
              <p className="mt-3 text-sm text-muted max-w-xs">
                A preferred date and time. We&apos;ll honor it where we can.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-10">
              <div>
                <label htmlFor="date" className={labelClass}>
                  — Preferred date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  min={minDate}
                  max={maxDateStr}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>— Preferred time</label>
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((t) => (
                    <label
                      key={t}
                      className={`cursor-pointer border py-2 text-center text-sm font-serif italic transition-colors ${
                        selectedTime === t
                          ? "border-accent bg-accent text-cream"
                          : "border-border-strong text-ink hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={t}
                        required
                        checked={selectedTime === t}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="sr-only"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Step 04 */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-border">
            <div className="lg:col-span-4">
              <p className="font-serif italic text-accent text-xl">— 04</p>
              <h2 className="font-serif text-3xl text-ink mt-2">
                A note,
                <br />
                if you&apos;d like
              </h2>
              <p className="mt-3 text-sm text-muted max-w-xs italic font-serif">
                Symptoms, questions, or anything we should know beforehand.
              </p>
            </div>
            <div className="lg:col-span-8">
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Optional — a few lines are plenty."
                className={`${inputClass} resize-none`}
              />
            </div>
          </section>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-sm text-muted italic font-serif max-w-md">
              By submitting, you agree to be contacted about this appointment.
              Nothing more.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center justify-between gap-8 bg-ink text-cream px-8 py-5 min-w-[280px] hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              <span className="text-sm font-medium tracking-wide">
                {submitting ? "Confirming…" : "Confirm the appointment"}
              </span>
              <span aria-hidden className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
