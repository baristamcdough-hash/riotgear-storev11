"use client";

import { useState } from "react";
import { ADMIN_CREDS_KEY, DEFAULT_ADMIN_EMAIL, getAdminCreds } from "@/components/AdminLogin";

export default function AdminSettingsPage() {
  const creds = getAdminCreds();
  const [newEmail, setNewEmail] = useState(creds.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newEmail.trim() || !newPassword.trim()) {
      setError("Email and new password are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep("otp");
    // In production, this would send an email via Firebase/SendGrid/etc.
    // For now, we show it in an alert (simulate email delivery)
    alert(`OTP sent to ${DEFAULT_ADMIN_EMAIL}\\n\\nYour verification code: ${code}\\n\\n(In production, this is sent via email)`);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    // Save new credentials
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify({ email: newEmail, password: newPassword }));
    setStep("done");
    setMessage("Credentials updated successfully! Use your new login next time.");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Admin Settings</h1>
      <p className="text-sm text-gray-500 mb-6">Change your admin login credentials</p>

      <div className="max-w-lg">
        <div className="bg-white rounded-lg border p-6">
          {step === "done" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-[var(--color-charcoal)] mb-2">Credentials Updated</h2>
              <p className="text-sm text-gray-500 mb-4">{message}</p>
              <p className="text-xs text-gray-400">New email: <span className="font-bold">{newEmail}</span></p>
            </div>
          ) : step === "otp" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep("form")} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="font-bold text-sm uppercase tracking-wider">Verify OTP</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                A 6-digit verification code has been sent to <span className="font-bold text-[var(--color-charcoal)]">{DEFAULT_ADMIN_EMAIL}</span>. Enter it below to authorize the change.
              </p>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">{error}</div>}
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Enter OTP Code</label>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="000000" className="w-full border border-gray-200 px-4 py-3 text-lg text-center font-mono tracking-[0.5em] focus:outline-none focus:border-[var(--color-gold)]" />
                </div>
                <button type="submit" className="w-full bg-[var(--color-charcoal)] text-white font-bold py-3 text-sm uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors">
                  Verify & Update
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wider mb-4">Change Admin Credentials</h2>
              <p className="text-xs text-gray-500 mb-4">Changing credentials requires OTP verification sent to your admin email.</p>
              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded">{error}</div>}
              <form onSubmit={handleRequestOTP} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">New Admin Email</label>
                  <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} placeholder="Min 6 characters" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Re-enter password" className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)]" />
                </div>
                <button type="submit" className="w-full bg-[var(--color-charcoal)] text-white font-bold py-3 text-sm uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors">
                  Send OTP & Update
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-4 text-center">OTP will be sent to {DEFAULT_ADMIN_EMAIL}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
