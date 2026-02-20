"use client";
import { useOrder } from "@/hooks/useDataFetchers";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { data: order, isLoading } = useOrder(id as string);

  if (isLoading) return <div className="p-20 text-center uppercase font-black">Retrieving Invoice...</div>;
  if (!order) return <div className="p-20 text-center uppercase font-black">Order Not Found</div>;

  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Sparkle Secured!</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-12">Order #{id}</p>

        <div className="bg-gray-50 rounded-[3rem] p-10 text-left space-y-8">
          <div>
            <h3 className="text-[10px] font-black uppercase text-gray-400 mb-2">Order Status</h3>
            <p className="text-sm font-bold uppercase">{order.status} — {order.type === 'pickup' ? 'Waiting for branch confirmation' : 'Preparing for shipment'}</p>
          </div>

          {order.type === 'pickup' && (
            <div className="p-6 bg-white rounded-2xl border border-gray-100">
              <h3 className="text-[10px] font-black uppercase text-primary mb-1">Pickup Location</h3>
              <p className="text-sm font-black italic">{order.branch}</p>
              <p className="text-[10px] text-gray-400 mt-2 uppercase">Please show this screen or your ID to the store manager.</p>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all">
            Continue Shopping
          </Link>
          <Link href="/account" className="px-8 py-4 border-2 border-gray-100 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-primary transition-all">
            Track in Account
          </Link>
        </div>
      </div>
    </div>
  );
}