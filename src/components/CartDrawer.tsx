"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import ShippingForm, { ShippingAddress } from "./ShippingForm";
import CheckoutOptions from "./CheckoutButtons";

type Step = "cart" | "shipping" | "payment";

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset to cart step after a delay so animation is smooth
    setTimeout(() => setStep("cart"), 300);
  };

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setStep("payment");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="font-bold text-lg uppercase">
            {step === "cart" && `Your Cart (${totalItems})`}
            {step === "shipping" && "Shipping Info"}
            {step === "payment" && "Payment"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* STEP 1: Cart Items */}
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Add some jerseys to get started!</p>
                  <button
                    onClick={handleClose}
                    className="mt-4 bg-black text-white px-6 py-2 font-bold text-sm uppercase"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-bold uppercase">{item.team}</p>
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 border flex items-center justify-center text-sm font-bold hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border flex items-center justify-center text-sm font-bold hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 text-xs font-bold hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* STEP 2: Shipping Form */}
          {step === "shipping" && (
            <ShippingForm
              onSubmit={handleShippingSubmit}
              onBack={() => setStep("cart")}
            />
          )}

          {/* STEP 3: Payment Options */}
          {step === "payment" && shippingAddress && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setStep("shipping")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <p className="text-xs text-gray-500">
                  Delivering to <span className="font-bold text-black">{shippingAddress.fullName}</span> in {shippingAddress.city}, {shippingAddress.country}
                </p>
              </div>
              <CheckoutOptions amount={totalPrice} address={shippingAddress} />
            </div>
          )}
        </div>

        {/* Footer — only show on cart step with items */}
        {step === "cart" && items.length > 0 && (
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold uppercase text-sm">Subtotal</span>
              <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setStep("shipping")}
              className="w-full bg-black text-white font-bold py-3 text-sm uppercase tracking-wider hover:bg-red-600 transition-colors"
            >
              Proceed to Checkout
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Free shipping on orders over $50
            </p>
          </div>
        )}
      </div>
    </>
  );
}
