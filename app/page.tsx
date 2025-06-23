'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { title: 'Singers', img: '/images/singers.jpeg', alt: 'Singer performing' },
  { title: 'Dancers', img: '/images/dancers.jpeg', alt: 'Dancer in motion' },
  { title: 'Speakers', img: '/images/speaker.jpeg', alt: 'Public speaker' },
  { title: 'DJs', img: '/images/djs.jpeg', alt: 'DJ at work' },
];

/**
 * HomePage - Main landing page for Artistly
 * Shows hero, platform overview, category cards, and navigation
 */
export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-6">
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
        {/* Platform Overview */}
        <section className="text-center mb-12">
          <p className="text-base text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Artistly.com is a platform for event planners and artist managers to connect. Browse verified artist profiles, filter by category, location, or price, and send booking requests directly. Artist managers can onboard new talent and manage leads with ease.
          </p>
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
                className="mx-auto mb-2 w-full h-24 object-cover border border-gray-200 dark:border-gray-700"
                height={96}
                width={96}
                loading="lazy"
              />
              <h3 className="text-lg font-semibold dark:text-white mt-2">{category.title}</h3>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
