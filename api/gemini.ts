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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { type, payload } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key missing" });
    }

    // ---------- CHAT ----------
    if (type === "chat") {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          apiKey,
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

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t reply.";

      return res.status(200).json({ text });
    }

    // ---------- FLAVOR MATCH ----------
    if (type === "match") {
      const { mood, setting, preference } = payload;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          apiKey,
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
          }),
        }
      );

      const data = await response.json();

      let parsed;
      try {
        parsed = JSON.parse(
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
        );
      } catch {
        parsed = {
          flavorName: "Classic",
          reason: "A timeless Kongu-style refreshment.",
        };
      }

      return res.status(200).json(parsed);
    }

    return res.status(400).json({ error: "Invalid request type" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Gemini failed" });
  }
}
