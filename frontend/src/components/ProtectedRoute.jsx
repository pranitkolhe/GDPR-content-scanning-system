import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const { isLoaded, isSignedIn, user } = useUser();

  // Wait for Clerk
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // Get role
  const role = user?.unsafeMetadata?.role;

  console.log("PROTECTED ROUTE ROLE:", role);

  // No role
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Unauthorized
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}