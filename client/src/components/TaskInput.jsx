export default function TaskInput({ value, onChange, dueDate, onDueDateChange, onAdd }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onAdd();
  };

  return (
    <div className="input-section">
      <div className="input-row">
        <input
          type="text"
          className="task-input"
          placeholder="Añadir nueva tarea..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="add-task-btn"
          onClick={onAdd}
          aria-label="Añadir tarea"
        >
          <i className="bx bx-plus-circle bx-rotate-90 bx-flip-horizontal"></i>
        </button>
      </div>
      <div className="due-date-row">
        <label htmlFor="due-date">Fecha límite (opcional):</label>
        <input
          id="due-date"
          type="date"
          className="due-date-input"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
        />
      </div>
    </div>
  );
}
