"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ProductCardFlip, ProductSpinViewer, Product3DModel } from "@/components/Product3DViewer";

type ViewMode = "gallery" | "flip" | "spin" | "3d";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <div className="text-center">
          <h1 className="font-[var(--font-oswald)] text-3xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-[var(--color-accent)] font-bold underline">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: `${product.name} (${selectedSize})`,
      team: product.team,
      price: product.price,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Get related products (same category, exclude current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Top Nav */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-[var(--font-oswald)] text-xl font-bold uppercase">
            RIOT<span className="text-[var(--color-accent)]">GEAR</span>
          </Link>
          <nav className="text-xs text-gray-500">
            <Link href="/" className="hover:text-[var(--color-accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-charcoal)] font-medium">{product.team}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* View Mode Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded">
              {(["gallery", "flip", "spin", "3d"] as ViewMode[]).map((mode) => (
                <button key={mode} onClick={() => setViewMode(mode)} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${viewMode === mode ? "bg-white text-[var(--color-charcoal)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {mode === "gallery" ? "Gallery" : mode === "flip" ? "3D Flip" : mode === "spin" ? "360°" : "3D Model"}
                </button>
              ))}
            </div>

            {/* View Content */}
            {viewMode === "gallery" && (
              <>
                <div className="bg-white border border-gray-100 overflow-hidden aspect-[4/5]">
                  <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} className={`w-20 h-20 border-2 overflow-hidden transition-all ${activeImage === i ? "border-[var(--color-gold)]" : "border-gray-200 hover:border-gray-400"}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {viewMode === "flip" && (
              <ProductCardFlip frontImage={product.images[0]} backImage={product.backImage || product.images[1]} name={product.name} />
            )}

            {viewMode === "spin" && (
              <ProductSpinViewer images={product.images} name={product.name} />
            )}

            {viewMode === "3d" && (
              <Product3DModel modelUrl={product.modelUrl} fallbackImage={product.images[0]} name={product.name} />
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.badge && (
                <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-white ${
                  product.badge === "Best Seller" ? "bg-[var(--color-accent)]" : "bg-[var(--color-charcoal)]"
                }`}>
                  {product.badge}
                </span>
              )}
              <span className="text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-[var(--color-gold)] border border-[var(--color-gold)]">
                {product.category}
              </span>
            </div>

            {/* Team */}
            <p className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-[0.2em]">
              {product.team}
            </p>

            {/* Name */}
            <h1 className="font-[var(--font-oswald)] text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-charcoal)] mt-2 uppercase leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-[var(--color-charcoal)]">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="text-xs font-bold text-[var(--color-accent)] bg-red-50 px-2 py-0.5">
                    SAVE ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-green-700 font-semibold mt-1">Free Shipping on this item</p>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal)] mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 text-sm font-bold transition-all ${
                      selectedSize === size
                        ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-white"
                        : "border-gray-200 text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-[10px] text-gray-400 mt-2">Please select a size to continue</p>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`mt-8 w-full py-4 font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                added
                  ? "bg-green-600 text-white"
                  : selectedSize
                  ? "bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-accent)]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {added ? "Added to Cart!" : selectedSize ? "Add to Cart" : "Select a Size"}
            </button>

            {/* Details */}
            <div className="mt-10 border-t border-gray-200 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal)] mb-4">
                Product Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-24 border-t border-gray-200 pt-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-[0.2em] mb-1">
                  You May Also Like
                </p>
                <h2 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-[var(--color-charcoal)]">
                  Related Products
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}/`} className="block group">
                  <div className="bg-white border border-gray-100 hover:border-[var(--color-gold)] transition-all duration-300 overflow-hidden">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-[var(--color-gold)] text-[10px] font-bold uppercase tracking-wider">{p.team}</p>
                      <h3 className="font-[var(--font-oswald)] text-xs sm:text-sm font-medium mt-1 line-clamp-1">{p.name}</h3>
                      <p className="font-bold mt-1">${p.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back to Store */}
      <div className="bg-white border-t py-6 text-center">
        <Link
          href="/"
          className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-charcoal)] border-b-2 border-[var(--color-gold)] hover:text-[var(--color-accent)] transition-colors pb-0.5"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
}
