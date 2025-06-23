'use client';

import { Artist } from '@/types';
import { useShortlist } from '@/context/ShortlistContext';
import { Heart, HeartOff } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { shortlist, toggleShortlist } = useShortlist();
  const isFavorited = shortlist.includes(artist.id);
  return (
    <div className="border rounded-xl shadow bg-white dark:bg-gray-900 dark:border-gray-700 hover:shadow-lg transition-all duration-200 flex flex-col h-[300px] w-full max-w-xs mx-auto relative">
      <div className="w-full flex-shrink-0 relative" style={{ height: '65%' }}>
        <img
          src={artist.image || (artist.category === 'Singer' ? '/images/singers.jpeg' : artist.category === 'Dancer' ? '/images/dancers.jpeg' : artist.category === 'DJ' ? '/images/djs.jpeg' : '/images/speaker.jpeg')}
          alt={artist.name + ' profile'}
          className="w-full h-full object-cover rounded-t-xl"
          style={{ aspectRatio: '1 / 1', height: '100%' }}
          loading="lazy"
        />
        <button
          aria-label={isFavorited ? 'Remove from shortlist' : 'Add to shortlist'}
          onClick={() => toggleShortlist(artist.id)}
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 rounded-full p-1 shadow hover:scale-110 transition-all"
        >
          {isFavorited ? <Heart className="w-5 h-5 text-red-500 fill-red-500" /> : <HeartOff className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 py-2 px-2" style={{ height: '35%' }}>
        <h2 className="text-base font-semibold dark:text-white text-center">{artist.name}</h2>
        <p className="text-xs text-gray-500 dark:text-gray-300 text-center">{artist.category}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">{artist.location}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{artist.priceRange}</p>
        <button className="mt-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 transition-colors duration-200 text-xs">
          Ask for Quote
        </button>
      </div>
    </div>
  );
}
