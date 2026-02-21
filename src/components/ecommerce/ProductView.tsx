"use client";
import Image from "next/image";
import { ProductCard } from "@/lib/types";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function ProductView({ product }: { product: ProductCard }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent the click from triggering the Link wrapper if you add one
    e.preventDefault();

    if (product.is_out_of_stock) {
      toast.error("This item is currently unavailable in all branches.");
      return;
    }

    if (product && product.primary_branch) addToCart(product, product.primary_branch);
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
          {product.discount}% OFF
        </div>
      )}

      <Link href={`/product/${product.id}`}>
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={
              product.image
                ? product.image.startsWith("http")
                    ? product.image
                    : "http://localhost:8000/storage/" + product.image
                : "https://placehold.co/500x500/png"
            }
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </Link>
      
      <div className="p-6 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
          {product.category?.name || "Jewelry"}
        </p>
        <h3 className="text-sm font-bold text-gray-900 uppercase truncate">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-black text-primary italic">
            {Number(product.price).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0
            })}
          </span>
        </div>

        {/* Corrected onClick and added event passing */}
        <Button
          onClick={handleAddToCart}
          className="mt-6 w-full py-6 bg-primary text-white rounded-xl text-[10px] font-black uppercase hover:bg-secondary transition-all active:scale-95"
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
}