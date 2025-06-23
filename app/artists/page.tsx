'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import FilterBlock from '@/components/FilterBlock';
import { Artist } from '@/types'; // ✅ This will now work

export default function ArtistListingPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

  // Mock API fetch
  useEffect(() => {
    fetch('/api/artists')
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setFilteredArtists(data);
      })
      .catch((err) => console.error('Failed to fetch artists:', err));
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

    setFilteredArtists(result);
  }, [selectedCategory, selectedLocation, selectedPrice, artists]);

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

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Explore Artists</h1>

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
            {filteredArtists.length > 0 ? (
              filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))
            ) : (
              <p>No artists found matching your filters.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
