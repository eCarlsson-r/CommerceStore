"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useBranches } from "@/hooks/useDataFetchers";
import { cn } from "@/lib/utils";
import { AxiosError } from 'axios';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { data: branches, isLoading: branchesLoading } = useBranches();
  
  // Note: We use string for the branch name to match what's in the CartItem
  const [selectedBranch, setSelectedBranch] = useState<number>(0) ;
  const [method, setMethod] = useState<"shipping" | "pickup">("shipping");
  const [loading, setLoading] = useState(false);
  const [courier, setCourier] = useState("JNE-REG");

  // We check if the item's branch matches the user's selection
  // If we want to allow backend to handle transfers silently, we could remove 
  // this check, but it's safer to keep it so the branch knows they have the stock.
  const isBranchValid = method === "pickup" 
    ? (selectedBranch > 0 && cart.every(item => item.branch.id === selectedBranch))
    : true;

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isBranchValid) {
       toast.error("Some items are not available at the selected branch.");
       return;
    }

    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const orderData = {
      items: cart, // Contains id, quantity, and branch_name per item
      total: cartTotal,
      type: method,
      courier: method === "shipping" ? courier : "PICKUP", // Log as PICKUP if not shipping
      delivery_details: Object.fromEntries(formData)
    };

    try {
      const { data } = await api.post("/orders", orderData);
      
      if (data.order_id) {
        toast.success("Order placed successfully!");
        clearCart(); 
        router.push(`/order-success/${data.order_id}`);
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const msg = error.response?.data?.message as string || "Failed to process order.";
      toast.error(msg);   
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
                className={cn(
                    "p-6 rounded-[2rem] border-2 transition-all text-left",
                    method === "shipping" ? "border-secondary bg-secondary/5" : "border-gray-100"
                )}
              >
                <p className="font-black uppercase text-xs">Standard Shipping</p>
                <p className="text-[10px] text-gray-400 mt-1">Direct to your doorstep</p>
              </button>
              <button 
                type="button"
                onClick={() => setMethod("pickup")}
                className={cn(
                    "p-6 rounded-[2rem] border-2 transition-all text-left",
                    method === "pickup" ? "border-secondary bg-secondary/5" : "border-gray-100"
                )}
              >
                <p className="font-black uppercase text-xs">In-Store Pickup</p>
                <p className="text-[10px] text-gray-400 mt-1">Pick up at any branch</p>
              </button>
            </div>
          </section>

          {method === "shipping" && (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 pt-8">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Select Courier</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "JNE-REG", name: "JNE", desc: "2-3 Days" },
                  { id: "JNT-EXP", name: "J&T", desc: "1-2 Days" },
                  { id: "PVT-DLV", name: "Private", desc: "Same Day" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCourier(c.id)}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all text-center",
                      courier === c.id ? "border-primary bg-primary/5" : "border-gray-50"
                    )}
                  >
                    <p className="font-black text-xs uppercase">{c.name}</p>
                    <p className="text-[8px] text-gray-400 uppercase mt-1">{c.desc}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {method === "shipping" ? (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input name="address" placeholder="STREET ADDRESS" className="col-span-2 p-6 bg-gray-50 rounded-2xl border-none text-sm" required />
                <Input name="city" placeholder="CITY" className="p-6 bg-gray-50 rounded-2xl border-none text-sm" required />
                <Input name="postal" placeholder="POSTAL CODE" className="p-6 bg-gray-50 rounded-2xl border-none text-sm" required />
              </div>
            </section>
          ) : (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Select Pickup Branch</h3>
              {branchesLoading ? (
                <div className="h-14 w-full bg-gray-50 animate-pulse rounded-2xl" />
              ) : (
                <div className="relative">
                  <select 
                    name="pickup_branch" 
                    required
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(Number(e.target.value))}
                    className="w-full p-6 bg-gray-50 rounded-2xl border-none text-sm font-bold appearance-none cursor-pointer focus:ring-2 ring-secondary/20"
                  >
                    <option value="">-- CHOOSE A LOCATION --</option>
                    {/* Assuming branches is an array of strings or objects based on your endpoint */}
                    {branches?.map((branch) => branch?.id && branch.id > 0 && (
                      <option key={branch.id} value={branch.id}>
                        {branch.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              )}
              {!isBranchValid && selectedBranch > 0 && (
                <p className="text-[10px] font-bold text-red-500 uppercase mt-2">
                  × One or more items are not stocked at this location.
                </p>
              )}
            </section>
          )}
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gray-50 rounded-[3rem] p-10 sticky top-10">
            <h2 className="text-xl font-black uppercase italic tracking-tighter mb-8">Your Selection</h2>
            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={`${item.id}-${item.branch.name}`} className="flex justify-between items-start text-sm">
                  <div>
                    <p className="font-bold text-primary uppercase text-xs">{item.name}</p>
                    <p className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">
                       From: {item.branch.name} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-xs">
                    {
                    Number(item.price * item.quantity)
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                      .replace(",00", ",-")
                    }
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-6 space-y-2">
              <div className="flex justify-between items-center text-gray-400 text-[10px] font-black uppercase">
                <span>Subtotal</span>
                <span>{Number(cartTotal)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase text-primary">Total</span>
                <span className="text-3xl font-black text-secondary italic leading-none">
                  {Number(cartTotal)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}
                </span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={!isBranchValid || loading || cart.length === 0}
              className={cn(
                  "w-full mt-8 py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all shadow-lg",
                  isBranchValid && cart.length > 0 
                    ? "bg-primary text-white hover:bg-secondary active:scale-95" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {loading ? "Processing..." : isBranchValid ? "Complete Purchase" : "Branch Mismatch"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}