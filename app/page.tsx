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
    return <ErrorState error={error} onRetry={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300 p-6">
      <ProductExplorer initialProducts={products} />
    </div>
  );
}
