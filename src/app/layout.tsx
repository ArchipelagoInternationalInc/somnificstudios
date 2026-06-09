import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates, Caveat } from "next/font/google";
import "./globals.css";

/* Body / UI text */
const bodyFont = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-body",
  display: "swap",
});

/* Wordmark / headings (Montserrat Alternates) */
const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-title",
  display: "swap",
});

/* Handwritten section labels */
const handFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Somnific Studios — Serenity Through Sleep",
  description:
    "Somnific Studios crafts immersive dreamscapes — ambient films and sleep stories made to quiet the mind, soften the night, and carry you gently into rest.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* data-motion / data-labels hardcoded per design-handoff direction */}
      <body
        data-motion="on"
        data-labels="handwritten"
        className={`${bodyFont.variable} ${titleFont.variable} ${handFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
