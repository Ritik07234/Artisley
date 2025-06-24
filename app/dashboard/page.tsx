'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardTable from '@/components/DashboardTable';
import { motion } from 'framer-motion';
import { useArtists } from '@/context/ArtistsContext';

export default function DashboardPage() {
  const { artists } = useArtists();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Navbar />
        <main className="pt-20 max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-primary dark:text-white">Artist Dashboard</h1>
            <p className="text-gray-600 dark:text-white">Manage and view all artists on the platform</p>
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search artists by name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto w-full">
              <DashboardTable artists={filteredArtists} />
            </div>
          </div>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
