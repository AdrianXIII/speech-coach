import OpenAI from "openai";

let client: OpenAI | null = null;

/** True once OPENAI_API_KEY is set — used to switch between real calls and mocks. */
export function hasOpenAIKey(): boolean {
  return !!process.env.OPENAI_API_KEY;
}

/** Lazily-created, cached OpenAI client. Only call this after checking hasOpenAIKey(). */
export function getOpenAI(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}
