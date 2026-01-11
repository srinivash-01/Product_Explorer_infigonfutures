'use client';

import React from "react";

interface ErrorStateProps {
  error: string | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex items-center justify-center">
    <main className="w-full max-w-md text-center">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
        <button 
        onClick={() => window.location.reload()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-200"
        >
          Try Again
        </button>
    </main>
  </div>
);