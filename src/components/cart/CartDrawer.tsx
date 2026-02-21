// components/cart/CartDrawer.tsx
"use client";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger className="relative p-2">
        <ShoppingBag className="w-6 h-6 text-primary" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            {cart.length}
          </span>
        )}
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-6">
          <SheetTitle className="text-xl font-black uppercase italic tracking-tighter">
            Your Bag
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.branch.id}`} className="flex gap-4 py-4 border-b border-gray-50 last:border-0">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-50">
                <Image src={item.image ? item.image.startsWith("http")
                    ? item.image
                    : "http://localhost:8000/storage/" + item.image
                : "https://placehold.co/200x200/png"} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-black uppercase italic leading-tight">{item.name}</h4>
                  
                  {/* The Branch Marker */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1 h-1 rounded-full bg-green-500" />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      Available @ {item.branch.name}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                  <p className="text-sm font-black text-secondary">
                    {Number(item.price)
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                      .replace(",00", ",-")}
                  </p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.branch, -1)}
                      className="flex w-6 h-6 items-center justify-center border rounded-full hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-sm font-black">{item.quantity}</span>

                    <button 
                      onClick={() => updateQuantity(item.id, item.branch, 1)}
                      className="flex w-6 h-6 items-center justify-center border rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {/* REMOVE ITEM */}
                    <button 
                      onClick={() => removeFromCart(item.id, item.branch)}
                      className="ml-4 text-red-500 text-[10px] font-black uppercase hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-gray-400">
              Estimated Total
            </span>
            <span className="text-xl font-black text-primary italic">
              {Number(cartTotal)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}
            </span>
          </div>
          <Link href="/checkout" className="block w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase text-center shadow-xl shadow-gray-200">
            Proceed to Checkout
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
