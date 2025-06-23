import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Book Verified Performing Artists for Your Events
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Connect with singers, dancers, DJs, speakers and more — directly through Artistly.com.
          </p>
          <Link href="/artists">
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90">
              Explore Artists
            </button>
          </Link>
        </section>

        {/* Category Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'Singers', icon: '🎤' },
            { title: 'Dancers', icon: '💃' },
            { title: 'Speakers', icon: '🎙️' },
            { title: 'DJs', icon: '🎧' }
          ].map((category) => (
            <div
              key={category.title}
              className="border rounded-lg p-6 text-center shadow hover:shadow-md transition"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
