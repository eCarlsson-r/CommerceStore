// lib/data-fetchers.ts
import api from "./api";
import { ProductsResponse, ProductResponse, BannersResponse, CategoriesResponse, CustomerDetailsResponse } from "@/lib/types";
import {
  useBanners,
  useCategories,
  useProducts,
  useProduct,
  useCustomerDetails,
} from "@/hooks/useDataFetchers";

// Keep original server-side helpers for compatibility
export async function getProducts(params: object): Promise<ProductsResponse> {
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

export async function getProduct(id: string): Promise<ProductResponse> {
    try {
        const response = await api.get(`/ecommerce/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
}

export async function getBanners(): Promise<BannersResponse> {
    const res = await api.get('/ecommerce/banners');
    return res.data;
}

export async function getCategories(): Promise<CategoriesResponse> {
    const res = await api.get('/ecommerce/categories');
    return res.data;
}

export async function getCustomerDetails(id: string): Promise<CustomerDetailsResponse> {
    const res = await api.get(`/customers/${id}`);
    return res.data;
}

// Re-export client hooks so pages/components can import from the same module
export { useBanners, useCategories, useProducts, useProduct, useCustomerDetails };