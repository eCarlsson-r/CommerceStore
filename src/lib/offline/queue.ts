"use client";

import api from "@/lib/api";
import type { OfflineMutationRecord, OfflineSyncResult } from "@/lib/offline/contracts";
import { mutationQueueDB, cartSnapshotDB, type MutationQueueItem } from "@/lib/offline/indexeddb";

const OFFLINE_QUEUE_KEY = "offline_mutation_queue_v1";

function canUseStorage() {
  return typeof window !== "undefined";
}

// IndexedDB is primary, localStorage is fallback
async function isIndexedDBAvailable(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    return "indexedDB" in window;
  } catch {
    return false;
  }
}

// Legacy localStorage functions (fallback)
function getOfflineQueueLegacy(): OfflineMutationRecord[] {
  if (!canUseStorage()) return [];
  const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as OfflineMutationRecord[];
  } catch {
    return [];
  }
}

function setOfflineQueueLegacy(records: OfflineMutationRecord[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(records));
}

export async function getOfflineQueue(): Promise<OfflineMutationRecord[]> {
  if (await isIndexedDBAvailable()) {
    const items = await mutationQueueDB.getQueued();
    return items.map((item) => ({
      id: item.id,
      idempotencyKey: item.idempotencyKey,
      type: item.type as OfflineMutationRecord["type"],
      payload: item.payload,
      createdAt: item.createdAt,
      attempts: item.attempts,
      status: item.status,
      lastError: item.lastError,
    }));
  }
  return getOfflineQueueLegacy();
}

export function enqueueOfflineMutation(
  mutation: Omit<OfflineMutationRecord, "id" | "createdAt" | "attempts" | "status">,
): OfflineMutationRecord {
  const record: OfflineMutationRecord = {
    ...mutation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    attempts: 0,
    status: "queued",
  };

  // Try IndexedDB first, fallback to localStorage
  isIndexedDBAvailable().then(async (available) => {
    if (available) {
      await mutationQueueDB.enqueue({
        idempotencyKey: record.idempotencyKey,
        type: record.type,
        payload: record.payload,
      });
    } else {
      const queue = getOfflineQueueLegacy();
      queue.push(record);
      setOfflineQueueLegacy(queue);
    }
  });

  return record;
}

async function processRecord(record: OfflineMutationRecord | MutationQueueItem): Promise<boolean> {
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
  const useIndexedDB = await isIndexedDBAvailable();
  
  let queue: OfflineMutationRecord[] | MutationQueueItem[];
  if (useIndexedDB) {
    queue = await mutationQueueDB.getQueued();
  } else {
    queue = getOfflineQueueLegacy();
  }
  
  if (!queue.length) {
    return { processed: 0, succeeded: 0, failed: 0, deadLettered: 0 };
  }

  const result: OfflineSyncResult = {
    processed: queue.length,
    succeeded: 0,
    failed: 0,
    deadLettered: 0,
  };

  for (const record of queue) {
    try {
      await processRecord(record);
      result.succeeded += 1;
      
      // Remove from queue on success
      if (useIndexedDB) {
        await mutationQueueDB.remove(record.id);
      }
    } catch (error) {
      const attempts = record.attempts + 1;
      const isDeadLetter = attempts >= 5;
      const status = isDeadLetter ? "dead_letter" : "failed";
      const lastError = error instanceof Error ? error.message : "Sync failed";
      
      if (isDeadLetter) result.deadLettered += 1;
      else result.failed += 1;
      
      // Update status in queue
      if (useIndexedDB) {
        await mutationQueueDB.updateStatus(record.id, status, lastError);
      }
    }
  }

  // Legacy fallback cleanup
  if (!useIndexedDB) {
    const legacyQueue = getOfflineQueueLegacy();
    const remaining = legacyQueue.filter((r) => r.status !== "synced" && r.attempts < 5);
    setOfflineQueueLegacy(remaining);
  }

  return result;
}

// Cart snapshot operations
export async function saveCartSnapshot(items: unknown[], total: number): Promise<void> {
  const useIndexedDB = await isIndexedDBAvailable();
  if (useIndexedDB) {
    await cartSnapshotDB.save(items, total);
  }
  // Also keep localStorage as backup for quick access
  localStorage.setItem("shopping_cart", JSON.stringify(items));
}

export async function getCartSnapshot(): Promise<{ items: unknown[]; total: number } | null> {
  const useIndexedDB = await isIndexedDBAvailable();
  if (useIndexedDB) {
    const snapshot = await cartSnapshotDB.get();
    if (snapshot) {
      return { items: snapshot.items, total: snapshot.total };
    }
  }
  // Fallback to localStorage
  const saved = localStorage.getItem("shopping_cart");
  if (saved) {
    const items = JSON.parse(saved);
    const total = items.reduce((acc: number, item: { price: number; quantity: number }) => 
      acc + item.price * item.quantity, 0);
    return { items, total };
  }
  return null;
}

export async function clearCartSnapshot(): Promise<void> {
  const useIndexedDB = await isIndexedDBAvailable();
  if (useIndexedDB) {
    await cartSnapshotDB.clear();
  }
  localStorage.removeItem("shopping_cart");
}
