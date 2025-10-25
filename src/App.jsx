import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

const STORAGE_KEY = "todo-react.tasks.v1";

export default function App() {
  // 
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("todas"); // 
  const [priorityFilter, setPriorityFilter] = useState("todas"); // 
  const [searchTerm, setSearchTerm] = useState(""); // 

  // 
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  //
  function handleCreate(title, priority = "Media", dueDate) {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      priority,
      createdAt: new Date().toISOString(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  
  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  
  function handleUpdate(id, { title, priority, dueDate }) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...(title !== undefined ? { title: title.trim() } : {}),
              ...(priority ? { priority } : {}),
              ...(dueDate !== undefined
                ? { dueDate: dueDate ? new Date(dueDate).toISOString() : null }
                : {}),
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
  }

  // Cambiar estado
  function handleToggleDone(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  // Filtros combinados: estado + prioridad + búsqueda
  function getFilteredTasks() {
    return tasks.filter((t) => {
      const matchesEstado =
        filter === "todas" ||
        (filter === "pendientes" && !t.done) ||
        (filter === "hechas" && t.done);

      const matchesPrioridad =
        priorityFilter === "todas" || t.priority === priorityFilter;

      const matchesBusqueda = t.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesEstado && matchesPrioridad && matchesBusqueda;
    });
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Lista de Tareas</h1>
        <span className="counter">Total: {tasks.length}</span>
      </header>

      
      <TaskForm onCreate={handleCreate} />

      
      <div className="filter-bar">
        <select
          className="select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="todas">Todas las tareas</option>
          <option value="pendientes">Pendientes</option>
          <option value="hechas">Hechas</option>
        </select>

        <select
          className="select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="todas">Todas las prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <input
          type="text"
          className="input"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      
      <TaskList
        tasks={getFilteredTasks()}
        onDelete={handleDelete}
        onToggleDone={handleToggleDone}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
