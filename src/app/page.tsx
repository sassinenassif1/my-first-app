import Link from "next/link";

const services = [
  {
    name: "General Checkup",
    description:
      "Comprehensive health examination including vital signs, physical exam, and preventive screening.",
    duration: "30 min",
  },
  {
    name: "Pediatrics",
    description:
      "Specialized care for infants, children, and adolescents including immunizations and growth monitoring.",
    duration: "30 min",
  },
  {
    name: "Cardiology",
    description:
      "Heart health evaluation including ECG, blood pressure management, and cardiovascular risk assessment.",
    duration: "45 min",
  },
  {
    name: "Dermatology",
    description:
      "Skin, hair, and nail conditions including acne, eczema, mole checks, and cosmetic treatments.",
    duration: "30 min",
  },
  {
    name: "Orthopedics",
    description:
      "Bone, joint, and muscle care including sports injuries, arthritis, and fracture treatment.",
    duration: "45 min",
  },
  {
    name: "Lab & Diagnostics",
    description:
      "Blood work, urinalysis, imaging, and other diagnostic tests with fast turnaround times.",
    duration: "15 min",
  },
];

const doctors = [
  { name: "Dr. Sarah Mitchell", specialty: "Family Medicine", experience: "15 years" },
  { name: "Dr. James Chen", specialty: "Cardiology", experience: "12 years" },
  { name: "Dr. Maria Rodriguez", specialty: "Pediatrics", experience: "10 years" },
  { name: "Dr. David Kim", specialty: "Dermatology", experience: "8 years" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Your Health, Our Priority
            </h1>
            <p className="mt-4 text-lg text-white/90">
              At CarePoint Medical Clinic, we provide compassionate,
              comprehensive healthcare for your entire family. Book an
              appointment today and experience the difference.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/book"
                className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-primary-dark transition-colors hover:bg-primary-light"
              >
                Book an Appointment
              </Link>
              <a
                href="tel:5551234567"
                className="rounded-lg border-2 border-white/30 px-6 py-3 text-center font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Why Choose CarePoint?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Experienced Doctors",
                text: "Board-certified physicians with decades of combined experience.",
              },
              {
                title: "Easy Booking",
                text: "Book your appointment online anytime, 24/7 convenience.",
              },
              {
                title: "Modern Facilities",
                text: "State-of-the-art equipment and comfortable, clean environment.",
              },
              {
                title: "Affordable Care",
                text: "We accept most insurance plans and offer competitive self-pay rates.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-accent px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            From routine checkups to specialized care, we offer a full range of
            medical services to keep you and your family healthy.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary-dark">
                    {service.duration}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Meet Our Doctors
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doc) => (
              <div
                key={doc.name}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-2xl font-bold text-primary-dark">
                  {doc.name.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {doc.name}
                </h3>
                <p className="text-sm text-primary">{doc.specialty}</p>
                <p className="mt-1 text-xs text-muted">
                  {doc.experience} experience
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold">Ready to Book Your Visit?</h2>
          <p className="mt-3 text-white/90">
            Schedule your appointment today and take the first step toward
            better health.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary-dark transition-colors hover:bg-primary-light"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
