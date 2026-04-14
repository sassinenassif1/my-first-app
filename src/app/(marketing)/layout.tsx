import Link from "next/link";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-baseline gap-3">
            <span className="font-serif text-2xl tracking-tight text-ink">
              CarePoint
            </span>
            <span className="eyebrow text-muted hidden sm:inline">
              Est. 2010
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/#services"
              className="hidden sm:inline text-sm text-muted hover:text-ink transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#doctors"
              className="hidden sm:inline text-sm text-muted hover:text-ink transition-colors"
            >
              Doctors
            </Link>
            <Link
              href="/#practice"
              className="hidden sm:inline text-sm text-muted hover:text-ink transition-colors"
            >
              Practice
            </Link>
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Book a visit
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <p className="eyebrow text-muted">— Colophon</p>
              <h3 className="font-serif text-3xl text-ink mt-3 leading-tight">
                A quieter kind of care,
                <br />
                in practice since 2010.
              </h3>
            </div>
            <div className="sm:col-span-3 sm:col-start-7">
              <p className="eyebrow text-muted">— Visit</p>
              <p className="mt-3 text-sm text-ink leading-relaxed">
                123 Health Avenue
                <br />
                Suite 100
                <br />
                Medical City, MC 12345
              </p>
              <p className="mt-3 text-sm text-muted">(555) 123-4567</p>
            </div>
            <div className="sm:col-span-3">
              <p className="eyebrow text-muted">— Hours</p>
              <dl className="mt-3 space-y-1 text-sm text-ink">
                <div className="flex justify-between">
                  <dt className="text-muted">Mon–Fri</dt>
                  <dd>8 – 18</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Saturday</dt>
                  <dd>9 – 14</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Sunday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-t border-border pt-8">
            <p className="font-serif italic text-muted text-sm">
              © MMXXVI CarePoint Medical — all rights reserved.
            </p>
            <p className="eyebrow text-muted">Issue 01 · Spring</p>
          </div>
        </div>
      </footer>
    </>
  );
}
