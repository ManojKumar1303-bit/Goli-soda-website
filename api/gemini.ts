export const config = {
  runtime: "nodejs",
};

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Type } from "@google/genai";
const FLAVORS = [
  { name: "Nannari" },
  { name: "Lemon" },
  { name: "Orange" },
  { name: "Pineapple" },
  { name: "Panner" },
  { name: "Blue Berry" },
  { name: "Grape" },
  { name: "Ginger" },
];



export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string"
  ? JSON.parse(req.body)
  : req.body;

const { type, payload } = body;


    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY as string, // 🔒 SERVER ONLY
    });

    // 🔹 CHATBOT
    if (type === "chat") {
      const chat = ai.chats.create({
        model: "gemini-1.5-flash",
        config: {
          systemInstruction: `You are the friendly customer assistant for "Kaaraalan Goli Soda".
          Based in Karur, serving the Kongu region (Karur, Erode, Coimbatore).
          Available flavors: ${FLAVORS.map(f => f.name).join(", ")}.
          Use warm, professional tone with local cultural references.`,
        },
      });

      if (Array.isArray(payload.history)) {
  for (const msg of payload.history) {
    await chat.sendMessage({
      message: msg.text,
    });
  }
}


const response = await chat.sendMessage({
  message: payload.message,
});


      return res.status(200).json({ text: response.text });
    }

    // 🔹 FLAVOR MATCH
    if (type === "match") {
      const { mood, setting, preference } = payload;

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: `Suggest ONE Goli Soda flavor.

Mood: "${mood}"
Setting: "${setting}"
Preference: "${preference}"

Available flavors: ${FLAVORS.map(f => f.name).join(", ")}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              flavorName: { type: Type.STRING },
              reason: { type: Type.STRING },
            },
            required: ["flavorName", "reason"],
          },
        },
      });

      let parsed;
try {
  parsed = JSON.parse(response.text || "{}");
} catch {
  parsed = {
    flavorName: "Classic Goli Soda",
    reason: "A timeless Kongu-style refreshment that suits any mood.",
  };
}

return res.status(200).json(parsed);

    }

    return res.status(400).json({ error: "Invalid request type" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini failed" });
  }
}
