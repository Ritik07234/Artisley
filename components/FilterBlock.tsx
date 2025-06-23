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
            className={`px-3 py-1 rounded-full text-sm border font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary
              ${selected.includes(option)
                ? 'bg-white text-black border-black font-bold dark:bg-yellow-400 dark:text-black dark:border-yellow-400 ring-2 ring-primary dark:ring-yellow-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-600 hover:text-primary dark:hover:text-yellow-300'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
