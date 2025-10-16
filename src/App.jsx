import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

const STORAGE_KEY = "todo-react.tasks.v1";

export default function App() {
  // Cargar tareas antes del primer render (a prueba de StrictMode)
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Guardar en localStorage cada vez que cambian las tareas
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // Crear tarea (US1)
  function handleCreate(title) {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      priority: "Media",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  // Eliminar tarea (US2)
  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Lista de Tareas</h1>
        <span className="counter">Total: {tasks.length}</span>
      </header>

      <TaskForm onCreate={handleCreate} />
      <TaskList tasks={tasks} onDelete={handleDelete} />
    </div>
  );
}
