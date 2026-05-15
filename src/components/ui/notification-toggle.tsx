"use client";

import { usePWA } from "@/components/pwa/PWAManager";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function NotificationToggle() {
  const { isSupported, isSubscribed, subscribe } = usePWA();
  const { user } = useAuth();
  const t = useTranslations('pwa');

  const handleSubscribe = async () => {
    if (!user) {
      toast.error(t('mustLoginToSubscribe'));
      return;
    }

    try {
      await subscribe();
      toast.success(t('pushNotificationsEnabled'));
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast.error(t('failedToEnableNotifications'));
    }
  };

  if (!isSupported || !user) {
    return null;
  }

  return (
    <Button
      variant={isSubscribed ? "secondary" : "default"}
      size="sm"
      onClick={handleSubscribe}
      disabled={isSubscribed}
      className="flex items-center gap-2"
    >
      {isSubscribed ? (
        <>
          <Bell className="h-4 w-4" />
          {t('notificationsEnabled')}
        </>
      ) : (
        <>
          <BellOff className="h-4 w-4" />
          {t('enableNotifications')}
        </>
      )}
    </Button>
  );
}