import React from "react";

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse flex flex-col h-full">
    <div className="pt-[100%] w-full bg-gray-100 dark:bg-gray-800 relative"></div>
    <div className="p-5 flex flex-col gap-3 flex-grow">
      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3"></div>
      <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
      <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-2/3"></div>
      <div className="mt-auto pt-2 flex justify-between items-center">
        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-24"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-12"></div>
      </div>
    </div>
  </div>
);