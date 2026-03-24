
import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

const STORAGE_KEY = "todo-tasks";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const getDefaultTasks = () => [
  { id: generateId(), text: "Aprender HTML y CSS", completed: false },
  { id: generateId(), text: "Dominar JavaScript", completed: true },
  {
    id: generateId(),
    text: "Conectar con MongoDB y React",
    completed: false,
  },
];

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (err) {
        console.error("Error al cargar:", err);
      }
    } else {
      const defaults = getDefaultTasks();
      setTasks(defaults);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  function addTask() {
    const text = inputValue.trim();
    if (!text) return;

    const newTask = {
      id: generateId(),
      text,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
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
        <TaskInput
          value={inputValue}
          onChange={setInputValue}
          onAdd={addTask}
        />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>
      <Footer />
    </>
  );
}
