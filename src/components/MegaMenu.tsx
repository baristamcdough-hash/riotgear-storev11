"use client";

import { useState } from "react";

const categories = [
  {
    name: "Men",
    subcategories: ["Jerseys", "Shorts", "Training Kits", "Jackets", "Accessories"],
  },
  {
    name: "Women",
    subcategories: ["Jerseys", "Shorts", "Training Kits", "Jackets", "Accessories"],
  },
  {
    name: "Kids",
    subcategories: ["Jerseys", "Shorts", "Mini Kits", "School Gear"],
  },
  {
    name: "Jerseys",
    subcategories: ["Home Kits", "Away Kits", "Third Kits", "Retro", "Custom"],
  },
  {
    name: "Teams",
    subcategories: ["Premier League", "La Liga", "Serie A", "Bundesliga", "African Teams"],
  },
];

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="hidden lg:block border-b bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-8">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="py-3 text-sm font-bold uppercase tracking-wider hover:text-red-600 transition-colors">
                {cat.name}
              </button>

              {/* Dropdown */}
              {activeCategory === cat.name && (
                <div className="absolute top-full left-0 bg-white border shadow-lg p-6 min-w-[200px] z-50">
                  <ul className="space-y-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <a
                          href="#"
                          className="text-sm text-gray-700 hover:text-red-600 hover:font-bold transition-all"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
