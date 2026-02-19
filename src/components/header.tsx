"use client";
import Image from "next/image";
import Link from "next/link";
import { User, Heart, LogOut, Lock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { CartDrawer } from "./cart/CartDrawer"; // Import the drawer we built

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white">
      {/* 1. Ultra-Thin Utility Bar */}
      <div className="bg-primary py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a href="tel:+2950188821" className="text-[10px] font-black text-gray-400 hover:text-white flex items-center tracking-widest transition-all">
              <Phone className="w-3 h-3 mr-2 text-primary" /> +2 95 01 88 821
            </a>
            <a href="mailto:info@republican.com" className="hidden sm:flex text-[10px] font-black text-gray-400 hover:text-white items-center tracking-widest transition-all">
              <Mail className="w-3 h-3 mr-2 text-primary" /> INFO@REPUBLICAN.COM
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <Instagram className="w-3 h-3 text-gray-400 hover:text-primary cursor-pointer" />
            <Facebook className="w-3 h-3 text-gray-400 hover:text-primary cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Area */}
      <div className="py-6 border-b border-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            
            {/* Branding */}
            <div className="flex-1">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="Carlsson Digital Commerce Logo"
                    width={60}
                    height={60}
                  />
                  <Image
                    src="/images/logo-text.png"
                    alt="Carlsson Digital Commerce"
                    width={180}
                    height={60}
                  />
                </div>
              </Link>
            </div>

            {/* Shop Menu */}
            <nav className="flex items-center gap-2 sm:gap-6">
              {user ? (
                <>
                  <Link href={`/account/${user.id}`} className="p-2 text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">Account</span>
                  </Link>
                  <Link href="/wishlist" className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                    <Heart className="w-5 h-5" />
                  </Link>
                  <CartDrawer /> {/* Integrated Cart Drawer */}
                  <button onClick={() => logout()} className="ml-4 p-2 text-red-300 hover:text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <CartDrawer /> {/* Integrated Cart Drawer */}
                  <Link href="/login" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all">
                    <Lock className="w-4 h-4" /> Member Login
                  </Link>
                </>
              )}
            </nav>

          </div>
        </div>
      </div>
    </header>
  );
}