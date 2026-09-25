"use client";

import { useState } from "react";
import type { ChatTurn } from "@/lib/chat";
import { useLanguage } from "@/components/LanguageProvider";
import { COMMON } from "@/lib/commonStrings";
import type { LanguageCode } from "@/lib/languages";

const T: Record<LanguageCode, { heading: string; placeholder: string; ask: string }> = {
  en: { heading: "Ask a follow-up", placeholder: "Ask for a clearer or more specific answer…", ask: "Ask" },
  de: { heading: "Nachfrage stellen", placeholder: "Bitte um eine klarere oder genauere Antwort…", ask: "Fragen" },
  fr: { heading: "Poser une question", placeholder: "Demandez une réponse plus claire ou plus précise…", ask: "Demander" },
  es: { heading: "Haz una pregunta", placeholder: "Pide una respuesta más clara o concreta…", ask: "Preguntar" },
  sv: { heading: "Ställ en följdfråga", placeholder: "Be om ett tydligare eller mer specifikt svar…", ask: "Fråga" },
};

interface FollowUpChatProps {
  /** The original request, as a "user" turn — e.g. what was analyzed. */
  context: string;
  /** The AI's original answer, as a "model" turn. */
  initialAnswer: string;
}

/**
 * A small follow-up chat thread attached under an AI feedback panel, so a
 * vague answer can be clarified without re-recording. Seeds the
 * conversation with the original context/answer pair, then sends only text
 * on each follow-up — no audio is re-sent, so this stays cheap even after
 * several questions. Replies come back in the app's selected language.
 */
export function FollowUpChat({ context, initialAnswer }: FollowUpChatProps) {
  const { language } = useLanguage();
  const t = T[language];
  const common = COMMON[language];
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    const question = input.trim();
    if (!question || isSending) return;

    const withQuestion = [...messages, { role: "user" as const, text: question }];
    setMessages(withQuestion);
    setInput("");
    setError(null);
    setIsSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          history: [
            { role: "user", text: context },
            { role: "model", text: initialAnswer },
            ...withQuestion,
          ],
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || common.requestFailed(res.status));
      }
      const data: { reply: string } = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : common.somethingWentWrong);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 border-t border-hairline pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t.heading}</p>

      {messages.length > 0 && (
        <div className="flex flex-col gap-2">
          {messages.map((message, i) => (
            <div
              key={i}
              className={
                message.role === "user"
                  ? "max-w-[85%] self-end rounded-lg bg-navy px-3 py-2 text-sm text-white"
                  : "max-w-[85%] self-start rounded-lg bg-surface-2 px-3 py-2 text-sm text-ink"
              }
            >
              {message.text}
            </div>
          ))}
          {isSending && (
            <div className="max-w-[85%] self-start rounded-lg bg-surface-2 px-3 py-2 text-sm text-ink-muted">…</div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder={t.placeholder}
          disabled={isSending}
          className="flex-1 rounded-lg border border-hairline px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brass focus:outline-none disabled:opacity-60"
        />
        <button
          onClick={handleSend}
          disabled={isSending || !input.trim()}
          className="whitespace-nowrap rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-40"
        >
          {t.ask}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
