import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

export default function PrivateRoute() {
  const { user, loading, isAdmin, isLoggingOut } = useAuth();

  if (loading || isLoggingOut) {
    return (
      <div className="loading-overlay bg-base-200 fixed inset-0">
        <Loading
          message={isLoggingOut ? "Logging out..." : "Checking admin access..."}
          className="text-base-content fixed top-1/2 left-1/2 -translate-1/2"
        />
      </div>
    );
  }

  if (user && isAdmin) {
    ``;
    return <Outlet />;
  }

  return <Navigate to="/sign-in" replace />;
}
