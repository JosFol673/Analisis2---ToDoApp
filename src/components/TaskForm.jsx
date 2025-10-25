import { useState } from "react";

const PRIORITIES = ["Alta", "Media", "Baja"];

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Media");
  const [dueDate, setDueDate] = useState(""); // ← NUEVO
  const [touched, setTouched] = useState(false);

  const isValid = title.trim().length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    onCreate(title, priority, dueDate); // ← PASAMOS DUE DATE

    // Limpiar campos
    setTitle("");
    setPriority("Media");
    setDueDate("");
    setTouched(false);
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label className="label" htmlFor="title">
        Nueva tarea
      </label>

      <div className="row">
        {/* Campo título */}
        <input
          id="title"
          type="text"
          placeholder="Escribe la tarea que quieres agregar…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched(true)}
          className={!isValid && touched ? "invalid" : ""}
        />

        {/* Fecha de vencimiento */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Fecha de vencimiento"
          className="select"
        />

        {/* Select prioridad */}
        <select
          aria-label="Prioridad"
          className={`select priority-${priority.toLowerCase()}`}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!isValid}>
          Agregar
        </button>
      </div>

      {!isValid && touched && (
        <small className="error">Agregar una tarea es obligatorio.</small>
      )}
    </form>
  );
}


