import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, completed = false } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "El texto es obligatorio" });
    }

    const task = await Task.create({ text: text.trim(), completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { ...(text !== undefined && { text }), ...(completed !== undefined && { completed }) },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada", id: task._id.toString() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
