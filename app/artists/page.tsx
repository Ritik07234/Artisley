'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const ArtistCard = lazy(() => import('@/components/ArtistCard'));
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
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
        <Navbar />
        <main className="pt-20 flex-1 flex flex-col lg:flex-row">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-80 lg:fixed lg:top-20 lg:left-0 lg:h-[calc(100vh-80px)] lg:overflow-y-auto bg-white text-black dark:bg-gray-700 dark:text-white backdrop-blur-sm lg:border-r lg:border-gray-200 dark:lg:border-gray-600 p-4 lg:p-6 z-20">
            <div className="space-y-6">
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
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white font-semibold transition-all duration-200 hover:border-black dark:hover:border-white focus:outline-none"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowShortlist((v) => !v)}
                  className={`px-4 py-2 rounded-full border font-semibold transition-all duration-200 focus:outline-none
                    ${showShortlist
                      ? 'bg-white dark:bg-gray-600 text-black dark:text-white border-black dark:border-white font-bold hover:border-black dark:hover:border-white'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white border-gray-200 dark:border-gray-600 hover:border-black dark:hover:border-white'}
                  `}
                >
                  {showShortlist ? 'Showing Favorites' : 'Show Favorites'}
                </button>
              </div>
            </div>
          </aside>

          {/* Artist Cards Section */}
          <section className="flex-1 lg:ml-80 p-4 lg:p-8">
            {/* Mobile & Tablet: Horizontal scroll with fixed card sizes */}
            <div className="lg:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-600 rounded-xl h-[320px] w-[260px] min-w-[260px] max-w-[260px] flex-shrink-0" />
                  ))
                ) : filteredArtists.length > 0 ? (
                  <AnimatePresence>
                    <Suspense fallback={<div className="w-[260px] h-[320px] flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-xl text-gray-600 dark:text-white">Loading...</div>}>
                      {filteredArtists.map((artist) => (
                        <motion.div
                          key={artist.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-[320px] w-[260px] min-w-[260px] max-w-[260px] flex-shrink-0"
                        >
                          <ArtistCard artist={artist} small />
                        </motion.div>
                      ))}
                    </Suspense>
                  </AnimatePresence>
                ) : (
                  <div className="w-full text-center py-8">
                    <p className="text-gray-500 dark:text-white">No artists found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: Responsive grid */}
            <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-600 rounded-xl h-[320px] w-full" />
                ))
              ) : filteredArtists.length > 0 ? (
                <AnimatePresence>
                  <Suspense fallback={<div className="w-full h-[320px] flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-xl text-gray-600 dark:text-white">Loading...</div>}>
                    {filteredArtists.map((artist) => (
                      <motion.div
                        key={artist.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <ArtistCard artist={artist} small />
                      </motion.div>
                    ))}
                  </Suspense>
                </AnimatePresence>
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500 dark:text-white">No artists found matching your filters.</p>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
