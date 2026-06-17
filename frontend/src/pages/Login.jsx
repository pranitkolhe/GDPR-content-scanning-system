import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isLoaded) return;

    if (isSignedIn && user) {

      const role = user?.unsafeMetadata?.role;

      console.log("Logged in role:", role);

      if (role === "admin") {
        navigate("/dashboard");
      }
      else if (role === "analyst") {
        navigate("/analyst-dashboard");
      }
      else {
        navigate("/register");
      }

    }

  }, [isLoaded, isSignedIn, user, navigate]);

  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      {/* Background */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl" />

        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-violet-300 opacity-20 rounded-full blur-3xl" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(109,40,217,0.15) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 mb-4">

            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              GDPR
            </span>

            <span className="font-black text-xl text-slate-900">
              Scanner
            </span>

          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Sign in to your account
          </p>

        </div>

        <SignIn
          routing="path"
          path="/login"
          forceRedirectUrl="/auth-redirect"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-xl border border-slate-100 rounded-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border border-slate-200 hover:border-purple-300 rounded-xl font-semibold text-sm transition-all",
              formButtonPrimary:
                "bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-sm transition-all",
              formFieldInput:
                "border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-400",
              footerActionLink:
                "text-purple-600 hover:text-purple-700 font-semibold",
              footer: "hidden",
              footerPages: "hidden",
              footerPagesLink: "hidden",
            },
          }}
        />

      </div>

    </div>

  );

}