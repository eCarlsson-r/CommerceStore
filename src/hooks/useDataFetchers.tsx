"use client"

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type {
  BannersResponse,
  CategoriesResponse,
  ProductsResponse,
  ProductResponse,
  CustomerDetailsResponse
} from '@/lib/types'

export function useBanners() {
  return useQuery<BannersResponse>({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await api.get('/ecommerce/banners')
      return res.data
    }
  })
}

export function useCategories() {
  return useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/ecommerce/categories')
      return res.data
    }
  })
}

export function useProducts(params?: Record<string, string | number>) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params || {}],
    queryFn: async () => {
      const res = await api.get('/ecommerce/products', { params: params || {} })
      return res.data
    }
  })
}

export function useProduct(id?: string | number) {
  return useQuery<ProductResponse>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get(`/ecommerce/products/${id}`)
      return res.data
    },
    enabled: !!id
  })
}

export function useCustomerDetails(id?: string | number) {
  return useQuery<CustomerDetailsResponse>({
    queryKey: ['customer', id],
    queryFn: async () => {
      const res = await api.get(`/customers/${id}`)
      return res.data
    },
    enabled: !!id
  })
}
