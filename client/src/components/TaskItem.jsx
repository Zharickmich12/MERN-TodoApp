export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Eliminar tarea"
      >
        <i className="bx bx-trash"></i>
      </button>
    </li>
  );
}
