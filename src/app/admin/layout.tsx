"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogin from "@/components/AdminLogin";

const ADMIN_STORAGE_KEY = "riotgear_admin_auth";

const navItems = [
  { href: "/admin/", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/orders/", label: "Orders & Shipping", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  { href: "/admin/products/", label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { href: "/admin/users/", label: "Users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { href: "/admin/integrations/", label: "Integrations", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/admin/settings/", label: "Admin Settings", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const [role, setRole] = useState<"owner" | "demo">("owner");

  const handleLogin = (loginRole: "owner" | "demo" = "owner") => {
    sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
    setIsAuthenticated(true);
    setRole(loginRole);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (checking) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-pulse text-gray-400 text-sm">Loading...</div></div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLogin} />;
  }

  const restrictedPaths = ["/admin/settings", "/admin/integrations"];
  const isRestricted = role === "demo" && restrictedPaths.some(p => pathname?.startsWith(p));

  const visibleNavItems = role === "demo" ? navItems.filter(i => !restrictedPaths.some(p => i.href.startsWith(p))) : navItems;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-charcoal)] text-white z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/admin/" className="block">
            <h1 className="font-[var(--font-oswald)] text-xl font-bold uppercase">RIOT<span className="text-[var(--color-accent)]">GEAR</span><span className="text-[var(--color-gold)] text-xs ml-2 font-normal tracking-widest">ADMIN</span></h1>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href || pathname === item.href.slice(0, -1);
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${isActive ? "bg-[var(--color-accent)] text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}>
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Store
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-xs font-bold text-white">A</div>
            <div className="flex-1 min-w-0"><p className="text-xs font-medium text-white truncate">Admin</p><p className="text-[10px] text-gray-400 truncate">wildpharmtech9@gmail.com</p></div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-[var(--color-accent)] p-1" title="Logout">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
          <div className="flex-1" />
          <span className="text-xs text-gray-500 hidden sm:block">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {role === "demo" && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded flex items-center gap-2">
              <span className="text-blue-600 text-xs font-bold px-2 py-0.5 bg-blue-100 rounded uppercase">Demo Mode</span>
              <p className="text-[11px] text-blue-700">View-only access. Settings & Integrations are locked.</p>
            </div>
          )}
          {isRestricted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <h2 className="text-lg font-bold text-gray-600 mb-1">Access Restricted</h2>
              <p className="text-xs text-gray-400">This section is locked in Demo Mode. Contact the owner for full access.</p>
            </div>
          ) : children}
        </main>
        <footer className="border-t border-gray-200 px-6 py-4 text-center bg-white">
          <p className="text-[10px] text-gray-400">RiotGear Admin v1.0 — Built by <span className="font-bold text-[var(--color-charcoal)]">P.o.Riot🍄</span> | Powered by <span className="text-[var(--color-gold)] font-bold">WildPharmTech</span></p>
        </footer>
      </div>
    </div>
  );
}
