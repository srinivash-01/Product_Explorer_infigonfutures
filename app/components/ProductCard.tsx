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
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-orange-100 hover:border-orange-200 p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
      >
        <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
          <button
            onClick={(e) => onToggleFavorite(e, product.id)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 z-10"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-32 h-32 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
          />
        </div>
        <h2 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.title}
        </h2>
        <div className="mb-4 mt-auto">
          <span className="text-2xl font-black text-orange-600 block">
            ₹{(product.price * 83).toLocaleString('en-IN')}
          </span>
        </div>
        <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
          {product.category}
        </span>
      </article>
    </Link>
  );
};