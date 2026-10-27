"use server";

import { GoogleGenAI } from "@google/genai";

console.log(
  "KEY CHECK:",
  process.env.GOOGLE_GEMINI_API_KEY ? "mil gayi" : "undefined",
);

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export async function generateTextAction(prompt: string): Promise<string> {
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: prompt,
  });
  return interaction.output_text || "No output generated";
}
