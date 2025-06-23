'use client';

interface FilterBlockProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export default function FilterBlock({
  title,
  options,
  selected,
  onChange,
}: FilterBlockProps) {
  return (
    <div className="mb-4">
      <h3 className="text-md font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selected.includes(option)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
