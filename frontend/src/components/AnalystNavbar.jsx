import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function AnalystNavbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // ─────────────────────────────────────────────
  // ANALYST LINKS
  // ─────────────────────────────────────────────

  const analystLinks = [
    {
      to: "/analyst-dashboard",
      label: "Home",
    },
    {
      to: "/violations",
      label: "Violations",
    },
  ];

  // Hide current page button
  const visibleLinks =
    analystLinks.filter(
      (link) => link.to !== location.pathname
    );

  // ─────────────────────────────────────────────
  // ICONS
  // ─────────────────────────────────────────────

  const getIcon = (label) => {

    if (label === "Home") {

      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
        >
          <path d="M3 10.5L12 3l9 7.5"/>
          <path d="M5 9.5V21h14V9.5"/>
        </svg>
      );

    }

    if (label === "Violations") {

      return (
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
      );

    }

  };

  return (

    <nav className="bg-gray-950 border-b border-gray-800 py-4 sticky top-0 z-50 shadow-md w-full">

      <div className="w-full flex justify-between items-center px-6">

        {/* LOGO */}

        <Link
          to="/analyst-dashboard"
          className="flex items-center gap-2 font-bold text-lg text-white hover:text-purple-300 transition-colors no-underline"
        >

          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            GDPR
          </span>

          Scanner

        </Link>

        {/* DESKTOP */}

        <div className="hidden md:flex gap-3 items-center">

          {/* NAV LINKS */}

          {visibleLinks.map(({ to, label }) => (

            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 text-sm font-bold text-white border border-transparent bg-purple-600 hover:bg-purple-700 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-200 no-underline"
            >

              {getIcon(label)}

              {label}

            </Link>

          ))}

          {/* PROFILE */}

          {isSignedIn && (

            <div
              className="relative"
              ref={dropdownRef}
            >

              {/* PROFILE BUTTON */}

              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white font-bold transition-all"
              >

                {user?.firstName?.charAt(0) || "U"}

              </button>

              {/* DROPDOWN */}

              {profileOpen && (

                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

                  {/* HEADER */}

                  <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-5 text-white">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-black">
                        {user?.firstName?.charAt(0) || "U"}
                      </div>

                      <div>

                        <p className="font-bold text-sm">
                          {user?.fullName || "User"}
                        </p>

                        <p className="text-xs text-purple-100">
                          {user?.emailAddresses?.[0]?.emailAddress}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* BODY */}

                  <div className="p-4">

                    <div className="flex items-center justify-between mb-4">

                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Role
                      </span>

                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        Analyst
                      </span>

                    </div>

                    {/* SIGN OUT */}

                    <button
                      onClick={() => signOut()}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >

                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>

                      Sign Out

                    </button>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-purple-600/20 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
        >

          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />

          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />

          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden mt-3 flex flex-col gap-2 border-t border-gray-800 pt-3 px-6">

          {visibleLinks.map(({ to, label }) => (

            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-sm font-bold text-white border border-transparent bg-purple-600 hover:bg-purple-700 px-4 py-2.5 rounded-lg transition-all duration-200 text-center no-underline"
            >

              {getIcon(label)}

              {label}

            </Link>

          ))}

          {/* SIGN OUT */}

          {isSignedIn && (

            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl mt-2 flex items-center justify-center gap-2"
            >

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>

              Sign Out

            </button>

          )}

        </div>

      )}

    </nav>

  );

}