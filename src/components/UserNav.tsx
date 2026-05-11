"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UserNav() {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/signin/"
        className="p-1 sm:p-2 flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors"
        aria-label="Sign In"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider">Sign In</span>
      </Link>
    );
  }

  const userInitial = user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

  const handleSignOut = () => {
    setIsOpen(false);
    signOut();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1"
        aria-label="Account menu"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[var(--color-gold)]"
          />
        ) : (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--color-charcoal)] text-white flex items-center justify-center font-bold text-xs sm:text-sm">
            {userInitial}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 shadow-xl rounded-sm z-50">
          {/* User Info */}
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs font-bold text-[var(--color-charcoal)] truncate">
              {user.displayName || "User"}
            </p>
            <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-xs text-gray-700 hover:bg-[var(--color-cream)] transition-colors"
            >
              My Orders
            </Link>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-xs text-gray-700 hover:bg-[var(--color-cream)] transition-colors"
            >
              Account Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
