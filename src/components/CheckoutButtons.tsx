"use client";

interface CheckoutOptionsProps {
  amount: number;
}

export default function CheckoutOptions({ amount }: CheckoutOptionsProps) {
  return (
    <div className="flex flex-col gap-4 p-6 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg underline decoration-red-600">
        Checkout Options
      </h3>
      <p className="text-sm text-gray-600">
        Total: <span className="font-bold text-lg text-black">${amount.toFixed(2)}</span>
      </p>

      {/* Stripe for International */}
      <button className="bg-black text-white p-3 font-bold flex justify-between items-center hover:bg-gray-800 transition-colors">
        PAY WITH CARD (STRIPE) <span className="text-xs opacity-75">Global</span>
      </button>

      {/* M-Pesa for East Africa */}
      <button className="bg-[#49B642] text-white p-3 font-bold flex justify-between items-center hover:bg-[#3da636] transition-colors">
        PAY VIA M-PESA <span className="text-xs opacity-75">Kenya/Tanzania</span>
      </button>

      {/* Paystack for West/South Africa */}
      <button className="bg-[#09A5DB] text-white p-3 font-bold flex justify-between items-center hover:bg-[#0890bf] transition-colors">
        PAY WITH PAYSTACK <span className="text-xs opacity-75">Nigeria/SA/Ghana</span>
      </button>
    </div>
  );
}
