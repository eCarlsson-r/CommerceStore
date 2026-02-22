"use client";

import { usePWA } from "@/components/pwa/PWAManager";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function NotificationToggle() {
  const { isSupported, isSubscribed, subscribe } = usePWA();
  const { user } = useAuth();

  if (!isSupported || !user) {
    return null;
  }

  return (
    <Button
      variant={isSubscribed ? "secondary" : "default"}
      size="sm"
      onClick={subscribe}
      disabled={isSubscribed}
      className="flex items-center gap-2"
    >
      {isSubscribed ? (
        <>
          <Bell className="h-4 w-4" />
          Notifications Enabled
        </>
      ) : (
        <>
          <BellOff className="h-4 w-4" />
          Enable Notifications
        </>
      )}
    </Button>
  );
}