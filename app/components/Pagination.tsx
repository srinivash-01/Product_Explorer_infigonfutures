import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-12 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800 border border-orange-200 dark:border-gray-700 text-orange-600 dark:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-600 dark:text-gray-300 font-medium flex items-center">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800 border border-orange-200 dark:border-gray-700 text-orange-600 dark:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};