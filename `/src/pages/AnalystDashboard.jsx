import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function AnalystDashboard() {

  const { user } = useUser();

  return (

    <div className="bg-slate-50 min-h-screen overflow-x-hidden">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-violet-100 pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8">

        {/* Background */}

        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(109,40,217,0.15) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-violet-300 opacity-20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>

            Analyst Workspace

          </div>

          {/* TITLE */}

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-5 leading-tight">

            Welcome back,{" "}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-purple-700">
              {user?.firstName || "Analyst"}
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Monitor GDPR violations, review flagged sensitive data,
            and maintain compliance visibility across scanned documents.
          </p>

          {/* CTA BUTTON */}

          <Link
            to="/violations"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <circle cx="12" cy="16" r="1"/>
            </svg>

            Open Violations

          </Link>

        </div>

      </section>

    </div>

  );

}