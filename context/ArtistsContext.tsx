import React, { createContext, useContext, useState } from 'react';
import { Artist } from '@/types';

interface ArtistsContextType {
  artists: Artist[];
  addArtist: (artist: Omit<Artist, 'id'>) => void;
  removeArtist: (id: number) => void;
}

const ArtistsContext = createContext<ArtistsContextType | undefined>(undefined);

const initialArtists: Artist[] = [
  {
    id: 1,
    name: 'Aarav Mehra',
    category: 'Singer',
    priceRange: '₹10,000 - ₹20,000',
    location: 'Mumbai',
    languages: ['Hindi', 'English'],
    image: '/images/singers.jpeg',
  },
  {
    id: 2,
    name: 'Ishita Roy',
    category: 'Dancer',
    priceRange: '₹8,000 - ₹15,000',
    location: 'Delhi',
    languages: ['Hindi'],
    image: '/images/dancers.jpeg',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    category: 'DJ',
    priceRange: '₹12,000 - ₹18,000',
    location: 'Bangalore',
    languages: ['English', 'Kannada'],
    image: '/images/djs.jpeg',
  },
  {
    id: 4,
    name: 'Priya Singh',
    category: 'Speaker',
    priceRange: '₹5,000 - ₹10,000',
    location: 'Mumbai',
    languages: ['Hindi', 'English'],
    image: '/images/speaker.jpeg',
  },
  {
    id: 5,
    name: 'Kabir Sharma',
    category: 'Singer',
    priceRange: '₹15,000 - ₹25,000',
    location: 'Delhi',
    languages: ['Hindi', 'Punjabi'],
    image: '/images/singers.jpeg',
  },
  {
    id: 6,
    name: 'Meera Nair',
    category: 'Dancer',
    priceRange: '₹7,000 - ₹12,000',
    location: 'Bangalore',
    languages: ['Malayalam', 'English'],
    image: '/images/dancers.jpeg',
  },
];

export const ArtistsProvider = ({ children }: { children: React.ReactNode }) => {
  const [artists, setArtists] = useState<Artist[]>(initialArtists);

  const addArtist = (artist: Omit<Artist, 'id'>) => {
    setArtists((prev) => [
      ...prev,
      { ...artist, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };

  const removeArtist = (id: number) => {
    setArtists((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ArtistsContext.Provider value={{ artists, addArtist, removeArtist }}>
      {children}
    </ArtistsContext.Provider>
  );
};

export const useArtists = () => {
  const ctx = useContext(ArtistsContext);
  if (!ctx) throw new Error('useArtists must be used within ArtistsProvider');
  return ctx;
}; 