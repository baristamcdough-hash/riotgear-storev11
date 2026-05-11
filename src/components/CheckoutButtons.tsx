"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShippingAddress } from "./ShippingForm";
import {
  checkoutViaWhatsApp,
  initiateMpesaSTKPush,
  initiatePaystackPayment,
  formatPhoneForMpesa,
} from "@/lib/checkout";

interface CheckoutOptionsProps {
  amount: number;
  address: ShippingAddress;
}

export default function CheckoutOptions({ amount, address }: CheckoutOptionsProps) {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // WhatsApp Checkout
  const handleWhatsApp = () => {
    setLoading("whatsapp");
    setMessage(null);
    try {
      checkoutViaWhatsApp(items, amount, address);
      setMessage({ type: "success", text: "Order sent to WhatsApp! Complete the chat to confirm." });
    } catch {
      setMessage({ type: "error", text: "Failed to open WhatsApp. Try again." });
    }
    setLoading(null);
  };

  // M-Pesa STK Push
  const handleMpesa = async () => {
    setLoading("mpesa");
    setMessage(null);
    const phone = formatPhoneForMpesa(address.phone);
    const result = await initiateMpesaSTKPush({
      phone,
      amount: amount,
      accountRef: `RiotGear-${Date.now().toString().slice(-6)}`,
    });
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    if (result.success) {
      // In production, you'd poll for payment confirmation
      // For now just show success
    }
    setLoading(null);
  };

  // Paystack
  const handlePaystack = () => {
    setLoading("paystack");
    setMessage(null);
    initiatePaystackPayment({
      email: address.email,
      amount: amount,
      currency: "NGN",
      onSuccess: (reference) => {
        setMessage({
          type: "success",
          text: `Payment successful! Ref: ${reference}`,
        });
        clearCart();
        setLoading(null);
      },
      onClose: () => {
        setMessage({ type: "error", text: "Payment window closed." });
        setLoading(null);
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-sm uppercase tracking-wider">Choose Payment</h3>
        <span className="font-bold text-lg">${amount.toFixed(2)}</span>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`p-3 text-xs font-medium rounded ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* WhatsApp Checkout */}
      <button
        onClick={handleWhatsApp}
        disabled={loading !== null}
        className="bg-[#25D366] text-white p-3 font-bold flex justify-between items-center hover:bg-[#1da851] transition-colors disabled:opacity-50 text-sm"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          ORDER VIA WHATSAPP
        </span>
        <span className="text-[10px] opacity-75">Direct to Seller</span>
      </button>

      {/* M-Pesa */}
      <button
        onClick={handleMpesa}
        disabled={loading !== null}
        className="bg-[#49B642] text-white p-3 font-bold flex justify-between items-center hover:bg-[#3da636] transition-colors disabled:opacity-50 text-sm"
      >
        <span className="flex items-center gap-2">
          {loading === "mpesa" ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <span className="font-black text-lg">M</span>
          )}
          PAY VIA M-PESA
        </span>
        <span className="text-[10px] opacity-75">Kenya/Tanzania</span>
      </button>

      {/* Paystack */}
      <button
        onClick={handlePaystack}
        disabled={loading !== null}
        className="bg-[#09A5DB] text-white p-3 font-bold flex justify-between items-center hover:bg-[#0890bf] transition-colors disabled:opacity-50 text-sm"
      >
        <span className="flex items-center gap-2">
          {loading === "paystack" ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
          PAY WITH PAYSTACK
        </span>
        <span className="text-[10px] opacity-75">Nigeria/SA/Ghana</span>
      </button>

      <p className="text-[10px] text-gray-500 text-center mt-1">
        Shipping to: {address.city}, {address.country} — {address.fullName}
      </p>
    </div>
  );
}
