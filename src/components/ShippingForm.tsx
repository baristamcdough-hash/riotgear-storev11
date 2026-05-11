"use client";

import { useState } from "react";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  notes: string;
}

interface ShippingFormProps {
  onSubmit: (address: ShippingAddress) => void;
  onBack: () => void;
}

const countries = [
  "Kenya",
  "Tanzania",
  "Uganda",
  "Nigeria",
  "Ghana",
  "South Africa",
  "Rwanda",
  "Ethiopia",
  "United Kingdom",
  "United States",
  "Other",
];

export default function ShippingForm({ onSubmit, onBack }: ShippingFormProps) {
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "Kenya",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const validate = (): boolean => {
    const newErrors: Partial<ShippingAddress> = {};
    if (!address.fullName.trim()) newErrors.fullName = "Name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone is required";
    if (!address.email.trim()) newErrors.email = "Email is required";
    if (!address.address.trim()) newErrors.address = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(address);
    }
  };

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-bold text-sm uppercase tracking-wider">Shipping Details</h3>
      </div>

      {/* Full Name */}
      <div>
        <input
          type="text"
          placeholder="Full Name *"
          value={address.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          className={`w-full border px-3 py-2 text-sm focus:outline-none focus:border-black ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
      </div>

      {/* Phone & Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            type="tel"
            placeholder="Phone (e.g. +254...) *"
            value={address.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={`w-full border px-3 py-2 text-sm focus:outline-none focus:border-black ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email *"
            value={address.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full border px-3 py-2 text-sm focus:outline-none focus:border-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
        </div>
      </div>

      {/* Street Address */}
      <div>
        <input
          type="text"
          placeholder="Street Address / Building / Estate *"
          value={address.address}
          onChange={(e) => updateField("address", e.target.value)}
          className={`w-full border px-3 py-2 text-sm focus:outline-none focus:border-black ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && <p className="text-red-500 text-[10px] mt-0.5">{errors.address}</p>}
      </div>

      {/* City & Country row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            placeholder="City / Town *"
            value={address.city}
            onChange={(e) => updateField("city", e.target.value)}
            className={`w-full border px-3 py-2 text-sm focus:outline-none focus:border-black ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.city && <p className="text-red-500 text-[10px] mt-0.5">{errors.city}</p>}
        </div>
        <div>
          <select
            value={address.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <textarea
          placeholder="Delivery notes (optional)"
          value={address.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          rows={2}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white font-bold py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
}
