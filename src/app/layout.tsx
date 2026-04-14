import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarePoint — A Quieter Kind of Care",
  description:
    "Thoughtful, unhurried medicine for the whole family. Book an appointment with CarePoint Medical.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
