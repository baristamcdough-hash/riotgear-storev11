"use client";

import Link from "next/link";

// In a real app, use useSession() from next-auth/react
// For demo, we simulate no session (not logged in)
const mockSession = null as { user: { name: string; image: string | null } } | null;

export default function UserNav() {
  const session = mockSession;

  if (!session?.user) {
    return (
      <Link
        href="/auth/signin"
        className="p-1 sm:p-2 flex items-center gap-1"
        aria-label="Sign In"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="hidden sm:inline text-xs font-bold uppercase">Sign In</span>
      </Link>
    );
  }

  const userInitial = session.user.name?.charAt(0).toUpperCase() || "U";

  return (
    <Link href="/auth/signin" className="flex items-center gap-2">
      {session.user.image ? (
        <img
          src={session.user.image}
          alt={session.user.name || "User"}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-gray-200"
        />
      ) : (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs sm:text-sm">
          {userInitial}
        </div>
      )}
    </Link>
  );
}
