import { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authApi.getMe(token).then((data) => {
        setUser(data);
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem("token");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  function login(userData, token) {
    localStorage.setItem("token", token);
    setUser(userData.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
