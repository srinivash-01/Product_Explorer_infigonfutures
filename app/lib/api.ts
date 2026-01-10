import { Product } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", { 
    next: { revalidate: 60 } 
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  
  return res.json();
}