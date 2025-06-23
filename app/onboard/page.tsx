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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Onboard a New Artist
        </h1>
        <ArtistForm onSuccess={() => setShowSuccess(true)} />
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
  );
}
