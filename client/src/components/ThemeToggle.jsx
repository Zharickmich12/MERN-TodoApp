import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { darkMode, toggle } = useTheme();
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
      title={darkMode ? "Modo claro" : "Modo oscuro"}
    >
      {darkMode ? <i className="bx bx-sun"></i> : <i className="bx bx-moon"></i>}
    </button>
  );
}
