import React from "react";
import { fetchProducts } from "./lib/api";
import { ProductExplorer } from "./components/ProductExplorer";
import { ErrorState } from "./components/ErrorState";
import { Product } from "./types";

export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await fetchProducts();
  } catch (e) {
    error = (e as Error).message;
  }

  if (error) {
    // Ensure no function props are passed to Client Components
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
        <ProductExplorer initialProducts={products} />
      </div>
    </div>
  );
}
