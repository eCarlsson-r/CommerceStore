"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssistant } from "@/hooks/useAI";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { RecommendationItem } from "@/lib/ai/types";
import Image from "next/image";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date | null;
  suggestedProducts?: RecommendationItem[];
  followUps?: string[];
}

// Helpers defined outside the component function to guarantee component render-path purity
let messageIdCounter = 0;
function createMessageId(sender: "user" | "assistant" | "error"): string {
  messageIdCounter += 1;
  const rand = Math.random().toString(36).substr(2, 9);
  return `${sender}-${messageIdCounter}-${rand}`;
}

function getTimestamp(): Date {
  return new Date();
}

export function FloatingAssistantWidget() {
  const t = useTranslations("assistant");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  
  const assistant = useAssistant();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Derive the combined messages list to avoid calling setState synchronously inside an effect
  const welcomeText = locale === "id"
    ? "Halo! Saya Asisten AI Anda. Saya dapat membantu Anda memilih wallpaper, menyarankan desain, atau menghitung kebutuhan wallpaper. Gaya atau ruangan apa yang ingin Anda dekorasi?"
    : "Hello! I'm your AI Design Assistant. I can help you choose wallpapers, suggest styles, or calculate dimensions. What room or style are you working on today?";

  const welcomeMessage: Message = {
    id: "welcome",
    sender: "assistant",
    text: welcomeText,
    timestamp: null, // Stable, pure, no render-time Date calls
  };

  const allMessages = [welcomeMessage, ...messages];

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, assistant.isPending]);

  // Handle sending a message
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || assistant.isPending) return;

    // 1. Add user message
    const userMsg: Message = {
      id: createMessageId("user"),
      sender: "user",
      text: trimmed,
      timestamp: getTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage(""); // Clear input

    try {
      // 2. Fetch AI response
      const res = await assistant.mutateAsync({
        message: trimmed,
        context: { source: "floating_widget" },
        locale,
        history: [...messages, userMsg].map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          text: m.text,
        })),
      });

      // 3. Add AI message response
      const assistantMsg: Message = {
        id: createMessageId("assistant"),
        sender: "assistant",
        text: res.reply || (locale === "id" ? "Maaf, saya tidak dapat memproses permintaan Anda." : "Sorry, I could not process your request."),
        timestamp: getTimestamp(),
        suggestedProducts: res.suggestedProducts,
        followUps: res.followUps,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      // 4. Handle error
      const errorMsg: Message = {
        id: createMessageId("error"),
        sender: "assistant",
        text: locale === "id" 
          ? "Maaf, terjadi kesalahan koneksi. Silakan periksa jaringan Anda." 
          : "Sorry, a connection error occurred. Please check your network.",
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  // Helper to construct absolute asset URL
  const getProductImageUrl = (url: string | null) => {
    if (!url) return "https://placehold.co/200x200/f1f5f9/64748b?text=Wallpaper";
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    return baseUrl + url;
  };

  // Helper to format pricing to IDR currency
  const formatPrice = (price: number | null) => {
    if (!price) return "";
    return Number(price).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Premium Chat Pane */}
      <div
        className={`w-[calc(100vw-32px)] sm:w-[380px] h-[520px] rounded-3xl border border-gray-200/80 bg-white/95 backdrop-blur-md shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right mb-4 ${
          open
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-90 opacity-0 translate-y-8 pointer-events-none absolute"
        }`}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-primary to-primary/80 text-white px-5 py-4 flex items-center justify-between rounded-t-3xl shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-xl">
              <Sparkles size={16} className="text-white animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest">{t("aiAssistant")}</p>
              <span className="text-[10px] text-white/80 font-medium">Boutique Styling Advisor</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-all"
            aria-label={t("closeAssistant")}
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {allMessages.map((msg, index) => {
            const isUser = msg.sender === "user";
            const isLatest = index === allMessages.length - 1;

            return (
              <div key={msg.id} className="flex flex-col">
                {/* Bubble Wrapper */}
                <div className={`flex items-start space-x-2 ${isUser ? "justify-end" : "justify-start"}`}>
                  {/* Bot Avatar Icon */}
                  {!isUser && (
                    <div className="flex-none bg-primary/10 text-primary p-1.5 rounded-xl mt-0.5">
                      <Bot size={16} />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      isUser
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>

                {/* Inline Product Recommendations */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="mt-3 pl-9">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                      {locale === "id" ? "Rekomendasi Produk" : "Recommended Products"}
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                      {msg.suggestedProducts.map((prod) => (
                        <div
                          key={prod.productId}
                          className="flex-none w-[190px] bg-white border border-gray-100 rounded-2xl p-2.5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex flex-col"
                        >
                          <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-gray-50">
                            <Image
                              src={getProductImageUrl(prod.imageUrl ?? "")}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              width={190}
                              height={190}
                            />
                          </div>
                          {prod.reason && (
                            <span className="text-[8px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full self-start mb-1 line-clamp-1">
                              {prod.reason}
                            </span>
                          )}
                          <h4 className="text-xs font-bold text-gray-900 truncate mb-0.5">
                            {prod.name}
                          </h4>
                          {prod.price && (
                            <p className="text-xs font-black text-primary italic mb-2">
                              {formatPrice(prod.price)}
                            </p>
                          )}
                          <Link
                            href={`/product/${prod.productId}`}
                            className="mt-auto flex items-center justify-center space-x-1 bg-gray-900 hover:bg-primary text-white text-[9px] font-black uppercase py-1.5 rounded-lg transition-all"
                          >
                            <span>{locale === "id" ? "Lihat Detail" : "View Detail"}</span>
                            <ArrowRight size={10} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Suggested Follow-Ups (Only shown on the latest AI message) */}
                {isLatest && msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-3 pl-9 flex flex-wrap gap-1.5">
                    {msg.followUps.map((promptText, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleSendMessage(promptText)}
                        className="text-left text-xs bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 hover:border-primary/20 px-3 py-1.5 rounded-full transition-all font-medium active:scale-95 shadow-sm"
                      >
                        {promptText}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                {msg.timestamp && (
                  <span className={`text-[9px] text-gray-400 mt-1 pl-9 ${isUser ? "text-right pr-1" : "text-left pl-10"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
            );
          })}

          {/* Pending Typing Indicator */}
          {assistant.isPending && (
            <div className="flex items-start space-x-2">
              <div className="flex-none bg-primary/10 text-primary p-1.5 rounded-xl">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="p-3 border-t border-gray-100 bg-white rounded-b-3xl flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(event) => setInputMessage(event.target.value)}
            disabled={assistant.isPending}
            className="flex-1 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-gray-50 focus:bg-white focus:border-primary px-4 py-2.5 text-sm transition-all focus:outline-none placeholder-gray-400"
            placeholder={t("askPlaceholder")}
          />
          <button
            type="submit"
            disabled={assistant.isPending || !inputMessage.trim()}
            className="h-10 w-10 flex-none rounded-full bg-primary hover:bg-primary/95 text-white flex items-center justify-center transition-all duration-300 disabled:bg-gray-100 disabled:text-gray-400 active:scale-95 shadow-sm"
            aria-label={t("sendMessage")}
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <Button
        className="rounded-full h-14 w-14 p-0 bg-primary hover:bg-primary/95 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("chatWithAssistant")}
      >
        {open ? (
          <X size={22} className="transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle size={22} className="group-hover:rotate-6 transition-transform duration-300" />
        )}
      </Button>
    </div>
  );
}
