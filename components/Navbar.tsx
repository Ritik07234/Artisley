'use client';

import Link from 'next/link';
import { Menu, Home, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // Prevent hydration mismatch by only rendering theme toggle after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow px-6 py-4 flex justify-between items-center transition-colors z-50">
      <Link
        href="/"
        className="text-xl font-bold text-primary transition-all duration-200 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-2xl focus:text-2xl flex items-center gap-2"
      >
        <Home className="w-6 h-6" />
        Artistly
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
        <Link
          href="/artists"
          className="relative text-gray-700 dark:text-gray-300 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Explore Artists
        </Link>
        <Link
          href="/onboard"
          className="relative text-gray-700 dark:text-gray-300 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Onboard Artist
        </Link>
        <Link
          href="/dashboard"
          className="relative text-gray-700 dark:text-gray-300 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Dashboard
        </Link>
        {/* Theme Toggle Button */}
        {mounted && (
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex items-center">
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
        {/* Theme Toggle Button (Mobile) */}
        {mounted && (
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col py-2 z-50 animate-fade-in border border-gray-200 dark:border-gray-700">
          <Link
            href="/artists"
            className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-base font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(false)}
          >
            Explore Artists
          </Link>
          <Link
            href="/onboard"
            className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-base font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(false)}
          >
            Onboard Artist
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-base font-medium hover:text-primary dark:text-gray-300 dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
