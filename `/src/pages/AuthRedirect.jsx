import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirect() {

  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoaded) return;

    // Not logged in
    if (!isSignedIn || !user) {
      navigate("/login");
      return;
    }

    // Get role
    const role = user?.unsafeMetadata?.role;

    console.log("USER ROLE:", role);

    // Redirect by role
    if (role === "admin") {
      navigate("/");
    } else if (role === "analyst") {
      navigate("/analyst-dashboard");
    } else {
      navigate("/login");
    }

  }, [isLoaded, isSignedIn, user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">

      <div className="flex items-center gap-3 text-slate-500">

        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>

        Redirecting...

      </div>

    </div>
  );
}