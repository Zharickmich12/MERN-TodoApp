import { createContext, useContext, useState, useLayoutEffect } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "todoapp-theme";

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "dark";
  });

  useLayoutEffect(() => {
    localStorage.setItem(STORAGE_KEY, darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggle: () => setDarkMode((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return ctx;
}
