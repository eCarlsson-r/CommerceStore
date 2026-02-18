export function StockAvailability({ stocks }: { stocks: any[] }) {
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
          <div
            key={s.branch_name}
            className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100"
          >
            <span className="text-[10px] font-bold text-gray-600 uppercase">
              {s.branch_name}
            </span>
            <span
              className={`text-[10px] font-black ${s.quantity > 0 ? "text-green-600" : "text-red-300"}`}
            >
              {s.quantity > 0 ? `${s.quantity} IN STOCK` : "OUT OF STOCK"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
