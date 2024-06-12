"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { BagProvider } from "@/contexts/bag-contex";
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
        <BagProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </BagProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
