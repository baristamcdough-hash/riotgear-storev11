"use client";

import { useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

const PRODUCTS_PER_PAGE = 4;

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page === currentPage || isSliding) return;
    setSlideDirection(page > currentPage ? "right" : "left");
    setIsSliding(true);
    setTimeout(() => {
      setCurrentPage(page);
      setTimeout(() => setIsSliding(false), 50);
    }, 200);
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1);
  };

  const goPrev = () => {
    if (currentPage > 0) goToPage(currentPage - 1);
  };

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
        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sliding Product Grid */}
      <div className="overflow-hidden" ref={gridRef}>
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-300 ${
            isSliding
              ? slideDirection === "right"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Page Indicator & Pagination */}
      <div className="flex flex-col items-center mt-8 sm:mt-12 gap-4">
        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentPage
                  ? "w-8 h-2.5 bg-[var(--color-gold)]"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`w-8 h-8 rounded text-xs font-bold transition-all duration-200 ${
                i === currentPage
                  ? "bg-[var(--color-charcoal)] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Page Info */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
          Page {currentPage + 1} of {totalPages} — Showing {startIndex + 1}–{Math.min(startIndex + PRODUCTS_PER_PAGE, products.length)} of {products.length} products
        </p>
      </div>
    </section>
  );
}
