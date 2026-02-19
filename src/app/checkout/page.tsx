"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<"shipping" | "pickup">("shipping");
  const [loading, setLoading] = useState(false);

  const branches = [
    "Medan Fair Mall", "Sun Plaza", "Binjai Supermall", 
    "Thamrin Plaza", "Delipark", "Millennium ICT", // Add all 11
  ];

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const orderData = {
      items: cart,
      total: cartTotal,
      type: method,
      details: Object.fromEntries(formData),
    };

    try {
      const { data } = await api.post("/ecommerce/orders", orderData);
      toast.success("Order placed successfully!");
      // Clear cart logic here
      router.push(`/order-success/${data.order_id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process order. Please check your stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Forms */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8">Delivery Method</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setMethod("shipping")}
                className={`p-6 rounded-[2rem] border-2 transition-all text-left ${method === "shipping" ? "border-primary bg-primary/5" : "border-gray-100"}`}
              >
                <p className="font-black uppercase text-xs">Standard Shipping</p>
                <p className="text-[10px] text-gray-400 mt-1">Direct to your doorstep</p>
              </button>
              <button 
                type="button"
                onClick={() => setMethod("pickup")}
                className={`p-6 rounded-[2rem] border-2 transition-all text-left ${method === "pickup" ? "border-primary bg-primary/5" : "border-gray-100"}`}
              >
                <p className="font-black uppercase text-xs">In-Store Pickup</p>
                <p className="text-[10px] text-gray-400 mt-1">Pick up at any branch</p>
              </button>
            </div>
          </section>

          {method === "shipping" ? (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <input name="address" placeholder="STREET ADDRESS" className="col-span-2 p-4 bg-gray-50 rounded-2xl border-none text-sm" required />
                <input name="city" placeholder="CITY" className="p-4 bg-gray-50 rounded-2xl border-none text-sm" required />
                <input name="postal" placeholder="POSTAL CODE" className="p-4 bg-gray-50 rounded-2xl border-none text-sm" required />
              </div>
            </section>
          ) : (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Select Branch</h3>
              <select name="branch_name" className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm font-bold appearance-none">
                {branches.map(b => <option key={b} value={b}>{b.toUpperCase()}</option>)}
              </select>
            </section>
          )}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-[3rem] p-10 sticky top-10">
            <h2 className="text-xl font-black uppercase italic tracking-tighter mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-mono">Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6 flex justify-between items-end">
              <span className="text-[10px] font-black uppercase text-gray-400">Total Amount</span>
              <span className="text-3xl font-black text-primary italic leading-none">
                Rp {cartTotal.toLocaleString()}
              </span>
            </div>
            <button 
              disabled={loading}
              className="w-full mt-10 py-6 bg-gray-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-primary transition-all shadow-xl"
            >
              {loading ? "Processing Order..." : "Place Order Now"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}