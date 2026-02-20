"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth"; // Use our central auth hook
import { User, Package, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderProgress } from "@/components/account/OrderProgress";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (loading)
    return (
      <div className="py-24 text-center font-black uppercase animate-pulse">
        Opening your lounge...
      </div>
    );
  if (!user)
    return (
      <div className="py-24 text-center font-black uppercase">
        Please login to view your account.
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 space-y-2">
          <div className="mb-8">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Member Since
            </p>
            <p className="text-sm font-bold italic">
              {user.customer.created_at && new Date(user.customer.created_at).getFullYear()}
            </p>
          </div>

          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-2xl text-xs font-black uppercase transition-all",
              activeTab === "profile"
                ? "bg-gray-900 text-white shadow-xl"
                : "text-gray-400 hover:bg-gray-50",
            )}
          >
            <User className="w-4 h-4" /> Profile Details
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-2xl text-xs font-black uppercase transition-all",
              activeTab === "orders"
                ? "bg-gray-900 text-white shadow-xl"
                : "text-gray-400 hover:bg-gray-50",
            )}
          >
            <Package className="w-4 h-4" /> My Orders
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white border border-gray-100 rounded-[3rem] p-8 lg:p-12 shadow-sm">
          {activeTab === "profile" ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
              {/* Personal Details */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                      Profile Details
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Manage your identity
                    </p>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-all">
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                      Full Name
                    </label>
                    <Input
                      defaultValue={user.customer.name}
                      className="rounded-xl bg-gray-50 border-none p-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                      Email (Username)
                    </label>
                    <Input
                      defaultValue={user.customer.email || ""}
                      disabled
                      className="rounded-xl bg-gray-100 border-none p-6 text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                      Mobile
                    </label>
                    <Input
                      defaultValue={user.customer.mobile || ""}
                      className="rounded-xl bg-gray-50 border-none p-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                      Gender
                    </label>
                    <select value={user.customer.gender || "M"} className="w-full rounded-xl bg-gray-50 border-none p-4 text-sm font-bold">
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Security Section */}
              <section className="pt-12 border-t border-gray-50 space-y-6">
                <h3 className="flex items-center gap-2 text-[10px] font-black text-gray-900 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-primary" /> Security
                  Update
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="password"
                    placeholder="NEW PASSWORD"
                    className="rounded-xl bg-gray-50 border-none p-6"
                  />
                  <Input
                    type="password"
                    placeholder="CONFIRM NEW PASSWORD"
                    className="rounded-xl bg-gray-50 border-none p-6"
                  />
                </div>
              </section>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8">
                Order History
              </h2>
              <div className="space-y-4">
              {user?.customer?.orders?.length === 0 ? (
                  <p className="text-sm font-bold text-gray-400 uppercase">
                    You have no orders yet.
                  </p>
                ) : user?.customer?.orders?.map(order => (
                  <div key={order.id} className="p-6 border border-gray-100 rounded-[2rem] hover:bg-gray-50 transition-all flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-[10px] font-black text-primary uppercase">
                        Order #{order.id}
                      </p>
                      <p className="text-sm font-bold">Gold Wedding Ring - 18k</p>
                      <p className="text-[10px] text-gray-400 uppercase mt-1">
                        Status:{" "}
                        <OrderProgress status={order.status} />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">{
                        Number(order.total_amount)
                        .toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR"
                        }).replace(",00", ",-")}
                      </p>
                      <button className="text-[10px] font-black text-gray-400 hover:text-primary uppercase underline mt-1">
                        View Invoice
                      </button>
                    </div>
                  </div>
                ))
              }  
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
