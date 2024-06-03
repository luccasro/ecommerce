"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider refetchOnWindowFocus={false}>
        <WishlistProvider>{children}</WishlistProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
