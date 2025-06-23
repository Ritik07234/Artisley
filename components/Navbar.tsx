'use client';

import Link from 'next/link';
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center transition-colors relative">
      <Link
        href="/"
        className="text-xl font-bold text-primary transition-all duration-200 px-3 py-1 rounded-full hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-2xl focus:text-2xl"
      >
        Artistly
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
        <Link
          href="/artists"
          className="relative text-gray-700 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Explore Artists
        </Link>
        <Link
          href="/onboard"
          className="relative text-gray-700 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Onboard Artist
        </Link>
        <Link
          href="/dashboard"
          className="relative text-gray-700 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Dashboard
        </Link>
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex items-center">
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-48 bg-white rounded-xl shadow-lg flex flex-col py-2 z-50 animate-fade-in">
          <Link
            href="/artists"
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-base font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(false)}
          >
            Explore Artists
          </Link>
          <Link
            href="/onboard"
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-base font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(false)}
          >
            Onboard Artist
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 text-base font-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
