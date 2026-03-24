import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import * as tasksApi from "./api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await tasksApi.fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function addTask() {
    const text = inputValue.trim();
    if (!text) return;

    try {
      const newTask = await tasksApi.createTask(text, false);
      setTasks((prev) => [newTask, ...prev]);
      setInputValue("");
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
      const updated = await tasksApi.updateTask(id, {
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      setError(err.message);
    }
  }

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
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {error} (¿Está el servidor en marcha? npm run dev en /server)
          </p>
        )}
        <TaskInput
          value={inputValue}
          onChange={setInputValue}
          onAdd={addTask}
        />
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      </main>
      <Footer />
    </>
  );
}
