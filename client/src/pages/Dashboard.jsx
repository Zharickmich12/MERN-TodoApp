import { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Footer from "../components/Footer";
import * as tasksApi from "../api/tasks";

const FILTERS = { all: "Todas", pending: "Pendientes", completed: "Completadas" };

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.fetchTasks();
      setTasks(data);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        window.location.href = "/login";
        return;
      }
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  async function addTask() {
    const text = inputValue.trim();
    if (!text) return;

    try {
      const newTask = await tasksApi.createTask(text, false, dueDate || null);
      setTasks((prev) => [newTask, ...prev]);
      setInputValue("");
      setDueDate("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      await tasksApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const updated = await tasksApi.updateTask(id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateTask(id, updates) {
    try {
      const updated = await tasksApi.updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <>
      <Header
        completed={completed}
        total={total}
        progressPercent={progressPercent}
      />
      <main>
        {error && (
          <p className="app-error">
            {error} (¿Está el servidor en marcha?)
          </p>
        )}
        <TaskInput
          value={inputValue}
          onChange={setInputValue}
          dueDate={dueDate}
          onDueDateChange={setDueDate}
          onAdd={addTask}
        />
        <div className="filters">
          {Object.entries(FILTERS).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        {loading ? (
          <p className="loading-text">Cargando tareas...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
