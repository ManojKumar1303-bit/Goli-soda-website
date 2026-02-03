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

const FLAVORS = [
  "Nannari",
  "Lemon",
  "Orange",
  "Pineapple",
  "Panner",
  "Blue Berry",
  "Grape",
  "Ginger",
];

// Helper to get random flavor for fallback
const getRandomFlavor = () => FLAVORS[Math.floor(Math.random() * FLAVORS.length)];

/**
 * Chatbot – Customer Assistant
 */
export const getGeminiChatResponse = async (
  history: ChatHistory[],
  message: string
): Promise<string> => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "chat",
        payload: {
          history, // API might not use this yet but good to send
          message,
        },
      }),
    });

    if (!response.ok) {
      console.warn("API request failed, switching to simulation.");
      throw new Error("API Failed");
    }

    const data = await response.json();
    return data.text as string;
  } catch (error) {
    console.error("Chat Service Error (Using Fallback):", error);
    // FALLBACK SIMULATION - Return a functional response
    return "Thank you for reaching out! I'm currently operating in offline mode, but I can tell you that our Kaaraalan Goli Soda is made with the finest natural ingredients. My personal favorite is the Paneer Soda! How about you try that?";
  }
};

/**
 * Flavor Match – AI Recommendation
 */
export const getFlavorRecommendation = async (
  selections: FlavorSelection
): Promise<FlavorMatchResponse> => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "match", // Correct type
        payload: selections,
      }),
    });

    if (!response.ok) {
      console.warn("API request failed, switching to simulation.");
      throw new Error("API Failed");
    }

    return (await response.json()) as FlavorMatchResponse;
  } catch (error) {
    console.error("Match Service Error (Using Fallback):", error);
    // FALLBACK SIMULATION - Always return a valid flavor result
    const falvor = getRandomFlavor();
    return {
      flavorName: falvor,
      reason: `(Offline Match) Based on your ${selections.mood} mood and ${selections.preference} preference, this classic ${falvor} is the perfect choice to lift your spirits!`
    };
  }
};
