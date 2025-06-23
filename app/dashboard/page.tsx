'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardTable from '@/components/DashboardTable';
import { Artist } from '@/types';
import { useArtists } from '@/context/ArtistsContext';

export default function DashboardPage() {
  const { artists } = useArtists();

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Manager Dashboard</h1>

        {artists.length > 0 ? (
          <DashboardTable artists={artists} />
        ) : (
          <p className="text-center text-gray-500">No artist submissions found.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
