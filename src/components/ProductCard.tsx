"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      team: product.team,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <Link href={`/products/${product.slug}/`} className="block">
      <div className="group bg-white border border-gray-100 hover:border-[var(--color-gold)] hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 uppercase z-10 tracking-wider ${
              product.badge === "Best Seller"
                ? "bg-[var(--color-accent)]"
                : "bg-[var(--color-charcoal)]"
            }`}
          >
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-[var(--color-gold)] text-white text-[9px] font-bold px-2 py-1 uppercase z-10">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Product Image */}
        <div className="overflow-hidden bg-[var(--color-cream)] aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <p className="text-[var(--color-gold)] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            {product.team}
          </p>
          <h3 className="font-[var(--font-oswald)] font-medium text-xs sm:text-sm text-[var(--color-charcoal)] group-hover:text-[var(--color-accent)] transition-colors mt-1 line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-auto pt-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-base sm:text-lg">${product.price}</p>
              {product.originalPrice && (
                <p className="text-xs text-gray-400 line-through">${product.originalPrice}</p>
              )}
            </div>
            <div className="text-[10px] text-green-700 font-semibold mt-0.5">Free Shipping</div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-[var(--color-charcoal)] text-white text-[10px] sm:text-xs font-bold py-2.5 px-3 uppercase tracking-widest hover:bg-[var(--color-accent)] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export type { Product };
