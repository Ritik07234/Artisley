// Demo SSG Page for Interview Bonus
import Link from 'next/link';

export const dynamic = 'force-static'; // For Next.js App Router SSG

export default async function DemoSSGPage() {
  // Simulate static data fetch
  const artists = [
    { id: 1, name: 'Aarav Mehra', category: 'Singer' },
    { id: 2, name: 'Ishita Roy', category: 'Dancer' },
    { id: 3, name: 'Rahul Verma', category: 'DJ' },
  ];
  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Static Artists (SSG Demo)</h1>
      <ul className="divide-y divide-gray-200">
        {artists.map((artist) => (
          <li key={artist.id} className="py-3 flex justify-between items-center">
            <span className="font-medium">{artist.name}</span>
            <span className="text-sm text-gray-500">{artist.category}</span>
          </li>
        ))}
      </ul>
      <Link href="/" className="inline-block mt-6 text-blue-600 underline">Back to Home</Link>
    </main>
  );
} 