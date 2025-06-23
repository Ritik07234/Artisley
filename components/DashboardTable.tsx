import { Artist } from '@/types';
import { useState } from 'react';
import { useArtists } from '@/context/ArtistsContext';

interface Props {
  artists: Artist[];
}

/**
 * DashboardTable - Table for displaying artist submissions
 * Allows viewing and deleting rows (demo only)
 */
export default function DashboardTable({ artists }: Props) {
  const [rows, setRows] = useState(artists);
  const { removeArtist } = useArtists();

  // Handle delete (demo only, local state)
  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((a) => a.id !== id));
    removeArtist(id);
  };

  if (rows.length === 0) {
    return <div className="text-center text-gray-500 py-8">No artist submissions found.</div>;
  }

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-center font-semibold">Name</th>
          <th className="px-6 py-3 text-center font-semibold">Category</th>
          <th className="px-6 py-3 text-center font-semibold">City</th>
          <th className="px-6 py-3 text-center font-semibold">Fee</th>
          <th className="px-6 py-3 text-center font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a, idx) => (
          <tr key={a.id} className={`border-t ${idx === 0 ? 'bg-white dark:bg-gray-900 dark:text-white' : 'bg-white dark:bg-gray-900 dark:text-white'}`}>
            <td className="px-6 py-3 text-center align-middle">{a.name}</td>
            <td className="px-6 py-3 text-center align-middle">{a.category}</td>
            <td className="px-6 py-3 text-center align-middle">{a.location}</td>
            <td className="px-6 py-3 text-center align-middle">{a.priceRange}</td>
            <td className="px-6 py-3 text-center align-middle">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">View</button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 ml-2"
                onClick={() => handleDelete(a.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
