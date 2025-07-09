import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AccessRoute({
  children,
  requireAuth = false,      // require login
  publicOnly = false,       // redirect if already logged in
  requireRole = null,       // e.g., "admin", "user"
  redirectTo = "/login",    // default redirection
}) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Add your loader/spinner here
  }

  // If user is authenticated and route is public-only (e.g. login/signup)
  if (isAuthenticated && publicOnly) {
    return <Navigate to="/" />;
  }

  // If route requires authentication but user is not logged in
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // If route requires a specific role (e.g. admin)
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/404" />;
  }

  return children;
}
