import type { NextAuthOptions } from "next-auth";

// Base URL for redirects
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const authOptions: NextAuthOptions = {
  providers: [
    // Add your providers here (Google, GitHub, Credentials, etc.)
    // Example:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to homepage after successful login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      // Include user image and name in session
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
