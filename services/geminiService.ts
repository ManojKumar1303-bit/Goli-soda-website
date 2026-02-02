// ❌ DO NOT import @google/genai here
// ❌ DO NOT use process.env or import.meta.env here
// This file only talks to the Vercel API

export type ChatHistory = {
  role: "user" | "model";
  text: string;
};

export type FlavorSelection = {
  mood: string;
  setting: string;
  preference: string;
};

export type FlavorMatchResponse = {
  flavorName: string;
  reason: string;
};

/**
 * Chatbot – Customer Assistant
 */
export const getGeminiChatResponse = async (
  history: ChatHistory[],
  message: string
): Promise<string> => {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "chat",
      payload: {
        history,
        message,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Gemini chat request failed");
  }

  const data = await response.json();
  return data.text as string;
};

/**
 * Flavor Match – AI Recommendation
 */
export const getFlavorRecommendation = async (
  selections: FlavorSelection
): Promise<FlavorMatchResponse> => {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "match",
      payload: selections,
    }),
  });

  if (!response.ok) {
    throw new Error("Flavor recommendation failed");
  }

  return (await response.json()) as FlavorMatchResponse;
};
