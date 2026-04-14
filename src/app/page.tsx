import Link from "next/link";

const services = [
  {
    n: "01",
    name: "General Checkup",
    description:
      "An unhurried examination — vital signs, preventive screening, a real conversation.",
    duration: "30 min",
  },
  {
    n: "02",
    name: "Pediatrics",
    description:
      "Infants through adolescents: immunizations, growth, and the small worries in between.",
    duration: "30 min",
  },
  {
    n: "03",
    name: "Cardiology",
    description:
      "ECG, blood pressure management, and a careful read of cardiovascular risk.",
    duration: "45 min",
  },
  {
    n: "04",
    name: "Dermatology",
    description:
      "Skin, hair, and nails — acne, eczema, mole checks, and thoughtful cosmetic work.",
    duration: "30 min",
  },
  {
    n: "05",
    name: "Orthopedics",
    description:
      "Bones, joints, and muscles. Sports injuries, arthritis, fractures, and recovery.",
    duration: "45 min",
  },
  {
    n: "06",
    name: "Lab & Diagnostics",
    description:
      "Blood work, urinalysis, imaging — with turnaround times that respect your day.",
    duration: "15 min",
  },
];

const doctors = [
  {
    name: "Sarah Mitchell",
    honorific: "Dr.",
    specialty: "Family Medicine",
    experience: "15 yrs",
    note: "On attentive, longitudinal care.",
  },
  {
    name: "James Chen",
    honorific: "Dr.",
    specialty: "Cardiology",
    experience: "12 yrs",
    note: "On the quiet signals of the heart.",
  },
  {
    name: "Maria Rodriguez",
    honorific: "Dr.",
    specialty: "Pediatrics",
    experience: "10 yrs",
    note: "On listening to small patients.",
  },
  {
    name: "David Kim",
    honorific: "Dr.",
    specialty: "Dermatology",
    experience: "8 yrs",
    note: "On the craft of the skin.",
  },
];

