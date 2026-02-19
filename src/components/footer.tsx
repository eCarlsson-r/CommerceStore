import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-50 pt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Story */}
          <div className="lg:col-span-2 space-y-6">
            <Image
              src="/images/logo-text.png"
              alt="Carlsson Digital Commerce"
              width={180}
              height={60}
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Handcrafting eternal beauty for over a decade. Discover our exclusive collections across premium branches in Medan & Binjai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Collections</h3>
            <ul className="space-y-4">
              <li><Link href="/shop?category=rings" className="text-sm text-gray-400 hover:text-primary transition-all">Engagement Rings</Link></li>
              <li><Link href="/shop?category=necklaces" className="text-sm text-gray-400 hover:text-primary transition-all">Luxury Necklaces</Link></li>
              <li><Link href="/shop?category=watches" className="text-sm text-gray-400 hover:text-primary transition-all">Timepieces</Link></li>
              <li><Link href="/shop?category=gift-cards" className="text-sm text-gray-400 hover:text-primary transition-all">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Service</h3>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-primary transition-all">Online Help</Link></li>
              <li><Link href="/status" className="text-sm text-gray-400 hover:text-primary transition-all">Order Status</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-400 hover:text-primary transition-all">Shipping Policy</Link></li>
              <li><Link href="/locations" className="text-sm text-gray-400 hover:text-primary transition-all">Store Locations</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Stay Inspired</h3>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-gray-50 border-none p-4 rounded-2xl text-xs focus:ring-2 ring-primary/20"
              />
              <button className="absolute right-2 top-2 bg-primary text-white p-2 rounded-xl hover:scale-105 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight">
              Join our exclusive club for private sale access and new arrivals.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-gray-50 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Republican Jewelry. Handcrafted in Medan.
          </p>
          <div className="flex gap-8">
            <Link href="/terms" className="text-[10px] font-black text-gray-300 hover:text-primary uppercase tracking-widest">Terms</Link>
            <Link href="/privacy" className="text-[10px] font-black text-gray-300 hover:text-primary uppercase tracking-widest">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}