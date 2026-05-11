export interface Product {
  id: number;
  slug: string;
  name: string;
  team: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge?: "Best Seller" | "New Arrival";
  description: string;
  details: string[];
  sizes: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "manchester-united-home-2025",
    name: "Manchester United Home Jersey 2025/26",
    team: "Manchester United",
    price: 89.99,
    originalPrice: 110.00,
    images: [
      "https://images.unsplash.com/photo-1577212017308-84fd946ffe11?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=750&fit=crop&q=80",
    ],
    badge: "Best Seller",
    description: "The iconic red home kit featuring Adidas Aeroready technology for optimal match-day comfort. Authentic crest embroidery and moisture-wicking fabric.",
    details: ["Aeroready moisture management", "100% recycled polyester", "Authentic club crest", "Slim fit design", "Machine washable"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Premier League",
  },
  {
    id: 2,
    slug: "real-madrid-away-2025",
    name: "Real Madrid Away Jersey 2025/26",
    team: "Real Madrid",
    price: 94.99,
    originalPrice: 120.00,
    images: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&h=750&fit=crop&q=80",
    ],
    badge: "New Arrival",
    description: "Sleek navy away kit with gold accents. Engineered with Adidas HEAT.RDY technology for elite performance under pressure.",
    details: ["HEAT.RDY technology", "Lightweight mesh panels", "Gold foil detailing", "Regular fit", "Recycled materials"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "La Liga",
  },
  {
    id: 3,
    slug: "harambee-stars-retro",
    name: "Harambee Stars Retro Kit",
    team: "Kenya",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=750&fit=crop&q=80",
    ],
    badge: "Best Seller",
    description: "A tribute to Kenya's golden football era. Premium cotton-blend fabric with retro collar design and embroidered national crest.",
    details: ["Premium cotton-poly blend", "Retro collar design", "Embroidered crest", "Relaxed fit", "Limited edition run"],
    sizes: ["S", "M", "L", "XL"],
    category: "African Teams",
  },
  {
    id: 4,
    slug: "barcelona-third-2025",
    name: "Barcelona Third Jersey 2025/26",
    team: "Barcelona",
    price: 92.99,
    originalPrice: 115.00,
    images: [
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&h=750&fit=crop&q=80",
    ],
    badge: "New Arrival",
    description: "Bold third kit featuring a contemporary geometric pattern. Nike Dri-FIT technology keeps you cool from warm-up to final whistle.",
    details: ["Nike Dri-FIT technology", "Geometric sublimation print", "Woven club crest", "Standard fit", "Sustainable materials"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "La Liga",
  },
  {
    id: 5,
    slug: "super-eagles-home",
    name: "Super Eagles Home Kit",
    team: "Nigeria",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=750&fit=crop&q=80",
    ],
    badge: "Best Seller",
    description: "The electrifying green home kit that took the world by storm. Features traditional Nigerian patterns with modern performance fabric.",
    details: ["Nike Vapor technology", "Traditional pattern overlay", "Breathable mesh back", "Athletic fit", "Official NFF badge"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "African Teams",
  },
  {
    id: 6,
    slug: "liverpool-home-2025",
    name: "Liverpool Home Jersey 2025/26",
    team: "Liverpool",
    price: 89.99,
    originalPrice: 105.00,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=750&fit=crop&q=80",
    ],
    description: "Classic Anfield red with the unmistakable Liverbird crest. Nike Dri-FIT ADV for professional-grade moisture management.",
    details: ["Nike Dri-FIT ADV", "Laser-cut ventilation", "Embroidered Liverbird", "Slim fit", "100% recycled polyester"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Premier League",
  },
  {
    id: 7,
    slug: "bafana-bafana-away",
    name: "Bafana Bafana Away Jersey",
    team: "South Africa",
    price: 74.99,
    images: [
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=750&fit=crop&q=80",
    ],
    badge: "New Arrival",
    description: "Golden away kit celebrating South African football heritage. Lightweight construction with UV protection for African sun.",
    details: ["UV protection fabric", "Lightweight construction", "SAFA official badge", "Regular fit", "Quick-dry technology"],
    sizes: ["S", "M", "L", "XL"],
    category: "African Teams",
  },
  {
    id: 8,
    slug: "ac-milan-retro-2007",
    name: "AC Milan Retro 2007 Champions",
    team: "AC Milan",
    price: 99.99,
    originalPrice: 130.00,
    images: [
      "https://images.unsplash.com/photo-1614632537423-1e6078b6d53b?w=600&h=750&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=750&fit=crop&q=80",
    ],
    badge: "Best Seller",
    description: "Commemorating the 2007 Champions League triumph. Premium vintage construction with authentic rossonero stripes and retro Adidas trefoil.",
    details: ["Premium vintage cotton", "Retro Adidas trefoil", "Commemorative patch", "Classic fit", "Collector's edition"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Serie A",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
