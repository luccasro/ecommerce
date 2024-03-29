"use client";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "../components/header";
import Providers from "./providers";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import Head from "next/head";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <style
        jsx
        global
      >{`:root { --font-sans: ${fontSans.style.fontFamily};}}`}</style>
      <body
        className={`min-h-screen antialiased ${fontSans.variable} font-sans`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
