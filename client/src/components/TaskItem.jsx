import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleSaveEdit() {
    const text = editText.trim();
    if (text && text !== task.text) {
      onUpdate(task.id, { text });
    }
    setIsEditing(false);
    setEditText(task.text);
  }

  function formatDueDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    const isOverdue = d < today && !task.completed;
    const options = { day: "numeric", month: "short", year: "numeric" };
    return { str: d.toLocaleDateString("es-ES", options), isOverdue };
  }

  const dueInfo = formatDueDate(task.dueDate);

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        {isEditing ? (
          <div className="edit-row">
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
              autoFocus
            />
            <button
              type="button"
              className="edit-save-btn"
              onClick={handleSaveEdit}
              aria-label="Guardar"
            >
              <i className="bx bx-check"></i>
            </button>
            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() => {
                setIsEditing(false);
                setEditText(task.text);
              }}
              aria-label="Cancelar"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        ) : (
          <>
            <span
              className="task-text"
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.text}
            </span>
            {dueInfo && (
              <span className={`task-due ${dueInfo.isOverdue ? "overdue" : ""}`}>
                <i className="bx bx-calendar"></i> {dueInfo.str}
              </span>
            )}
          </>
        )}
      </div>
      <div className="task-actions">
        {!isEditing && (
          <button
            type="button"
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            aria-label="Editar"
            title="Editar"
          >
            <i className="bx bx-edit"></i>
          </button>
        )}
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Eliminar"
        >
          <i className="bx bx-trash"></i>
        </button>
      </div>
    </li>
  );
}
