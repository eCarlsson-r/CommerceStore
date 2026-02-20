"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Branch, CartItem, ProductCard } from "@/lib/types";
import { toast } from "sonner";

// 2. Define the Context interface
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductCard, branch: Branch) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // 3. Lazy Initializer: This fixes the "Cascading Renders" error
  // It reads from localStorage during the initial state creation, not in an effect.
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("shopping_cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Keep localStorage in sync when cart changes (This is the correct use of Effect)
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductCard, branch: Branch) => {
    setCart((prev) => {
      // We now check for uniqueness based on BOTH Product ID and Branch ID
      const exists = prev.find(
        (item) => item.id === product.id && item.branch.id === branch.id
      );

      if (exists) {
        toast.info(`Quantity updated for ${branch.name} stock`);
        return prev.map((item) =>
          item.id === product.id && item.branch.id === branch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success(`${product.name} added from ${branch.name}`);
      return [
        ...prev,
        { 
          ...product, 
          quantity: 1, 
          branch: branch
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};