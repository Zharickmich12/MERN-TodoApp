import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import tasksRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);

// Ruta de prueba
app.get("/api", (req, res) => {
  res.json({ message: "TodoApp API funcionando", version: "1.0" });
});

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/todoapp";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 API en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  });
