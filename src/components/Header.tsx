"use client";

import { useState } from "react";
import PromoBar from "./PromoBar";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import UserNav from "./UserNav";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Tier: Promo Bar */}
      <PromoBar />

      {/* Middle Tier: Search, Logo, User/Cart Icons */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search jerseys, teams..."
                className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Logo */}
          <div className="flex-1 text-center lg:flex-none">
            <h1 className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold tracking-tight uppercase">
              RIOT<span className="text-red-600">GEAR</span>
            </h1>
          </div>

          {/* User & Cart Icons */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <UserNav />
            {/* Cart */}
            <button className="relative p-2" aria-label="Cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Mega Menu (desktop) */}
      <MegaMenu />

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
