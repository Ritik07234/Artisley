'use client';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useArtists } from '@/context/ArtistsContext';
import Image from 'next/image';

const schema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().required(),
  category: yup.array().min(1).required(),
  languages: yup.array().min(1).required(),
  priceRange: yup.string().required(),
  location: yup.string().required()
});

const DEFAULT_LANGUAGES = ['Hindi', 'English', 'Punjabi'];

type ArtistFormData = {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  priceRange: string;
  location: string;
};

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
  const [customLanguage, setCustomLanguage] = useState('');
  const [languageOptions, setLanguageOptions] = useState(DEFAULT_LANGUAGES);
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
  const onSubmit = (data: ArtistFormData) => {
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
    
    // Create separate cards for each category selected
    data.category.forEach((cat: string) => {
      addArtist({
        name: data.name,
        category: cat,
        priceRange: data.priceRange,
        location: data.location,
        languages: data.languages,
        image: imageUrl,
      });
    });
    
    reset();
    setImage(null);
    setPreview(null);
    setCustomLanguage('');
    setLanguageOptions(DEFAULT_LANGUAGES);
    if (onSuccess) onSuccess();
  };

  // Add custom language
  const addCustomLanguage = () => {
    const trimmed = customLanguage.trim();
    if (
      trimmed &&
      !languageOptions.includes(trimmed)
    ) {
      setLanguageOptions((prev) => [...prev, trimmed]);
      setCustomLanguage('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">Name</label>
          <input id="name" {...register('name')} className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter artist's name" aria-invalid={!!errors.name} aria-describedby="name-error" />
          {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">Required</p>}
        </div>
        <div>
          <label htmlFor="location" className="block font-semibold mb-1">Location</label>
          <input id="location" {...register('location')} className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Mumbai, Delhi" />
          {errors.location && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      </div>
      <div>
        <label htmlFor="bio" className="block font-semibold mb-1">Bio</label>
        <textarea id="bio" {...register('bio')} className="w-full min-h-[80px] border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Write a short bio about the artist..." aria-invalid={!!errors.bio} aria-describedby="bio-error" />
        {errors.bio && <p id="bio-error" className="text-red-500 text-sm mt-1" role="alert">Required</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Category (Select all that apply)</label>
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
          {errors.category && <p className="text-red-500 text-sm mt-1" role="alert">Select at least one</p>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Languages</label>
          <Controller
            control={control}
            name="languages"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((lang) => (
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value)}
                    placeholder="Add custom language..."
                    className="flex-1 border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomLanguage())}
                  />
                  <button
                    type="button"
                    onClick={addCustomLanguage}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {field.value.length > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Selected: {field.value.join(', ')}
                  </div>
                )}
              </div>
            )}
          />
          {errors.languages && <p className="text-red-500 text-sm mt-1" role="alert">Select at least one</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="priceRange" className="block font-semibold mb-1">Fee Range</label>
          <select id="priceRange" {...register('priceRange')} className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-invalid={!!errors.priceRange} aria-describedby="priceRange-error">
            <option value="">Select fee range</option>
            <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
            <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
            <option value="₹20,000+">₹20,000+</option>
          </select>
          {errors.priceRange && <p id="priceRange-error" className="text-red-500 text-sm mt-1" role="alert">Required</p>}
        </div>
        <div>
          <label htmlFor="profileImage" className="block font-semibold mb-1">Profile Image (Optional)</label>
          <input id="profileImage" type="file" className="w-full border rounded px-3 py-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" onChange={handleImageChange} />
          {preview && (
            <Image src={preview} alt="Profile Preview" className="mt-2 w-24 h-24 object-cover rounded-full border" width={96} height={96} />
          )}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold mt-4 hover:bg-blue-600 transition-colors block mx-auto">Submit</button>
    </form>
  );
}
