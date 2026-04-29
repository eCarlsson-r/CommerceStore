"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { flushOfflineQueue, getOfflineQueue } from "@/lib/offline/queue";

export default function OfflineSyncManager() {
  useEffect(() => {
    const runSync = async () => {
      const queue = await getOfflineQueue();
      if (!queue.length) return;

      const result = await flushOfflineQueue();
      if (result.succeeded > 0) {
        toast.success(`Synced ${result.succeeded} offline change(s).`);
      }
      if (result.failed > 0 || result.deadLettered > 0) {
        toast.warning(
          `${result.failed + result.deadLettered} change(s) need retry.`,
        );
      }
    };

    if (typeof navigator !== "undefined" && navigator.onLine) {
      void runSync();
    }

    const onOnline = () => {
      toast.info("Back online. Syncing pending changes...");
      void runSync();
    };
    const onOffline = () => {
      toast.info("You are offline. Changes will sync later.");
    };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return null;
}
