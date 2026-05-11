"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";

const statusOpts = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate() })));
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "orders", id), { status });
    setOrders((p) => p.map((o) => o.id === id ? { ...o, status } : o));
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Orders & Shipping</h1>
      <p className="text-sm text-gray-500 mb-6">{orders.length} total orders</p>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["all", ...statusOpts].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs font-bold uppercase rounded whitespace-nowrap ${filter===s?"bg-[var(--color-charcoal)] text-white":"bg-white border text-gray-600 hover:bg-gray-50"}`}>{s}</button>
        ))}
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-[10px] font-bold uppercase text-gray-400 border-b bg-gray-50"><th className="px-4 py-3">Order</th><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Payment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Address</th><th className="px-4 py-3">Date</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-xs">Loading...</td></tr> :
             filtered.length === 0 ? <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-xs">No orders</td></tr> :
             filtered.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50/50">
                <td className="px-4 py-3 font-mono text-[11px]">#{o.id.slice(0,8)}</td>
                <td className="px-4 py-3 text-xs">{o.userName || o.shippingAddress?.fullName || "—"}<br/><span className="text-gray-400">{o.userEmail}</span></td>
                <td className="px-4 py-3 text-xs font-bold">${o.totalAmount?.toFixed(2)}</td>
                <td className="px-4 py-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100">{o.paymentMethod}</span></td>
                <td className="px-4 py-3"><select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} className={`text-[10px] font-bold px-2 py-1 rounded border-0 cursor-pointer ${o.status==="confirmed"?"bg-green-100 text-green-700":o.status==="shipped"?"bg-blue-100 text-blue-700":o.status==="delivered"?"bg-purple-100 text-purple-700":"bg-amber-100 text-amber-700"}`}>{statusOpts.map((s)=><option key={s} value={s}>{s}</option>)}</select></td>
                <td className="px-4 py-3 text-[10px] text-gray-500">{o.shippingAddress?.city}, {o.shippingAddress?.country}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
