import { Artist } from '@/types';

interface Props {
  artists: Artist[];
}

export default function DashboardTable({ artists }: Props) {
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
        {artists.map((a) => (
          <tr key={a.id} className="border-t">
            <td className="px-4 py-2">{a.name}</td>
            <td className="px-4 py-2">{a.category}</td>
            <td className="px-4 py-2">{a.location}</td>
            <td className="px-4 py-2">{a.priceRange}</td>
            <td className="px-4 py-2">
              <button className="bg-primary text-white px-3 py-1 rounded text-sm">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
