import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const dropdownRef = useRef(null);

  const role = user?.unsafeMetadata?.role;

  // CLOSE DROPDOWN OUTSIDE CLICK

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // ─────────────────────────────────────────────
  // NAV LINKS
  // ─────────────────────────────────────────────

  const adminLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const analystLinks = [
    { to: "/analyst-dashboard", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const publicLinks = [
    { to: "/", label: "Home" },
  ];

  const getLinks = () => {

    if (!isSignedIn) return publicLinks;

    if (role === "admin") return adminLinks;

    if (role === "analyst") return analystLinks;

    return publicLinks;

  };

  // ACTIVE PAGE FILTERING

  const visibleLinks =
    getLinks().filter((link) => {

      // ADMIN HOME
      if (
        location.pathname === "/" &&
        link.to === "/"
      ) {
        return false;
      }

      // ANALYST HOME
      if (
        location.pathname === "/analyst-dashboard" &&
        link.to === "/analyst-dashboard"
      ) {
        return false;
      }

      // DASHBOARD
      if (
        location.pathname === "/dashboard" &&
        link.to === "/dashboard"
      ) {
        return false;
      }

      return true;

    });

  // SCAN BUTTON

  const shouldShowScan =
    isSignedIn &&
    role === "admin" &&
    location.pathname !== "/scan";

  // ─────────────────────────────────────────────
  // ICONS
  // ─────────────────────────────────────────────

  const getIcon = (label) => {

    // HOME

    if (label === "Home") {

      return (

        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M3 10.5L12 3l9 7.5"/>
          <path d="M5 9.5V21h14V9.5"/>
        </svg>

      );

    }

    // DASHBOARD

    if (label === "Dashboard") {

      return (

        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>

      );

    }

  };

  return (

    <nav className="bg-gray-950 border-b border-gray-800 py-4 sticky top-0 z-50 shadow-md w-full">

      <div className="w-full flex justify-between items-center px-6">

        {/* LOGO */}

        <Link
          to={
            isSignedIn
              ? role === "analyst"
                ? "/analyst-dashboard"
                : "/"
              : "/"
          }
          className="flex items-center gap-2 font-bold text-lg text-white hover:text-purple-300 transition-colors no-underline"
        >

          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            GDPR
          </span>

          Scanner

        </Link>

        {/* DESKTOP NAV */}

        <div className="hidden md:flex gap-3 items-center">

          {/* NAVIGATION LINKS */}

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

          {/* SCAN BUTTON */}

          {shouldShowScan && (

            <Link
              to="/scan"
              className="flex items-center gap-2 text-sm font-bold text-white border border-transparent bg-purple-600 hover:bg-purple-700 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-200 no-underline"
            >

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="7"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>

              Scan

            </Link>

          )}

          {/* RULES BUTTON */}

          {role === "admin" &&
            location.pathname !== "/rules" && (

            <Link
              to="/rules"
              className="flex items-center gap-2 text-sm font-bold text-white border border-transparent bg-purple-600 hover:bg-purple-700 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-200 no-underline"
            >

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>

              Rules

            </Link>

          )}

          {/* PROFILE */}

          {isSignedIn ? (

            <div
              className="relative"
              ref={dropdownRef}
            >

              {/* USER BUTTON */}

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

                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>

                        {role}

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

          ) : (

            <div className="flex items-center gap-2">

              <Link
                to="/login"
                className="text-sm font-bold text-white border border-white/20 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-200 no-underline"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-all duration-200 no-underline"
              >
                Register
              </Link>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}