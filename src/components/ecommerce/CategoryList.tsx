import Link from "next/link";
import { Category } from "@/lib/types";

export function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((cat) => (
        <Link
          href={`/shop?category=${cat.slug}`}
          key={cat.id}
          className="shrink-0 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-black uppercase text-[10px] hover:bg-primary hover:text-white transition-all"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
