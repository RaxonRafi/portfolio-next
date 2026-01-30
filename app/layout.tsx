import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import type React from "react";
import "./globals.css";

// ═══════════════════════════════════════════════════════════════════════════
// 🔤 FONT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// Geist Sans - Primary heading font
const geistSans = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

// Geist Mono - Code/tech font
const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ["JetBrains Mono", "monospace"],
});

// ═══════════════════════════════════════════════════════════════════════════
// 📋 METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: "Muhammad Rafi | AI & Software Engineer",
  description: "Professional portfolio of Muhammad Rafi - Building exceptional digital experiences with AI, clean code, and modern technologies.",
  keywords: ["Muhammad Rafi", "Software Engineer", "AI", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Muhammad Rafi" }],
  openGraph: {
    title: "Muhammad Rafi | AI & Software Engineer",
    description: "Building exceptional digital experiences with AI, clean code, and modern technologies.",
    type: "website",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 🏗️ ROOT LAYOUT
// ═══════════════════════════════════════════════════════════════════════════

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
      </head>
      <body 
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}