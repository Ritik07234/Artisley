import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const categories = [
  { title: 'Singers', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400&facepad=2', alt: 'Singer performing' },
  { title: 'Dancers', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=400&facepad=2', alt: 'Dancer in motion' },
  { title: 'Speakers', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&facepad=2', alt: 'Public speaker' },
  { title: 'DJs', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&facepad=2', alt: 'DJ at work' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary dark:text-white">
            Book Verified Performing Artists for Your Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Connect with singers, dancers, DJs, speakers and more — directly through Artistly.com.
          </p>
          <Link href="/artists">
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
              Explore Artists
            </button>
          </Link>
        </section>

        {/* Category Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="border rounded-lg p-6 text-center shadow bg-white dark:bg-gray-900 dark:border-gray-700 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-primary dark:hover:border-yellow-400 cursor-pointer"
            >
              <img
                src={category.img}
                alt={category.alt}
                className="mx-auto mb-2 h-20 w-20 object-cover rounded-full border border-gray-200 dark:border-gray-700"
                height={80}
                width={80}
                loading="lazy"
              />
              <h3 className="text-lg font-semibold dark:text-white mt-2">{category.title}</h3>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
