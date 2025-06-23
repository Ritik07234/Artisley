'use client';

import { Artist } from '@/types';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{artist.name}</h2>
      <p className="text-sm text-gray-500">{artist.category}</p>
      <p className="text-sm text-gray-600 mt-1">{artist.location}</p>
      <p className="text-sm text-gray-600">{artist.priceRange}</p>
      <button className="mt-3 px-4 py-1 bg-primary text-white rounded hover:bg-primary/90">
        Ask for Quote
      </button>
    </div>
  );
}
