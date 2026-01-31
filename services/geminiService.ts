
import { GoogleGenAI, Type } from "@google/genai";
import { FLAVORS } from "../constants";

export const getGeminiChatResponse = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the friendly customer assistant for "Kaaraalan Goli Soda". 
      The company is based in Karur, Tamil Nadu and serves the Kongu region (Karur, Erode, Coimbatore).
      Available flavors: ${FLAVORS.map(f => f.name).join(', ')}.
      Answer questions about flavors, tradition, and company info professionally yet warmly.
      Use local Kongu region references where appropriate (textile industry of Karur, turmeric of Erode, the climate of Coimbatore).
      If someone asks about buying online, explain that we only sell through local distributors in Karur, Erode, and Coimbatore currently.`,
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getFlavorRecommendation = async (selections: { mood: string, setting: string, preference: string }) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest exactly one of these Goli Soda flavors based on these 3 user criteria:
    1. Mood: "${selections.mood}"
    2. Setting: "${selections.setting}"
    3. Taste Preference: "${selections.preference}"

    Available flavors: ${FLAVORS.map(f => f.name).join(', ')}.
    
    Explain why this specific flavor is the perfect match in a short, fun, and culturally relevant way (referencing the Kongu region - Karur, Erode, or Coimbatore vibes).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          flavorName: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["flavorName", "reason"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