const principles = [
  {
    n: "I.",
    title: "Unhurried",
    text: "Visits designed around conversation — not a stopwatch.",
  },
  {
    n: "II.",
    title: "Continuous",
    text: "You see the same physician. They remember you.",
  },
  {
    n: "III.",
    title: "Considered",
    text: "Evidence-based care, explained in plain language.",
  },
  {
    n: "IV.",
    title: "Within reach",
    text: "Online booking, transparent pricing, most insurance accepted.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero — editorial masthead */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="eyebrow text-muted">
              Vol. XVI · CarePoint Medical · Spring MMXXVI
            </p>
            <p className="eyebrow text-muted hidden sm:block">
              A general practice
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
            <div className="lg:col-span-8">
              <p className="eyebrow text-accent">— Family medicine, reconsidered</p>
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl text-ink mt-6">
                A quieter kind
                <br />
                of care —{" "}
                <span className="italic text-primary">unhurried,</span>
                <br />
                <span className="italic text-primary">uncomplicated,</span> close to home.
              </h1>

              <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:items-center">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-between gap-6 bg-ink text-cream px-6 py-4 hover:bg-primary-dark transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Book an appointment
                  </span>
                  <span aria-hidden className="text-lg">→</span>
                </Link>
                <a
                  href="tel:5551234567"
                  className="inline-flex items-center gap-3 text-sm text-ink hover:text-accent transition-colors"
                >
                  <span className="font-serif italic">or call</span>
                  <span className="border-b border-ink pb-0.5">
                    (555) 123-4567
                  </span>
                </a>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:border-l border-border lg:pl-8 flex flex-col justify-between">
              <div>
                <p className="eyebrow text-muted">— A note from the editor</p>
                <p className="font-serif text-lg text-ink mt-4 leading-relaxed">
                  <span className="float-left font-serif text-6xl leading-[0.8] mr-2 mt-1 text-accent">
                    M
                  </span>
                  edicine, at its best, is not a transaction. It is a
                  relationship — built slowly, over time, in a room where
                  someone is genuinely listening.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-baseline justify-between">
                  <p className="font-serif text-4xl text-ink">
                    4,200<span className="text-accent">+</span>
                  </p>
                  <p className="eyebrow text-muted">patients</p>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <p className="font-serif text-4xl text-ink">
                    16<span className="text-accent">·</span>yrs
                  </p>
                  <p className="eyebrow text-muted">in practice</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="practice" className="bg-background-alt border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow text-muted">— §1 Practice</p>
              <h2 className="display text-4xl sm:text-5xl text-ink mt-4">
                Four quiet
                <br />
                principles.
              </h2>
              <p className="mt-6 text-muted leading-relaxed max-w-sm">
                How we work, in as few words as we can manage.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {principles.map((p) => (
                <div key={p.title} className="border-t-2 border-ink pt-5">
                  <p className="font-serif italic text-accent text-lg">{p.n}</p>
                  <h3 className="font-serif text-2xl text-ink mt-2">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services — numbered list */}
      <section id="services" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between border-b border-ink pb-6">
            <div>
              <p className="eyebrow text-muted">— §2 Services</p>
              <h2 className="display text-4xl sm:text-5xl text-ink mt-3">
                What we do.
              </h2>
            </div>
            <p className="hidden sm:block text-sm text-muted italic font-serif">
              Six disciplines under one roof.
            </p>
          </div>

          <ul>
            {services.map((s) => (
              <li
                key={s.name}
                className="group grid grid-cols-12 gap-4 items-baseline border-b border-border py-7 hover:bg-card transition-colors"
              >
                <span className="col-span-2 sm:col-span-1 font-serif italic text-accent text-lg">
                  — {s.n}
                </span>
                <h3 className="col-span-10 sm:col-span-3 font-serif text-xl sm:text-2xl text-ink">
                  {s.name}
                </h3>
                <p className="col-span-12 sm:col-span-6 text-sm text-muted leading-relaxed sm:pl-4">
                  {s.description}
                </p>
                <span className="col-span-12 sm:col-span-2 text-sm text-ink text-right eyebrow">
                  {s.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="bg-background-alt border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between border-b border-ink pb-6">
            <div>
              <p className="eyebrow text-muted">— §3 Our physicians</p>
              <h2 className="display text-4xl sm:text-5xl text-ink mt-3">
                The people
                <br className="sm:hidden" /> you will see.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doc, i) => (
              <article
                key={doc.name}
                className={`border-b border-border p-6 ${
                  i !== 0 ? "sm:border-l" : ""
                } ${i === 2 ? "lg:border-l" : ""} ${
                  i < 2 ? "sm:border-b-0 lg:border-b" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="font-serif italic text-accent">
                    Fig. {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="eyebrow text-muted">{doc.experience}</p>
                </div>
                <div className="mt-12 aspect-square bg-primary-light border border-border-strong flex items-center justify-center">
                  <span className="font-serif italic text-6xl text-primary-dark">
                    {doc.name
                      .split(" ")
                      .map((n) => n[0])
                      .join(".")}
                    .
                  </span>
                </div>
                <p className="mt-5 eyebrow text-primary">{doc.specialty}</p>
                <h3 className="font-serif text-xl text-ink mt-2">
                  {doc.honorific} {doc.name}
                </h3>
                <p className="mt-3 text-sm text-muted italic font-serif leading-snug">
                  &ldquo;{doc.note}&rdquo;
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent">— In closing</p>
              <h2 className="display text-5xl sm:text-6xl text-ink mt-5">
                Begin with a
                <br />
                <span className="italic">quiet</span> conversation.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-12">
              <p className="text-muted leading-relaxed">
                Booking takes under a minute. We&apos;ll confirm by email and
                save the rest for your visit.
              </p>
              <Link
                href="/book"
                className="mt-8 inline-flex items-center justify-between gap-6 w-full bg-ink text-cream px-6 py-5 hover:bg-primary-dark transition-colors"
              >
                <span className="text-sm font-medium tracking-wide">
                  Schedule your appointment
                </span>
                <span aria-hidden className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
