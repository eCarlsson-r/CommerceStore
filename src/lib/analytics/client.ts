import api from "./api";

type KPICategory = "commercial" | "operational" | "governance";
type KPIMetric = string;

interface KPIEventPayload {
  category: KPICategory;
  metric: KPIMetric;
  value: number | string;
  context?: Record<string, any>;
  source?: "api" | "web" | "pos";
}

class AnalyticsClient {
  private sessionId: string;
  private userId?: number;
  private customerId?: number;
  private eventQueue: KPIEventPayload[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Generate or retrieve session ID from localStorage
    const stored = typeof window !== "undefined" ? localStorage.getItem("session_id") : null;
    this.sessionId = stored || this.generateSessionId();

    if (typeof window !== "undefined") {
      localStorage.setItem("session_id", this.sessionId);
      // Set as request header for all subsequent API calls
      api.defaults.headers.common["X-Session-ID"] = this.sessionId;
    }

    // Set up automatic flush every 30 seconds
    if (typeof window !== "undefined") {
      this.flushInterval = setInterval(() => this.flush(), 30000);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public setUserId(userId: number | undefined) {
    this.userId = userId;
  }

  public setCustomerId(customerId: number | undefined) {
    this.customerId = customerId;
  }

  /**
   * Track a KPI event
   */
  public trackEvent(
    category: KPICategory,
    metric: KPIMetric,
    value: number | string = 1,
    context: Record<string, any> = {},
  ) {
    const payload: KPIEventPayload = {
      category,
      metric,
      value,
      context: {
        session_id: this.sessionId,
        user_id: this.userId,
        customer_id: this.customerId,
        timestamp: new Date().toISOString(),
        ...context,
      },
      source: "web",
    };

    this.eventQueue.push(payload);

    // Flush immediately if queue is large
    if (this.eventQueue.length >= 10) {
      this.flush();
    }
  }

  /**
   * Track preview rendering
   */
  public trackPreviewRendered(previewId: string, renderMs: number, productId: number) {
    this.trackEvent("commercial", "preview_rendered", 1, {
      preview_id: previewId,
      render_ms: renderMs,
      product_id: productId,
    });
  }

  /**
   * Track preview opening
   */
  public trackPreviewOpened(productId: number) {
    this.trackEvent("commercial", "preview_opened", 1, {
      product_id: productId,
    });
  }

  /**
   * Track conversion
   */
  public trackConversion(orderId: string, orderValue: number, itemsCount: number) {
    this.trackEvent("commercial", "order_created", orderValue, {
      order_id: orderId,
      items_count: itemsCount,
    });
  }

  /**
   * Track AI recommendations serving
   */
  public trackAIRecommendationsServed(count: number, context?: Record<string, any>) {
    this.trackEvent("commercial", "ai_recommendations_served", count, context);
  }

  /**
   * Track visual search usage
   */
  public trackVisualSearchUsed(resultCount: number, context?: Record<string, any>) {
    this.trackEvent("commercial", "visual_search_used", 1, {
      result_count: resultCount,
      ...context,
    });
  }

  /**
   * Track AI latency
   */
  public trackAILatency(operation: string, latencyMs: number) {
    this.trackEvent("operational", "ai_p95_latency_ms", latencyMs, {
      operation,
    });
  }

  /**
   * Track AI cost
   */
  public trackAICost(operation: string, cost: number) {
    this.trackEvent("operational", "ai_cost_per_order", cost, {
      operation,
    });
  }

  /**
   * Track assistant resolution
   */
  public trackAssistantResolution(success: boolean, topic?: string) {
    this.trackEvent("operational", "assistant_resolved", success ? 1 : 0, {
      topic,
      success,
    });
  }

  /**
   * Flush all queued events to the API
   */
  public async flush() {
    if (this.eventQueue.length === 0) {
      return;
    }

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await Promise.all(
        events.map((event) =>
          api.post("/analytics/kpi/record", event).catch((err) => {
            console.error("Failed to record KPI event:", err, event);
            // Re-queue failed events
            this.eventQueue.push(event);
          }),
        ),
      );
    } catch (error) {
      console.error("Failed to flush analytics events:", error);
    }
  }

  /**
   * Destroy the analytics client
   */
  public destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }
}

// Singleton instance
let instance: AnalyticsClient | null = null;

export function getAnalyticsClient(): AnalyticsClient {
  if (!instance) {
    instance = new AnalyticsClient();
  }
  return instance;
}

export function destroyAnalyticsClient() {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}

export default getAnalyticsClient();
