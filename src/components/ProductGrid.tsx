"use client";

import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function ProductGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10 sm:py-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-12">
        <div>
          <p className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-[0.2em] mb-1">
            Curated Collection
          </p>
          <h2 className="font-[var(--font-oswald)] text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-[var(--color-charcoal)]">
            Trending Now
          </h2>
        </div>
        <a
          href="#"
          className="text-xs sm:text-sm font-bold text-[var(--color-charcoal)] border-b-2 border-[var(--color-gold)] hover:text-[var(--color-accent)] transition-colors uppercase tracking-wider pb-0.5"
        >
          View All
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
