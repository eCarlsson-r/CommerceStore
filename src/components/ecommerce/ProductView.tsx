"use client";
import Image from "next/image";
import { ProductCard } from "@/lib/types";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export function ProductView({ product }: { product: ProductCard }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
            {product.discount}% OFF
          </div>
        )}

        <div className="aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={
              product.image
                ? "http://localhost:8000/storage/" + product.image
                : "https://placehold.co/500x500/png"
            }
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-6 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            {product.category.name}
          </p>
          <h3 className="text-sm font-bold text-gray-900 uppercase truncate">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-lg font-black text-primary italic">
              {Number(product.price)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .replace(",00", ",-")}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-gray-300 line-through">
                {Number(product.price)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}
              </span>
            )}
          </div>

          {user && (
            <Button
              onClick={() => addToCart(product)}
              className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase hover:bg-primary transition-colors"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
