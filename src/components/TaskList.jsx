import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggleDone, onUpdate }) {
  if (!tasks || tasks.length === 0) {
    return <p className="empty">Aún no hay tareas. ¡Agrega la primera!</p>;
  }

  // Orden: pendientes primero, luego por fecha
  const ordered = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <ul className="list">
      {ordered.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onDelete={() => onDelete(t.id)}
          onToggle={() => onToggleDone(t.id)}
          onEdit={(patch) => onUpdate(t.id, patch)}
        />
      ))}
    </ul>
  );
}

