"use client"

import { ImageGallery } from "@/components/product/ImageGallery";
import { StockAvailability } from "@/components/product/StockAvailability";
import { Heart, Info, Link as LinkIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useDataFetchers";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { WallpaperRoomPreview } from "@/components/ai/WallpaperRoomPreview";
import { ProductAIInsights } from "@/components/ai/ProductAIInsights";
import { useTranslations } from 'next-intl';

export default function ProductPage() {
  const t = useTranslations('common');
  const params = useParams();
  const productId = params.id as string;

  const { data: productResponse, isLoading, error } = useProduct(productId);
  const { addToCart, attachPreview } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(Number(productId));

  const [selectedStock, setSelectedStock] = useState(
    productResponse?.stocks.find(s => s.quantity > 0) || productResponse?.stocks[0]
  );

  const handleAddToCart = () => {
    // We pass the product object + the branch details selected by the user
    if (productResponse && selectedStock) addToCart(productResponse.product, selectedStock.branch);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">{t('loading')}...</div>
      </div>
    );
  }

  if (error || !productResponse) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-500">
          {t('error')}
        </div>
      </div>
    );
  }

  const product = productResponse.product;
  const branchStocks = productResponse.stocks;

  const handleWhatsAppInquiry = () => {
    if (!product || !selectedStock) return;

    const phoneNumber = selectedStock.branch.phone; // Ensure this is in international format (e.g., 6281...)
    const message = encodeURIComponent(
      `Hi! I saw the "${product.name}" on your website and noticed it's in stock at ${selectedStock.branch.name}. Could you share more details or photos of this piece?`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Professional Gallery using your media[] */}
        <div className="space-y-8">
          <ImageGallery items={product.media || []} mainImage={product.image} />
          <ProductAIInsights productId={product.id} />
        </div>

        {/* Right: Product Info & Actions */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-black text-secondary uppercase tracking-widest mb-2">
              {product.category.name}
            </p>
            <h1 className="text-4xl font-black text-primary uppercase tracking-tighter italic">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-black text-primary">
                {Number(product.price)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(",00", ",-")}
              </span>
              {product.discount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Branch Availability Section */}
          <StockAvailability stocks={branchStocks} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />

          {selectedStock && selectedStock.quantity > 0 && (
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-left-2">
              <MapPin size={16} className="text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Item available at <span className="text-primary">{selectedStock.branch.name}</span> Boutique
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex gap-4">
            <Button 
              onClick={() => handleAddToCart()} variant="outline"
              className="flex-1 py-5 bg-primary text-white rounded-2xl font-black shadow-2xl hover:bg-secondary hover:text-white transition-all"
            >
              Add to Shopping Bag
            </Button>

            <Button 
              onClick={handleWhatsAppInquiry} variant="outline"
              className="py-5 rounded-2xl font-black transition-all hover:text-white"
            >
              Chat with Boutique Staff
            </Button>

            <Button 
              onClick={() => toggleWishlist(productResponse.product)} variant="outline"
              className={cn("p-5 rounded-2xl transition-all border hover:text-white", isWishlisted && "text-red-500")}
            >
              <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <WallpaperRoomPreview 
            productName={product.name} 
            productImage={product.image}
          />

          {/* Footer of PDP: Authenticity Guarantee */}
          <div className="pt-8 border-t border-gray-100 flex gap-6">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Info size={12}/>
                </div>
                Verified Quality
             </div>
             {/* Link to the Locations Page */}
             <Link href="/locations" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter hover:text-primary transition-colors">
                <LinkIcon size={12}/> Visit Our Branches
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
