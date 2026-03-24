export default function TaskInput({ value, onChange, onAdd }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onAdd();
  };

  return (
    <div className="input-section">
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
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
  );
}
