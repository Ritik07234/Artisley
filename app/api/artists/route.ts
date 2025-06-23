import { NextResponse } from 'next/server';

const data = [
  {
    id: 1,
    name: 'Priya Sharma',
    category: 'Singer',
    priceRange: '₹10,000',
    location: 'Mumbai',
    languages: ['Hindi', 'English'],
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    category: 'DJ',
    priceRange: '₹15,000',
    location: 'Delhi',
    languages: ['English'],
  },
  {
    id: 3,
    name: 'Sanya Kapoor',
    category: 'Dancer',
    priceRange: '₹8,000',
    location: 'Bangalore',
    languages: ['Hindi'],
  },
];

export async function GET() {
  return NextResponse.json(data);
}
