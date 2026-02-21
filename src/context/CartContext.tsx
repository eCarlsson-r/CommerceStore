"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Branch, CartItem, ProductCard } from "@/lib/types";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

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
      api.get('/ecommerce/cart').then(res => setCart(res.data));
    } else {
      const saved = localStorage.getItem("shopping_cart");
      if (saved) setCart(JSON.parse(saved));
    }
  }, [user]);

  const addToCart = async (product: ProductCard, branch: Branch) => {
    const newItem = { ...product, quantity: 1, branch: branch };
    
    // Update State
    setCart(prev => [...prev, newItem]);

    // 2. If logged in, push to Database
    if (user) {
      await api.post('/ecommerce/cart/', {
        product_id: product.id,
        branch_id: branch.id,
        quantity: 1
      });
    }
  };
  const updateQuantity = (id: number, branch: Branch, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.branch.id === branch.id) {
          const newQty = item.quantity + delta;
          // Don't allow quantity to go below 1
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number, branch: Branch) => {
    setCart((prev) => 
      prev.filter((item) => !(item.id === id && item.branch === branch))
    );
  };

  const clearCart = () => {
    setCart([]);
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