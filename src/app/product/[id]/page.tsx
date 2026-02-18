// app/product/[id]/page.tsx
import api from "@/lib/api";
import { ProductCard } from "@/lib/types"; // Your type definition
import { ImageGallery } from "@/components/product/ImageGallery";
import { StockAvailability } from "@/components/product/StockAvailability";
import { Heart } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch product detail + branch stock levels
  const response = await api.get(`/product/${params.id}`);
  const product: ProductCard = response.data.product;
  const branchStocks = response.data.stocks; // Array of { branch_name, quantity }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Professional Gallery using your media[] */}
        <ImageGallery items={product.media || []} mainImage={product.image} />

        {/* Right: Product Info & Actions */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">
              {product.category.name}
            </p>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-black text-gray-900">
                Rp {product.price.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium quality jewelry from Republican Retail. Handcrafted
              excellence available across our 11 branches.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex gap-4">
            <button className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase text-xs shadow-2xl hover:bg-primary transition-all">
              Add to Shopping Bag
            </button>
            <button className="p-5 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Branch Availability Section */}
          <StockAvailability stocks={branchStocks} />
        </div>
      </div>
    </div>
  );
}
