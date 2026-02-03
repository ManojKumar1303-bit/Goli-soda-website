export const config = {
  runtime: "nodejs",
};

import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore
import { GoogleGenerativeAI } from "@google/genai"; // If installed, otherwise we stick to fetch

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS (Optional: Add if frontend is on a different domain, usually not needed for same-origin Vercel deployments)
  // res.setHeader('Access-Control-Allow-Origin', '*'); 

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { type, payload } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is missing in environment variables.");
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    console.log(`[API] Received request type: ${type}`);

    // ---------- CHAT ----------
    if (type === "chat") {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are the friendly customer assistant for "Kaaraalan Goli Soda".
Based in Karur, serving Karur, Erode, Coimbatore.
Available flavors: ${FLAVORS.join(", ")}.

User says: ${payload.message}`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (!response.ok) {
          const errData = await response.text();
          console.error("Gemini Chat API Error:", errData);
          throw new Error(`Gemini API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn’t reply.";

        return res.status(200).json({ text });
      } catch (chatError) {
        console.error("Chat Error Handler:", chatError);
        return res.status(500).json({ error: "Failed to generate chat response" });
      }
    }

    // ---------- FLAVOR MATCH ----------
    if (type === "match") {
      const { mood, setting, preference } = payload;

      try {
        // Using 1.5-flash for consistency and speed
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Suggest ONE Goli Soda flavor from this list:
${FLAVORS.join(", ")}

Mood: ${mood}
Setting: ${setting}
Preference: ${preference}

Reply strictly in JSON:
{
  "flavorName": "",
  "reason": ""
}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                response_mime_type: "application/json", // Force JSON mode if supported by the model version
              }
            }),
          }
        );

        if (!response.ok) {
          const errData = await response.text();
          console.error("Gemini Match API Error:", errData);
          throw new Error(`Gemini API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        let parsed;
        try {
          parsed = JSON.parse(rawText);
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError, "Raw Text:", rawText);
          // Fallback
          parsed = {
            flavorName: "Classic",
            reason: "A timeless Kongu-style refreshment (Fallback).",
          };
        }

        return res.status(200).json(parsed);
      } catch (matchError) {
        console.error("Match Error Handler:", matchError);
        return res.status(500).json({ error: "Failed to generate flavor match" });
      }
    }

    return res.status(400).json({ error: "Invalid request type" });
  } catch (err) {
    console.error("Global Handler Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
