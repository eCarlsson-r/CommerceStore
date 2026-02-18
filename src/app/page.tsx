import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { getBanners, getCategories, getProducts } from "@/lib/data-fetchers";

export default async function HomePage() {
  // We fetch these in parallel for speed
  const [banners, categories, bestSellers, newArrivals] = await Promise.all([
    getBanners(),
    getCategories(),
    getProducts({ filter: "best-seller", limit: 4 }),
    getProducts({ filter: "new-arrival", limit: 8 }),
  ]);

  const priceBounds = {
    min: bestSellers.min_price,
    max: bestSellers.max_price,
  };

  return (
    <main className="space-y-12 py-8">
      <Hero banners={banners} />

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <Sidebar categories={categories} priceBounds={priceBounds} />
        </aside>

        <main className="w-full md:w-3/4">
          <section>
            <h2 className="text-xl font-black uppercase italic mb-6 text-primary">
              Best Sellers
            </h2>
            <ProductGrid products={bestSellers.products} />
          </section>

          <section className="-mx-4 px-4 py-12">
            <h2 className="text-xl font-black uppercase italic mb-6 text-primary">
              New Arrivals
            </h2>
            <ProductGrid products={newArrivals.products} />
          </section>
        </main>
      </div>
    </main>
  );
}
