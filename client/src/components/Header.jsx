export default function Header({ completed, total, progressPercent }) {
  return (
    <header>
      <div className="details">
        <h1>TodoApp</h1>
        <p>Track your tasks</p>
        <div className="progress-bar">
          {}
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className="progress-number">
        {completed} / {total}
      </div>
      <div className="dark-mode">
        <i className="bx bx-moon-stars"></i>
        <i className="bx bx-sun-dim"></i>
      </div>
    </header>
  );
}
