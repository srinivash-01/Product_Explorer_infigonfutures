'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Product, Status } from "./types";
import { fetchProducts } from "./lib/api";
import { ProductCard } from "./components/ProductCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { FilterBar } from "./components/FilterBar";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setStatus('loading');
        const data = await fetchProducts();
        setProducts(data);
        setStatus('success');
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus('error');
      }
    }
    
    loadProducts();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...unique];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesFavorites = !showFavorites || favorites.includes(product.id);
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [products, searchTerm, selectedCategory, showFavorites, favorites]);

  // Debounced search
  const debouncedSearch = useCallback((term: string) => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(term);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
        <main className="mx-auto max-w-7xl">
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent mb-2">
              Products
            </h1>
          </header>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </section>
        </main>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <main className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent mb-2">
            Products
          </h1>
          <p className="text-sm text-orange-600 font-medium">{filteredProducts.length} items</p>
        </header>

        {/* Controls */}
        <FilterBar 
          onSearchChange={handleSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={(e) => setSelectedCategory(e.target.value)}
          categories={categories}
          showFavorites={showFavorites}
          onToggleShowFavorites={() => setShowFavorites(!showFavorites)}
        />

        {filteredProducts.length === 0 ? (
          <EmptyState isSearchActive={!!searchTerm || selectedCategory !== 'all'} />
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard 
                key={p.id}
                product={p}
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
