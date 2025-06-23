'use client';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useArtists } from '@/context/ArtistsContext';

const schema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().required(),
  category: yup.array().min(1).required(),
  languages: yup.array().min(1).required(),
  priceRange: yup.string().required(),
  location: yup.string().required()
});

/**
 * ArtistForm - Form for onboarding a new artist
 * @param onSuccess - callback to show success message after submit
 */
export default function ArtistForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      bio: '',
      category: [],
      languages: [],
      priceRange: '',
      location: ''
    }
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { addArtist } = useArtists();

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle form submit
  const onSubmit = (data: any) => {
    let imageUrl = '';
    if (image) {
      imageUrl = URL.createObjectURL(image);
    } else {
      const cat = data.category[0];
      if (cat === 'Singer') imageUrl = '/images/singers.jpeg';
      else if (cat === 'Dancer') imageUrl = '/images/dancers.jpeg';
      else if (cat === 'DJ') imageUrl = '/images/djs.jpeg';
      else if (cat === 'Speaker') imageUrl = '/images/speaker.jpeg';
      else imageUrl = '/images/singers.jpeg';
    }
    addArtist({
      name: data.name,
      category: data.category[0] || '',
      priceRange: data.priceRange,
      location: data.location,
      languages: data.languages,
      image: imageUrl,
    });
    reset();
    setImage(null);
    setPreview(null);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">Name</label>
          <input id="name" {...register('name')} className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter artist's name" />
          {errors.name && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
        <div>
          <label htmlFor="location" className="block font-semibold mb-1">Location</label>
          <input id="location" {...register('location')} className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Mumbai, Delhi" />
          {errors.location && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      </div>
      <div>
        <label htmlFor="bio" className="block font-semibold mb-1">Bio</label>
        <textarea id="bio" {...register('bio')} className="w-full min-h-[80px] border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Write a short bio about the artist..." />
        {errors.bio && <p className="text-red-500 text-sm mt-1">Required</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {['Singer', 'Dancer', 'Speaker', 'DJ'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={field.value.includes(cat)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) field.onChange([...field.value, cat]);
                        else field.onChange(field.value.filter((c: string) => c !== cat));
                      }}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">Select at least one</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Languages</label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {['Hindi', 'English', 'Punjabi'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700">
                    <input
                      type="checkbox"
                      value={lang}
                      checked={field.value.includes(lang)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) field.onChange([...field.value, lang]);
                        else field.onChange(field.value.filter((l: string) => l !== lang));
                      }}
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.languages && <p className="text-red-500 text-sm mt-1">Select at least one</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="priceRange" className="block font-semibold mb-1">Fee Range</label>
          <select id="priceRange" {...register('priceRange')} className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Select fee range</option>
            <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
            <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
            <option value="₹20,000+">₹20,000+</option>
          </select>
          {errors.priceRange && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
        <div>
          <label htmlFor="profileImage" className="block font-semibold mb-1">Profile Image (Optional)</label>
          <input id="profileImage" type="file" className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="Profile Preview" className="mt-2 w-24 h-24 object-cover rounded-full border" />
          )}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold mt-4 hover:bg-blue-600 transition-colors block mx-auto">Submit</button>
    </form>
  );
}
