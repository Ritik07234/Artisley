'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

const categories = [
  {
    title: 'Singers',
    img: '/images/singers.jpeg',
    alt: 'Professional singers performing on stage'
  },
  {
    title: 'Dancers',
    img: '/images/dancers.jpeg',
    alt: 'Dancers performing contemporary dance'
  },
  {
    title: 'Speakers',
    img: '/images/speaker.jpeg',
    alt: 'Professional speaker addressing audience'
  },
  {
    title: 'DJs',
    img: '/images/djs.jpeg',
    alt: 'DJ mixing music at a party'
  }
];

/**
 * HomePage - Main landing page for Artistly
 * Shows hero, platform overview, category cards, and navigation
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
      <Head>
        <title>Artistly | Book Performing Artists</title>
        <meta name="description" content="Book singers, dancers, DJs, speakers and more for your events. Artistly.com is a platform for event planners and artist managers to connect." />
        <meta property="og:title" content="Artistly | Book Performing Artists" />
        <meta property="og:description" content="Book singers, dancers, DJs, speakers and more for your events." />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Artistly | Book Performing Artists" />
        <meta name="twitter:description" content="Book singers, dancers, DJs, speakers and more for your events." />
        <meta name="twitter:image" content="/images/og-image.png" />
      </Head>
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <main className="pt-20 max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-4 text-primary dark:text-white">
              Book Verified Performing Artists for Your Events
            </h1>
            <p className="text-gray-600 dark:text-white max-w-xl mx-auto">
              Connect with singers, dancers, DJs, speakers and more — directly through Artistly.com.
            </p>
            <div className="flex flex-col sm:flex-row gap-1 justify-center mt-6">
              <Link 
                href="/artists"
                className="bg-blue-500 text-black dark:bg-blue-500 dark:text-black px-6 py-2 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-black dark:hover:text-black transition-colors text-center"
              >
                Explore Artists
              </Link>
              <Link 
                href="/onboard"
                className="bg-blue-500 text-black dark:bg-blue-500 dark:text-black px-6 py-2 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-black dark:hover:text-black transition-colors text-center"
              >
                Join as Artist
              </Link>
            </div>
          </section>
          {/* Platform Overview */}
          <section className="text-center mb-12">
            <p className="text-base text-gray-700 dark:text-white max-w-2xl mx-auto">
              Artistly.com is a platform for event planners and artist managers to connect. Browse verified artist profiles, filter by category, location, or price, and send booking requests directly. Artist managers can onboard new talent and manage leads with ease.
            </p>
          </section>
          {/* Category Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" aria-label="Artist Categories">
            {categories.map((category) => (
              <div
                key={category.title}
                className="border rounded-lg p-6 text-center shadow bg-white dark:bg-gray-700 dark:border-gray-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-primary dark:hover:border-blue-400 cursor-pointer"
              >
                <Image
                  src={category.img}
                  alt={category.alt}
                  className="mx-auto mb-2 w-full h-24 object-cover object-top rounded-full border border-gray-200 dark:border-gray-600"
                  height={96}
                  width={96}
                  loading="lazy"
                />
                <h2 className="text-lg font-semibold dark:text-white mt-2">{category.title}</h2>
              </div>
            ))}
          </section>
        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
