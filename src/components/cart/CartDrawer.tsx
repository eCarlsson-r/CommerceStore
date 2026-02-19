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
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";

export function CartDrawer() {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <Sheet>
      <SheetTrigger className="relative p-2">
        <ShoppingBag className="w-6 h-6 text-gray-900" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
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
          {cart.map((item: any) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black uppercase truncate w-40">
                  {item.name}
                </h4>
                <p className="text-sm font-bold text-primary mt-1">
                  {Number(item.price)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}
                </p>

                {/* Quantity Toggles */}
                <div className="flex items-center gap-3 mt-3">
                  <button className="p-1 rounded-md bg-gray-100">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black">{item.quantity}</span>
                  <button className="p-1 rounded-md bg-gray-100">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-gray-400">
              Estimated Total
            </span>
            <span className="text-xl font-black text-gray-900 italic">
              {Number(cartTotal)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}
            </span>
          </div>
          <button className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase text-xs shadow-xl shadow-gray-200">
            Proceed to Checkout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
