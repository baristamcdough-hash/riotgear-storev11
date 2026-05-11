"use client";
import { useState } from "react";

export default function IntegrationsPage() {
  const [mpesa, setMpesa] = useState({ shortcode: "174379", consumerKey: "sDnAFGR...", consumerSecret: "GJXhF6f...", callbackUrl: "https://example.com/api/mpesa/callback", mode: "sandbox" });
  const [paystack, setPaystack] = useState({ publicKey: "pk_test_xxx", secretKey: "sk_test_xxx", currency: "NGN", mode: "test" });
  const [whatsapp, setWhatsapp] = useState({ phone: "+254717702563", businessName: "RiotGear Store" });
  const [saved, setSaved] = useState("");
  const save = (n: string) => { setSaved(n); setTimeout(() => setSaved(""), 2000); };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Integrations</h1>
      <p className="text-sm text-gray-500 mb-6">Manage payment gateways & messaging</p>
      <div className="space-y-6">
        {/* M-Pesa */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#49B642] flex items-center justify-center text-white font-black text-lg">M</div>
            <div><h2 className="font-bold text-sm">M-Pesa (Safaricom)</h2><p className="text-[10px] text-gray-500">STK Push for Kenya/Tanzania</p></div>
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded ${mpesa.mode==="sandbox"?"bg-amber-100 text-amber-700":"bg-green-100 text-green-700"}`}>{mpesa.mode}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Shortcode</label><input value={mpesa.shortcode} onChange={e=>setMpesa({...mpesa,shortcode:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Consumer Key</label><input value={mpesa.consumerKey} onChange={e=>setMpesa({...mpesa,consumerKey:e.target.value})} className="w-full border px-3 py-2 text-sm" type="password" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Consumer Secret</label><input value={mpesa.consumerSecret} onChange={e=>setMpesa({...mpesa,consumerSecret:e.target.value})} className="w-full border px-3 py-2 text-sm" type="password" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Callback URL</label><input value={mpesa.callbackUrl} onChange={e=>setMpesa({...mpesa,callbackUrl:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Mode</label><select value={mpesa.mode} onChange={e=>setMpesa({...mpesa,mode:e.target.value})} className="w-full border px-3 py-2 text-sm"><option value="sandbox">Sandbox</option><option value="production">Production</option></select></div>
          </div>
          <button onClick={()=>save("mpesa")} className="mt-4 bg-[#49B642] text-white px-4 py-2 text-xs font-bold uppercase hover:bg-[#3da636]">{saved==="mpesa"?"Saved!":"Save M-Pesa"}</button>
        </div>
        {/* Paystack */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#09A5DB] flex items-center justify-center text-white font-bold text-sm">PS</div>
            <div><h2 className="font-bold text-sm">Paystack</h2><p className="text-[10px] text-gray-500">Cards for Nigeria/SA/Ghana</p></div>
            <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded ${paystack.mode==="test"?"bg-amber-100 text-amber-700":"bg-green-100 text-green-700"}`}>{paystack.mode}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Public Key</label><input value={paystack.publicKey} onChange={e=>setPaystack({...paystack,publicKey:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Secret Key</label><input value={paystack.secretKey} onChange={e=>setPaystack({...paystack,secretKey:e.target.value})} className="w-full border px-3 py-2 text-sm" type="password" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Currency</label><select value={paystack.currency} onChange={e=>setPaystack({...paystack,currency:e.target.value})} className="w-full border px-3 py-2 text-sm"><option value="NGN">NGN</option><option value="ZAR">ZAR</option><option value="GHS">GHS</option><option value="USD">USD</option></select></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Mode</label><select value={paystack.mode} onChange={e=>setPaystack({...paystack,mode:e.target.value})} className="w-full border px-3 py-2 text-sm"><option value="test">Test</option><option value="live">Live</option></select></div>
          </div>
          <button onClick={()=>save("paystack")} className="mt-4 bg-[#09A5DB] text-white px-4 py-2 text-xs font-bold uppercase hover:bg-[#0890bf]">{saved==="paystack"?"Saved!":"Save Paystack"}</button>
        </div>
        {/* WhatsApp */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white font-bold">WA</div>
            <div><h2 className="font-bold text-sm">WhatsApp Checkout</h2><p className="text-[10px] text-gray-500">Order messaging to seller</p></div>
            <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">active</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Seller Phone</label><input value={whatsapp.phone} onChange={e=>setWhatsapp({...whatsapp,phone:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
            <div><label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Business Name</label><input value={whatsapp.businessName} onChange={e=>setWhatsapp({...whatsapp,businessName:e.target.value})} className="w-full border px-3 py-2 text-sm" /></div>
          </div>
          <button onClick={()=>save("whatsapp")} className="mt-4 bg-[#25D366] text-white px-4 py-2 text-xs font-bold uppercase hover:bg-[#1da851]">{saved==="whatsapp"?"Saved!":"Save WhatsApp"}</button>
        </div>
      </div>
    </div>
  );
}
