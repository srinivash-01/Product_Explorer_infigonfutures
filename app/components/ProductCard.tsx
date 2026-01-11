import React from "react";
import Link from "next/link";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: number) => void;
}

export const ProductCard = ({ product, isFavorite, onToggleFavorite }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <article 
        className="group h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col"
      >
        <div className="relative pt-[100%] bg-white dark:bg-gray-800 p-8 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={(e) => onToggleFavorite(e, product.id)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-200 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
            {product.category}
          </span>
          <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h2>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{(product.price * 83).toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              {product.rating?.rate || 4.5}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};