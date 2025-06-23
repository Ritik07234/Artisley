"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ShortlistContextType {
  shortlist: number[];
  toggleShortlist: (id: number) => void;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export const ShortlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [shortlist, setShortlist] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shortlist");
    if (stored) setShortlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("shortlist", JSON.stringify(shortlist));
  }, [shortlist]);

  const toggleShortlist = (id: number) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <ShortlistContext.Provider value={{ shortlist, toggleShortlist }}>
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used within ShortlistProvider");
  return ctx;
}; 