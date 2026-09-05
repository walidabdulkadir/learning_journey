import "dotenv/config";

import express from "express";
import db from "./db/db.config.js";
import mainRouter from "./src/api/main.routes.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use("/api", mainRouter);

// Error handling middleware
app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();
    console.log("DB connected");

    app.listen(5500, () => {
      console.log("Server is running at http://localhost:5500");
    });
  } catch (error) {
    console.error("Error in starting server:", error.message);
  }
}

startServer();
