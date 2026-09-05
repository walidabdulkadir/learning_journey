import express from "express";
import {
  createConversationController,
  getConversationController,
} from "./controller/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/conversation", createConversationController);

chatRouter.get("/conversation", getConversationController);

// chatRouter.post("/message")

export default chatRouter;
