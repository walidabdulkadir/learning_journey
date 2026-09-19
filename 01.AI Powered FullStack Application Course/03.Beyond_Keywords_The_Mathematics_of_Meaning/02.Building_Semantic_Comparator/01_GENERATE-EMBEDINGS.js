import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";

if (!GEMINI_API_KEY) {
  throw new Error("api key is required");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateEmbedding(text) {
  // const text = "Hello";

  try {
    const results = await ai.models.embedContent({
      model: GEMINI_EMBEDDING_MODEL,
      contents: text,
      config: {
        outputDimensionality: 768,
      },
    });
    console.log(results.embeddings[0].values.slice(0, 5));
  } catch (error) {
    console.error("Error generating embedding", error.message);
  }
}
generateEmbedding("Hello");
