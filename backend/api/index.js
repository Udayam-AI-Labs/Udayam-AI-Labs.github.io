import express from "express";
import cors from "cors"; // ✨ Import cors
import { RAGSystem } from "../RAG.js"; // ✨ Note the path change to ../
import { HumanMessage, AIMessage } from "@langchain/core/messages";
const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

app.use(express.json());

const ragSystem = new RAGSystem();

app.post("/api/query", async (req, res) => {
  try {
    const { query, history } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const chat_history = (history || [])
      .map((msg) => {
        if (msg.type === "human") return new HumanMessage(msg.content);
        if (msg.type === "ai") return new AIMessage(msg.content);
        return null;
      })
      .filter(Boolean);

    const response = await ragSystem.query(query, chat_history);
    res.status(200).json(response);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default app;
