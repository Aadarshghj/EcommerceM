import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isCheckingAuth } = useUserStore(); // Updated to match store

  // Debug logging
  console.log("ProtectedRoute state:", { 
    user: user ? { id: user._id || user.id, role: user.role } : null, 
    isCheckingAuth 
  });

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    console.log("User is not admin, redirecting to home");
    return <Navigate to="/" />;
  }

  return children;
}