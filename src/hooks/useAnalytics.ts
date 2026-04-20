import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { getAnalyticsClient } from "@/lib/analytics/client";

/**
 * Hook to initialize and use analytics tracking
 */
export function useAnalytics() {
  const { user } = useAuth();
  const analytics = getAnalyticsClient();

  useEffect(() => {
    // Set user/customer ID when auth is ready
    if (user?.id) {
      analytics.setUserId(user.id);
      if ("customer_id" in user) {
        analytics.setCustomerId(user.customer_id as number);
      }
    }
  }, [user, analytics]);

  return analytics;
}
