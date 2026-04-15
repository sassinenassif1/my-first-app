import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-intake-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-intake-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-intake-mono",
  display: "swap",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-intake-arabic",
  display: "swap",
});

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
    <html
      lang="en"
      className={`h-full antialiased ${serif.variable} ${sans.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
