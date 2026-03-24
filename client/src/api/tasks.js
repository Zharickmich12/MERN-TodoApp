import { API_BASE } from "./config.js";

const API_URL = `${API_BASE}/api/tasks`;

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function fetchTasks() {
  const res = await fetch(API_URL, { headers: getHeaders() });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("Error al cargar tareas");
  return res.json();
}

export async function createTask(text, completed = false, dueDate = null) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ text, completed, dueDate }),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Error al eliminar tarea");
  return res.json();
}
