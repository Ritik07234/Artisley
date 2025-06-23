'use client';

import Link from 'next/link';
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="bg-white dark:bg-gray-900 border-b shadow px-6 py-4 flex justify-between items-center transition-colors">
      <Link href="/" className="text-xl font-bold text-primary dark:text-white">
        Artistly
      </Link>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Link
          href="/artists"
          className="relative dark:text-gray-100 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Explore Artists
        </Link>
        <Link
          href="/onboard"
          className="relative dark:text-gray-100 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Onboard Artist
        </Link>
        <Link
          href="/dashboard"
          className="relative dark:text-gray-100 transition-all duration-200 px-3 py-1 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-primary hover:text-lg focus:text-lg"
        >
          Dashboard
        </Link>
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="ml-2 p-2 rounded transition-all duration-200 bg-gray-100 dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400 transition-colors" /> : <Moon className="w-5 h-5 text-gray-800 transition-colors" />}
        </button>
      </div>
    </nav>
  );
}
