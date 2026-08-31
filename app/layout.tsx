import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeSalt™ — Precision Electrolyte Seasoning",
  description: "The first seasoning engineered around your sodium-to-potassium ratio. 50% less sodium. Zero potassium chloride. Same great taste as salt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">{children}</body>
    </html>
  );
}
