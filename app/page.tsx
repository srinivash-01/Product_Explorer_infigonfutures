'use client';

import React, { useState, useEffect, useMemo, useCallback } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

type Status = 'loading' | 'success' | 'error';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setStatus('loading');
        const res = await fetch("https://fakestoreapi.com/products", { 
          next: { revalidate: 60 } 
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await res.json();
        setProducts(data);
        setStatus('success');
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus('error');
      }
    }
    
    fetchProducts();
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
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

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

  const SkeletonCard = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 animate-pulse">
      <div className="w-full h-48 mb-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl"></div>
      <div className="h-6 bg-orange-100 rounded-md mb-3"></div>
      <div className="h-8 bg-orange-100 rounded-md w-24 mb-4"></div>
      <div className="h-6 bg-orange-100 rounded-full w-20"></div>
    </div>
  );

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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
        <main className="mx-auto max-w-7xl">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-lg text-orange-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
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
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200 focus:border-orange-400 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800 placeholder-orange-400"
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200 focus:border-orange-400 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-200 text-gray-800"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No products match your search' 
                : 'No products found'
              }
            </h2>
            <p className="text-lg text-orange-600 mb-6">Try adjusting your search or filter</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <article 
                key={p.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-orange-100 hover:border-orange-200 p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="w-full h-48 mb-4 flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-32 h-32 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h2 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {p.title}
                </h2>
                <div className="mb-4">
                  <span className="text-2xl font-black text-orange-600 block">
                    ₹{(p.price * 83).toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
