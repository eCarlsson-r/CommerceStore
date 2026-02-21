import { Branch } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StockAvailability({ stocks, selectedStock, setSelectedStock }: { stocks: {branch: Branch, quantity: number}[], selectedStock: {branch: Branch, quantity: number} | undefined, setSelectedStock: (stock: {branch: Branch, quantity: number} | undefined) => void }) {
  return (
    <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Check Store Availability
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stocks.map((s) => (
          <button
            key={s.branch.id}
            disabled={s.quantity === 0}
            onClick={() => setSelectedStock(s)}
            className={cn(
              "flex justify-between items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase border-2 transition-all",
              selectedStock?.branch.id === s.branch.id 
                ? "border-primary bg-primary/5 text-primary" 
                : "border-gray-100 text-gray-400",
              s.quantity === 0 && "opacity-30 cursor-not-allowed"
            )}
          >
            <span className="text-[10px] font-bold text-gray-600 uppercase">
              {s.branch.name}
            </span>
            <span
              className={`text-[10px] font-black ${s.quantity > 0 ? "text-green-600" : "text-red-300"}`}
            >
              {s.quantity > 0 ? `${s.quantity} IN STOCK` : "OUT OF STOCK"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
