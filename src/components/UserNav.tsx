"use client";

// In a real app, this would use useSession() from next-auth/react
// For now we simulate the logic with a mock session
const mockSession = {
  user: {
    name: "Riot User",
    image: null as string | null, // Set to null to show initial fallback
  },
};

export default function UserNav() {
  const session = mockSession; // Replace with: const { data: session } = useSession();

  if (!session?.user) {
    return (
      <a href="/api/auth/signin" className="p-2" aria-label="Sign In">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </a>
    );
  }

  const userInitial = session.user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center gap-2">
      {session.user.image ? (
        <img
          src={session.user.image}
          alt={session.user.name || "User"}
          className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
          {userInitial}
        </div>
      )}
    </div>
  );
}
