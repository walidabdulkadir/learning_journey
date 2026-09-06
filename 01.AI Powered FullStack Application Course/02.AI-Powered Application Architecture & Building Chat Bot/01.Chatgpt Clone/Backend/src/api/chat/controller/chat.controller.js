import {
  createConversationService,
  getConversationRows,
} from "../service/chat.service.js";

export async function createConversationController(req, res) {
  try {
    const { question } = req.body;
    const { userMessage, assistantMessage } = await createConversationService(question);

    res.status(201).json({
      success: true,
      message: "Conversation posted successfully",
      data: {
        userConversation: userMessage,
        assistantConversation: assistantMessage,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function getConversationController(req, res) {
  try {
    const conversations = await getConversationRows(100);
    res.status(200).json({
      success: true,
      message: "Conversation retrieved successfully",
      data: { conversations },
    });
  } catch (error) {
    throw error;
  }
}
