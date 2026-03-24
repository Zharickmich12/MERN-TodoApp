import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Header({ completed, total, progressPercent }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <div className="details">
        <h1>TodoApp</h1>
        <p>{user ? `Hola, ${user.name}` : "Track your tasks"}</p>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <div className="header-right">
        <div className="progress-number">
          {completed} / {total}
        </div>
        <ThemeToggle />
        {user && (
          <button type="button" className="logout-btn" onClick={handleLogout}>
            <i className="bx bx-log-out"></i> Salir
          </button>
        )}
      </div>
    </header>
  );
}
