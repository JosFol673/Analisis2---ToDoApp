import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";


const STORAGE_KEY = "todo-react.tasks.v1";

export default function App() {
  // 1) CARGA antes del primer render (a prueba de StrictMode/HMR)
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // 2) GUARDA cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // Solo AGREGAR
  function handleCreate(title) {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      priority: "Media",
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Lista de Tareas</h1>
        <span className="counter">Total: {tasks.length}</span>
      </header>

      <TaskForm onCreate={handleCreate} />
      <TaskList tasks={tasks} />
    </div>
  );
}

