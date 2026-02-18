import { getProducts, getCategories } from "@/lib/data-fetchers";
import Sidebar from "@/components/Sidebar";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; max_price?: string }>;
}) {
  // searchParams automatically contains { category: 'rings', max_price: '5000000' }
  const products = await getProducts(await searchParams);
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
            {(await searchParams).category || "Our Collection"}
          </h1>
        </header>

        <ProductGrid products={products.products} />
      </main>
    </div>
  );
}
