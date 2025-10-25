import { useState } from "react";

const PRIORITIES = ["Alta", "Media", "Baja"];

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState(task.priority);
  const [draftDueDate, setDraftDueDate] = useState(task.dueDate || "");

  function startEdit() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate || "");
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate || "");
  }

  function saveEdit() {
    const clean = draftTitle.trim();
    if (!clean) return;
    onEdit({
      title: clean,
      priority: draftPriority,
      dueDate: draftDueDate || null,
    });
    setIsEditing(false);
  }

  // ✅ Corrige la fecha para zona horaria local
  function parseLocalDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day, 23, 59, 59);
  }

  const isOverdue =
    task.dueDate && parseLocalDate(task.dueDate) < new Date() && !task.done;

  // Mostrar texto de vencimiento
  function getDueLabel() {
    if (!task.dueDate) return null;

    const today = new Date();
    const taskDate = parseLocalDate(task.dueDate);

    const diffDays = Math.floor(
      (taskDate - new Date(today.getFullYear(), today.getMonth(), today.getDate())) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Vence: hoy";
    if (diffDays === 1) return "Vence: mañana";
    if (diffDays < 0) return `Vencida: ${task.dueDate}`;
    return `Vence: ${task.dueDate}`;
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
          <>
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

            <input
              type="date"
              className="select"
              value={draftDueDate}
              onChange={(e) => setDraftDueDate(e.target.value)}
            />
          </>
        ) : (
          <>
            <span className={`badge priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="badge" style={{ color: isOverdue ? "red" : "#aaa" }}>
                {getDueLabel()}
              </span>
            )}
          </>
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
            <button className="btn btn-edit" onClick={startEdit}>
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

