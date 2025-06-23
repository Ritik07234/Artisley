'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-primary">
        Artistly
      </Link>
      <div className="space-x-4">
        <Link href="/artists">Explore Artists</Link>
        <Link href="/onboard">Onboard Artist</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}
