import { z } from 'zod';

// ─── Banner ──────────────────────────────────────────────────────────────────
export const BannerSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  title: z.string(),
  description: z.string().optional(),
  image_url: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  link_url: z.string().nullable().optional(),
  order_priority: z.coerce.number().default(0),
  is_active: z.coerce.boolean().default(true),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Branch ──────────────────────────────────────────────────────────────────
export const BranchSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  name: z.string(),
  address: z.string().optional(),
  phone: z.string().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Cart ────────────────────────────────────────────────────────────────────
export const CartSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  customer_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number().default(1),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Category ────────────────────────────────────────────────────────────────
export const CategorySchema = z.object({
  id: z.coerce.number().nullable().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Customer ────────────────────────────────────────────────────────────────
export const CustomerSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  name: z.string(),
  gender: z.string().default('M'),
  mobile: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  balance: z.coerce.number().default(0),
  points: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Employee ────────────────────────────────────────────────────────────────
export const EmployeeSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  user_id: z.coerce.number().nullable().optional(),
  branch_id: z.coerce.number(),
  name: z.string(),
  gender: z.string().default('M'),
  status: z.string().default('active'),
  join_date: z.string().nullable().optional(),
  quit_date: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Media ───────────────────────────────────────────────────────────────────
export const MediaSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  file_name: z.string(),
  mime_type: z.string(),
  extension: z.string(),
  size: z.coerce.number(),
  disk: z.string(),
  path: z.string(),
  model_type: z.string().nullable().optional(),
  model_id: z.coerce.number().nullable().optional(),
  url: z.string().optional(), // appended accessor
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Order ───────────────────────────────────────────────────────────────────
export const OrderSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  customer_id: z.coerce.number(),
  order_number: z.string(),
  status: z.string().default('pending'),
  total_amount: z.coerce.number().default(0),
  shipping_address: z.string().nullable().optional(),
  courier_service: z.string().nullable().optional(),
  tracking_number: z.string().nullable().optional(),
  sale_id: z.coerce.number().nullable().optional(),
  branch_id: z.coerce.number(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── OrderItem ───────────────────────────────────────────────────────────────
export const OrderItemSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  order_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number().default(1),
  unit_price: z.coerce.number().default(0),
  total_price: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Product ─────────────────────────────────────────────────────────────────
export const ProductSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  sku: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  category_id: z.coerce.number(),
  base_price: z.coerce.number().default(0),
  min_stock_alert: z.coerce.number().default(0),
  is_available: z.boolean().optional(), // appended accessor
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── PurchaseOrder ───────────────────────────────────────────────────────────
export const PurchaseOrderSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  order_number: z.string(),
  supplier_id: z.coerce.number(),
  branch_id: z.coerce.number(),
  order_date: z.string(),
  expected_date: z.string().nullable().optional(),
  total_amount: z.coerce.number().default(0),
  status: z.string().default('pending'),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
});

// ─── PurchaseOrderItem ───────────────────────────────────────────────────────
export const PurchaseOrderItemSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  purchase_order_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number().default(1),
  unit_price: z.coerce.number().default(0),
  total_price: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── PurchaseReturn ──────────────────────────────────────────────────────────
export const PurchaseReturnSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  return_number: z.string(),
  supplier_id: z.coerce.number(),
  branch_id: z.coerce.number(),
  reason: z.string().nullable().optional(),
  total_amount: z.coerce.number().default(0),
  user_id: z.coerce.number().nullable().optional(),
  return_date: z.string(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
});

// ─── PurchaseReturnItem ──────────────────────────────────────────────────────
export const PurchaseReturnItemSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  purchase_return_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number().default(1),
  condition: z.string().nullable().optional(),
  unit_price: z.coerce.number().default(0),
  total_price: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Sale ────────────────────────────────────────────────────────────────────
export const SaleSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  invoice_number: z.string(),
  date: z.string(),
  branch_id: z.coerce.number(),
  employee_id: z.coerce.number().nullable().optional(),
  customer_id: z.coerce.number().nullable().optional(),
  manual_discount: z.coerce.number().default(0),
  applied_points: z.coerce.number().default(0),
  subtotal: z.coerce.number().default(0),
  tax_amount: z.coerce.number().default(0),
  discount_amount: z.coerce.number().default(0),
  grand_total: z.coerce.number().default(0),
  status: z.string().default('completed'),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
});

// ─── SaleItem ────────────────────────────────────────────────────────────────
export const SaleItemSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  sale_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number().default(1),
  purchase_price: z.coerce.number().default(0),
  sale_price: z.coerce.number().default(0),
  discount_amount: z.coerce.number().default(0),
  total_price: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── SalePayment ─────────────────────────────────────────────────────────────
export const SalePaymentSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  sale_id: z.coerce.number(),
  payment_method: z.string(),
  bank_name: z.string().nullable().optional(),
  reference_number: z.string().nullable().optional(),
  amount_paid: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Settings ────────────────────────────────────────────────────────────────
export const SettingsSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  key: z.string(),
  value: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Stock ───────────────────────────────────────────────────────────────────
export const StockSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  product_id: z.coerce.number(),
  branch_id: z.coerce.number(),
  quantity: z.coerce.number().default(0),
  purchase_price: z.coerce.number().default(0),
  sale_price: z.coerce.number().default(0),
  discount_percent: z.coerce.number().default(0),
  min_stock_level: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── StockLog ────────────────────────────────────────────────────────────────
export const StockLogSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  stock_id: z.coerce.number(),
  reference_id: z.coerce.number().nullable().optional(),
  type: z.string(),
  description: z.string().nullable().optional(),
  quantity_change: z.coerce.number().default(0),
  balance_after: z.coerce.number().default(0),
  user_id: z.coerce.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── StockTransfer ───────────────────────────────────────────────────────────
export const StockTransferSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  from_branch_id: z.coerce.number(),
  to_branch_id: z.coerce.number(),
  created_by: z.coerce.number().nullable().optional(),
  date: z.string(),
  status: z.string().default('pending'),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── StockTransferItem ───────────────────────────────────────────────────────
export const StockTransferItemSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  stock_transfer_id: z.coerce.number(),
  product_id: z.coerce.number(),
  quantity: z.coerce.number().default(1),
  purchase_price: z.coerce.number().default(0),
  sale_price: z.coerce.number().default(0),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── Supplier ────────────────────────────────────────────────────────────────
export const SupplierSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  name: z.string(),
  contact_person: z.string().nullable().optional(),
  tax_id: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// ─── User ────────────────────────────────────────────────────────────────────
export const UserSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  username: z.string(),
  password: z.string().optional(),
  role: z.string().default('user'),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});
