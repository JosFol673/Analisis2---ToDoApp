import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

const STORAGE_KEY = "todo-react.tasks.v1";

export default function App() {
  // Carga robusta (permite StrictMode)
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Guardado en LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // US1: Crear tarea
  function handleCreate(title, priority = "Media") {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  // US2: Eliminar
  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // US3: Editar
  function handleUpdate(id, { title, priority }) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...(title !== undefined ? { title: title.trim() } : null),
              ...(priority ? { priority } : null),
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  }

  // US4: Estado (checkbox)
  function handleToggleDone(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Lista de Tareas</h1>
        <span className="counter">Total: {tasks.length}</span>
      </header>

      <TaskForm onCreate={handleCreate} />
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onToggleDone={handleToggleDone}
        onUpdate={handleUpdate}
      />
    </div>
  );
}


