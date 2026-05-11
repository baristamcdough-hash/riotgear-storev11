import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDoSW2G988dl_awBQ0XDKztotIw-h30DE",
  authDomain: "poriot-gear-storefront.firebaseapp.com",
  projectId: "poriot-gear-storefront",
  storageBucket: "poriot-gear-storefront.firebasestorage.app",
  messagingSenderId: "625258949997",
  appId: "1:625258949997:web:0194fa84e34c0a2a4efe64",
};

// Initialize Firebase (prevent re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force account selection on every sign-in
googleProvider.setCustomParameters({
  prompt: "select_account",
});
