import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

// 1. Import server-side session fetching functions






const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Rafi | Portfolio",
  description: "Professional portfolio of Muhammad Rafi - Software Developer",
};

// 3. Make the RootLayout function async
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}