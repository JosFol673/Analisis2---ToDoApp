export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p className="empty">Agrega tu primera tarea! :D</p>;
  }

  return (
    <ul className="list">
      {tasks.map((t) => (
        <li key={t.id} className="list-item">
          <div className="title">{t.title}</div>
          {}
        </li>
      ))}
    </ul>
  );
}
