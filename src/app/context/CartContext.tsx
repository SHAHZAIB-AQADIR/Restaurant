"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { StaticImageData } from "next/image";

/* 1. Types                                                            */
export type CartItem = {
    id: number;
    title: string;
    desc: string;
    img : string | StaticImageData ;
    price: number;
    options?: { title: string; additionalPrice: number }[];
    catagory: string[];
    quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  changeQuantity: (id: number, delta: number) => void; // delta = +1 / ‑1
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  /** helper: how many of this id are currently in the cart? */
  getItemQuantity: (id: number) => number;
};

/* ------------------------------------------------------------------ */
/* 2. Context + Provider                                               */
/* ------------------------------------------------------------------ */
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  /* ---- Restore from localStorage ---------------------------------- */
  useEffect(() => {
    console.log("CartProvider: Loading from localStorage...");
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Type guard to ensure parsed data is an array
        if (Array.isArray(parsed)) {
          // Fix: ensure img is restored as string and validate each item
          const restored = parsed.map((item: CartItem) => ({
            id: item.id,
            title: item.title || "",
            desc: item.desc || "",
            img: item.img || "",
            price: item.price || 0,
            options: item.options || undefined,
            catagory: item.catagory || [],
            quantity: item.quantity || 0,
          }));
          console.log("CartProvider: Loaded from localStorage:", restored);
          setCartItems(restored);
        } else {
          console.error("CartProvider: Stored data is not an array");
          localStorage.removeItem("cartItems");
        }
      } catch (error) {
        console.error("CartProvider: Error parsing localStorage:", error);
        localStorage.removeItem("cartItems"); // corrupted data → reset
      }
    } else {
      console.log("CartProvider: No stored cart data found");
    }
    setIsHydrated(true);
  }, []);

  /* ---- Persist to localStorage ------------------------------------ */
  useEffect(() => {
    if (!isHydrated) return; // Don't save until after hydration
    
    console.log("CartProvider: Saving to localStorage:", cartItems);
    if (cartItems.length > 0) {
      // Strip StaticImageData objects down to just src before saving
      const serialisable = cartItems.map((i) => ({
        ...i,
        img: typeof i.img === "string" ? i.img : i.img.src,
      }));
      localStorage.setItem("cartItems", JSON.stringify(serialisable));
      console.log("CartProvider: Saved to localStorage:", serialisable);
    } else {
      localStorage.removeItem("cartItems");
      console.log("CartProvider: Removed from localStorage (empty cart)");
    }
  }, [cartItems, isHydrated]);

  /* ---- Actions ---------------------------------------------------- */
  const addToCart = useCallback((item: CartItem) => {
    console.log("CartProvider: Adding to cart:", item);
    if (item.quantity <= 0) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newItems = prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
        console.log("CartProvider: Updated existing item:", newItems);
        return newItems;
      }
      const newItems = [...prev, item];
      console.log("CartProvider: Added new item:", newItems);
      return newItems;
    });
  }, []);

  const changeQuantity = useCallback((id: number, delta: number) => {
    console.log(`CartProvider: Changing quantity for ${id} by ${delta}`);
    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);

      if (existing) {
        // update quantity
        const newQuantity = Math.max(0, existing.quantity + delta);
        if (newQuantity === 0) {
          // Remove item if quantity becomes 0
          const newItems = prev.filter(i => i.id !== id);
          console.log("CartProvider: Removed item (quantity 0):", newItems);
          return newItems;
        }
        const newItems = prev.map(i =>
          i.id === id ? { ...i, quantity: newQuantity } : i
        );
        console.log("CartProvider: Updated quantity:", newItems);
        return newItems;
      }

      console.log("CartProvider: Item not found in cart:", id);
      return prev; // nothing to do if item doesn't exist
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getItemQuantity = useCallback(
    (id: number) => {
      const quantity = cartItems.find((i) => i.id === id)?.quantity ?? 0;
      console.log(`CartProvider: Getting quantity for ${id}:`, quantity);
      return quantity;
    },
    [cartItems]
  );

  /* ---- Memoised value -------------------------------------------- */
  const value = useMemo<CartContextType>(
    () => ({
      cartItems,
      addToCart,
      changeQuantity,
      removeFromCart,
      clearCart,
      getItemQuantity,
    }),
    [cartItems, addToCart, changeQuantity, removeFromCart, clearCart, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* 3. Convenient hook                                                 */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
};
// // TODO: Implement this function to return a CartItem by id from your menu data
// function getItemByid(id: string): CartItem | undefined {
//   return undefined;
// }