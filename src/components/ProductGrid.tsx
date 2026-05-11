import ProductCard, { Product } from "./ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Manchester United Home Jersey 2025/26",
    team: "Manchester United",
    price: 89.99,
    images: ["https://placehold.co/400x500/e11d48/ffffff?text=Man+Utd+Home"],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Real Madrid Away Jersey 2025/26",
    team: "Real Madrid",
    price: 94.99,
    images: ["https://placehold.co/400x500/1e3a5f/ffffff?text=Madrid+Away"],
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Harambee Stars Retro Kit",
    team: "Kenya",
    price: 69.99,
    images: ["https://placehold.co/400x500/006600/ffffff?text=Kenya+Retro"],
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Barcelona Third Jersey 2025/26",
    team: "Barcelona",
    price: 92.99,
    images: ["https://placehold.co/400x500/a50044/ffffff?text=Barca+Third"],
    badge: "New Arrival",
  },
  {
    id: 5,
    name: "Super Eagles Home Kit",
    team: "Nigeria",
    price: 79.99,
    images: ["https://placehold.co/400x500/008751/ffffff?text=Nigeria+Home"],
    badge: "Best Seller",
  },
  {
    id: 6,
    name: "Liverpool Home Jersey 2025/26",
    team: "Liverpool",
    price: 89.99,
    images: ["https://placehold.co/400x500/c8102e/ffffff?text=Liverpool+Home"],
  },
  {
    id: 7,
    name: "Bafana Bafana Away Jersey",
    team: "South Africa",
    price: 74.99,
    images: ["https://placehold.co/400x500/ffcd00/000000?text=SA+Away"],
    badge: "New Arrival",
  },
  {
    id: 8,
    name: "AC Milan Retro 2007 Champions",
    team: "AC Milan",
    price: 99.99,
    images: ["https://placehold.co/400x500/000000/ff0000?text=Milan+Retro"],
    badge: "Best Seller",
  },
];

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold uppercase">
          Trending Now
        </h2>
        <a href="#" className="text-sm font-bold text-red-600 hover:underline uppercase">
          View All
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
