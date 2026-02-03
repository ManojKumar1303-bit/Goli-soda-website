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
  // Debug headers for CORS if needed, but Vercel handles this usually for same-origin
  // res.setHeader('Access-Control-Allow-Origin', '*'); 

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Safe Body Parsing
    let body = req.body;

    // Sometimes Vercel receives body as string even if content-type is json
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error("[API] Failed to parse body string:", body);
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }

    if (!body || typeof body !== "object") {
      console.error("[API] Invalid body format:", body);
      return res.status(400).json({ error: "Body must be a JSON object" });
    }

    const { type, payload } = body;
    console.log(`[API] Request type: ${type}`);

    // 2. API Key Validation
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[CRITICAL] GEMINI_API_KEY is missing in environment variables.");
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    // Log success (masked)
    console.log(`[API] API Key present (Length: ${apiKey.length})`);

    // 3. Chat Handler
    if (type === "chat") {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                role: "user",
                parts: [{
                  text: `You are the friendly customer assistant for "Kaaraalan Goli Soda".
Based in Karur, serving Karur, Erode, Coimbatore.
Available flavors: ${FLAVORS.join(", ")}.

User says: ${payload.message}`,
                }]
              }]
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[API] Gemini Chat Error (${response.status}):`, errText);
          throw new Error(`Google API Message: ${errText}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t reply.";
        return res.status(200).json({ text });

      } catch (chatError: any) {
        console.error("[API] Chat Exception:", chatError);
        return res.status(500).json({ error: "Chat generation failed", details: chatError.message });
      }
    }

    // 4. Flavor Match Handler
    if (type === "match") {
      const { mood, setting, preference } = payload;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                role: "user",
                parts: [{
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
                }]
              }],
              generationConfig: {
                response_mime_type: "application/json",
              }
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[API] Gemini Match Error (${response.status}):`, errText);
          throw new Error(`Google API Message: ${errText}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        let parsed;
        try {
          parsed = JSON.parse(rawText);
        } catch (parseError) {
          console.error("[API] JSON Parse Error:", rawText);
          parsed = { flavorName: "Classic", reason: "Kongu-style refreshment." };
        }
        return res.status(200).json(parsed);

      } catch (matchError: any) {
        console.error("[API] Match Exception:", matchError);
        return res.status(500).json({ error: "Flavor match failed", details: matchError.message });
      }
    }

    return res.status(400).json({ error: "Invalid request type" });

  } catch (err: any) {
    console.error("[GLOBAL CRITICAL] Uncaught Exception:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}
