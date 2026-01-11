import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

// Extend Jest types globally
declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toBeInTheDocument(): R;
    }
  }
}

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  category: 'electronics',
  image: 'test-image.jpg',
  rating: { rate: 4.5, count: 10 }
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        isFavorite={false} 
        onToggleFavorite={() => {}} 
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText(/₹8,299/)).toBeInTheDocument();
  });

  it('shows correct favorite status', () => {
    const { rerender } = render(
      <ProductCard 
        product={mockProduct} 
        isFavorite={true} 
        onToggleFavorite={() => {}} 
      />
    );
    
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();

    rerender(
      <ProductCard 
        product={mockProduct} 
        isFavorite={false} 
        onToggleFavorite={() => {}} 
      />
    );
    
    expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
  });
});
