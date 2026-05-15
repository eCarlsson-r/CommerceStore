import { getProducts, getCategories } from "@/lib/data-fetchers";
import { ShopPageClient } from "@/components/shop/ShopPageClient";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; max_price?: string }>;
}) {
  // searchParams automatically contains { category: 'rings', max_price: '5000000' }
  const sparams = await searchParams;
  const products = await getProducts(sparams);
  const categories = await getCategories();

  const priceBounds = {
    min: products.min_price,
    max: products.max_price,
  };

  return (
    <ShopPageClient
      categories={categories}
      priceBounds={priceBounds}
      initialProducts={products.products}
      categoryName={sparams.category || "Our Collection"}
    />
  );
}
