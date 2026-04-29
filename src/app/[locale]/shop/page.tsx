import { getProducts, getCategories } from "@/lib/data-fetchers";
import Sidebar from "@/components/Sidebar";
import { ShopResultsClient } from "@/components/shop/ShopResultsClient";
import { getTranslations } from 'next-intl/server';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; max_price?: string }>;
}) {
  const t = await getTranslations('product');
  const params = await searchParams;
  
  const products = await getProducts(params);
  const categories = await getCategories();

  const priceBounds = {
    min: products.min_price,
    max: products.max_price,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 my-10">
      <Sidebar categories={categories} priceBounds={priceBounds} />

      <main className="flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            {params.category || t('ourCollection')}
          </h1>
        </header>

        <ShopResultsClient initialProducts={products.products} />
      </main>
    </div>
  );
}
