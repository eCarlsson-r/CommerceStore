// components/ecommerce/ProductGrid.tsx
import { ProductView } from "./ProductView";
import { ProductResponse } from "@/lib/types";
import { Search } from "lucide-react";
import Link from "next/link";

export function ProductGrid({ products }: { products: ProductResponse[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-gray-50 p-8 rounded-[3rem] mb-6">
          <Search className="w-12 h-12 text-gray-200" />
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tight">
          No results found
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-xs">
          We could not find anything matching your filters. Try adjusting your
          price range or search term.
        </p>
        <Link
          href="/shop"
          className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] shadow-xl"
        >
          Clear All Filters
        </Link>
      </div>
    );
  } else
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductView key={product.product.id} product={product.product} branch={product.stocks[0].branch} />
        ))}
      </div>
    );
}
