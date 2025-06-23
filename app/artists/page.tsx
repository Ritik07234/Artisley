'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import FilterBlock from '@/components/FilterBlock';
import { Artist } from '@/types';
import { useShortlist } from '@/context/ShortlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtists } from '@/context/ArtistsContext';

export default function ArtistListingPage() {
  const { artists } = useArtists();
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artists);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShortlist, setShowShortlist] = useState(false);
  const { shortlist } = useShortlist();

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

    // Always show at least the first three artists if no filters are applied
    if (
      selectedCategory.length === 0 &&
      selectedLocation.length === 0 &&
      selectedPrice.length === 0 &&
      !showShortlist
    ) {
      result = artists.slice(0, 3).concat(artists.slice(3));
    }

    setFilteredArtists(result);
    setLoading(false);
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
      <main className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Filter Sidebar */}
        <aside className="space-y-4 w-full md:w-64 flex-shrink-0 md:sticky md:top-24 h-fit">
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
          <div className="flex gap-2 mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-1 rounded-full border border-gray-200 bg-gray-100 text-gray-700 font-semibold transition-all duration-200 hover:border-black focus:border-black focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setShowShortlist((v) => !v)}
              className={`px-4 py-1 rounded-full border font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary
                ${showShortlist
                  ? 'bg-white text-black border-black font-bold hover:border-black focus:border-black'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-black focus:border-black'}
              `}
            >
              {showShortlist ? 'Showing Favorites' : 'Show Favorites'}
            </button>
          </div>
        </aside>
        {/* Artist Cards Section */}
        <section className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] pl-0 md:pl-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl h-[220px] w-full max-w-xs mx-auto" />
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
                    <ArtistCard artist={artist} small />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <p>No artists found matching your filters.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
