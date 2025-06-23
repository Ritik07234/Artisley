'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import FilterBlock from '@/components/FilterBlock';
import { Artist } from '@/types';
import { useShortlist } from '@/context/ShortlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArtistListingPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShortlist, setShowShortlist] = useState(false);
  const { shortlist } = useShortlist();

  // Mock API fetch
  useEffect(() => {
    setLoading(true);
    fetch('/api/artists')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setFilteredArtists(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error('Failed to fetch artists:', err);
      });
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = [...artists];

    if (selectedCategory.length > 0) {
      result = result.filter((a) => selectedCategory.includes(a.category));
    }

    if (selectedLocation.length > 0) {
      result = result.filter((a) => selectedLocation.includes(a.location));
    }

    if (selectedPrice.length > 0) {
      result = result.filter((a) =>
        selectedPrice.some((range) => a.priceRange.includes(range))
      );
    }

    if (showShortlist) {
      result = result.filter((a) => shortlist.includes(a.id));
    }

    setFilteredArtists(result);
  }, [selectedCategory, selectedLocation, selectedPrice, artists, shortlist, showShortlist]);

  // Filter handler
  const toggleFilter = (value: string, type: 'category' | 'location' | 'price') => {
    const stateMap = {
      category: [selectedCategory, setSelectedCategory],
      location: [selectedLocation, setSelectedLocation],
      price: [selectedPrice, setSelectedPrice],
    } as const;

    const [selected, setSelected] = stateMap[type];

    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedLocation([]);
    setSelectedPrice([]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Explore Artists</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black transition-all"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setShowShortlist((v) => !v)}
              className={`px-4 py-1 rounded border transition-all ${showShortlist ? 'bg-primary text-white dark:bg-yellow-400 dark:text-black border-primary dark:border-yellow-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700'}`}
            >
              {showShortlist ? 'Showing Favorites' : 'Show Favorites'}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className="space-y-4">
            <FilterBlock
              title="Category"
              options={['Singer', 'Dancer', 'Speaker', 'DJ']}
              selected={selectedCategory}
              onChange={(val) => toggleFilter(val, 'category')}
            />
            <FilterBlock
              title="Location"
              options={['Mumbai', 'Delhi', 'Bangalore']}
              selected={selectedLocation}
              onChange={(val) => toggleFilter(val, 'location')}
            />
            <FilterBlock
              title="Price Range"
              options={['₹5,000', '₹10,000', '₹20,000']}
              selected={selectedPrice}
              onChange={(val) => toggleFilter(val, 'price')}
            />
          </aside>

          {/* Artist Cards */}
          <section className="md:col-span-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-[300px] w-full max-w-xs mx-auto" />
              ))
            ) : filteredArtists.length > 0 ? (
              <AnimatePresence>
                {filteredArtists.map((artist) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArtistCard artist={artist} />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <p>No artists found matching your filters.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
