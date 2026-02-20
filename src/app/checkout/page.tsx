"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useBranches } from "@/hooks/useDataFetchers";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [method, setMethod] = useState<"shipping" | "pickup">("shipping");
  const [loading, setLoading] = useState(false);

  const isBranchValid = method === "pickup" 
  ? cart.every(item => item.branch.id === selectedBranch)
  : true;

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
      if (data.order_id) {
        clearCart(); // Wipe the cart so they don't buy the same thing twice
        router.push(`/order-success/${data.order_id}`);
      }
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
                <Input name="address" placeholder="STREET ADDRESS" className="col-span-2 p-4 bg-gray-50 rounded-2xl border-none text-sm" required />
                <Input name="city" placeholder="CITY" className="p-4 bg-gray-50 rounded-2xl border-none text-sm" required />
                <Input name="postal" placeholder="POSTAL CODE" className="p-4 bg-gray-50 rounded-2xl border-none text-sm" required />
              </div>
            </section>
          ) : (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Select Branch</h3>
              {branchesLoading ? (
                <div className="h-14 w-full bg-gray-50 animate-pulse rounded-2xl" />
              ) : (
                <select 
                  name="branch_id" 
                  required
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(parseInt(e.target.value))}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm font-bold appearance-none cursor-pointer focus:ring-2 ring-primary/20"
                >
                  <option value="">-- CHOOSE A LOCATION --</option>
                  {branches?.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch.toUpperCase()}
                    </option>
                  ))}
                </select>
              )}
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
              disabled={!isBranchValid || loading}
              className={cn(
                  "w-full py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all",
                  isBranchValid ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {isBranchValid ? "Place Order Now" : "Branch Mismatch"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}