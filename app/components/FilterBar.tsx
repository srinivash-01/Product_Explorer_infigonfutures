import React from "react";

interface FilterBarProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  showFavorites: boolean;
  onToggleShowFavorites: () => void;
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const FilterBar = ({
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  showFavorites,
  onToggleShowFavorites,
  sortBy,
  onSortChange,
  darkMode,
  onToggleDarkMode
}: FilterBarProps) => {
  return (
    <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-center max-w-4xl mx-auto flex-wrap">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          onChange={onSearchChange}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800 backdrop-blur-sm border border-orange-200 dark:border-gray-700 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800 dark:text-gray-100 placeholder-orange-400 dark:placeholder-gray-500"
        />
        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={onCategoryChange}
       className="w-full lg:w-auto px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800 backdrop-blur-sm border border-orange-200 dark:border-gray-700 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800 dark:text-gray-100"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={onSortChange}
        className="w-full lg:w-auto px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800 backdrop-blur-sm border border-orange-200 dark:border-gray-700 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800 dark:text-gray-100"
        aria-label="Sort products"
      >
        <option value="default">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      {/* Favorites Filter */}
      <button
        onClick={onToggleShowFavorites}
        type="button"
        className={`w-full lg:w-auto px-6 py-3 rounded-2xl border transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap ${
          showFavorites 
            ? 'bg-orange-500 border-orange-600 text-white' 
            : 'bg-white/80 dark:bg-gray-800 backdrop-blur-sm border-orange-200 dark:border-gray-700 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700'
        }`}
      >
        {showFavorites ? 'Show All' : 'Favorites'}
      </button>

      {/* Dark Mode Toggle */}
      <button
        onClick={onToggleDarkMode}
        type="button"
        className="p-3 rounded-2xl bg-white/80 dark:bg-gray-800 backdrop-blur-sm border border-orange-200 dark:border-gray-700 text-orange-600 dark:text-orange-400 shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  );
};