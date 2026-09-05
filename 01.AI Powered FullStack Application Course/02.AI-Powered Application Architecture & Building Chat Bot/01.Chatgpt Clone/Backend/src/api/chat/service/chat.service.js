import db from "../../../../db/db.config.js";

import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const interaction = await ai.interactions.create({
//   model: GEMINI_MODEL,
//   input: "Explain express js framework works in a few words",
// });

// console.log(interaction.output_text);

export const getConversationRows = async (limit = 5) => {
  const normalizedLimit = Number.parseInt(limit, 10);
  const safeLimit =
    Number.isNaN(normalizedLimit) || normalizedLimit <= 0
      ? 20
      : normalizedLimit;
  const [rows] = await db.execute(
    `SELECT id, role, content, created_at
     FROM conversation
     ORDER BY id DESC
     LIMIT ${safeLimit}`,
  );
  return rows.reverse();
};

const generateAssistantResponse = async (historyRows) => {
  const contents = historyRows.map((row) => ({
    role: row.role === "assistant" ? "model" : "user",
    parts: [{ text: row.content }],
  }));

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return {
    text: response.text,
    totalTokens: response.usageMetadata.totalTokenCount,
  };
};

const getMessageById = async (messageId) => {
  const [rows] = await db.execute(
    "SELECT * FROM conversation WHERE id = ? Limit 1",
    [messageId],
  );
  if (!rows[0]) return null;
  return {
    id: rows[0].id,
    role: rows[0].role,
    content: rows[0].content,
    token_count: rows[0].token_count,
    created_at: rows[0].created_at,
  };
};

export async function createConversationService(question) {
  if (typeof question !== "string" || !question.trim()) {
    const error = new Error("Question is required");
    error.status = 400;
    throw error;
  }

  try {
    const result = await db.execute(
      "INSERT INTO conversation (content, role) VALUES (?, ?)",
      [question.trim(), "user"],
    );
    const historyRows = await getConversationRows(5);
    const { text, totalTokens } = await generateAssistantResponse(
      historyRows,
      question,
    );

    const [assistantResult] = await db.execute(
      "INSERT INTO conversation (content, role, token_count) VALUES (?, ?, ?)",
      [text, "assistant", totalTokens],
    );

    const assistantMessage = await getMessageById(assistantResult.insertId);
    const userMessage = await getMessageById(result[0].insertId);
    return {
      userMessage,
      assistantMessage,
    };
  } catch (error) {
    console.error("Error in chat:", error.message);
    throw error;
  }
}
