"use client";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { useBanners, useCategories, useProducts } from "@/hooks/useDataFetchers"

export default function HomePage() {
  // We fetch these in parallel for speed
  const { data: banners, isLoading: bannersLoading } = useBanners();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: bestSellers, isLoading: bestSellersLoading } = useProducts({ filter: "best-seller", limit: 4 });
  const { data: newArrivals, isLoading: newArrivalsLoading } = useProducts({ filter: "new-arrival", limit: 8 });

  const isLoading = bannersLoading || categoriesLoading || bestSellersLoading || newArrivalsLoading;

  const priceBounds = {
    min: bestSellers?.min_price || 0,
    max: bestSellers?.max_price || 0,
  };

  if (isLoading) {
    return (
      <main className="space-y-12 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-12 py-8">
      {banners && (<Hero banners={banners} />)}

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          {categories && (<Sidebar categories={categories} priceBounds={priceBounds} />)}
        </aside>

        <main className="w-full md:w-3/4">
          <section>
            <h2 className="text-xl font-black uppercase italic mb-6 text-primary">
              Best Sellers
            </h2>
            <ProductGrid products={bestSellers?.products || []} />
          </section>

          <section className="-mx-4 px-4 py-12">
            <h2 className="text-xl font-black uppercase italic mb-6 text-primary">
              New Arrivals
            </h2>
            <ProductGrid products={newArrivals?.products || []} />
          </section>
        </main>
      </div>
    </main>
  );
}
