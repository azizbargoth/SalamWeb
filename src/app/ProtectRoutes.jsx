////------this file added by aziz
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

// Usage with react-router:
//   <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
export default function ProtectedRoute({ children }) {
   const { user, loading, authChecked, checkSession } = useAuth();

  useEffect(() => {
    if (!authChecked) {
      void checkSession();
    }
  }, [authChecked, checkSession]);

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen w-full bg-[#0F1115] flex items-center justify-center">
        <span className="font-mono text-xs tracking-[0.2em] text-[#8B92A3] uppercase">
          Checking session…
        </span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
