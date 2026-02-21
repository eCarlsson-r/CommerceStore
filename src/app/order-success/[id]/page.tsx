"use client";
import { useOrder } from "@/hooks/useDataFetchers";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { Check, Truck, Store, MapPin, Clock } from "lucide-react";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { data: order, isLoading } = useOrder(id as string);
  console.info(order);

  if (isLoading) return <div className="p-20 text-center uppercase font-black animate-pulse">Verifying Transaction...</div>;
  if (!order) return <div className="p-20 text-center font-black">ORDER NOT FOUND</div>;

  const isPickup = !order.courier_service;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100">
          <Check size={40} strokeWidth={3} />
        </div>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter italic">
          {isPickup ? "Order Reserved" : "Shipment Initialized"}
        </h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
          Invoice #{id}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Order QR or Shipping Status */}
        <div className="bg-gray-50 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center">
          {isPickup ? (
            <>
              <div className="p-4 rounded-3xl mb-6">
                <QRCodeSVG value={`ORDER-${id}`} size={160} level="H" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Scan at Boutique</p>
              <p className="text-xs text-gray-400 mt-2">Show this to the store manager in {order.branch?.name}</p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Truck size={48} className="text-primary" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Carrier Assigned</p>
              <p className="text-lg font-black italic mt-1">{order.courier}</p>
              <p className="text-xs text-gray-400 mt-2">Tracking will be sent via WhatsApp</p>
            </>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="bg-gray-900 text-white rounded-[3rem] p-10 space-y-8">
          <div>
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-4 flex items-center gap-2">
              <Store size={12} /> {isPickup ? "Pickup Location" : "Shipping Destination"}
            </h3>
            <p className="font-black uppercase text-sm italic">
              {isPickup ? order.branch?.address : order.delivery_details?.address}
            </p>
            {isPickup && (
              <div className="mt-4 space-y-2">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                    <MapPin size={10} /> {order.branch?.address || "Medan, North Sumatra"}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                    <Clock size={10} /> 10:00 AM - 10:00 PM
                 </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-2">Total Paid</h3>
            <p className="text-2xl font-black italic text-white">
              {Number(order.total_amount)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                .replace(",00", ",-")
              }
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}