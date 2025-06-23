'use client';

import React from "react";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { ArtistsProvider } from '@/context/ArtistsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ArtistsProvider>
      <ShortlistProvider>{children}</ShortlistProvider>
    </ArtistsProvider>
  );
}
