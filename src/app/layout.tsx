import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarePoint Medical Clinic",
  description:
    "Book your appointment at CarePoint Medical Clinic. Quality healthcare with experienced physicians.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-border bg-card">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">+</span>
              <span className="text-xl font-semibold text-foreground">
                CarePoint
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/book"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Book Appointment
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold text-foreground">
                  CarePoint Medical Clinic
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Providing quality healthcare for your whole family since 2010.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Contact</h3>
                <p className="mt-2 text-sm text-muted">
                  123 Health Avenue, Suite 100
                  <br />
                  Medical City, MC 12345
                  <br />
                  (555) 123-4567
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Hours</h3>
                <p className="mt-2 text-sm text-muted">
                  Mon - Fri: 8:00 AM - 6:00 PM
                  <br />
                  Saturday: 9:00 AM - 2:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            <p className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
              &copy; 2026 CarePoint Medical Clinic. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
