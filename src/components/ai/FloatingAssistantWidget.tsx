"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssistant } from "@/hooks/useAI";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  followUps?: string[];
};

export function FloatingAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      text: "Hi! I can help you choose the perfect wallpaper, estimate rolls, or give style advice. What are you looking for?",
    },
  ]);
  
  const assistant = useAssistant();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, assistant.isPending]);

  const handleSend = (text: string) => {
    if (!text.trim() || assistant.isPending) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text },
    ]);
    setMessage("");

    // Call API
    assistant.mutate(
      { message: text, context: { source: "floating_widget" } },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              text: data.reply,
              followUps: data.followUps,
            },
          ]);
        },
      }
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="flex w-[350px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 bg-primary/5 rounded-t-2xl">
            <p className="text-xs font-black uppercase tracking-wider text-primary">
              AI Assistant
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-gray-500 hover:bg-white"
              aria-label="Close assistant"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat History */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Follow ups (only on assistant messages) */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.followUps.map((followUp, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(followUp)}
                        disabled={assistant.isPending}
                        className="text-[10px] font-bold bg-white border border-primary/20 text-primary px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors text-left shadow-sm disabled:opacity-50"
                      >
                        {followUp}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {assistant.isPending && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-2.5 text-sm shadow-sm text-gray-400 italic">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-3 bg-white rounded-b-2xl">
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(message);
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Type your message..."
                disabled={assistant.isPending}
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-xl bg-primary text-white"
                disabled={assistant.isPending || !message.trim()}
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          className="rounded-full h-14 w-14 p-0 bg-primary text-white shadow-xl hover:scale-105 transition-transform"
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </div>
  );
}
