import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "clave-secreta-cambiar-en-produccion";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, contraseña y nombre son obligatorios" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "Ya existe una cuenta con ese email" });
    }

    const user = await User.create({
      email: email.toLowerCase().trim(),
      password,
      name: name.trim(),
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/auth/me - Obtener usuario actual (ruta protegida)
router.get("/me", protect, (req, res) => {
  const u = req.user;
  res.json({ id: u._id, email: u.email, name: u.name });
});

export default router;
