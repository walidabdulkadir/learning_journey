import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function cosineSimilarity(vecA, vecB) {
  // 0. Check if the vectors have the same length
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same length");
  }

  // 1. Dot Product
  let dotProduct = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
  }

  // 2. Magnitude
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    magnitudeA += vecA[i] * vecA[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);

  for (let i = 0; i < vecB.length; i++) {
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeB = Math.sqrt(magnitudeB);

  return dotProduct / (magnitudeA * magnitudeB);
}
// const vecA = [1, 2];
// const vectB = [2, 4];
// console.log(cosineSimilarity(vecA, vectB));

// function cosineSimilarity(vecA, vecB) {
//   // 0. Check if the vectors have the same length
//   if (vecA.length !== vecB.length) {
//     throw new Error("Vectors must have the same length");
//   }

//   // 1. Dot Product
//   let dotProduct = 0;

//   // 2. Magnitude (
//   let magnitudeA = 0;
//   let magnitudeB = 0;

//   for (let i = 0; i < vecA.length; i++) {
//     dotProduct += vecA[i] * vecB[i];
//     magnitudeA += vecA[i] * vecA[i];
//     magnitudeB += vecB[i] * vecB[i];
//   }

//   magnitudeA = Math.sqrt(magnitudeA);
//   magnitudeB = Math.sqrt(magnitudeB);

//   if (magnitudeA === 0 || magnitudeB === 0) {
//     return 0;
//   }

//   return dotProduct / (magnitudeA * magnitudeB);
// }
// const vecA = [2, 0];
// const vectB = [0, 4];
// console.log(cosineSimilarity(vecA, vectB));

async function compareText() {
  const textA = "what is the weather like today?";
  const textB = "what is your favorite color?";
  const textC = "weather is sunny and warm today";

  const resultsA = await ai.models.embedContent({
    model: GEMINI_EMBEDDING_MODEL,
    contents: textA,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
    },
  });

  const resultsB = await ai.models.embedContent({
    model: GEMINI_EMBEDDING_MODEL,
    contents: textB,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
    },
  });

  const resultsC = await ai.models.embedContent({
    model: GEMINI_EMBEDDING_MODEL,
    contents: textC,
    config: {
      taskType: "SEMANTIC_SIMILARITY",
    },
  });

  const V1 = resultsA.embeddings[0].values;
  const V2 = resultsB.embeddings[0].values;
  const V3 = resultsC.embeddings[0].values;

  const V1andV2 = cosineSimilarity(V1, V2);
  console.log("V1 and V2 similarity:", V1andV2);
  const V1andV3 = cosineSimilarity(V1, V3);
  console.log("V1 and V3 similarity:", V1andV3);
}
compareText();
