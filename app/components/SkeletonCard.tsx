import React from "react";

export const SkeletonCard = () => (
  <div className="bg-white/80 dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 dark:border-gray-700 p-6 animate-pulse">
    <div className="w-full h-48 mb-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-xl"></div>
    <div className="h-6 bg-orange-100 dark:bg-gray-700 rounded-md mb-3"></div>
    <div className="h-8 bg-orange-100 dark:bg-gray-700 rounded-md w-24 mb-4"></div>
    <div className="h-6 bg-orange-100 dark:bg-gray-700 rounded-full w-20"></div>
  </div>
);