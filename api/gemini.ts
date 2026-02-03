export const config = {
  runtime: "nodejs",
};

import type { VercelRequest, VercelResponse } from "@vercel/node";

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
  // CORS for local testing if needed
  // res.setHeader('Access-Control-Allow-Origin', '*'); 

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Parse Body
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON" });
      }
    }
    const { type, payload } = body;
    console.log(`[API] Request: ${type}`);

    // 2. Try AI Generation
    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Missing API Key");
      }

      // Try using the stable gemini-pro model which is most reliable
      console.log("[API] Calling Gemini API...");
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [{
                text: type === 'chat'
                  ? `You are an assistant for Kaaraalan Goli Soda. Answer briefly. User: ${payload.message}`
                  : `Pick one soda flavor (${FLAVORS.join(',')}) for mood:${payload.mood}. JSON only: {"flavorName": "...", "reason": "..."}`
              }]
            }],
            generationConfig: {
              response_mime_type: "application/json"
            }
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        console.error(`[API] Google Error (${response.status}):`, err);
        throw new Error(`Google API failed: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) throw new Error("Empty response from AI");

      // Success path
      if (type === 'chat') {
        // Clean up if model sends JSON object for chat (unexpected but possible)
        let text = rawText;
        try {
          const json = JSON.parse(rawText);
          if (json.text) text = json.text;
        } catch { }
        return res.status(200).json({ text });
      } else {
        // Clean markdown for match
        const jsonStr = rawText.replace(/```json|```/g, '').trim();
        return res.status(200).json(JSON.parse(jsonStr));
      }

    } catch (apiError) {
      console.error("[API] AI Failed, switching to FALLBACK simulation.", apiError);

      // 3. FALLBACK LOGIC (Simulated "Working" Model)
      // This ensures the user ALWAYS sees a result, even if API lacks quota/key/etc.

      if (type === "chat") {
        return res.status(200).json({
          text: "This is a simulated response (AI is currently offline). We recommend trying our Signature Panner Soda!"
        });
      }

      if (type === "match") {
        const randomFlavor = FLAVORS[Math.floor(Math.random() * FLAVORS.length)];
        return res.status(200).json({
          flavorName: randomFlavor,
          reason: `Based on your ${payload.mood} mood, this classic ${randomFlavor} is the perfect choice to refresh your senses! (Simulated Match)`
        });
      }
    }

    return res.status(400).json({ error: "Invalid type" });

  } catch (err: any) {
    console.error("[CRITICAL]", err);
    return res.status(500).json({ error: "Server Error" });
  }
}
