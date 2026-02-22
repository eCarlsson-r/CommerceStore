"use client";
import Link from "next/link";
import Image from "next/image";
import { useBranches, useCategories } from "@/hooks/useDataFetchers";
import { MapPin, Instagram, Phone, Package } from "lucide-react";

export default function Footer() {
  const { data: branches } = useBranches();
  const { data: categories } = useCategories();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="space-y-6">
          <Image
            src="/images/logo-text.png"
            alt="Carlsson Digital Commerce"
            width={218}
            height={50}
          />  
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-loose">
            Fine jewelry crafted for the bold. Since 2024, serving the heart of North Sumatra with 11 boutiques.
          </p>
          <div className="flex gap-4">
            <Instagram size={18} className="text-gray-400 hover:text-primary cursor-pointer" />
            <Phone size={18} className="text-gray-400 hover:text-primary cursor-pointer" />
          </div>
        </div>

        {/* Boutiques Column */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-8">Our Boutiques</h3>
          <div className="grid gap-y-3 gap-x-4">
            {branches?.map((branch, index) => index < 5 && (
              <Link key={branch.id} href={`/locations/${branch.id}`} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase hover:text-primary transition-colors cursor-pointer">
                <MapPin size={10} /> {branch.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Column */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-8">Our Categories</h3>
          <div className="grid gap-y-3 gap-x-4">
            {categories?.map((category, index) => index < 5 && (
              <Link href={`/shop?category=${category.slug}`} key={category.id} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase hover:text-primary transition-colors cursor-pointer">
                <Package size={10} /> {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Client Care */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-8">Client Care</h3>
          <ul className="space-y-4 text-[10px] font-bold text-gray-500 uppercase">
            <li className="hover:text-primary cursor-pointer">
              <Link href="/wishlist">My Wishlist</Link>
            </li>
            <li className="hover:text-primary cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-primary cursor-pointer">Authenticity Guarantee</li>
            <li className="hover:text-primary cursor-pointer">
              <Link href="/locations">Visit our Branches</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 pt-8 border-t border-gray-50 text-center">
        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">
          &copy; 2026 Carlsson Digital Commerce. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}