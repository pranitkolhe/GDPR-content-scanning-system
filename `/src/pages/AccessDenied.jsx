import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function AccessDenied() {
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="w-20 h-20 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-red-500">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Access Denied</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          You don't have permission to view this page. This area is restricted to Admin users only.
        </p>

        {/* Role badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
          Your Role: {role || "Unknown"}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {role === "analyst" ? (
            <Link
              to="/analyst-dashboard"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all no-underline"
            >
              Go to My Dashboard →
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all no-underline"
            >
              Go to Home →
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}