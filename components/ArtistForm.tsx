'use client';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

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
    formState: { errors }
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
    console.log('Artist Submitted:', { ...data, image });
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} className="input" />
        {errors.name && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" {...register('bio')} className="input" />
        {errors.bio && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label>Category</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {['Singer', 'Dancer', 'Speaker', 'DJ'].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
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
        {errors.category && <p className="text-red-500 text-sm">Select at least one</p>}
      </div>

      <div>
        <label>Languages</label>
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {['Hindi', 'English', 'Punjabi'].map((lang) => (
                <label key={lang} className="flex items-center gap-2">
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
        {errors.languages && <p className="text-red-500 text-sm">Select at least one</p>}
      </div>

      <div>
        <label htmlFor="priceRange">Fee Range</label>
        <select id="priceRange" {...register('priceRange')} className="input">
          <option value="">Select</option>
          <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
          <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
          <option value="₹20,000+">₹20,000+</option>
        </select>
        {errors.priceRange && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input id="location" {...register('location')} className="input" />
        {errors.location && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label htmlFor="profileImage">Upload Profile Image (Optional)</label>
        <input id="profileImage" type="file" className="input" onChange={handleImageChange} />
        {preview && (
          <img src={preview} alt="Profile Preview" className="mt-2 w-24 h-24 object-cover rounded border" />
        )}
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
