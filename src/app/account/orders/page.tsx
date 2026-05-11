"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firestore";

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (!user || !db) { setLoading(false); return; }
      try {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() })));
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    if (!authLoading) fetchOrders();
  }, [user, authLoading]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]"><p className="text-sm text-gray-400">Loading...</p></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-cream)] px-4">
        <h1 className="font-[var(--font-oswald)] text-2xl font-bold mb-2">Sign In Required</h1>
        <p className="text-sm text-gray-500 mb-4">Please sign in to view your orders.</p>
        <Link href="/auth/signin/" className="bg-[var(--color-charcoal)] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider">Sign In</Link>
      </div>
    );
  }

  const statusColor = (s: string) => {
    if (s === "confirmed") return "bg-green-100 text-green-700";
    if (s === "shipped") return "bg-blue-100 text-blue-700";
    if (s === "delivered") return "bg-purple-100 text-purple-700";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-[var(--font-oswald)] text-xl font-bold uppercase">RIOT<span className="text-[var(--color-accent)]">GEAR</span></Link>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">My Orders</h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-[var(--color-charcoal)] mb-1">Order History</h1>
        <p className="text-sm text-gray-500 mb-8">{orders.length} orders placed</p>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 font-medium mb-2">No orders yet</p>
            <p className="text-xs text-gray-400 mb-4">Start shopping and your orders will appear here.</p>
            <Link href="/" className="inline-block bg-[var(--color-charcoal)] text-white px-6 py-2 text-xs font-bold uppercase">Shop Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg border p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-mono text-xs text-gray-400">#{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${statusColor(order.status)}`}>{order.status}</span>
                    <p className="font-bold text-sm mt-1">${order.totalAmount?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="border-t pt-3 space-y-2">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover bg-gray-100 rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Payment: <span className="font-bold text-gray-600">{order.paymentMethod}</span></span>
                  <span>Ship to: {order.shippingAddress?.city}, {order.shippingAddress?.country}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal)] border-b-2 border-[var(--color-gold)] pb-0.5">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
