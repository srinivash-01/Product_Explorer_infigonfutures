import React from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const products: Product[] = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 font-sans p-6">
      <main className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-orange-100">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent">
              Products
            </h1>
            <p className="text-sm text-orange-600 font-medium mt-1">Latest collection</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-orange-800">{products.length} items available</span>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <article 
              key={p.id} 
              className="group bg-white/70 backdrop-blur-sm hover:bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-orange-50/50 hover:border-orange-200 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image Card */}
              <div className="flex-1 flex flex-col items-center justify-center mb-4 pb-4 border-b border-orange-100">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-20 h-20 object-contain rounded-xl shadow-md" 
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <h2 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2 group-hover:text-orange-700 transition-colors mb-2">
                  {p.title}
                </h2>
                
                <p className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-full w-fit font-medium mb-3">
                  {p.category}
                </p>

                {/* Price & Rating */}
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-orange-600">
                      ₹{(p.price * 83).toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">₹{Math.round((p.price * 83) * 1.2).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`w-3 h-3 rounded-full ${i < Math.floor((p.rating?.rate ?? 0)) ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {p.rating?.rate?.toFixed(1) ?? "—"} ({p.rating?.count?.toLocaleString() ?? "—"})
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                🛒 Add to Cart
              </button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
