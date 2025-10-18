import { useState } from "react";

const PRIORITIES = ["Alta", "Media", "Baja"];

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState(task.priority);

  function startEdit() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
  }

  function saveEdit() {
    const clean = draftTitle.trim();
    if (!clean) return;
    onEdit({ title: clean, priority: draftPriority });
    setIsEditing(false);
  }

  return (
    <li className={`list-item item ${task.done ? "done" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          aria-label="Marcar como hecha"
        />
        {isEditing ? (
          <input
            className="input inline"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="title">{task.title}</div>
        )}
      </div>

      <div className="right">
        {isEditing ? (
          <select
            className={`select compact priority-${draftPriority.toLowerCase()}`}
            value={draftPriority}
            onChange={(e) => setDraftPriority(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        ) : (
          <span className={`badge priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        )}

        {isEditing ? (
          <>
            <button className="btn success" onClick={saveEdit}>
              Guardar
            </button>
            <button className="btn ghost" onClick={cancelEdit}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={startEdit}>
              Editar
            </button>
            <button className="btn danger" onClick={onDelete}>
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  );
}
