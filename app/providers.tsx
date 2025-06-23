'use client';

import React from "react";
import { ThemeProvider } from 'next-themes';
import { ShortlistProvider } from "@/context/ShortlistContext";
import { ArtistsProvider } from '@/context/ArtistsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ArtistsProvider>
        <ShortlistProvider>{children}</ShortlistProvider>
      </ArtistsProvider>
    </ThemeProvider>
  );
}
