import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistForm from '@/components/ArtistForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artist Onboarding | Artistly',
  description: 'Onboard new performing artists to the Artistly platform.',
};

export default function OnboardPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Onboard a New Artist
        </h1>
        <ArtistForm />
      </main>
      <Footer />
    </>
  );
}
