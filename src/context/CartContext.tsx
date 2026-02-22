"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Branch, CartItem, ProductCard } from "@/lib/types";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// 2. Define the Context interface
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductCard, branch: Branch) => void;
  updateQuantity: (id: number, branch: Branch, delta: number) => void;
  removeFromCart: (id: number, branch: Branch) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth(); // Assume you have an Auth hook
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Initial Load: Local for guests, API for users
  useEffect(() => {
    if (user) {
      // Fetch cart from Laravel
      api.get('/ecommerce/cart').then(res => setCart("data" in res.data ? res.data.data : res.data));
    } else {
      const saved = localStorage.getItem("shopping_cart");
      if (saved) setCart(JSON.parse(saved));
    }
  }, [user]);

  const addToCart = async (product: ProductCard, branch: Branch) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.branch.name === branch.name
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.branch.name === branch.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, branch }];
    });

    // 2. If logged in, push to Database
    if (user) {
      await api.post('/ecommerce/cart/', {
        product_id: product.id,
        branch_id: branch.id,
        quantity: 1
      });
    }
  };

  const updateQuantity = async (id: number, branch: Branch, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.branch.id === branch.id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    if (user) {
      // Sync change to Laravel
      await api.patch(`/ecommerce/cart/${id}`, { delta });
    }
  };

  const removeFromCart = async (id: number, branch: Branch) => {
    setCart((prev) => 
      prev.filter((item) => !(item.id === id && item.branch.id === branch.id))
    );

    if (user) {
      await api.delete(`/ecommerce/cart/${id}`);
    }
    toast.success("Item removed from bag");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("shopping_cart");
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};