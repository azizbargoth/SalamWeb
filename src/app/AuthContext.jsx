/////--------this file added by Aziz

import { createContext, useContext, useEffect, useState } from "react";

const API_BASE =
  import.meta.env?.VITE_API_BASE || "http://localhost:5000/api/auth";
const API_ORIGIN = new URL(API_BASE, window.location.origin).origin;

const AuthContext = createContext(null);
function getUserFromResponse(response) {
  const payload = response?.data ?? response;
  return payload?.data?.user ?? payload?.data ?? payload?.user ?? payload;
}

export function getMediaUrl(path) {
  return path ? new URL(path, API_ORIGIN).toString() : "";
}

// Wrap your app in this once, at the root:
//   <AuthProvider><App /></AuthProvider>
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until the initial /me check resolves

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE}/me`, { method: "GET", credentials: "include" })
      .then(async (res) => {
        if (!res.ok) return null;
        // const data = await res.json();
        // console.log(data)
        return getUserFromResponse(await res.json());
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
  const updateUser = (updates) =>
    setUser((current) => ({ ...current, ...updates }));

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
      value={{ user, loading, login, logout, updateUser, isAuthenticated: !!user }}
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
