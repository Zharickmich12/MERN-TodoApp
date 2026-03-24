import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, completed = false, dueDate } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "El texto es obligatorio" });
    }

    const task = await Task.create({
      text: text.trim(),
      completed,
      dueDate: dueDate || null,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed, dueDate } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (text !== undefined) task.text = text.trim();
    if (completed !== undefined) task.completed = completed;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada", id: task._id.toString() });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
