"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Branch, CartItem, ProductCard } from "@/lib/types";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { enqueueOfflineMutation } from "@/lib/offline/queue";

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
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("shopping_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 1. Initial Load for authenticated users from API
  useEffect(() => {
    if (!user) return;
    // Fetch cart from Laravel
    api
      .get('/ecommerce/cart')
      .then((res) => setCart("data" in res.data ? res.data.data : res.data));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

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
      const payload = {
        product_id: product.id,
        branch_id: branch.id,
        quantity: 1,
      };

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        enqueueOfflineMutation({
          idempotencyKey: `cart.add_item:${product.id}:${branch.id}:${Date.now()}`,
          type: "cart.add_item",
          payload,
        });
        toast.info("Saved offline. Will sync once online.");
        return;
      }

      try {
        await api.post('/ecommerce/cart/', payload);
      } catch {
        enqueueOfflineMutation({
          idempotencyKey: `cart.add_item:${product.id}:${branch.id}:${Date.now()}`,
          type: "cart.add_item",
          payload,
        });
        toast.warning("Unable to sync now. Queued for retry.");
      }
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
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        enqueueOfflineMutation({
          idempotencyKey: `cart.update_quantity:${id}:${branch.id}:${Date.now()}`,
          type: "cart.update_quantity",
          payload: { product_id: id, branch_id: branch.id, delta },
        });
        return;
      }
      try {
        const cartItem = cart.find(
          (item) => item.id === id && item.branch.id === branch.id,
        );
        const cartItemId = cartItem?.cart_item_id;
        if (!cartItemId) throw new Error("Missing cart item id for sync.");
        await api.patch(`/ecommerce/cart/${cartItemId}`, { delta });
      } catch {
        enqueueOfflineMutation({
          idempotencyKey: `cart.update_quantity:${id}:${branch.id}:${Date.now()}`,
          type: "cart.update_quantity",
          payload: {
            product_id: id,
            branch_id: branch.id,
            cart_item_id: cart.find(
              (item) => item.id === id && item.branch.id === branch.id,
            )?.cart_item_id,
            delta,
          },
        });
      }
    }
  };

  const removeFromCart = async (id: number, branch: Branch) => {
    setCart((prev) => 
      prev.filter((item) => !(item.id === id && item.branch.id === branch.id))
    );

    if (user) {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        const cartItemId = cart.find(
          (item) => item.id === id && item.branch.id === branch.id,
        )?.cart_item_id;
        enqueueOfflineMutation({
          idempotencyKey: `cart.remove_item:${id}:${branch.id}:${Date.now()}`,
          type: "cart.remove_item",
          payload: { product_id: id, branch_id: branch.id, cart_item_id: cartItemId },
        });
      } else {
        try {
          const cartItem = cart.find(
            (item) => item.id === id && item.branch.id === branch.id,
          );
          const cartItemId = cartItem?.cart_item_id;
          if (!cartItemId) throw new Error("Missing cart item id for sync.");
          await api.delete(`/ecommerce/cart/${cartItemId}`);
        } catch {
          const cartItemId = cart.find(
            (item) => item.id === id && item.branch.id === branch.id,
          )?.cart_item_id;
          enqueueOfflineMutation({
            idempotencyKey: `cart.remove_item:${id}:${branch.id}:${Date.now()}`,
            type: "cart.remove_item",
            payload: { product_id: id, branch_id: branch.id, cart_item_id: cartItemId },
          });
        }
      }
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