/////--------this file added by Aziz

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

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
const [authChecked, setAuthChecked] = useState(false);
const sessionRequestRef = useRef(null);

const checkSession = useCallback(() => {
  // Prevent duplicate /me calls if the route renders more than once.
  if (sessionRequestRef.current) return sessionRequestRef.current;

  setLoading(true);

  sessionRequestRef.current = (async () => {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return false;
      }

      const authenticatedUser = getUserFromResponse(await response.json());
      setUser(authenticatedUser ?? null);
      return Boolean(authenticatedUser);
    } catch {
      setUser(null);
      return false;
    } finally {
      setAuthChecked(true);
      setLoading(false);
      sessionRequestRef.current = null;
    }
  })();

  return sessionRequestRef.current;
}, []);

  const login = (userData) => {
  setUser(userData);
  setAuthChecked(true);
  setLoading(false);
};
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
      value={{ user, loading, login, logout, updateUser,checkSession, authChecked ,isAuthenticated: !!user }}
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
