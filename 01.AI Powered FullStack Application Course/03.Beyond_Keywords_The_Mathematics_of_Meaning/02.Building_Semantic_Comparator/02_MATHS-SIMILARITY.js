import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

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
const vecA = [1, 2];
const vectB = [2, 4];
console.log(cosineSimilarity(vecA, vectB));

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
