import React from "react";

interface EmptyStateProps {
  isSearchActive: boolean;
}

export const EmptyState = ({ isSearchActive }: EmptyStateProps) => (
  <div className="text-center py-20">
    <div className="w-24 h-24 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
      <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-orange-800 mb-4">
      {isSearchActive 
        ? 'No products match your search' 
        : 'No products found'
      }
    </h2>
    <p className="text-lg text-orange-600 mb-6">Try adjusting your search or filter</p>
  </div>
);