'use client';

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { FilterBar } from "./FilterBar";
import { EmptyState } from "./EmptyState";
import { Pagination } from "./Pagination";

interface ProductExplorerProps {
  initialProducts: Product[];
}

export const ProductExplorer = ({ initialProducts }: ProductExplorerProps) => {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const itemsPerPage = 8;

  // Load favorites and theme from localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      if (newVal) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...unique];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesFavorites = !showFavorites || favorites.includes(product.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, showFavorites, favorites, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, showFavorites, sortBy]);

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <main className="mx-auto max-w-7xl">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 dark:from-orange-400 dark:to-amber-500 bg-clip-text text-transparent mb-2">
          Products
        </h1>
        <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{filteredAndSortedProducts.length} items</p>
      </header>

      <FilterBar 
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        selectedCategory={selectedCategory}
        onCategoryChange={(e) => setSelectedCategory(e.target.value)}
        categories={categories}
        showFavorites={showFavorites}
        onToggleShowFavorites={() => setShowFavorites(!showFavorites)}
        sortBy={sortBy}
        onSortChange={(e) => setSortBy(e.target.value)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <EmptyState isSearchActive={!!searchTerm || selectedCategory !== 'all'} />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((p) => (
            <ProductCard 
              key={p.id}
              product={p}
              isFavorite={favorites.includes(p.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};