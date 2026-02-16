import * as schemas from './schemas';
import { z } from 'zod';

export const API_RESOURCES = {
    banner: schemas.BannerSchema,
    branch: schemas.BranchSchema,
    cart: schemas.CartSchema,
    category: schemas.CategorySchema,
    customer: schemas.CustomerSchema,
    employee: schemas.EmployeeSchema,
    media: schemas.MediaSchema,
    order: schemas.OrderSchema,
    orderItem: schemas.OrderItemSchema,
    product: schemas.ProductSchema,
    purchaseOrder: schemas.PurchaseOrderSchema,
    purchaseOrderItem: schemas.PurchaseOrderItemSchema,
    purchaseReturn: schemas.PurchaseReturnSchema,
    purchaseReturnItem: schemas.PurchaseReturnItemSchema,
    sale: schemas.SaleSchema,
    saleItem: schemas.SaleItemSchema,
    salePayment: schemas.SalePaymentSchema,
    settings: schemas.SettingsSchema,
    stock: schemas.StockSchema,
    stockLog: schemas.StockLogSchema,
    stockTransfer: schemas.StockTransferSchema,
    stockTransferItem: schemas.StockTransferItemSchema,
    supplier: schemas.SupplierSchema,
    user: schemas.UserSchema,
} as const;

export type ApiResourceType = keyof typeof API_RESOURCES;
export type ApiResourceSchema<T extends ApiResourceType> = typeof API_RESOURCES[T];
export type ApiResourceData<T extends ApiResourceType> = z.infer<ApiResourceSchema<T>>;
