"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssistant } from "@/hooks/useAI";

export function FloatingAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Help me choose wallpaper for my bedroom.");
  const assistant = useAssistant();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[320px] rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wider">AI Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
              aria-label="Close assistant"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3 p-4">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              placeholder="Ask about product fit, style, or measurements..."
            />
            <Button
              className="w-full bg-primary text-white"
              disabled={assistant.isPending || !message.trim()}
              onClick={() =>
                assistant.mutate({
                  message,
                  context: { source: "floating_widget" },
                })
              }
            >
              {assistant.isPending ? "Thinking..." : "Ask assistant"}
            </Button>

            {assistant.data?.reply && (
              <div className="max-h-48 overflow-auto rounded-xl bg-gray-50 p-3 text-sm">
                {assistant.data.reply}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button
          className="rounded-full h-12 w-12 p-0 bg-primary text-white shadow-xl"
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
        >
          <MessageCircle size={20} />
        </Button>
      )}
    </div>
  );
}
