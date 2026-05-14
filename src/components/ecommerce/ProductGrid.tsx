// components/ecommerce/ProductGrid.tsx
import { ProductView } from "./ProductView";
import { ProductCard } from "@/lib/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ProductGrid({ products }: { products: ProductCard[] }) {
  const t = useTranslations('common');
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-gray-50 p-8 rounded-[3rem] mb-6">
          <Search className="w-12 h-12 text-gray-200" />
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tight">
          {t('noResultsFound')}
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-xs">
          {t('noResultsDescription')}
        </p>
        <Link
          href="/shop"
          className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] shadow-xl"
        >
          {t('clearAllFilters')}
        </Link>
      </div>
    );
  } else
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <ProductView key={product.id} product={product} />
        ))}
      </div>
    );
}
