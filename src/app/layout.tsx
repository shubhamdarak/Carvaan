import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Carvaan, Creator Marketing, Managed with Clarity",
    template: "%s | Carvaan",
  },
  description:
    "Carvaan helps brands and agencies discover creators, manage campaigns, approve content, and track performance from one professional dashboard. Built for the GCC market.",
  keywords: ["influencer marketing", "creator marketing", "GCC", "UAE", "Saudi Arabia", "brand campaigns"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
