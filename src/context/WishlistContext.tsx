"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductCard } from "@/lib/types";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface WishlistContextType {
  wishlist: ProductCard[];
  toggleWishlist: (product: ProductCard) => Promise<void>;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("wishlist");
  const [wishlist, setWishlist] = useState<ProductCard[]>([]);
  const { user } = useAuth();

  // Load from LocalStorage or API on mount
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        const { data } = await api.get("/ecommerce/wishlist");
        setWishlist(data);
      } else {
        const local = localStorage.getItem("wishlist");
        if (local) setWishlist(JSON.parse(local));
      }
    };
    loadWishlist();
  }, [user]);

  const toggleWishlist = async (product: ProductCard) => {
    const exists = wishlist.find((item) => item.id === product.id);
    let newWishlist;

    if (exists) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
      toast.info(t("removed"));
    } else {
      newWishlist = [...wishlist, product];
      toast.success(t("added"));
    }

    setWishlist(newWishlist);
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } else {
      // Sync with Laravel
      await api.post("/ecommerce/wishlist", { product_id: product.id });
    }
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};