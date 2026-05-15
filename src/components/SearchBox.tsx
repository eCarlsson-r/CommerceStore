"use client";
import { Search, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common");

  const [text, setText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const isDifferent = text !== currentSearch;

    const timeout = setTimeout(() => {
      if (!isDifferent) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      if (text) {
        params.set("search", text);
      } else {
        params.delete("search");
      }

      const queryString = params.toString();
      const candidateLocale = pathname?.split("/")[1];
      const supportedLocales = ["en", "id"];
      const hasLocale = supportedLocales.includes(candidateLocale || "");
      const basePath = hasLocale ? `/${candidateLocale}/shop` : "/shop";
      router.push(queryString ? `${basePath}?${queryString}` : basePath);
    }, 300);

    return () => clearTimeout(timeout);
  }, [text, searchParams, pathname, router]);

  return (
    <div className="relative group w-full max-w-md">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 ring-primary/20 focus:border-primary transition-all text-sm font-medium"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      {text && (
        <button
          onClick={() => setText("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
