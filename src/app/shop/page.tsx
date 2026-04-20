import { getProducts, getCategories } from "@/lib/data-fetchers";
import { ShopPageClient } from "@/components/shop/ShopPageClient";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; max_price?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);
  const categories = await getCategories();

  const priceBounds = {
    min: products.min_price,
    max: products.max_price,
  };

  const categoryName = params.category || "Our Collection";

  return (
    <ShopPageClient
      categories={categories}
      priceBounds={priceBounds}
      initialProducts={products.products}
      categoryName={categoryName}
    />
  );
}
