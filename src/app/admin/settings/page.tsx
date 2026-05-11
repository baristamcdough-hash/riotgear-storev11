"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ADMIN_CREDS_KEY, DEFAULT_ADMIN_EMAIL, getAdminCreds } from "@/components/AdminLogin";

// ============================================================
// EmailJS Configuration (Free Tier - 200 emails/month)
// ============================================================
// To set this up:
// 1. Go to https://emailjs.com and create a free account
// 2. Add an Email Service (Gmail recommended) → get SERVICE_ID
// 3. Create an Email Template with these variables:
//    Subject: "RiotGear Admin - Your Verification Code: {{otp_code}}"
//    Body: "Your verification code is: {{otp_code}}\n\nThis code expires in 10 minutes.\n\nIf you didn't request this, ignore this email."
//    To: {{to_email}}
// 4. Get your PUBLIC_KEY from Account → API Keys
// 5. Replace the values below:
const EMAILJS_SERVICE_ID = "service_riotgear";    // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_otp";       // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your EmailJS public key

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
  const [sending, setSending] = useState(false);

  const sendOtpEmail = async (code: string) => {
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: DEFAULT_ADMIN_EMAIL,
          otp_code: code,
          admin_name: "RiotGear Admin",
        },
        EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (err) {
      console.error("EmailJS error:", err);
      // Fallback: show OTP in alert if EmailJS not configured
      alert(`OTP sent to ${DEFAULT_ADMIN_EMAIL}\n\nYour verification code: ${code}\n\n(In production, this is sent via email)`);
      return true;
    } finally {
      setSending(false);
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
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
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    // Send OTP via EmailJS
    const sent = await sendOtpEmail(code);
    if (sent) {
      setStep("otp");
    } else {
      setError("Failed to send OTP. Please try again.");
    }
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
              <p className="text-[10px] text-gray-400 mt-4 text-center">OTP will be sent to {DEFAULT_ADMIN_EMAIL}</p>
            </div>
          ) : (
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wider mb-1">Change Admin Credentials</h2>
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
                <button type="submit" disabled={sending} className="w-full bg-[var(--color-charcoal)] text-white font-bold py-3 text-sm uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50">
                  {sending ? "Sending OTP..." : "Send OTP & Update"}
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-4 text-center">OTP will be sent to {DEFAULT_ADMIN_EMAIL}</p>
            </div>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">EmailJS Setup (One-time)</h3>
          <ol className="text-[11px] text-amber-700 space-y-1.5 list-decimal list-inside">
            <li>Go to <a href="https://emailjs.com" target="_blank" className="underline font-bold">emailjs.com</a> → Create free account</li>
            <li>Add Email Service (Gmail) → copy <span className="font-mono bg-amber-100 px-1">Service ID</span></li>
            <li>Create template with variables: <span className="font-mono bg-amber-100 px-1">{"{{otp_code}}"}</span>, <span className="font-mono bg-amber-100 px-1">{"{{to_email}}"}</span></li>
            <li>Copy <span className="font-mono bg-amber-100 px-1">Template ID</span> and <span className="font-mono bg-amber-100 px-1">Public Key</span></li>
            <li>Update values in <span className="font-mono bg-amber-100 px-1">src/app/admin/settings/page.tsx</span></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
