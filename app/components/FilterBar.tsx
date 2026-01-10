import React from "react";

interface FilterBarProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  showFavorites: boolean;
  onToggleShowFavorites: () => void;
}

export const FilterBar = ({
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  showFavorites,
  onToggleShowFavorites
}: FilterBarProps) => {
  return (
    <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          onChange={onSearchChange}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200 focus:border-orange-400 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800 placeholder-orange-400"
        />
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={onCategoryChange}
        className="w-full lg:w-auto px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200 focus:border-orange-400 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {/* Favorites Filter */}
      <button
        onClick={onToggleShowFavorites}
        className={`w-full lg:w-auto px-6 py-3 rounded-2xl border transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap ${
          showFavorites 
            ? 'bg-orange-500 border-orange-600 text-white' 
            : 'bg-white/80 backdrop-blur-sm border-orange-200 text-orange-600 hover:bg-orange-50'
        }`}
      >
        {showFavorites ? 'Show All' : 'Favorites'}
      </button>
    </div>
  );
};