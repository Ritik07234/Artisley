'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistForm from '@/components/ArtistForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/**
 * OnboardPage - Artist onboarding form page
 * Shows a multi-section form for onboarding new artists
 */
export default function OnboardPage() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Navbar />
        <main className="pt-20 min-h-[80vh] flex flex-col items-center justify-center py-10 px-2">
          <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center text-primary dark:text-white">Onboard a New Artist</h1>
            <p className="text-center text-gray-600 dark:text-white mb-8">Fill out the form below to add a new artist to the platform.</p>
            <ArtistForm onSuccess={() => setShowSuccess(true)} />
          </div>
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50"
              >
                Artist submitted successfully!
                <button className="ml-4 underline" onClick={() => setShowSuccess(false)}>Close</button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
