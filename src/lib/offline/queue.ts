"use client";

import api from "@/lib/api";
import type { OfflineMutationRecord, OfflineSyncResult } from "@/lib/offline/contracts";

const OFFLINE_QUEUE_KEY = "offline_mutation_queue_v1";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getOfflineQueue(): OfflineMutationRecord[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as OfflineMutationRecord[];
  } catch {
    return [];
  }
}

export function setOfflineQueue(records: OfflineMutationRecord[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(records));
}

export function enqueueOfflineMutation(
  mutation: Omit<OfflineMutationRecord, "id" | "createdAt" | "attempts" | "status">,
) {
  const record: OfflineMutationRecord = {
    ...mutation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    attempts: 0,
    status: "queued",
  };
  const queue = getOfflineQueue();
  queue.push(record);
  setOfflineQueue(queue);
  return record;
}

async function processRecord(record: OfflineMutationRecord): Promise<boolean> {
  const payload = record.payload as Record<string, unknown>;

  if (record.type === "cart.add_item") {
    await api.post("/ecommerce/cart/", payload);
    return true;
  }
  if (record.type === "cart.update_quantity") {
    const cartItemId = payload.cart_item_id;
    if (!cartItemId) throw new Error("Missing cart_item_id for queued update.");
    await api.patch(`/ecommerce/cart/${cartItemId}`, { delta: payload.delta });
    return true;
  }
  if (record.type === "cart.remove_item") {
    const cartItemId = payload.cart_item_id;
    if (!cartItemId) throw new Error("Missing cart_item_id for queued remove.");
    await api.delete(`/ecommerce/cart/${cartItemId}`);
    return true;
  }
  if (record.type === "preview.save") {
    await api.post("/ecommerce/previews", payload);
    return true;
  }
  if (record.type === "preview.attach_to_cart") {
    await api.post("/ecommerce/previews/attach", payload);
    return true;
  }

  return false;
}

export async function flushOfflineQueue(): Promise<OfflineSyncResult> {
  const queue = getOfflineQueue();
  if (!queue.length) {
    return { processed: 0, succeeded: 0, failed: 0, deadLettered: 0 };
  }

  const nextQueue: OfflineMutationRecord[] = [];
  const result: OfflineSyncResult = {
    processed: queue.length,
    succeeded: 0,
    failed: 0,
    deadLettered: 0,
  };

  for (const record of queue) {
    try {
      await processRecord({ ...record, status: "syncing" });
      result.succeeded += 1;
    } catch (error) {
      const attempts = record.attempts + 1;
      const failureRecord: OfflineMutationRecord = {
        ...record,
        attempts,
        status: attempts >= 5 ? "dead_letter" : "failed",
        lastError: error instanceof Error ? error.message : "Sync failed",
      };
      if (failureRecord.status === "dead_letter") result.deadLettered += 1;
      else result.failed += 1;
      nextQueue.push(failureRecord);
    }
  }

  setOfflineQueue(nextQueue);
  return result;
}
