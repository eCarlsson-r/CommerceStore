"use client";
import { ProductView } from "@/components/ecommerce/ProductView";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const t = useTranslations('wishlist');

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
           <Heart className="text-gray-200" size={40} />
        </div>
        <h1 className="text-2xl font-black uppercase italic tracking-tighter">{t('emptyTitle')}</h1>
        <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-xs leading-loose">
           {t('emptyDescription')}
        </p>
        <Link href="/shop" className="mt-10 px-8 py-4 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          {t('exploreCollection')}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20">
      <h1 className="text-3xl font-black uppercase italic mb-12">{t('mySelection')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {wishlist.map(product => (
          <ProductView key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}