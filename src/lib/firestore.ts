import { getFirestore } from "firebase/firestore";
import { auth } from "@/lib/firebase";

// Re-export Firestore instance
export const db = getFirestore(auth.app);
