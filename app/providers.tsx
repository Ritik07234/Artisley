'use client';

import React, { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { ArtistsProvider } from '@/context/ArtistsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ArtistsProvider>
        <ShortlistProvider>{children}</ShortlistProvider>
      </ArtistsProvider>
    </ThemeProvider>
  );
}
