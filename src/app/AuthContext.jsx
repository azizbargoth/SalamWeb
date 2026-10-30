/////--------this file added by Aziz

import { createContext, useContext, useEffect, useState } from "react";

const API_BASE =
  import.meta.env?.VITE_API_BASE || "http://localhost:5000/api/auth";

const AuthContext = createContext(null);

// Wrap your app in this once, at the root:
//   <AuthProvider><App /></AuthProvider>
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until the initial /me check resolves

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE}/me`, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = await res.json();
        return data.user ?? data;
      })
      .then((authenticatedUser) => {
        if (!cancelled) setUser(authenticatedUser);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
