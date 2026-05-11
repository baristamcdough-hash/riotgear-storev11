import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getApps } from "firebase/app";
import { CartItem } from "@/context/CartContext";
import { ShippingAddress } from "@/components/ShippingForm";

// Get Firestore instance from already-initialized Firebase app
const db = getFirestore(getApps()[0]);

export interface Order {
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentReference: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt?: any;
}

export interface OrderWithId extends Order {
  id: string;
  createdAt: Date;
}

/**
 * Save an order to Firestore under the "orders" collection
 */
export async function saveOrder(order: Order): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * Get all orders for a specific user, ordered by most recent
 */
export async function getUserOrders(userId: string): Promise<OrderWithId[]> {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as OrderWithId[];
}
