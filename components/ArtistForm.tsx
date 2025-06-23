'use client';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().required(),
  category: yup.array().min(1).required(),
  languages: yup.array().min(1).required(),
  priceRange: yup.string().required(),
  location: yup.string().required()
});

export default function ArtistForm() {
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

  const onSubmit = (data: any) => {
    console.log('Artist Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <div>
        <label>Name</label>
        <input {...register('name')} className="input" />
        {errors.name && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label>Bio</label>
        <textarea {...register('bio')} className="input" />
        {errors.bio && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label>Category</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <>
              {['Singer', 'Dancer', 'Speaker', 'DJ'].map((cat) => (
                <label key={cat} className="block">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={field.value.includes(cat)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) field.onChange([...field.value, cat]);
                      else field.onChange(field.value.filter((c) => c !== cat));
                    }}
                  />
                  <span className="ml-2">{cat}</span>
                </label>
              ))}
            </>
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
            <>
              {['Hindi', 'English', 'Punjabi'].map((lang) => (
                <label key={lang} className="block">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={field.value.includes(lang)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) field.onChange([...field.value, lang]);
                      else field.onChange(field.value.filter((l) => l !== lang));
                    }}
                  />
                  <span className="ml-2">{lang}</span>
                </label>
              ))}
            </>
          )}
        />
        {errors.languages && <p className="text-red-500 text-sm">Select at least one</p>}
      </div>

      <div>
        <label>Fee Range</label>
        <select {...register('priceRange')} className="input">
          <option value="">Select</option>
          <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
          <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
          <option value="₹20,000+">₹20,000+</option>
        </select>
        {errors.priceRange && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label>Location</label>
        <input {...register('location')} className="input" />
        {errors.location && <p className="text-red-500 text-sm">Required</p>}
      </div>

      <div>
        <label>Upload Profile Image (Optional)</label>
        <input type="file" className="input" />
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
