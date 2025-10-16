export default function TaskList({ tasks, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <p className="empty">Aún no hay tareas. ¡Agrega la primera!</p>;
  }

  return (
    <ul className="list">
      {tasks.map((t) => (
        <li key={t.id} className="list-item">
          <div className="title">{t.title}</div>

          {/* Botón eliminar (US2) */}
          <button
            onClick={() => onDelete(t.id)}
            aria-label={`Eliminar ${t.title}`}
            className="btn-danger"
            title="Eliminar"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
