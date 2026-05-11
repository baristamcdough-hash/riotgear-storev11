"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Men", subcategories: ["Jerseys", "Shorts", "Training Kits", "Jackets", "Accessories"] },
  { name: "Women", subcategories: ["Jerseys", "Shorts", "Training Kits", "Jackets", "Accessories"] },
  { name: "Kids", subcategories: ["Jerseys", "Shorts", "Mini Kits", "School Gear"] },
  { name: "Jerseys", subcategories: ["Home Kits", "Away Kits", "Third Kits", "Retro", "Custom"] },
  { name: "Teams", subcategories: ["Premier League", "La Liga", "Serie A", "Bundesliga", "African Teams"] },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-x-0 top-[88px] bottom-0 z-40 bg-white overflow-y-auto overscroll-contain">
      {/* Search (mobile) */}
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search jerseys, teams..."
          className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-black"
        />
      </div>

      {/* Categories */}
      <nav className="p-4">
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat.name} className="border-b">
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === cat.name ? null : cat.name)
                }
                className="w-full flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wider"
              >
                {cat.name}
                <svg
                  className={`w-4 h-4 transition-transform ${expandedCategory === cat.name ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedCategory === cat.name && (
                <ul className="pl-4 pb-3 space-y-2">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <a
                        href="#"
                        className="block py-1 text-sm text-gray-600 hover:text-red-600 active:text-red-700"
                        onClick={onClose}
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign In Link */}
      <div className="p-4 border-t">
        <Link
          href="/auth/signin"
          className="block w-full bg-black text-white text-center py-3 font-bold uppercase tracking-wider text-sm"
          onClick={onClose}
        >
          Sign In / Create Account
        </Link>
      </div>
    </div>
  );
}
