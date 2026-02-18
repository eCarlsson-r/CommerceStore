// lib/data-fetchers.ts
import api from "./api";
import { ProductCard, Category, Banner } from "@/lib/types";

export async function getProducts(params: object): Promise<{products: ProductCard[], min_price: number, max_price: number}> {
    try {
        const response = await api.get('/ecommerce/products', {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products:`, error);
        return {products: [], min_price: 0, max_price: 0};
    }
}

export async function getBanners(): Promise<Banner[]> {
    const res = await api.get('/ecommerce/banners');
    return res.data;
}

export async function getCategories(): Promise<Category[]> {
    const res = await api.get('/ecommerce/categories');
    return res.data;
}