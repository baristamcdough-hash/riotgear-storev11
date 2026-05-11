"use client";

import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  team: string;
  price: number;
  images: string[];
  badge?: "Best Seller" | "New Arrival";
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      team: product.team,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="group border hover:shadow-2xl transition-all p-2 relative flex flex-col">
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-1 uppercase z-10 ${
            product.badge === "Best Seller" ? "bg-red-600" : "bg-blue-600"
          }`}
        >
          {product.badge}
        </div>
      )}

      {/* Product Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex-1 flex flex-col">
        <p className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase">{product.team}</p>
        <h3 className="font-[var(--font-oswald)] font-medium text-xs sm:text-sm group-hover:text-blue-700 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="font-bold text-base sm:text-lg mt-1">${product.price}</p>
        <div className="text-[10px] text-green-600 font-bold">Free Shipping</div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-black text-white text-xs sm:text-sm font-bold py-2 px-3 uppercase tracking-wider hover:bg-red-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export type { Product };
