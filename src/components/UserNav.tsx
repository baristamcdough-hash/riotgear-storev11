"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UserNav() {
  const { user, loading, signOut } = useAuth();

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

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-1">
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

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3 border-b">
          <p className="text-xs font-bold text-[var(--color-charcoal)] truncate">{user.displayName || "User"}</p>
          <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
        </div>
        <button
          onClick={signOut}
          className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] hover:bg-gray-50 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
