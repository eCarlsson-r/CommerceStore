export type KPIName =
  | "conversion_uplift"
  | "average_order_value"
  | "support_deflection"
  | "ai_p95_latency_ms"
  | "ai_cost_per_order";

export type KPIRecord = {
  name: KPIName;
  value: number;
  unit: "percent" | "currency" | "count" | "milliseconds";
  timestamp: string;
  dimensions?: Record<string, string | number>;
};

export const AI_KPI_BASELINES: Record<KPIName, number> = {
  conversion_uplift: 0,
  average_order_value: 0,
  support_deflection: 0,
  ai_p95_latency_ms: 0,
  ai_cost_per_order: 0,
};
