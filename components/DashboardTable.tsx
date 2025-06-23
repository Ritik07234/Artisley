import { Artist } from '@/types';
import { useState } from 'react';

interface Props {
  artists: Artist[];
}

/**
 * DashboardTable - Table for displaying artist submissions
 * Allows viewing and deleting rows (demo only)
 */
export default function DashboardTable({ artists }: Props) {
  const [rows, setRows] = useState(artists);

  // Handle delete (demo only, local state)
  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((a) => a.id !== id));
  };

  if (rows.length === 0) {
    return <div className="text-center text-gray-500 py-8">No artist submissions found.</div>;
  }

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-left">City</th>
          <th className="px-4 py-2 text-left">Fee</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => (
          <tr key={a.id} className="border-t">
            <td className="px-4 py-2">{a.name}</td>
            <td className="px-4 py-2">{a.category}</td>
            <td className="px-4 py-2">{a.location}</td>
            <td className="px-4 py-2">{a.priceRange}</td>
            <td className="px-4 py-2 flex gap-2">
              <button className="bg-primary text-white px-3 py-1 rounded text-sm">View</button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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
