import { ProductView } from "@/components/ecommerce/ProductView";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist(); // Assuming a similar hook

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <Heart className="text-gray-200" size={40} />
        </div>
        <h1 className="text-2xl font-black uppercase italic tracking-tighter">Your Collection Awaits</h1>
        <p className="text-gray-400 text-sm mt-2 max-w-xs uppercase font-bold tracking-widest leading-loose">
          Save your favorite pieces from our 11 boutiques to view them later.
        </p>
        <Link href="/shop" className="mt-10 px-10 py-4 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all">
          Explore Jewelry
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* Map through wishlist items using ProductView */}
      {wishlistItems.map(item => (
        <ProductView key={item.id} product={item} />
      ))}
    </div>
  );
}