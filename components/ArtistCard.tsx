'use client';

import { Artist } from '@/types';
import { useShortlist } from '@/context/ShortlistContext';
import { Heart, HeartOff } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  small?: boolean;
}

const ArtistCard = ({ artist, small }: ArtistCardProps) => {
  const { shortlist, toggleShortlist } = useShortlist();
  const isFavorited = shortlist.includes(artist.id);
  return (
    <div className={`border rounded-xl shadow bg-white dark:bg-gray-900 dark:border-gray-700 hover:shadow-lg transition-all duration-200 flex flex-col w-full h-full max-w-none relative ${small ? 'h-[320px]' : 'h-[360px]'}`}>
      <div className={`w-full flex-shrink-0 flex items-center justify-center relative ${small ? 'h-[65%]' : 'h-[60%]'}`}>
        <img
          src={artist.image || (artist.category === 'Singer' ? '/images/singers.jpeg' : artist.category === 'Dancer' ? '/images/dancers.jpeg' : artist.category === 'DJ' ? '/images/djs.jpeg' : '/images/speaker.jpeg')}
          alt={artist.name + ' profile'}
          className={`object-cover object-top rounded-full border-4 border-white dark:border-gray-900 ${small ? 'w-20 h-20 mt-2' : 'w-28 h-28 mt-2'} shadow-md`}
          loading="lazy"
        />
        <button
          aria-label={isFavorited ? 'Remove from shortlist' : 'Add to shortlist'}
          onClick={() => toggleShortlist(artist.id)}
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 rounded-full p-1 shadow hover:scale-110 transition-all z-10"
        >
          {isFavorited ? <Heart className="w-5 h-5 text-red-500 fill-red-500" /> : <HeartOff className="w-5 h-5 text-gray-400" />}
        </button>
      </div>
      <div className={`flex flex-col items-center justify-center flex-1 py-2 px-2 ${small ? 'h-[35%]' : 'h-[40%]'}`}>
        <h2 className={`text-center font-semibold dark:text-white ${small ? 'text-sm' : 'text-base'} mb-1`}>{artist.name}</h2>
        <p className={`text-center ${small ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-300 mb-1`}>{artist.category}</p>
        <p className={`text-center ${small ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400 mb-1`}>{artist.location}</p>
        <p className={`text-center ${small ? 'text-xs' : 'text-sm'} text-gray-600 dark:text-gray-400 mb-1`}>{artist.priceRange}</p>
        <p className={`text-center ${small ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-300 mb-2`}>{artist.languages && artist.languages.length > 0 ? artist.languages.join(', ') : ''}</p>
        <button className={`px-3 py-1 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200 ${small ? 'text-xs' : 'text-sm'}`}>
          Ask for Quote
        </button>
      </div>
    </div>
  );
};

export default ArtistCard;
