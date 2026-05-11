"use client";

import { useState } from "react";
import Link from "next/link";

// Default admin credentials (stored in localStorage, can be changed via OTP)
const DEFAULT_ADMIN_EMAIL = "wildpharmtech9@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "Poriotcodes";
const ADMIN_CREDS_KEY = "riotgear_admin_creds";

function getAdminCreds() {
  if (typeof window === "undefined") return { email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
  const stored = localStorage.getItem(ADMIN_CREDS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fallback */ }
  }
  return { email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
}

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const creds = getAdminCreds();
    if (email === creds.email && password === creds.password) {
      onSuccess();
    } else {
      setError("Invalid admin credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-charcoal)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-white">
            RIOT<span className="text-[var(--color-accent)]">GEAR</span>
          </h1>
          <p className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-[0.3em] mt-2">Admin Panel</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-lg font-bold text-[var(--color-charcoal)] mb-1">Admin Login</h2>
          <p className="text-xs text-gray-500 mb-6">Enter your admin credentials to continue</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@email.com" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[var(--color-charcoal)] text-white font-bold py-3 text-sm uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50">
              {loading ? "Verifying..." : "Login to Admin"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-[10px] text-gray-400 hover:text-[var(--color-accent)] uppercase tracking-wider font-bold">
              Back to Store
            </Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-500 mt-6">Secured by RiotGear Admin v1.0</p>
      </div>
    </div>
  );
}

export { getAdminCreds, ADMIN_CREDS_KEY, DEFAULT_ADMIN_EMAIL };
