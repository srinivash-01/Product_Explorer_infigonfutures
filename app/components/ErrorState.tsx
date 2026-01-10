import React from "react";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
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
          onClick={onRetry}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </main>
  </div>
);