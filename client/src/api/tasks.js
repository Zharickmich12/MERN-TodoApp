/**
 * API SERVICE - Comunicación con el backend
 * ------------------------------------------
 * Centralizamos las llamadas fetch aquí.
 * La URL base usa el proxy de Vite en desarrollo: /api → http://localhost:5000/api
 */

const API_URL = "/api/tasks";

export async function fetchTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al cargar tareas");
  return res.json();
}

export async function createTask(text, completed = false) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, completed }),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar tarea");
  return res.json();
}
