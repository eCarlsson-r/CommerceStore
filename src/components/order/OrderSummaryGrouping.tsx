import { CartItem } from "@/lib/types";

// components/order/OrderSummaryGrouping.tsx
export function OrderSummaryGrouping({ cart }: { cart: CartItem[] }) {
  const groupedByBranch = cart.reduce((acc, item) => {
    if (!acc[item.branch.name]) acc[item.branch.name] = [];
    acc[item.branch.name].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedByBranch).map(([branch, items]) => (
        <div key={branch} className="border-l-4 border-primary pl-6 py-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
            Items from {branch}
          </h4>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm font-bold">
                <span>{item.quantity}x {item.name}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}