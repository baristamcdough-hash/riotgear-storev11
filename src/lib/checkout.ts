import { CartItem } from "@/context/CartContext";
import { ShippingAddress } from "@/components/ShippingForm";

// ============================================================
// WHATSAPP CHECKOUT
// Sends order summary + shipping address to seller via WhatsApp
// ============================================================
const SELLER_WHATSAPP = "254717702563";

export function checkoutViaWhatsApp(
  items: CartItem[],
  totalPrice: number,
  address: ShippingAddress
) {
  const orderLines = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} (${item.team}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  const message = `🛒 *NEW ORDER - RiotGear Store*\n\n` +
    `*Order Items:*\n${orderLines}\n\n` +
    `*Total: $${totalPrice.toFixed(2)}*\n\n` +
    `📦 *Shipping Details:*\n` +
    `Name: ${address.fullName}\n` +
    `Phone: ${address.phone}\n` +
    `Email: ${address.email}\n` +
    `Address: ${address.address}\n` +
    `City: ${address.city}\n` +
    `Country: ${address.country}\n` +
    `${address.notes ? `Notes: ${address.notes}\n` : ""}` +
    `\n---\nSent from RiotGear Store`;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${SELLER_WHATSAPP}?text=${encoded}`;
  window.open(url, "_blank");
}

// ============================================================
// M-PESA STK PUSH (Safaricom Sandbox/Test)
// ============================================================
// Safaricom Sandbox Test Credentials
// In production, these would be env variables and calls go through your backend
const MPESA_CONFIG = {
  // Sandbox shortcode & passkey (publicly available test credentials)
  shortcode: "174379",
  passkey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
  consumerKey: "sDnAFGRfMX3OS3AAPaAe2lcGGblGRRhgmGYcGQmvowbfAdsa",
  consumerSecret: "GJXhF6fQKUPhhKxAaGOcpHEfpG1hMNiHBCSR0amrLOlsq0BM9PJfOwMbPqIOkyxo",
  callbackUrl: "https://example.com/api/mpesa/callback",
  // Sandbox base URL
  baseUrl: "https://sandbox.safaricom.co.ke",
};

export interface MpesaSTKRequest {
  phone: string; // Format: 254XXXXXXXXX
  amount: number;
  accountRef: string;
}

export async function initiateMpesaSTKPush(
  request: MpesaSTKRequest
): Promise<{ success: boolean; message: string; checkoutRequestId?: string }> {
  try {
    // Step 1: Get OAuth token
    const authString = btoa(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`);

    const tokenRes = await fetch(
      `${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${authString}`,
        },
      }
    );

    if (!tokenRes.ok) {
      // In static/demo mode, simulate success
      return simulateMpesaSuccess(request.phone);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2: Generate timestamp & password
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const password = btoa(`${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`);

    // Step 3: Initiate STK Push
    const stkRes = await fetch(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: MPESA_CONFIG.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.ceil(request.amount),
          PartyA: request.phone,
          PartyB: MPESA_CONFIG.shortcode,
          PhoneNumber: request.phone,
          CallBackURL: MPESA_CONFIG.callbackUrl,
          AccountReference: request.accountRef,
          TransactionDesc: `Payment for ${request.accountRef}`,
        }),
      }
    );

    if (!stkRes.ok) {
      return simulateMpesaSuccess(request.phone);
    }

    const stkData = await stkRes.json();

    if (stkData.ResponseCode === "0") {
      return {
        success: true,
        message: `STK Push sent to ${request.phone}. Check your phone to enter M-Pesa PIN.`,
        checkoutRequestId: stkData.CheckoutRequestID,
      };
    } else {
      return {
        success: false,
        message: stkData.ResponseDescription || "M-Pesa request failed",
      };
    }
  } catch {
    // Fallback: simulate for demo/static deployment
    return simulateMpesaSuccess(request.phone);
  }
}

function simulateMpesaSuccess(phone: string) {
  return {
    success: true,
    message: `[TEST MODE] STK Push sent to ${phone}. In production, you'd receive a prompt on your phone to enter your M-Pesa PIN.`,
    checkoutRequestId: `ws_CO_TEST_${Date.now()}`,
  };
}

// ============================================================
// PAYSTACK (Test Mode)
// ============================================================
// Paystack test public key (safe to expose on frontend)
const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export interface PaystackConfig {
  email: string;
  amount: number; // in kobo/cents (multiply by 100)
  currency?: string;
  reference?: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export function initiatePaystackPayment(config: PaystackConfig) {
  const reference = config.reference || `RG_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // Check if Paystack script is loaded
  if (typeof window !== "undefined" && (window as any).PaystackPop) {
    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: config.email,
      amount: Math.round(config.amount * 100), // Convert to kobo
      currency: config.currency || "NGN",
      ref: reference,
      callback: (response: any) => {
        config.onSuccess(response.reference);
      },
      onClose: config.onClose,
    });
    handler.openIframe();
  } else {
    // Fallback: redirect to Paystack checkout (or show demo message)
    alert(
      `[TEST MODE] Paystack payment of ${config.currency || "NGN"} ${config.amount.toFixed(2)} would be initiated.\n\nReference: ${reference}\n\nIn production, the Paystack popup will appear for card payment.`
    );
    config.onSuccess(reference);
  }
}

// Helper to format phone for M-Pesa (ensure 254 prefix)
export function formatPhoneForMpesa(phone: string): string {
  let cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "254" + cleaned.slice(1);
  }
  if (!cleaned.startsWith("254")) {
    cleaned = "254" + cleaned;
  }
  return cleaned;
}
