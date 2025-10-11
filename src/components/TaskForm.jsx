import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = title.trim().length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onCreate(title);
    setTitle("");
    setTouched(false);
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label className="label" htmlFor="title">Nueva tarea</label>
      <div className="row">
        <input
          id="title"
          type="text"
          placeholder="Escribe la tarea que quieres agregar..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched(true)}
          className={!isValid && touched ? "invalid" : ""}
        />
        <button type="submit" disabled={!isValid}>Agregar</button>
      </div>
      {!isValid && touched && (
        <small className="error">Agregar una tarea es obligatorio.</small>
      )}
    </form>
  );
}
