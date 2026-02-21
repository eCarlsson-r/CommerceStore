"use client"

import { ImageGallery } from "@/components/product/ImageGallery";
import { StockAvailability } from "@/components/product/StockAvailability";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useDataFetchers";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const { data: productResponse, isLoading, error } = useProduct(productId);
  const { addToCart } = useCart();

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
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (error || !productResponse) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center text-red-500">
          Error loading product. Please try again.
        </div>
      </div>
    );
  }

  const product = productResponse.product;
  const branchStocks = productResponse.stocks;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Professional Gallery using your media[] */}
        <ImageGallery items={product.media || []} mainImage={product.image} />

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

          {/* Call to Action */}
          <div className="flex gap-4">
            <Button onClick={() => handleAddToCart()} className="flex-1 bg-primary text-white py-5 rounded-2xl font-black uppercase text-xs shadow-2xl hover:bg-secondary transition-all">
              Add to Shopping Bag
            </Button>
            <Button className="p-5 rounded-2xl hover:bg-secondary transition-all">
              <Heart className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
