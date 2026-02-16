import { z } from 'zod';
import * as schemas from './schemas';

// ─── Base Types (inferred from Zod schemas) ──────────────────────────────────
export type Banner = z.infer<typeof schemas.BannerSchema>;
export type Branch = z.infer<typeof schemas.BranchSchema>;
export type Cart = z.infer<typeof schemas.CartSchema>;
export type Category = z.infer<typeof schemas.CategorySchema>;
export type Customer = z.infer<typeof schemas.CustomerSchema>;
export type Employee = z.infer<typeof schemas.EmployeeSchema>;
export type Media = z.infer<typeof schemas.MediaSchema>;
export type Order = z.infer<typeof schemas.OrderSchema>;
export type OrderItem = z.infer<typeof schemas.OrderItemSchema>;
export type Product = z.infer<typeof schemas.ProductSchema>;
export type PurchaseOrder = z.infer<typeof schemas.PurchaseOrderSchema>;
export type PurchaseOrderItem = z.infer<typeof schemas.PurchaseOrderItemSchema>;
export type PurchaseReturn = z.infer<typeof schemas.PurchaseReturnSchema>;
export type PurchaseReturnItem = z.infer<typeof schemas.PurchaseReturnItemSchema>;
export type Sale = z.infer<typeof schemas.SaleSchema>;
export type SaleItem = z.infer<typeof schemas.SaleItemSchema>;
export type SalePayment = z.infer<typeof schemas.SalePaymentSchema>;
export type Settings = z.infer<typeof schemas.SettingsSchema>;
export type Stock = z.infer<typeof schemas.StockSchema>;
export type StockLog = z.infer<typeof schemas.StockLogSchema>;
export type StockTransfer = z.infer<typeof schemas.StockTransferSchema>;
export type StockTransferItem = z.infer<typeof schemas.StockTransferItemSchema>;
export type Supplier = z.infer<typeof schemas.SupplierSchema>;
export type User = z.infer<typeof schemas.UserSchema>;

// ─── Relation Types ──────────────────────────────────────────────────────────
export type BannerWithRelations = Banner & {
  media?: Media | null;
};

export type BranchWithRelations = Branch & {
  media?: Media[];
  sales?: Sale[];
};

export type CartWithRelations = Cart & {
  product?: Product | null;
  customer?: Customer | null;
};

export type CategoryWithRelations = Category & {
  media?: Media[];
  products?: Product[];
};

export type CustomerWithRelations = Customer & {
  sales?: Sale[];
};

export type EmployeeWithRelations = Employee & {
  branch?: Branch | null;
  user?: User | null;
};

export type OrderWithRelations = Order & {
  items?: OrderItem[];
  branch?: Branch | null;
  customer?: Customer | null;
  sale?: Sale | null;
};

export type OrderItemWithRelations = OrderItem & {
  order?: Order | null;
  product?: Product | null;
};

export type ProductWithRelations = Product & {
  category?: Category | null;
  media?: Media[];
  stocks?: Stock[];
};

export type PurchaseOrderWithRelations = PurchaseOrder & {
  items?: PurchaseOrderItem[];
  supplier?: Supplier | null;
  branch?: Branch | null;
  employee?: Employee | null;
};

export type PurchaseOrderItemWithRelations = PurchaseOrderItem & {
  purchaseOrder?: PurchaseOrder | null;
  product?: Product | null;
};

export type PurchaseReturnWithRelations = PurchaseReturn & {
  items?: PurchaseReturnItem[];
  supplier?: Supplier | null;
  branch?: Branch | null;
};

export type PurchaseReturnItemWithRelations = PurchaseReturnItem & {
  purchaseReturn?: PurchaseReturn | null;
  product?: Product | null;
};

export type SaleWithRelations = Sale & {
  items?: SaleItem[];
  payments?: SalePayment[];
  branch?: Branch | null;
  employee?: Employee | null;
  customer?: Customer | null;
};

export type SaleItemWithRelations = SaleItem & {
  sale?: Sale | null;
  product?: Product | null;
};

export type SalePaymentWithRelations = SalePayment & {
  sale?: Sale | null;
};

export type StockWithRelations = Stock & {
  product?: Product | null;
  branch?: Branch | null;
  logs?: StockLog[];
};

export type StockLogWithRelations = StockLog & {
  stock?: Stock | null;
  user?: User | null;
};

export type StockTransferWithRelations = StockTransfer & {
  fromBranch?: Branch | null;
  toBranch?: Branch | null;
  items?: StockTransferItem[];
};

export type StockTransferItemWithRelations = StockTransferItem & {
  transfer?: StockTransfer | null;
  product?: Product | null;
};

export type UserWithRelations = User & {
  employee?: Employee | null;
  customer?: Customer | null;
};