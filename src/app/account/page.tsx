"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth"; // Use our central auth hook
import { User, Package, ShieldCheck, Map, Truck, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderProgress } from "@/components/account/OrderProgress";
import { useOrders } from "@/hooks/useDataFetchers";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const { data: orders } = useOrders();
  const [activeTab, setActiveTab] = useState("profile");

  const handleViewInvoice = async (orderId: number) => {
    try {
      const response = await api.get(`/ecommerce/orders/${orderId}/invoice`, {
        responseType: 'blob',
      });
      console.info(response);
      
      const url = window.URL.createObjectURL(response.data);
      window.open(url, '_blank');
      
      // Cleanup the URL object after opening
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to load invoice:', error);
    }
  };

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
                ? "bg-primary text-white shadow-xl"
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
                ? "bg-primary text-white shadow-xl"
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
                    <select value={user.customer.gender || "M"} disabled className="w-full rounded-xl bg-gray-50 border-none p-4 text-sm font-bold">
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
              {!orders || orders.length === 0 ? (
                  <p className="text-sm font-bold text-gray-400 uppercase">
                    You have no orders yet.
                  </p>
                ) : orders.map(order => (
                  <div key={order.id} className={cn(
                    "p-6 rounded-[2rem] border transition-all flex flex-wrap justify-between gap-2",
                      order.status === 'cancelled' 
                        ? "bg-gray-50 border-gray-100 opacity-60 grayscale" 
                        : "bg-white border-gray-100 hover:border-primary/20 shadow-sm"
                    )}>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-primary uppercase">
                        Order #{order.order_number}
                      </p>
                      <p className="text-sm font-bold">
                        {order.items ? order.items.map(item => item.product?.name || "Unknown Product").join(", ") : "Unknown Product"}
                      </p>
                      <OrderProgress order={order} />
                    </div>
                    <div className="mt-4 text-right">
                      <p className="text-sm font-black">{
                        Number(order.total_amount)
                        .toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR"
                        }).replace(",00", ",-")}
                      </p>
                      <Button 
                        onClick={() => order.id && order.id > 0 && handleViewInvoice(order.id)}
                        variant="outline"
                        className="flex mt-2 items-center gap-2 text-gray-400 font-black hover:bg-gray-50 hover:text-primary transition-all"
                      >
                        <Printer size={16} className="text-gray-400 group-hover:text-primary" />
                        <span className="font-black text-gray-600">Print Invoice</span>
                      </Button>
                    </div>
                    <div className="w-full mt-4">
                      {order.status === 'shipped' && !order.delivery_details && (
                        <div className="flex w-full justify-center items-center mt-3 p-5 bg-primary rounded-[2.5rem] text-white animate-in zoom-in-95 duration-500">
                          <div className="bg-white p-3 rounded-2xl mr-5">
                            <QRCodeSVG value={order.order_number} size={120} />
                          </div>
                          <div className="items-start text-left">
                            <h4 className="text-sm font-black uppercase italic italic">Ready at {order.branch?.name}</h4>
                            <p className="text-[10px] opacity-80 mt-1 uppercase font-bold tracking-widest">
                              Show this QR to our staff to claim your piece
                            </p>
                            
                            <div className="w-full mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                              <div className="text-left">
                                  <p className="text-[8px] uppercase font-black opacity-60">Location</p>
                                  <p className="text-[10px] font-bold">{order.branch?.address}</p>
                              </div>
                              <button className="bg-white/10 p-2 rounded-lg">
                                  <Map size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {(order.status === 'shipped' || order.status === 'delivered') && order.delivery_details && (
                        <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 animate-in fade-in slide-in-from-top-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Shipment Details</p>
                              <h4 className="text-lg font-black italic uppercase italic text-gray-900">
                                {order.courier} Tracking
                              </h4>
                            </div>
                            <div className="bg-white p-2 rounded-xl shadow-sm">
                              <Truck className="text-primary" size={20} />
                            </div>
                          </div>

                          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <p className="text-[9px] font-black uppercase text-gray-400">Courier Service</p>
                              <p className="font-mono text-sm font-bold text-primary">
                                {order.courier_service}
                              </p>
                            </div>
                            <div>
                              <p className="text-[9px] font-black uppercase text-gray-400">Waybill Number</p>
                              <p className="font-mono text-sm font-bold text-primary">
                                {order.tracking_number || "Awaiting Pickup..."}
                              </p>
                            </div>

                            {order.tracking_number && (
                              <a 
                                href={`https://www.cekresi.com/?noresi=${order.tracking_number}`} // Or specific courier link
                                target="_blank"
                                className="bg-primary text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all text-center"
                              >
                                Track Package →
                              </a>
                            )}
                          </div>
                          
                          {!order.tracking_number && (
                            <p className="mt-4 text-[9px] font-bold text-gray-400 italic">
                              * Tracking info will appear once our boutique team hands the package to {order.courier}.
                            </p>
                          )}
                        </div>
                      )}
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
