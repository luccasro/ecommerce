"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { HydrationRenderProvider } from "@/hooks/useHydratationRender";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HydrationRenderProvider>{children}</HydrationRenderProvider>
    </ThemeProvider>
  );
}
